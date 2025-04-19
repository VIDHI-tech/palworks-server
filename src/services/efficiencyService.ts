import type { ClientSession } from 'mongoose';
import { TaskModel } from '../db/models/task';

export async function calcEmployeeEfficiency(empId: string, session?: ClientSession): Promise<number | null> {
  const since = new Date();
  since.setMonth(since.getMonth() - 1);

  const tasks = await TaskModel.find({
    assigneeId: empId,
    status: 'completed',
    updatedAt: { $gte: since },
  })
    .session(session ?? null)
    .lean<{ efficiency?: number }[]>()
    .exec();

  if (!tasks.length) return null;
  const sum = tasks.reduce((acc, t) => acc + (t.efficiency || 0), 0);
  return sum / tasks.length;
}
