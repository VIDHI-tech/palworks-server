import type { Context } from 'hono';
import { calcEmployeeEfficiency } from '../services/efficiencyService';

export async function getEmployeeEfficiencyHandler(c: Context) {
  const { _id } = c.req.param();
  const eff = await calcEmployeeEfficiency(_id);
  if (eff === null) return c.text('No completed tasks in last month', 404);
  return c.json({ efficiencyPct: eff });
}
