import type { Context } from 'hono';
import { leadCreateSchema, leadExpZod, leadZod } from '@/db/models';
import { addLeadExpense, createLead, getLeadById, listLeads, updateLead } from '@/services/leadService';

export async function createLeadHandler(c: Context) {
  const { name, clientId, status, notes, createdBy } = leadCreateSchema.parse(await c.req.json()); // I'll gonna delete this by giving zvalidaror in router
  const lead = await createLead({ name, clientId, status, notes, createdBy });
  return c.json(lead, 201);
}

export async function updateLeadHandler(c: Context) {
  const _id = c.req.param('_id');
  const { name, clientId, status, notes } = leadZod.parse(await c.req.json()); // I'll gonna delete this by giving zvalidaror in router
  const lead = await updateLead(_id, { name, clientId, status, notes });
  if (!lead) return c.text('Lead not found', 404);
  return c.json(lead);
}

export async function addLeadExpenseHandler(c: Context) {
  const { leadId, expenseType, amount, approvedBy, date } = leadExpZod.parse(await c.req.json());
  const exp = await addLeadExpense({ leadId, expenseType, amount, approvedBy, date });
  return c.json(exp, 201);
}

export async function getLeadHandler(c: Context) {
  const _id = c.req.param('_id');
  const lead = await getLeadById(_id);
  if (!lead) return c.text('Lead not found', 404);
  return c.json(lead);
}

export async function listLeadsHandler(c: Context) {
  const all = await listLeads();
  return c.json(all);
}
