import type { Context } from 'hono';
import { z } from 'zod';
import { createInvoice, getInvoiceById, updateInvoiceStatus, reconcileInvoicePayments } from '../services/invoiceService';
import { invoiceCreateSchema, invoiceUpdateSchema, invoiceZod } from '../db/models/invoice';

export async function createInvoiceHandler(c: Context) {
  const {
    projectId,
    invoiceNo,
    issueDate,
    dueDate,
    companyName,
    companyAddress,
    companyPhone,
    companyEmail,
    companyGstin,
    billToName,
    billToAddress,
    billToContact,
    billToGstin,
    items,
    totalDiscount,
    totalGst,
    totalAmount,
    subTotal,
    sgst,
    cgst,
    netTotal,
    received,
    balance,
    status,
  } = invoiceCreateSchema.parse(await c.req.json());

  const inv = await createInvoice({
    projectId,
    invoiceNo,
    issueDate,
    dueDate,
    companyName,
    companyAddress,
    companyPhone,
    companyEmail,
    companyGstin,
    billToName,
    billToAddress,
    billToContact,
    billToGstin,
    items,
    totalDiscount,
    totalGst,
    totalAmount,
    subTotal,
    sgst,
    cgst,
    netTotal,
    received,
    balance,
    status,
  });
  return c.json(inv, 201);
}

export async function getInvoiceHandler(c: Context) {
  const _id = c.req.param('_id');
  const inv = await getInvoiceById(_id);
  if (!inv) return c.text('Invoice not found', 404);
  return c.json(inv);
}

export async function updateInvoiceStatusHandler(c: Context) {
  const _id = c.req.param('_id');
  const { status } = invoiceZod.parse(await c.req.json());
  const inv = await updateInvoiceStatus(_id, status);
  if (!inv) return c.text('Invoice not found', 404);
  return c.json(inv);
}

export async function reconcileInvoiceHandler(c: Context) {
  const { _id } = c.req.param();
  const result = await reconcileInvoicePayments(_id);
  return c.json(result);
}
