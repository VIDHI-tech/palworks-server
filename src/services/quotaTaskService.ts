import type { ClientSession } from 'mongoose';
import { QuotaTaskModel, type IQuotaTask } from '../db/models/quotaTask';

export async function logQuotaTask(data: Partial<IQuotaTask>, session?: ClientSession): Promise<IQuotaTask> {
  const doc = await QuotaTaskModel.findOneAndUpdate({ salesEmployeeId: data.salesEmployeeId!, forDate: data.forDate! }, data, {
    upsert: true,
    new: true,
    session,
  })
    .lean<IQuotaTask>()
    .exec();

  return doc!;
}

export async function getQuotaTasksForEmployee(empId: string, session?: ClientSession): Promise<IQuotaTask[]> {
  return QuotaTaskModel.find({ salesEmployeeId: empId })
    .session(session ?? null)
    .lean<IQuotaTask[]>()
    .exec();
}
