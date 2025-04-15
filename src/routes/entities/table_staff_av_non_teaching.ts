import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  tableStaffAvNonTeachingSchoolParamSchema,
  tableStaffAvNonTeachingRowParamSchema,
  tableStaffAvNonTeachingRowSchema,
  tableStaffAvNonTeachingReorderSchema,
} from '@/db/models/table_staff_av_non_teaching';
import {
  createTableStaffAvNonTeachingRowController,
  getAllTableStaffAvNonTeachingRowsController,
  getSingleTableStaffAvNonTeachingRowController,
  editTableStaffAvNonTeachingRowController,
  deleteTableStaffAvNonTeachingRowController,
  reorderTableStaffAvNonTeachingRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table_staff_av_non_teaching.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableStaffAvNonTeachingRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first.
tableStaffAvNonTeachingRouter.get('/admin', adminAuthMiddleware, getAllTableStaffAvNonTeachingRowsController);
tableStaffAvNonTeachingRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffAvNonTeachingRowParamSchema.pick({ rowId: true })),
  getSingleTableStaffAvNonTeachingRowController
);
tableStaffAvNonTeachingRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(tableStaffAvNonTeachingRowSchema),
  createTableStaffAvNonTeachingRowController
);

tableStaffAvNonTeachingRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableStaffAvNonTeachingReorderSchema),
  reorderTableStaffAvNonTeachingRowController
);

tableStaffAvNonTeachingRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffAvNonTeachingRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableStaffAvNonTeachingRowSchema),
  editTableStaffAvNonTeachingRowController
);
tableStaffAvNonTeachingRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffAvNonTeachingRowParamSchema.pick({ rowId: true })),
  deleteTableStaffAvNonTeachingRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableStaffAvNonTeachingRouter.get('/public/school/:schoolId', zParamsValidator(tableStaffAvNonTeachingSchoolParamSchema), getAllRowsPublicController);
tableStaffAvNonTeachingRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: tableStaffAvNonTeachingSchoolParamSchema.shape.schoolId,
      rowId: tableStaffAvNonTeachingRowParamSchema.shape.rowId,
    })
  ),
  getSingleRowPublicController
);
