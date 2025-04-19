import type { Context } from 'hono';
import { z } from 'zod';
import { leadExpZod, leadZod } from '@/db/models';
import { addLeadExpense, createLead, getLeadById, listLeads, updateLead } from '@/services/leadService';

const leadCreateSchema = leadZod;
const leadUpdateSchema = leadZod.partial();
const leadExpenseSchema = leadExpZod;
const idParam = z.object({ id: z.string() });

export async function createLeadHandler(c: Context) {
  const data = leadCreateSchema.parse(await c.req.json());
  const lead = await createLead(data);
  return c.json(lead, 201);
}

export async function updateLeadHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const data = leadUpdateSchema.parse(await c.req.json()); // I'll gonna delete this by giving zvalidaror in router
  const lead = await updateLead(id, data);
  if (!lead) return c.text('Lead not found', 404);
  return c.json(lead);
}

export async function addLeadExpenseHandler(c: Context) {
  const data = leadExpenseSchema.parse(await c.req.json());
  const exp = await addLeadExpense(data);
  return c.json(exp, 201);
}

export async function getLeadHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const lead = await getLeadById(id);
  if (!lead) return c.text('Lead not found', 404);
  return c.json(lead);
}

export async function listLeadsHandler(c: Context) {
  const all = await listLeads();
  return c.json(all);
}
