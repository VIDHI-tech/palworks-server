import type { Context } from 'hono';
import { z } from 'zod';
import { addVariableExpense, listVariableExpenses } from '../services/variableExpenseService';
import { varExpZod } from '../db/models/variableExpense';

const expenseSchema = varExpZod;
const projectParam = z.object({ projectId: z.string() });

export async function addVariableExpenseHandler(c: Context) {
  const data = expenseSchema.parse(await c.req.json());
  const exp = await addVariableExpense(data);
  return c.json(exp, 201);
}

export async function listVariableExpensesHandler(c: Context) {
  const { projectId } = projectParam.parse({ projectId: c.req.param('projectId') });
  const list = await listVariableExpenses(projectId);
  return c.json(list);
}
