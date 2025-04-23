import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const varExpZod = z.object({
  projectId: mongoIdZod,
  expenseName: z.string(),
  amount: z.number(),
  description: z.string().optional(),
});
export type IVariableExpense = z.infer<typeof varExpZod> & IBaseDocument;

const VarExpSchema = createSchema<IVariableExpense>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  expenseName: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
});
export const VariableExpenseModel = createModel<IVariableExpense>('VariableExpense', VarExpSchema);
