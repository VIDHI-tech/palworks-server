import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';

import {
  tableNotificationSchoolParamSchema,
  tableNotificationRowParamSchema,
  notificationRowSchema,
  notificationRowUpdateSchema,
  tableNotificationReorderSchema,
} from '@/db/models/table_notification';

import {
  getAllNotificationsAdminController,
  getOneNotificationAdminController,
  createNotificationAdminController,
  updateNotificationAdminController,
  reorderNotificationAdminController,
  deleteNotificationAdminController,
  getAllNotificationsPublicController,
  getOneNotificationPublicController,
} from '@/controllers/entities/table_notification.controller';

export const tableNotificationRouter = new Hono();

/* ────────── ADMIN ENDPOINTS ────────── */

// 1. GET all
tableNotificationRouter.get('/admin', adminAuthMiddleware, getAllNotificationsAdminController);

// 2. GET one
tableNotificationRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableNotificationRowParamSchema.pick({ rowId: true })),
  getOneNotificationAdminController
);

// 3. CREATE
tableNotificationRouter.post(
  '/admin',
  adminAuthMiddleware,
  zJsonValidator(notificationRowSchema), // entire row required
  createNotificationAdminController
);

// 5. REORDER
tableNotificationRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableNotificationReorderSchema),
  reorderNotificationAdminController
);

// 4. UPDATE
tableNotificationRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableNotificationRowParamSchema.pick({ rowId: true })),
  zJsonValidator(notificationRowUpdateSchema), // partial
  updateNotificationAdminController
);

// 6. DELETE
tableNotificationRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableNotificationRowParamSchema.pick({ rowId: true })),
  deleteNotificationAdminController
);

/* ────────── PUBLIC ENDPOINTS ────────── */

// 1. GET all (optionally ?limit=)
tableNotificationRouter.get('/public/school/:schoolId', zParamsValidator(tableNotificationSchoolParamSchema), getAllNotificationsPublicController);

// 2. GET one
tableNotificationRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(tableNotificationRowParamSchema.pick({ schoolId: true, rowId: true })),
  getOneNotificationPublicController
);
