import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  tableCurriculumSchoolParamSchema,
  tableCurriculumRowParamSchema,
  tableCurriculumRowSchema,
  tableCurriculumReorderSchema,
} from '@/db/models/table_curriculum';
import {
  createTableCurriculumRowController,
  getAllTableCurriculumRowsController,
  getSingleTableCurriculumRowController,
  editTableCurriculumRowController,
  deleteTableCurriculumRowController,
  reorderTableCurriculumRowController,
} from '@/controllers/entities/table_curriculum.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableCurriculumRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first.
tableCurriculumRouter.get('/admin', adminAuthMiddleware, getAllTableCurriculumRowsController);
tableCurriculumRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableCurriculumRowParamSchema.pick({ rowId: true })),
  getSingleTableCurriculumRowController
);
tableCurriculumRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tableCurriculumRowSchema), createTableCurriculumRowController);
tableCurriculumRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(tableCurriculumReorderSchema), reorderTableCurriculumRowController);
tableCurriculumRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableCurriculumRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableCurriculumRowSchema),
  editTableCurriculumRowController
);
tableCurriculumRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableCurriculumRowParamSchema.pick({ rowId: true })),
  deleteTableCurriculumRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableCurriculumRouter.get('/public/school/:schoolId', zParamsValidator(tableCurriculumSchoolParamSchema), getAllTableCurriculumRowsController);
tableCurriculumRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: tableCurriculumSchoolParamSchema.shape.schoolId,
      rowId: tableCurriculumRowParamSchema.shape.rowId,
    })
  ),
  getSingleTableCurriculumRowController
);
