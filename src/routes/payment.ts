import { Hono } from 'hono';
import { recordPaymentHandler, listPaymentsHandler } from '../controllers/payment.controller';
import { adminAuthMiddleware } from '../middlewares';

export const paymentRouter = new Hono();

// Record a payment
paymentRouter.post('/', adminAuthMiddleware, recordPaymentHandler);

// List payments for an invoice
paymentRouter.get('/:invoiceId', adminAuthMiddleware, listPaymentsHandler);
