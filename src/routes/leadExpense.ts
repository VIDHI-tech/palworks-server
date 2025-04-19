import { Hono } from 'hono';
import { addLeadExpenseHandler } from '../controllers/lead.controller';
import { adminAuthMiddleware } from '../middlewares';

export const leadExpenseRouter = new Hono();

// Record an expense against a Lead
leadExpenseRouter.post('/', adminAuthMiddleware, addLeadExpenseHandler);
