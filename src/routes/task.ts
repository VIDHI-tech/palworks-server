import { Hono } from 'hono';
import { createTaskHandler, updateTaskHandler, logIntervalHandler, listTasksHandler } from '../controllers/task.controller';
import { adminAuthMiddleware } from '../middlewares';

export const taskRouter = new Hono();

// Create Task
taskRouter.post('/', adminAuthMiddleware, createTaskHandler);

// Update Task
taskRouter.patch('/:id', adminAuthMiddleware, updateTaskHandler);

// Log a work‐interval on a Task
taskRouter.post('/:id/intervals', adminAuthMiddleware, logIntervalHandler);

// List all Tasks for a Project
taskRouter.get('/project/:projectId', adminAuthMiddleware, listTasksHandler);
