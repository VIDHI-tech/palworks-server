import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  tableStudentCouncilAvSchoolParamSchema,
  tableStudentCouncilAvRowParamSchema,
  tableStudentCouncilAvRowSchema,
  tableStudentCouncilAvReorderSchema,
} from '@/db/models/table_student_council_av';
import {
  createTableStudentCouncilAvRowController,
  getAllTableStudentCouncilAvRowsController,
  getSingleTableStudentCouncilAvRowController,
  editTableStudentCouncilAvRowController,
  deleteTableStudentCouncilAvRowController,
  reorderTableStudentCouncilAvRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table_student_council_av.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableStudentCouncilAvRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first to avoid conflicts.
tableStudentCouncilAvRouter.get('/admin', adminAuthMiddleware, getAllTableStudentCouncilAvRowsController);
tableStudentCouncilAvRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStudentCouncilAvRowParamSchema.pick({ rowId: true })),
  getSingleTableStudentCouncilAvRowController
);
tableStudentCouncilAvRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(tableStudentCouncilAvRowSchema),
  createTableStudentCouncilAvRowController
);
tableStudentCouncilAvRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableStudentCouncilAvReorderSchema),
  reorderTableStudentCouncilAvRowController
);
tableStudentCouncilAvRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStudentCouncilAvRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableStudentCouncilAvRowSchema),
  editTableStudentCouncilAvRowController
);
tableStudentCouncilAvRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStudentCouncilAvRowParamSchema.pick({ rowId: true })),
  deleteTableStudentCouncilAvRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableStudentCouncilAvRouter.get('/public/school/:schoolId', zParamsValidator(tableStudentCouncilAvSchoolParamSchema), getAllRowsPublicController);
tableStudentCouncilAvRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: tableStudentCouncilAvSchoolParamSchema.shape.schoolId,
      rowId: tableStudentCouncilAvRowParamSchema.shape.rowId,
    })
  ),
  getSingleRowPublicController
);
