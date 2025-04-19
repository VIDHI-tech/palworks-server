import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';

export const teamZod = z.object({
  teamName: z.enum(['Admin', 'Sales', 'ProjectManager', 'HumanResource', 'Finance', 'Technology']),
  description: z.string().optional(),
});
export type ITeam = z.infer<typeof teamZod> & IBaseDocument;

const TeamSchema = createSchema<ITeam>({
  teamName: { type: String, enum: ['Admin', 'Sales', 'ProjectManager', 'HumanResource', 'Finance', 'Technology'], unique: true, required: true },
  description: { type: String, default: '' },
});
export const TeamModel = createModel<ITeam>('Team', TeamSchema);
