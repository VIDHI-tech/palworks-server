import { Hono } from 'hono';
import { addVariableExpenseHandler, listVariableExpensesHandler } from '../controllers/variableExpense.controller';
import { adminAuthMiddleware } from '../middlewares';

export const variableExpenseRouter = new Hono();

// Add a project‐related expense
variableExpenseRouter.post('/', adminAuthMiddleware, addVariableExpenseHandler);

// List variable expenses for a project
variableExpenseRouter.get('/:projectId', adminAuthMiddleware, listVariableExpensesHandler);
