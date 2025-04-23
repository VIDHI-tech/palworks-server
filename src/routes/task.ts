import { Hono } from 'hono';
import { createTaskHandler, updateTaskHandler, logIntervalHandler, listTasksHandler } from '../controllers/task.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { taskCreateSchema, taskUpdateSchema } from '@/db/models/task';
import { zodIdSchema } from '@/db/common-schemas';
import { z } from 'zod';

// param schemas
const idParamSchema = z.object({ _id: zodIdSchema });
const projectIdParamSchema = z.object({ projectId: zodIdSchema });

// interval body schema
const intervalBodySchema = z.object({
  start: z.string().refine((s) => !isNaN(Date.parse(s))),
  end: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)))
    .nullable(),
});

export const taskRouter = new Hono();

// Create Task
taskRouter.post('/', adminAuthMiddleware, zJsonValidator(taskCreateSchema), createTaskHandler);

// Update Task
taskRouter.patch('/:_id', adminAuthMiddleware, zParamsValidator(idParamSchema), zJsonValidator(taskUpdateSchema), updateTaskHandler);

// Log Interval
taskRouter.post('/:_id/intervals', adminAuthMiddleware, zParamsValidator(idParamSchema), zJsonValidator(intervalBodySchema), logIntervalHandler);

// List by Project
taskRouter.get('/project/:projectId', adminAuthMiddleware, zParamsValidator(projectIdParamSchema), listTasksHandler);
