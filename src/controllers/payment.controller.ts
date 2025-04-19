import type { Context } from 'hono';
import { z } from 'zod';
import { recordPayment, listPayments } from '../services/paymentService';
import { paymentZod } from '../db/models/payment';

const paymentSchema = paymentZod;
const invoiceParam = z.object({ invoiceId: z.string() });

export async function recordPaymentHandler(c: Context) {
  const data = paymentSchema.parse(await c.req.json());
  const p = await recordPayment(data);
  return c.json(p, 201);
}

export async function listPaymentsHandler(c: Context) {
  const { invoiceId } = invoiceParam.parse({ invoiceId: c.req.param('invoiceId') });
  const list = await listPayments(invoiceId);
  return c.json(list);
}
