import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

const intervalZod = z.object({
  start: z.date(),
  end: z.date().nullable(),
});
export const taskZod = z.object({
  projectId: mongoIdZod,
  assigneeId: mongoIdZod,
  tagId: mongoIdZod,
  loggedMinutes: z.number().default(0),
  status: z.enum(['not-started', 'on-going', 'on-hold', 'completed']).default('not-started'),
  intervals: z.array(intervalZod).default([]),
});

//create
export const taskCreateSchema = taskZod.strict();
export type TaskCreate = z.infer<typeof taskCreateSchema>;

//update
export const taskUpdateSchema = taskZod.partial().strict();
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

export type ITask = z.infer<typeof taskZod> & IBaseDocument;

const intervalSchema = new Schema({ start: Date, end: Date }, { _id: false });
const TaskSchema = createSchema<ITask>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  // name:
  assigneeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
  loggedMinutes: { type: Number, default: 0 },
  status: { type: String, enum: ['not-started', 'on-going', 'on-hold', 'completed'], default: 'not-started' },
  intervals: { type: [intervalSchema], default: [] },
});

// recalc on completed
TaskSchema.pre<ITask>('save', async function (next) {
  if (this.isModified('status') && this.status === 'completed') {
    let total = 0;
    for (const i of this.intervals) {
      if (i.end) total += Math.floor((i.end.getTime() - i.start.getTime()) / 60000);
    }
    this.loggedMinutes = total;
    const tag = await require('./tag').TagModel.findById(this.tagId);
    const std = tag?.standardMinutes || 0;
    (this as any).efficiency = std > 0 ? Math.min((std / total) * 100, 100) : 0;
  }
  next();
});
export const TaskModel = createModel<ITask>('Task', TaskSchema);
