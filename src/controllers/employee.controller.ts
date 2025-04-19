import type { Context } from 'hono';
import { z } from 'zod';
import { createEmployee, getEmployeeById, updateEmployee, getHourlyRate } from '../services/employeeService';
import { employeeZod } from '../db/models/employee';

const employeeCreateSchema = employeeZod;
const employeeUpdateSchema = employeeZod.partial();
const hourlyRateParamSchema = z.object({ id: z.string() });

export async function createEmployeeHandler(c: Context) {
  const data = employeeCreateSchema.parse(await c.req.json());
  const emp = await createEmployee(data);
  return c.json(emp, 201);
}

export async function getEmployeeHandler(c: Context) {
  const id = c.req.param('id');
  const emp = await getEmployeeById(id);
  if (!emp) return c.text('Employee not found', 404);
  return c.json(emp);
}

export async function updateEmployeeHandler(c: Context) {
  const id = c.req.param('id');
  const data = employeeUpdateSchema.parse(await c.req.json());
  const emp = await updateEmployee(id, data);
  if (!emp) return c.text('Employee not found', 404);
  return c.json(emp);
}

export async function getHourlyRateHandler(c: Context) {
  const { id } = hourlyRateParamSchema.parse({ id: c.req.param('id') });
  const rate = await getHourlyRate(id);
  return c.json({ hourlyRate: rate });
}
