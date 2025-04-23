import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const leadExpZod = z.object({
  leadId: mongoIdZod,
  expenseType: z.string(),
  amount: z.number(),
  approvedBy: mongoIdZod,
  archivedAt: z.date().nullable().default(null),
});

// create
export const leadExpCreateSchema = leadExpZod.strict();
export type LeadExpenseCreate = z.infer<typeof leadExpCreateSchema>;

// update
export const leadExpUpdateSchema = leadExpZod.partial().strict();
export type LeadExpenseUpdate = z.infer<typeof leadExpUpdateSchema>;

export type ILeadExpense = z.infer<typeof leadExpZod> & IBaseDocument;

const LeadExpenseSchema = createSchema<ILeadExpense>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    expenseType: { type: String, required: true },
    amount: { type: Number, required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  },
  { timestamps: true }
);
export const LeadExpenseModel = createModel<ILeadExpense>('LeadExpense', LeadExpenseSchema);
