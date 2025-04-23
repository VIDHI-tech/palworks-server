import { Hono } from 'hono';
import { recordPaymentHandler, listPaymentsHandler } from '../controllers/payment.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zJsonValidator } from '@/utils/zValidators';
import { paymentCreateSchema } from '@/db/models/payment';

export const paymentRouter = new Hono();

// Record a payment
paymentRouter.post('/', adminAuthMiddleware, zJsonValidator(paymentCreateSchema), recordPaymentHandler);

// List payments for an invoice
paymentRouter.get('/:invoiceId', adminAuthMiddleware, listPaymentsHandler);
