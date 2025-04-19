import type { Context } from 'hono';
import { z } from 'zod';
import { calcEmployeeEfficiency } from '../services/efficiencyService';

const empParam = z.object({ id: z.string() });

export async function getEmployeeEfficiencyHandler(c: Context) {
  const { id } = empParam.parse({ id: c.req.param('id') });
  const eff = await calcEmployeeEfficiency(id);
  if (eff === null) return c.text('No completed tasks in last month', 404);
  return c.json({ efficiencyPct: eff });
}
