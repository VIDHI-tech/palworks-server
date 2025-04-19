import { Hono } from 'hono';
import { createInvoiceHandler, getInvoiceHandler, updateInvoiceStatusHandler, reconcileInvoiceHandler } from '../controllers/invoice.controller';
import { adminAuthMiddleware } from '../middlewares';

export const invoiceRouter = new Hono();

// Create Invoice
invoiceRouter.post('/', adminAuthMiddleware, createInvoiceHandler);

// Get one Invoice
invoiceRouter.get('/:id', adminAuthMiddleware, getInvoiceHandler);

// Manually patch Invoice status
invoiceRouter.patch('/:id/status', adminAuthMiddleware, updateInvoiceStatusHandler);

// Reconcile payments & update received/balance
invoiceRouter.post('/:id/reconcile', adminAuthMiddleware, reconcileInvoiceHandler);
