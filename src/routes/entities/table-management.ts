import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { mongoIdZod } from '@/db/common-schemas';
import {
  createTableManagementRowController,
  getAllTableManagementRowsController,
  getSingleTableManagementRowController,
  editTableManagementRowController,
  deleteTableManagementRowController,
  reorderTableManagementRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table-management.controller';
import {
  tableManagementSchoolParamSchema,
  tableManagementRowParamSchema,
  tableManagementRowSchema,
  tableManagementReorderSchema,
} from '@/db/models/table-management';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableManagementRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Note: In admin endpoints, schoolId is set by adminAuthMiddleware.
tableManagementRouter.get('/admin', adminAuthMiddleware, getAllTableManagementRowsController);
tableManagementRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableManagementRowParamSchema.pick({ rowId: true })),
  getSingleTableManagementRowController
);
tableManagementRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tableManagementRowSchema), createTableManagementRowController);
tableManagementRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(tableManagementReorderSchema), reorderTableManagementRowController);
tableManagementRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableManagementRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableManagementRowSchema),
  editTableManagementRowController
);
tableManagementRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableManagementRowParamSchema.pick({ rowId: true })),
  deleteTableManagementRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableManagementRouter.get('/public/school/:schoolId', zParamsValidator(tableManagementSchoolParamSchema), getAllRowsPublicController);
tableManagementRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: mongoIdZod,
      rowId: mongoIdZod,
    })
  ),
  getSingleRowPublicController
);
