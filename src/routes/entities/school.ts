// src/routes/school.ts

import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { zodIdSchema } from '@/db/common-schemas';
import { schoolCreateSchema, schoolUpdateSchema, schoolDeleteSchema } from '@/db/models/school';
import { createSchool, deleteSchools, getAllSchools, getSchoolById, updateSchool } from '@/controllers';

export const schoolRouter = new Hono();

// GET /schools -> fetch all
schoolRouter.get('/', getAllSchools);
// GET /schools/:_id -> fetch single by ID
schoolRouter.get('/:_id', zParamsValidator(zodIdSchema), getSchoolById);
// POST /schools -> create
schoolRouter.post('/', zJsonValidator(schoolCreateSchema), createSchool);
// PATCH /schools/:_id -> update
schoolRouter.patch('/:_id', zParamsValidator(zodIdSchema), zJsonValidator(schoolUpdateSchema), updateSchool);
// DELETE /schools -> soft-delete multiple
schoolRouter.delete('/', zJsonValidator(schoolDeleteSchema), deleteSchools);
