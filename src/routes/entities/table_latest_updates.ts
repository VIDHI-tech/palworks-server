import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';

import {
  tableLatestUpdatesSchoolParamSchema,
  tableLatestUpdatesRowParamSchema,
  latestUpdatesRowSchema,
  latestUpdatesRowUpdateSchema,
  tableLatestUpdatesReorderSchema,
} from '@/db/models/table_latest_updates';

import {
  createLatestUpdatesRowController,
  getAllLatestUpdatesRowsController,
  getSingleLatestUpdatesRowController,
  editLatestUpdatesRowController,
  deleteLatestUpdatesRowController,
  reorderLatestUpdatesRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table_latest_updates.controller';

// The route name is: /entities/table_latest_updates
export const tableLatestUpdatesRouter = new Hono();

/* ────────── ADMIN ENDPOINTS ────────── */

// 1. GET all
tableLatestUpdatesRouter.get('/admin', adminAuthMiddleware, getAllLatestUpdatesRowsController);

// 2. GET one by rowId
tableLatestUpdatesRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableLatestUpdatesRowParamSchema.pick({ rowId: true })),
  getSingleLatestUpdatesRowController
);

// 3. CREATE
tableLatestUpdatesRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(latestUpdatesRowSchema), // entire row required for creation
  createLatestUpdatesRowController
);

// 6. REORDER
tableLatestUpdatesRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableLatestUpdatesReorderSchema),
  reorderLatestUpdatesRowController
);

// 4. UPDATE
tableLatestUpdatesRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableLatestUpdatesRowParamSchema.pick({ rowId: true })),
  zJsonValidator(latestUpdatesRowUpdateSchema), // partial allowed
  editLatestUpdatesRowController
);

// 5. DELETE
tableLatestUpdatesRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableLatestUpdatesRowParamSchema.pick({ rowId: true })),
  deleteLatestUpdatesRowController
);

/* ────────── PUBLIC ENDPOINTS ────────── */

// GET all rows for a school, optional limit => /public/school/:schoolId?limit=#
tableLatestUpdatesRouter.get('/public/school/:schoolId', zParamsValidator(tableLatestUpdatesSchoolParamSchema), getAllRowsPublicController);

// GET single row for a school
tableLatestUpdatesRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(tableLatestUpdatesRowParamSchema.pick({ schoolId: true, rowId: true })),
  getSingleRowPublicController
);
