import { Hono } from 'hono';
import { logQuotaTaskHandler, getQuotaTasksHandler } from '../controllers/quotaTask.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zJsonValidator } from '@/utils/zValidators';
import { quotaTaskCreateSchema } from '@/db/models/quotaTask';

export const quotaTaskRouter = new Hono();

// Log or update today’s Telegram‐chat quota
quotaTaskRouter.post('/', adminAuthMiddleware, zJsonValidator(quotaTaskCreateSchema), logQuotaTaskHandler);

// Get quota‐logs for a given sales employee
quotaTaskRouter.get('/:empId', adminAuthMiddleware, getQuotaTasksHandler);
