import type { Context } from 'hono';
import { z } from 'zod';
import { createInvoice, getInvoiceById, updateInvoiceStatus, reconcileInvoicePayments } from '../services/invoiceService';
import { invoiceZod } from '../db/models/invoice';

const invoiceCreateSchema = invoiceZod;
const statusSchema = z.object({ status: z.enum(['pending', 'not_received', 'partial', 'fully_paid']) });
const idParam = z.object({ id: z.string() });

export async function createInvoiceHandler(c: Context) {
  const data = invoiceCreateSchema.parse(await c.req.json());
  const inv = await createInvoice(data);
  return c.json(inv, 201);
}

export async function getInvoiceHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const inv = await getInvoiceById(id);
  if (!inv) return c.text('Invoice not found', 404);
  return c.json(inv);
}

export async function updateInvoiceStatusHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const { status } = statusSchema.parse(await c.req.json());
  const inv = await updateInvoiceStatus(id, status);
  if (!inv) return c.text('Invoice not found', 404);
  return c.json(inv);
}

export async function reconcileInvoiceHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const result = await reconcileInvoicePayments(id);
  return c.json(result);
}
