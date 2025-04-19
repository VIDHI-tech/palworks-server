import type { ClientSession } from 'mongoose';
import { PaymentModel, type IPayment } from '../db/models/payment';
import { reconcileInvoicePayments } from './invoiceService';

export async function recordPayment(data: Partial<IPayment>, session?: ClientSession): Promise<IPayment> {
  const [p] = await PaymentModel.create([data], { session });
  await reconcileInvoicePayments(data.invoiceId!, session);
  return p;
}

export async function listPayments(invoiceId: string, session?: ClientSession) {
  return PaymentModel.find({ invoiceId })
    .session(session ?? null)
    .lean<IPayment[]>()
    .exec();
}
