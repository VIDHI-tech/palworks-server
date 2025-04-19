import type { ClientSession } from 'mongoose';
import { LeadModel, type ILead } from '../db/models/lead';
import { LeadExpenseModel, type ILeadExpense } from '../db/models/leadExpense';

export async function createLead(data: Partial<ILead>, session?: ClientSession): Promise<ILead> {
  const [lead] = await LeadModel.create([data], { session });
  return lead;
}

export async function updateLead(id: string, updates: Partial<ILead>, session?: ClientSession): Promise<ILead | null> {
  return LeadModel.findByIdAndUpdate(id, updates, { new: true, session }).lean<ILead>().exec();
}

export async function addLeadExpense(data: Partial<ILeadExpense>, session?: ClientSession): Promise<ILeadExpense> {
  const [exp] = await LeadExpenseModel.create([data], { session });
  return exp;
}

export async function getLeadById(id: string, session?: ClientSession): Promise<ILead | null> {
  return LeadModel.findById(id)
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
