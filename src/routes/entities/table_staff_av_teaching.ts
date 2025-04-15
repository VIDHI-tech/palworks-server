import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { mongoIdZod } from '@/db/common-schemas';
import {
  createTableStaffAvTeachingRowController,
  getAllTableStaffAvTeachingRowsController,
  getSingleTableStaffAvTeachingRowController,
  editTableStaffAvTeachingRowController,
  deleteTableStaffAvTeachingRowController,
  reorderTableStaffAvTeachingRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table_staff_av_teaching.controller';
import {
  tableStaffAvTeachingSchoolParamSchema,
  tableStaffAvTeachingRowParamSchema,
  tableStaffAvTeachingRowSchema,
  tableStaffAvTeachingReorderSchema,
} from '@/db/models/table_staff_av_teaching';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableStaffAvTeachingRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first.
tableStaffAvTeachingRouter.get('/admin', adminAuthMiddleware, getAllTableStaffAvTeachingRowsController);
tableStaffAvTeachingRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffAvTeachingRowParamSchema.pick({ rowId: true })),
  getSingleTableStaffAvTeachingRowController
);
tableStaffAvTeachingRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(tableStaffAvTeachingRowSchema),
  createTableStaffAvTeachingRowController
);
tableStaffAvTeachingRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableStaffAvTeachingReorderSchema),
  reorderTableStaffAvTeachingRowController
);
tableStaffAvTeachingRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffAvTeachingRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableStaffAvTeachingRowSchema),
  editTableStaffAvTeachingRowController
);
tableStaffAvTeachingRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffAvTeachingRowParamSchema.pick({ rowId: true })),
  deleteTableStaffAvTeachingRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableStaffAvTeachingRouter.get('/public/school/:schoolId', zParamsValidator(tableStaffAvTeachingSchoolParamSchema), getAllRowsPublicController);
tableStaffAvTeachingRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(z.object({ schoolId: mongoIdZod, rowId: mongoIdZod })),
  getSingleRowPublicController
);
