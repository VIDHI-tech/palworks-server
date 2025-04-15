import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  tableStaffGvNonTeachingSchoolParamSchema,
  tableStaffGvNonTeachingRowParamSchema,
  tableStaffGvNonTeachingRowSchema,
  tableStaffGvNonTeachingReorderSchema,
} from '@/db/models/table_staff_gv_non_teaching';
import {
  createTableStaffGvNonTeachingRowController,
  getAllTableStaffGvNonTeachingRowsController,
  getSingleTableStaffGvNonTeachingRowController,
  editTableStaffGvNonTeachingRowController,
  deleteTableStaffGvNonTeachingRowController,
  reorderTableStaffGvNonTeachingRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table_staff_gv_non_teaching.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableStaffGvNonTeachingRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static endpoints first.
tableStaffGvNonTeachingRouter.get('/admin', adminAuthMiddleware, getAllTableStaffGvNonTeachingRowsController);
tableStaffGvNonTeachingRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffGvNonTeachingRowParamSchema.pick({ rowId: true })),
  getSingleTableStaffGvNonTeachingRowController
);
tableStaffGvNonTeachingRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(tableStaffGvNonTeachingRowSchema),
  createTableStaffGvNonTeachingRowController
);
tableStaffGvNonTeachingRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableStaffGvNonTeachingReorderSchema),
  reorderTableStaffGvNonTeachingRowController
);
tableStaffGvNonTeachingRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffGvNonTeachingRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableStaffGvNonTeachingRowSchema),
  editTableStaffGvNonTeachingRowController
);
tableStaffGvNonTeachingRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffGvNonTeachingRowParamSchema.pick({ rowId: true })),
  deleteTableStaffGvNonTeachingRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableStaffGvNonTeachingRouter.get('/public/school/:schoolId', zParamsValidator(tableStaffGvNonTeachingSchoolParamSchema), getAllRowsPublicController);
tableStaffGvNonTeachingRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({ schoolId: tableStaffGvNonTeachingSchoolParamSchema.shape.schoolId, rowId: tableStaffGvNonTeachingRowParamSchema.shape.rowId })
  ),
  getSingleRowPublicController
);
