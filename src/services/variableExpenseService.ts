import type { ClientSession } from 'mongoose';
import { VariableExpenseModel, type IVariableExpense } from '../db/models/variableExpense';

export async function addVariableExpense(data: Partial<IVariableExpense>, session?: ClientSession): Promise<IVariableExpense> {
  const [exp] = await VariableExpenseModel.create([data], { session });
  return exp;
}

export async function listVariableExpenses(projectId: string, session?: ClientSession): Promise<IVariableExpense[]> {
  return VariableExpenseModel.find({ projectId })
    .session(session ?? null)
    .lean<IVariableExpense[]>()
    .exec();
}
