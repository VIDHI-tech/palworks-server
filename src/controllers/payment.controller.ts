import type { Context } from 'hono';
import { recordPayment, listPayments } from '../services/paymentService';
import { paymentCreateSchema } from '@/db/models/payment';

export async function recordPaymentHandler(c: Context) {
  const { invoiceId, amount, paymentDate } = paymentCreateSchema.parse(await c.req.json());

  const payment = await recordPayment({ invoiceId, amount, paymentDate });

  return c.json(payment, 201);
}

export async function listPaymentsHandler(c: Context) {
  const invoiceId = c.req.param('invoiceId');

  const payments = await listPayments(invoiceId);

  return c.json(payments);
}
