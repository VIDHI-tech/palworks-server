import type { Context } from 'hono';
import { z } from 'zod';
import { createTask, updateTask, logTaskInterval, listTasksForProject } from '../services/taskService';
import { taskZod } from '../db/models/task';

const taskCreateSchema = taskZod;
const taskUpdateSchema = taskZod.partial();
const intervalSchema = z.object({ start: z.string().refine((s) => !isNaN(Date.parse(s))), end: z.string().refine((s) => !isNaN(Date.parse(s))) });
const idParam = z.object({ id: z.string(), projectId: z.string() });

export async function createTaskHandler(c: Context) {
  const { projectId, assigneeId, tagId, loggedMinutes, status, intervals } = taskCreateSchema.parse(await c.req.json());
  const task = await createTask({ projectId, assigneeId, tagId, loggedMinutes, status, intervals });
  return c.json(task, 201);
}

export async function updateTaskHandler(c: Context) {
  const { id } = idParam.pick({ id: true }).parse({ id: c.req.param('id') });
  const data = taskUpdateSchema.parse(await c.req.json());
  const task = await updateTask(id, data);
  if (!task) return c.text('Task not found', 404);
  return c.json(task);
}

export async function logIntervalHandler(c: Context) {
  const { id } = idParam.pick({ id: true }).parse({ id: c.req.param('id') });
  const { start, end } = intervalSchema.parse(await c.req.json());
  const task = await logTaskInterval(id, new Date(start), new Date(end));
  if (!task) return c.text('Task not found', 404);
  return c.json(task);
}

export async function listTasksHandler(c: Context) {
  const { projectId } = idParam.pick({ projectId: true }).parse({ projectId: c.req.param('projectId') });
  const list = await listTasksForProject(projectId);
  return c.json(list);
}
