import { Hono } from 'hono';
import { getEmployeeEfficiencyHandler } from '../controllers/efficiency.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zParamsValidator } from '@/utils/zValidators';
import { zodIdSchema } from '@/db/common-schemas';

export const efficiencyRouter = new Hono();

// Get an employee’s average efficiency over the last month
efficiencyRouter.get('/employee/:_id', adminAuthMiddleware, zParamsValidator(zodIdSchema), getEmployeeEfficiencyHandler);
