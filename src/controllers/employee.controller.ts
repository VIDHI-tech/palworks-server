import type { Context } from 'hono';
import { createEmployee, getEmployeeById, updateEmployee, getHourlyRate } from '../services/employeeService';
import { employeeCreateSchema, employeeZod } from '../db/models/employee';

export async function createEmployeeHandler(c: Context) {
  const { name, role, CTC, workingHoursPerMonth } = employeeCreateSchema.parse(await c.req.json());
  const emp = await createEmployee({ name, role, CTC, workingHoursPerMonth });
  return c.json(emp, 201);
}

export async function getEmployeeHandler(c: Context) {
  const _id = c.req.param('_id');
  const emp = await getEmployeeById(_id);
  if (!emp) return c.text('Employee not found', 404);
  return c.json(emp);
}

export async function updateEmployeeHandler(c: Context) {
  const _id = c.req.param('_id');
  const { name, role, CTC, workingHoursPerMonth } = employeeZod.parse(await c.req.json());

  const emp = await updateEmployee(_id, { name, role, CTC, workingHoursPerMonth });
  if (!emp) return c.text('Employee not found', 404);
  return c.json(emp);
}

export async function getHourlyRateHandler(c: Context) {
  const { _id } = c.req.param();
  const rate = await getHourlyRate(_id);
  return c.json({ hourlyRate: rate });
}
