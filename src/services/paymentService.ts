// import type { ClientSession } from 'mongoose';
// import { PaymentModel, type IPayment, type PaymentCreate } from '../db/models/payment';
// import { reconcileInvoicePayments } from './invoiceService';

// export async function recordPayment({ invoiceId, amount, paymentDate }: PaymentCreate, session?: ClientSession): Promise<IPayment> {
//   const [p] = await PaymentModel.create([{ invoiceId, amount, paymentDate }], { session });
//   await reconcileInvoicePayments({ invoiceId, amount, paymentDate }.invoiceId!, session);
//   return p;
// }

// export async function listPayments(invoiceId: string, session?: ClientSession) {
//   return PaymentModel.find({ invoiceId })
//     .session(session ?? null)
//     .lean<IPayment[]>()
//     .exec();
// }

import type { ClientSession } from 'mongoose';
import { PaymentModel, type IPayment, type PaymentCreate } from '../db/models/payment';
import { reconcileInvoicePayments } from './invoiceService';

export async function recordPayment({ invoiceId, amount, paymentDate }: PaymentCreate, session?: ClientSession): Promise<IPayment> {
  const [p] = await PaymentModel.create([{ invoiceId, amount, paymentDate }], { session });

  await reconcileInvoicePayments(invoiceId, session);

  return p;
}

export async function listPayments(invoiceId: string, session?: ClientSession): Promise<IPayment[]> {
  return PaymentModel.find({ invoiceId })
    .session(session ?? null)
    .lean<IPayment[]>()
    .exec();
}
