import type { ClientSession } from 'mongoose';
import { QuotaTaskModel, type IQuotaTask, type QuotaTaskCreate } from '../db/models/quotaTask';

/**
 * Upsert today’s Telegram‑chat quota for a sales employee.
 */
export async function logQuotaTask(
  { salesEmployeeId, forDate, telegramConversationCount, remarks }: QuotaTaskCreate,
  session?: ClientSession
): Promise<IQuotaTask> {
  const qt = await QuotaTaskModel.findOneAndUpdate(
    { salesEmployeeId, forDate },
    { telegramConversationCount, remarks },
    { upsert: true, new: true, session }
  )
    .lean<IQuotaTask>()
    .exec();

  return qt!;
}

/**
 * Fetch all quota records for the given employee.
 */
export async function getQuotaTasksForEmployee(salesEmployeeId: string, session?: ClientSession): Promise<IQuotaTask[]> {
  return QuotaTaskModel.find({ salesEmployeeId })
    .session(session ?? null)
    .lean<IQuotaTask[]>()
    .exec();
}
