import type { ClientSession } from 'mongoose';
import { TaskModel, type ITask, type TaskCreate, type TaskUpdate } from '../db/models/task';

export async function createTask(
  { projectId, assigneeId, tagId, loggedMinutes, status, intervals }: TaskCreate,
  session?: ClientSession
): Promise<ITask> {
  const [task] = await TaskModel.create([{ projectId, assigneeId, tagId, loggedMinutes, status, intervals }], { session });
  return task;
}

export async function updateTask(id: string, updates: TaskUpdate, session?: ClientSession): Promise<ITask | null> {
  return TaskModel.findByIdAndUpdate(id, updates, { new: true, session }).lean<ITask>().exec();
}

/**
 * Log a work‑interval on a Task (triggers the pre‑save hook).
 */
export async function logTaskInterval(taskId: string, start: Date, end: Date | null, session?: ClientSession): Promise<ITask | null> {
  const task = await TaskModel.findById(taskId).session(session ?? null);
  if (!task) throw new Error('Task not found');
  task.intervals.push({ start, end });
  const saved = await task.save({ session });
  // Return fresh lean doc
  return TaskModel.findById(saved._id).lean<ITask>().exec();
}

/**
 * List all Tasks for a given Project.
 */
export async function listTasksForProject(projectId: string, session?: ClientSession): Promise<ITask[]> {
  return TaskModel.find({ projectId })
    .session(session ?? null)
    .lean<ITask[]>()
    .exec();
}
