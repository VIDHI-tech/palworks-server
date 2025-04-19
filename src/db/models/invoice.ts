import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

const lineItemZod = z.object({
  description: z.string(),
  discount: z.number(),
  gstPct: z.number(),
  amount: z.number(),
});
export const invoiceZod = z.object({
  projectId: mongoIdZod,
  invoiceNo: z.string(),
  issueDate: z.date(),
  dueDate: z.date(),
  companyName: z.string(),
  companyAddress: z.string(),
  companyPhone: z.string(),
  companyEmail: z.string().email(),
  companyGstin: z.string().optional(),
  billToName: z.string(),
  billToAddress: z.string(),
  billToContact: z.string(),
  billToGstin: z.string().optional(),
  items: z.array(lineItemZod),
  totalDiscount: z.number(),
  totalGst: z.number(),
  totalAmount: z.number(),
  subTotal: z.number(),
  sgst: z.number(),
  cgst: z.number(),
  netTotal: z.number(),
  received: z.number(),
  balance: z.number(),
  status: z.enum(['pending', 'not_received', 'partial', 'fully_paid']).default('pending'),
});
export type IInvoice = z.infer<typeof invoiceZod> & IBaseDocument;

const lineItemSchema = new Schema(
  {
    description: String,
    discount: Number,
    gstPct: Number,
    amount: Number,
  },
  { _id: false }
);

const InvoiceSchema = createSchema<IInvoice>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  invoiceNo: { type: String, required: true, unique: true },
  issueDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyPhone: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyGstin: { type: String, default: null },
  billToName: { type: String, required: true },
  billToAddress: { type: String, required: true },
  billToContact: { type: String, required: true },
  billToGstin: { type: String, default: null },
  items: { type: [lineItemSchema], required: true },
  totalDiscount: { type: Number, required: true },
  totalGst: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  sgst: { type: Number, required: true },
  cgst: { type: Number, required: true },
  netTotal: { type: Number, required: true },
  received: { type: Number, required: true },
  balance: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'not_received', 'partial', 'fully_paid'], default: 'pending' },
});
export const InvoiceModel = createModel<IInvoice>('Invoice', InvoiceSchema);
