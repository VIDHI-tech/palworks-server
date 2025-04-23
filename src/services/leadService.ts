import type { ClientSession } from 'mongoose';
import { LeadModel, type ILead, type LeadCreate } from '../db/models/lead';
import { LeadExpenseModel, type ILeadExpense, type LeadExpenseCreate } from '../db/models/leadExpense';
import type { LeadUpdate } from '@/db/models';

export async function createLead({ name, clientId, status, notes }: LeadCreate, session?: ClientSession): Promise<ILead> {
  const [lead] = await LeadModel.create([{ name, clientId, status, notes }], { session });
  return lead;
}

export async function updateLead(_id: string, { name, clientId, status, notes }: LeadUpdate, session?: ClientSession): Promise<ILead | null> {
  const finalLead: LeadUpdate = {};
  if (name) finalLead.name = name;
  if (clientId) finalLead.clientId = clientId;
  if (status) finalLead.status = status;
  if (notes) finalLead.notes = notes;
  return LeadModel.findByIdAndUpdate(_id, finalLead, { new: true, session }).lean<ILead>().exec();
}

export async function addLeadExpense(
  { leadId, expenseType, amount, approvedBy, date }: LeadExpenseCreate,
  session?: ClientSession
): Promise<ILeadExpense> {
  const [exp] = await LeadExpenseModel.create([{ leadId, expenseType, amount, approvedBy, date }], { session });
  return exp;
}

export async function getLeadById(_id: string, session?: ClientSession): Promise<ILead | null> {
  return LeadModel.findById(_id)
    .session(session ?? null)
    .lean<ILead>()
    .exec();
}

export async function listLeads(session?: ClientSession): Promise<ILead[]> {
  return LeadModel.find()
    .session(session ?? null)
    .lean<ILead[]>()
    .exec();
}
