// import type { ClientSession } from 'mongoose';
// import { ProjectModel, type IProject } from '../db/models/project';
// import { TaskModel, type ITask } from '../db/models/task';
// import { VariableExpenseModel, type IVariableExpense } from '../db/models/variableExpense';
// import { type IEmployee } from '../db/models/employee';

// export async function upsertProject(data: Partial<IProject> & { id?: string }, session?: ClientSession): Promise<IProject> {
//   if (data.id) {
//     const updated = await ProjectModel.findByIdAndUpdate(data.id, { $set: data }, { new: true, session }).lean<IProject>().exec();

//     if (!updated) throw new Error(`Project id=${data.id} not found`);
//     return updated;
//   }

//   const [created] = await ProjectModel.create([data], { session });
//   return created;
// }

// export async function getProjectById(id: string, session?: ClientSession): Promise<IProject> {
//   const project = await ProjectModel.findById(id)
//     .session(session ?? null)
//     .lean<IProject>()
//     .exec();

//   if (!project) throw new Error(`Project id=${id} not found`);
//   return project;
// }

// export async function listProjects(session?: ClientSession): Promise<IProject[]> {
//   return ProjectModel.find()
//     .session(session ?? null)
//     .lean<IProject[]>()
//     .exec();
// }

// export async function calculateProjectCost(projectId: string, session?: ClientSession): Promise<{ labourCost: number; expenseCost: number }> {
//   const tasks = await TaskModel.find({ projectId, status: 'completed' })
//     .session(session ?? null)
//     .populate('assigneeId')
//     .lean<(ITask & { assigneeId: IEmployee })[]>()
//     .exec();

//   const labourCost = tasks.reduce((sum, t) => {
//     const emp = t.assigneeId;
//     const rate = emp.CTC / emp.workingHoursPerMonth;
//     return sum + (t.loggedMinutes / 60) * rate;
//   }, 0);

//   const expenses = await VariableExpenseModel.find({ projectId })
//     .session(session ?? null)
//     .lean<IVariableExpense[]>()
//     .exec();

//   const expenseCost = expenses.reduce((sum, e) => sum + e.amount, 0);

//   return { labourCost, expenseCost };
// }

import type { ClientSession } from 'mongoose';
import { ProjectModel, type IProject, type ProjectCreate, type ProjectUpdate } from '../db/models/project';
import { TaskModel, type ITask } from '../db/models/task';
import { VariableExpenseModel, type IVariableExpense } from '../db/models/variableExpense';
import { type IEmployee } from '../db/models/employee';

/**
 * Create a new Project.
 */
export async function createProject({ leadId, clientId, name, status, profitMarginPct }: ProjectCreate, session?: ClientSession): Promise<IProject> {
  const [project] = await ProjectModel.create([{ leadId, clientId, name, status, profitMarginPct }], { session });
  return project;
}

/**
 * Update an existing Project.
 */
export async function updateProject(
  _id: string,
  { leadId, clientId, name, status, profitMarginPct }: ProjectUpdate,
  session?: ClientSession
): Promise<IProject | null> {
  const updateBody: ProjectUpdate = {};
  if (leadId !== undefined) updateBody.leadId = leadId;
  if (clientId !== undefined) updateBody.clientId = clientId;
  if (name !== undefined) updateBody.name = name;
  if (status !== undefined) updateBody.status = status;
  if (profitMarginPct !== undefined) updateBody.profitMarginPct = profitMarginPct;

  return ProjectModel.findByIdAndUpdate(_id, updateBody, { new: true, session }).lean<IProject>().exec();
}

/**
 * Fetch one Project by ID.
 */
export async function getProjectById(_id: string, session?: ClientSession): Promise<IProject | null> {
  return ProjectModel.findById(_id)
    .session(session ?? null)
    .lean<IProject>()
    .exec();
}

/**
 * List all Projects.
 */
export async function listProjects(session?: ClientSession): Promise<IProject[]> {
  return ProjectModel.find()
    .session(session ?? null)
    .lean<IProject[]>()
    .exec();
}

/**
 * Calculate a Project’s labour + expense cost.
 */
export async function calculateProjectCost(projectId: string, session?: ClientSession): Promise<{ labourCost: number; expenseCost: number }> {
  // 1. labour cost from completed tasks
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

  // 2. expense cost from variable expenses
  const expenses = await VariableExpenseModel.find({ projectId })
    .session(session ?? null)
    .lean<IVariableExpense[]>()
    .exec();

  const expenseCost = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { labourCost, expenseCost };
}
