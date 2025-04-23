import { leadExpCreateSchema } from './../db/models/leadExpense';
import { Hono } from 'hono';
import { addLeadExpenseHandler } from '../controllers/lead.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zJsonValidator } from '@/utils/zValidators';

export const leadExpenseRouter = new Hono();

leadExpenseRouter.post('/', adminAuthMiddleware, zJsonValidator(leadExpCreateSchema), zJsonValidator(leadExpCreateSchema), addLeadExpenseHandler);
