import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const projectZod = z.object({
  leadId: mongoIdZod.optional(),
  clientId: z.string(),
  name: z.string(),
  status: z.enum(['notstarted', 'ongoing', 'onhold', 'completed']).default('notstarted'),
  profitMarginPct: z.number().default(0),
});

//create
export const projectCreateSchema = projectZod.strict();
export type ProjectCreate = z.infer<typeof projectCreateSchema>;

// update
export const projectUpdateSchema = projectZod.partial().strict();
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>;

export type IProject = z.infer<typeof projectZod> & IBaseDocument;

const ProjectSchema = createSchema<IProject>({
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: false },
  clientId: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['notstarted', 'ongoing', 'onhold', 'completed'], default: 'notstarted' },
  profitMarginPct: { type: Number, default: 0 },
});
export const ProjectModel = createModel<IProject>('Project', ProjectSchema);
