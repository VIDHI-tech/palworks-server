import type { Context } from 'hono';
import { z } from 'zod';
import { logQuotaTask, getQuotaTasksForEmployee } from '../services/quotaTaskService';
import { quotaTaskZod } from '../db/models/quotaTask';

const quotaTaskSchema = quotaTaskZod;
const empIdParam = z.object({ empId: z.string() });

export async function logQuotaTaskHandler(c: Context) {
  const data = quotaTaskSchema.parse(await c.req.json());
  const qt = await logQuotaTask(data);
  return c.json(qt, 201);
}

export async function getQuotaTasksHandler(c: Context) {
  const { empId } = empIdParam.parse({ empId: c.req.param('empId') });
  const list = await getQuotaTasksForEmployee(empId);
  return c.json(list);
}
