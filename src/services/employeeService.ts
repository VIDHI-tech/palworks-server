import type { ClientSession } from 'mongoose';
import { EmployeeModel, type EmployeeCreate, type EmployeeUpdate, type IEmployee } from '../db/models/employee';

export async function createEmployee({ name, role, CTC, workingHoursPerMonth }: EmployeeCreate, session?: ClientSession): Promise<IEmployee> {
  const [employee] = await EmployeeModel.create([{ name, role, CTC, workingHoursPerMonth }], { session });
  return employee;
}

export async function getEmployeeById(_id: string, session?: ClientSession): Promise<IEmployee | null> {
  return EmployeeModel.findById(_id)
    .session(session ?? null)
    .lean<IEmployee>()
    .exec();
}

export async function updateEmployee(
  _id: string,
  { name, role, CTC, workingHoursPerMonth }: EmployeeUpdate,
  session?: ClientSession
): Promise<IEmployee | null> {
  const finalBody: EmployeeUpdate = {};
  if (name) finalBody.name = name;
  if (role) finalBody.role = role;
  if (CTC) finalBody.CTC = CTC;
  if (workingHoursPerMonth) finalBody.workingHoursPerMonth = workingHoursPerMonth;
  return EmployeeModel.findByIdAndUpdate(_id, finalBody, { new: true, session }).lean<IEmployee>().exec();
}

export async function getHourlyRate(employeeId: string, session?: ClientSession): Promise<number> {
  const emp = await EmployeeModel.findById(employeeId).session(session ?? null);
  if (!emp) throw new Error('Employee not found');
  return emp.CTC / emp.workingHoursPerMonth;
}
