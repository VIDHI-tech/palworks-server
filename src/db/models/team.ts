import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';

export const teamZod = z.object({
  teamName: z.enum(['Admin', 'Sales', 'ProjectManager', 'HumanResource', 'Finance', 'Technology']),
});
export type ITeam = z.infer<typeof teamZod> & IBaseDocument;

const TeamSchema = createSchema<ITeam>({
  teamName: { type: String, enum: ['Admin', 'Sales', 'ProjectManager', 'HumanResource', 'Finance', 'Technology'], unique: true, required: true },
});
export const TeamModel = createModel<ITeam>('Team', TeamSchema);
