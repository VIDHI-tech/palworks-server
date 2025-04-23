import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const quotaTaskZod = z.object({
  salesEmployeeId: mongoIdZod,
  forDate: z.date(),
  telegramConversationCount: z.number().int(),
  remarks: z.string().optional(),
});

//Create
export const quotaTaskCreateSchema = quotaTaskZod.strict();
export type QuotaTaskCreate = z.infer<typeof quotaTaskCreateSchema>;

// update
export const quotaTaskUpdateSchema = quotaTaskZod.partial().strict();
export type QuotaTaskUpdate = z.infer<typeof quotaTaskUpdateSchema>;

export type IQuotaTask = z.infer<typeof quotaTaskZod> & IBaseDocument;

const QuotaTaskSchema = createSchema<IQuotaTask>({
  salesEmployeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  forDate: { type: Date, required: true },
  telegramConversationCount: { type: Number, required: true },
  remarks: { type: String, default: '' },
});
QuotaTaskSchema.index({ salesEmployeeId: 1, forDate: 1 }, { unique: true });
export const QuotaTaskModel = createModel<IQuotaTask>('QuotaTask', QuotaTaskSchema);
