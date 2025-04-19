import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';
import { mongoIdZod } from '../common-schemas';

export const empTeamZod = z.object({
  employeeId: mongoIdZod,
  teamId: mongoIdZod,
});
export type IEmployeeTeam = z.infer<typeof empTeamZod> & IBaseDocument;

const EmployeeTeamSchema = createSchema<IEmployeeTeam>({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
});
EmployeeTeamSchema.index({ employeeId: 1, teamId: 1 }, { unique: true });
export const EmployeeTeamModel = createModel<IEmployeeTeam>('EmployeeTeam', EmployeeTeamSchema);
