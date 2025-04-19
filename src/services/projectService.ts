import type { ClientSession } from 'mongoose';
import { ProjectModel, type IProject } from '../db/models/project';
import { TaskModel, type ITask } from '../db/models/task';
import { VariableExpenseModel, type IVariableExpense } from '../db/models/variableExpense';
import { type IEmployee } from '../db/models/employee';

export async function upsertProject(data: Partial<IProject> & { id?: string }, session?: ClientSession): Promise<IProject> {
  if (data.id) {
    const updated = await ProjectModel.findByIdAndUpdate(data.id, { $set: data }, { new: true, session }).lean<IProject>().exec();

    if (!updated) throw new Error(`Project id=${data.id} not found`);
    return updated;
  }

  const [created] = await ProjectModel.create([data], { session });
  return created;
}

export async function getProjectById(id: string, session?: ClientSession): Promise<IProject> {
  const project = await ProjectModel.findById(id)
    .session(session ?? null)
    .lean<IProject>()
    .exec();

  if (!project) throw new Error(`Project id=${id} not found`);
  return project;
}

export async function listProjects(session?: ClientSession): Promise<IProject[]> {
  return ProjectModel.find()
    .session(session ?? null)
    .lean<IProject[]>()
    .exec();
}

export async function calculateProjectCost(projectId: string, session?: ClientSession): Promise<{ labourCost: number; expenseCost: number }> {
  const tasks = await TaskModel.find({ projectId, status: 'completed' })
    .session(session ?? null)
    .populate('assigneeId')
    .lean<(ITask & { assigneeId: IEmployee })[]>()
    .exec();

  const labourCost = tasks.reduce((sum, t) => {
    const emp = t.assigneeId;
    const rate = emp.CTC / emp.workingHoursPerMonth;
    return sum + (t.loggedMinutes / 60) * rate;
  }, 0);

  const expenses = await VariableExpenseModel.find({ projectId })
    .session(session ?? null)
    .lean<IVariableExpense[]>()
    .exec();

  const expenseCost = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { labourCost, expenseCost };
}
