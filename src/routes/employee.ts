import { Hono } from 'hono';
import { createEmployeeHandler, getEmployeeHandler, updateEmployeeHandler, getHourlyRateHandler } from '../controllers/employee.controller';
import { adminAuthMiddleware } from '../middlewares';
import { z } from 'zod';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { zodIdSchema } from '@/db/common-schemas';
import { employeeCreateSchema, employeeUpdateSchema } from '@/db/models';

export const employeeRouter = new Hono();

// Create a new employee (Admin only)
employeeRouter.post('/', adminAuthMiddleware, zJsonValidator(employeeCreateSchema), createEmployeeHandler);

// Get employee by ID (Admin only)
employeeRouter.get('/:_id', adminAuthMiddleware, getEmployeeHandler);

// Update employee (Admin only)
employeeRouter.patch('/:_id', adminAuthMiddleware, zParamsValidator(zodIdSchema), zJsonValidator(employeeUpdateSchema), updateEmployeeHandler);

// Get an employee’s hourly rate (Admin only)
employeeRouter.get('/:_id/hourly-rate', adminAuthMiddleware, getHourlyRateHandler);
