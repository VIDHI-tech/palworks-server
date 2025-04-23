import type { Context } from 'hono';
import { z } from 'zod';
import { logQuotaTask, getQuotaTasksForEmployee } from '../services/quotaTaskService';
import { quotaTaskCreateSchema } from '../db/models/quotaTask';

const empIdParam = z.object({ empId: z.string() });

export async function logQuotaTaskHandler(c: Context) {
  const { salesEmployeeId, forDate, telegramConversationCount, remarks } = quotaTaskCreateSchema.parse(await c.req.json());

  const qt = await logQuotaTask({
    salesEmployeeId,
    forDate,
    telegramConversationCount,
    remarks,
  });

  return c.json(qt, 201);
}

export async function getQuotaTasksHandler(c: Context) {
  const { empId } = empIdParam.parse({
    empId: c.req.param('empId'),
  });

  const list = await getQuotaTasksForEmployee(empId);
  return c.json(list);
}
