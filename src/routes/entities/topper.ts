import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  createTopperRowController,
  getAllTopperRowsController,
  getSingleTopperRowController,
  editTopperRowController,
  deleteTopperRowController,
  reorderTopperRowController,
} from '@/controllers/entities/topper.controller';
import { topperSchoolParamSchema, topperRowParamSchema, topperRowSchema, topperReorderSchema, topperRowUpdateSchema } from '@/db/models/topper';

export const topperRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first.
topperRouter.get('/admin', adminAuthMiddleware, getAllTopperRowsController);
topperRouter.get('/admin/:rowId', adminAuthMiddleware, zParamsValidator(topperRowParamSchema.pick({ rowId: true })), getSingleTopperRowController);
topperRouter.post('/admin', adminAuthMiddleware, zJsonValidator(topperRowSchema), createTopperRowController);
topperRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(topperReorderSchema), reorderTopperRowController);
topperRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(topperRowParamSchema.pick({ rowId: true })),
  zJsonValidator(topperRowUpdateSchema),
  editTopperRowController
);
topperRouter.delete('/admin/:rowId', adminAuthMiddleware, zParamsValidator(topperRowParamSchema.pick({ rowId: true })), deleteTopperRowController);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
// Public endpoints require schoolId in the URL.
topperRouter.get('/public/school/:schoolId', zParamsValidator(topperSchoolParamSchema), getAllTopperRowsController);
topperRouter.get('/public/school/:schoolId/:rowId', zParamsValidator(topperRowParamSchema), getSingleTopperRowController);
