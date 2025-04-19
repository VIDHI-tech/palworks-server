import { Hono } from 'hono';
import { logQuotaTaskHandler, getQuotaTasksHandler } from '../controllers/quotaTask.controller';
import { adminAuthMiddleware } from '../middlewares';

export const quotaTaskRouter = new Hono();

// Log or update today’s Telegram‐chat quota
quotaTaskRouter.post('/', adminAuthMiddleware, logQuotaTaskHandler);

// Get quota‐logs for a given sales employee
quotaTaskRouter.get('/:empId', adminAuthMiddleware, getQuotaTasksHandler);
