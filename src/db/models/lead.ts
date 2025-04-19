import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const leadZod = z.object({
  name: z.string(),
  clientId: z.string(),
  createdBy: mongoIdZod,
  status: z.enum(['pending', 'approved', 'rejected', 'converted']).default('pending'),
  notes: z.array(z.string()).default([]),
});
export type ILead = z.infer<typeof leadZod> & IBaseDocument;

const LeadSchema = createSchema<ILead>({
  name: { type: String, required: true },
  clientId: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'converted'], default: 'pending' },
  notes: { type: [String], default: [] },
});
export const LeadModel = createModel<ILead>('Lead', LeadSchema);
