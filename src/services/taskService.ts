import type { ClientSession } from 'mongoose';
import { TaskModel, type ITask } from '../db/models/task';

export async function createTask(data: Partial<ITask>, session?: ClientSession): Promise<ITask> {
  const [task] = await TaskModel.create([data], { session });
  return task;
}

export async function updateTask(id: string, updates: Partial<ITask>, session?: ClientSession): Promise<ITask | null> {
  return TaskModel.findByIdAndUpdate(id, updates, { new: true, session }).lean<ITask>().exec();
}

export async function logTaskInterval(taskId: string, start: Date, end: Date, session?: ClientSession): Promise<ITask | null> {
  const task = await TaskModel.findById(taskId).session(session ?? null);
  if (!task) throw new Error('Task not found');

  task.intervals.push({ start, end });
  return task.save({ session });
}

export async function listTasksForProject(projectId: string, session?: ClientSession): Promise<ITask[]> {
  return TaskModel.find({ projectId })
    .session(session ?? null)
    .lean<ITask[]>()
    .exec();
}
