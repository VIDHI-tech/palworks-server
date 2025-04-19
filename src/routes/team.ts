import { Hono } from 'hono';
import { addEmployeeToTeamHandler, getTeamsForEmployeeHandler } from '../controllers/team.controller';
import { adminAuthMiddleware } from '../middlewares';

export const teamRouter = new Hono();

// Add an employee to a team (Admin only)
teamRouter.post('/:teamName/employees/:empId', adminAuthMiddleware, addEmployeeToTeamHandler);

// List teams for an employee (Admin only)
teamRouter.get('/employees/:empId', adminAuthMiddleware, getTeamsForEmployeeHandler);
