import { Hono } from 'hono';
import { getEmployeeEfficiencyHandler } from '../controllers/efficiency.controller';
import { adminAuthMiddleware } from '../middlewares';

export const efficiencyRouter = new Hono();

// Get an employee’s average efficiency over the last month
efficiencyRouter.get('/employee/:id', adminAuthMiddleware, getEmployeeEfficiencyHandler);
