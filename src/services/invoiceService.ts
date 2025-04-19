import type { ClientSession } from 'mongoose';
import { InvoiceModel, type IInvoice } from '../db/models/invoice';
import { PaymentModel } from '../db/models/payment';

export async function createInvoice(data: Partial<IInvoice>, session?: ClientSession): Promise<IInvoice> {
  const [inv] = await InvoiceModel.create([data], { session });
  return inv;
}

export async function getInvoiceById(id: string, session?: ClientSession): Promise<IInvoice | null> {
  return InvoiceModel.findById(id)
    .session(session ?? null)
    .lean<IInvoice>()
    .exec();
}

export async function updateInvoiceStatus(id: string, status: IInvoice['status'], session?: ClientSession): Promise<IInvoice | null> {
  return InvoiceModel.findByIdAndUpdate(id, { status }, { new: true, session }).lean<IInvoice>().exec();
}

export async function reconcileInvoicePayments(invoiceId: string, session?: ClientSession): Promise<{ received: number; balance: number }> {
  const inv = await InvoiceModel.findById(invoiceId).session(session ?? null);
  if (!inv) throw new Error('Invoice not found');

  const agg = await PaymentModel.aggregate([{ $match: { invoiceId: inv._id } }, { $group: { _id: null, totalPaid: { $sum: '$amount' } } }]).session(
    session ?? null
  );

  const received = agg[0]?.totalPaid || 0;
  const balance = inv.netTotal - received;

  inv.received = received;
  inv.balance = balance;
  await inv.save({ session });

  return { received, balance };
}
