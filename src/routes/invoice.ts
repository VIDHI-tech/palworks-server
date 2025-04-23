import { Hono } from 'hono';
import { createInvoiceHandler, getInvoiceHandler, updateInvoiceStatusHandler, reconcileInvoiceHandler } from '../controllers/invoice.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { invoiceCreateSchema, invoiceUpdateSchema } from '@/db/models';
import { zodIdSchema } from '@/db/common-schemas';

export const invoiceRouter = new Hono();

// Create Invoice
invoiceRouter.post('/', adminAuthMiddleware, zJsonValidator(invoiceCreateSchema), createInvoiceHandler);

// Get one Invoice
invoiceRouter.get('/:_id', adminAuthMiddleware, getInvoiceHandler);

// Manually patch Invoice status
invoiceRouter.patch(
  '/:_id/status',
  adminAuthMiddleware,
  zParamsValidator(zodIdSchema),
  zJsonValidator(invoiceUpdateSchema),
  updateInvoiceStatusHandler
);

// Reconcile payments & update received/balance
invoiceRouter.post('/:_id/reconcile', adminAuthMiddleware, reconcileInvoiceHandler);
