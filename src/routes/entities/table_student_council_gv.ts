import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  tableStudentCouncilGvSchoolParamSchema,
  tableStudentCouncilGvRowParamSchema,
  tableStudentCouncilGvRowSchema,
  tableStudentCouncilGvReorderSchema,
} from '@/db/models/table_student_council_gv';
import {
  createTableStudentCouncilGvRowController,
  getAllTableStudentCouncilGvRowsController,
  getSingleTableStudentCouncilGvRowController,
  editTableStudentCouncilGvRowController,
  deleteTableStudentCouncilGvRowController,
  reorderTableStudentCouncilGvRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table_student_council_gv.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableStudentCouncilGvRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first
tableStudentCouncilGvRouter.get('/admin', adminAuthMiddleware, getAllTableStudentCouncilGvRowsController);
tableStudentCouncilGvRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStudentCouncilGvRowParamSchema.pick({ rowId: true })),
  getSingleTableStudentCouncilGvRowController
);
tableStudentCouncilGvRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(tableStudentCouncilGvRowSchema),
  createTableStudentCouncilGvRowController
);
tableStudentCouncilGvRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableStudentCouncilGvReorderSchema),
  reorderTableStudentCouncilGvRowController
);
tableStudentCouncilGvRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStudentCouncilGvRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableStudentCouncilGvRowSchema),
  editTableStudentCouncilGvRowController
);
tableStudentCouncilGvRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStudentCouncilGvRowParamSchema.pick({ rowId: true })),
  deleteTableStudentCouncilGvRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableStudentCouncilGvRouter.get('/public/school/:schoolId', zParamsValidator(tableStudentCouncilGvSchoolParamSchema), getAllRowsPublicController);
tableStudentCouncilGvRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: tableStudentCouncilGvSchoolParamSchema.shape.schoolId,
      rowId: tableStudentCouncilGvRowParamSchema.shape.rowId,
    })
  ),
  getSingleRowPublicController
);
