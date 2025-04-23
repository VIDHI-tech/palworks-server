import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const paymentZod = z.object({
  invoiceId: mongoIdZod,
  amount: z.number(),
  paymentDate: z.date(),
});

//Create
export const paymentCreateSchema = paymentZod.strict();
export type PaymentCreate = z.infer<typeof paymentCreateSchema>;

export type IPayment = z.infer<typeof paymentZod> & IBaseDocument;

const PaymentSchema = createSchema<IPayment>({
  invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
});
PaymentSchema.index({ invoiceId: 1 });
export const PaymentModel = createModel<IPayment>('Payment', PaymentSchema);
