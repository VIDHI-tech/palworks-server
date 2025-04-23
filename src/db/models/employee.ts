import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';

export const employeeZod = z.object({
  name: z.string(),
  role: z.enum(['Admin', 'SalesHead', 'PM', 'Finance', 'TeamMember']),
  CTC: z.number(),
  workingHoursPerMonth: z.number(),
});

// create
export const employeeCreateSchema = employeeZod.strict();
export type EmployeeCreate = z.infer<typeof employeeCreateSchema>;

// update
export const employeeUpdateSchema = employeeZod.partial().strict();
export type EmployeeUpdate = z.infer<typeof employeeUpdateSchema>;

export type IEmployee = z.infer<typeof employeeZod> & IBaseDocument;

const EmployeeSchema = createSchema<IEmployee>({
  name: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'SalesHead', 'PM', 'Finance', 'TeamMember'], required: true },
  CTC: { type: Number, required: true },
  workingHoursPerMonth: { type: Number, required: true },
});
EmployeeSchema.virtual('hourlyRate').get(function (this: IEmployee) {
  return this.CTC / this.workingHoursPerMonth;
});
export const EmployeeModel = createModel<IEmployee>('Employee', EmployeeSchema);
