import { Schema } from 'mongoose';
import { createSchema, createModel, type IBaseDocument } from '../base';
import { z } from 'zod';

export const tagZod = z.object({
  name: z.string(),
  standardMinutes: z.number(),
});
export type ITag = z.infer<typeof tagZod> & IBaseDocument;

const TagSchema = createSchema<ITag>({
  name: { type: String, required: true, unique: true },
  standardMinutes: { type: Number, required: true },
});
export const TagModel = createModel<ITag>('Tag', TagSchema);
