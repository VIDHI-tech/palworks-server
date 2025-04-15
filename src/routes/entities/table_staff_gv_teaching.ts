import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { mongoIdZod } from '@/db/common-schemas';
import {
  createTableStaffGvTeachingRowController,
  getAllTableStaffGvTeachingRowsController,
  getSingleTableStaffGvTeachingRowController,
  editTableStaffGvTeachingRowController,
  deleteTableStaffGvTeachingRowController,
  reorderTableStaffGvTeachingRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table_staff_gv_teaching.controller';
import {
  tableStaffGvTeachingSchoolParamSchema,
  tableStaffGvTeachingRowParamSchema,
  tableStaffGvTeachingRowSchema,
  tableStaffGvTeachingReorderSchema,
} from '@/db/models/table_staff_gv_teaching';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableStaffGvTeachingRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Define static routes first.
tableStaffGvTeachingRouter.get('/admin', adminAuthMiddleware, getAllTableStaffGvTeachingRowsController);
tableStaffGvTeachingRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffGvTeachingRowParamSchema.pick({ rowId: true })),
  getSingleTableStaffGvTeachingRowController
);
tableStaffGvTeachingRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(tableStaffGvTeachingRowSchema),
  createTableStaffGvTeachingRowController
);
tableStaffGvTeachingRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableStaffGvTeachingReorderSchema),
  reorderTableStaffGvTeachingRowController
);
tableStaffGvTeachingRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffGvTeachingRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableStaffGvTeachingRowSchema),
  editTableStaffGvTeachingRowController
);
tableStaffGvTeachingRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableStaffGvTeachingRowParamSchema.pick({ rowId: true })),
  deleteTableStaffGvTeachingRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableStaffGvTeachingRouter.get('/public/school/:schoolId', zParamsValidator(tableStaffGvTeachingSchoolParamSchema), getAllRowsPublicController);
tableStaffGvTeachingRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: mongoIdZod,
      rowId: mongoIdZod,
    })
  ),
  getSingleRowPublicController
);
