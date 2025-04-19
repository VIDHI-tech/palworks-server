import { Hono } from 'hono';
import { createEmployeeHandler, getEmployeeHandler, updateEmployeeHandler, getHourlyRateHandler } from '../controllers/employee.controller';
import { adminAuthMiddleware } from '../middlewares';

export const employeeRouter = new Hono();

// Create a new employee (Admin only)
employeeRouter.post('/', adminAuthMiddleware, createEmployeeHandler);

// Get employee by ID (Admin only)
employeeRouter.get('/:id', adminAuthMiddleware, getEmployeeHandler);

// Update employee (Admin only)
employeeRouter.patch('/:id', adminAuthMiddleware, updateEmployeeHandler);

// Get an employee’s hourly rate (Admin only)
employeeRouter.get('/:id/hourly-rate', adminAuthMiddleware, getHourlyRateHandler);
