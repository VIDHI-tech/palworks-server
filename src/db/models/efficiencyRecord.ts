import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const effRecZod = z.object({
  taskId: mongoIdZod,
  efficiencyPct: z.number(),
});
export type IEffRec = z.infer<typeof effRecZod> & IBaseDocument;

const EffRecSchema = createSchema<IEffRec>({
  taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true, unique: true },
  efficiencyPct: { type: Number, required: true },
});
export const EfficiencyRecordModel = createModel<IEffRec>('EfficiencyRecord', EffRecSchema);
