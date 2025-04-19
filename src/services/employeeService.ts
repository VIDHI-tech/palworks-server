import type { ClientSession } from 'mongoose';
import { EmployeeModel, type IEmployee } from '../db/models/employee';

export async function createEmployee(data: Partial<IEmployee>, session?: ClientSession): Promise<IEmployee> {
  const [employee] = await EmployeeModel.create([data], { session });
  return employee;
}

export async function getEmployeeById(id: string, session?: ClientSession): Promise<IEmployee | null> {
  return EmployeeModel.findById(id)
    .session(session ?? null)
    .lean<IEmployee>()
    .exec();
}

export async function updateEmployee(id: string, data: Partial<IEmployee>, session?: ClientSession): Promise<IEmployee | null> {
  return EmployeeModel.findByIdAndUpdate(id, data, { new: true, session }).lean<IEmployee>().exec();
}

export async function getHourlyRate(employeeId: string, session?: ClientSession): Promise<number> {
  const emp = await EmployeeModel.findById(employeeId).session(session ?? null);
  if (!emp) throw new Error('Employee not found');
  return emp.CTC / emp.workingHoursPerMonth;
}
