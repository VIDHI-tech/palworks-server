import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  createTableTimingsRowController,
  getAllTableTimingsRowsController,
  getSingleTableTimingsRowController,
  editTableTimingsRowController,
  deleteTableTimingsRowController,
  reorderTableTimingsRowController,
} from '@/controllers/entities/table_timings.controller';
import {
  tableTimingsSchoolParamSchema,
  tableTimingsRowParamSchema,
  tableTimingsRowSchema,
  tableTimingsReorderSchema,
} from '@/db/models/table_timings';
import { mongoIdZod } from '@/db/common-schemas';
import { z } from 'zod';

export const tableTimingsRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// (Static routes first)
tableTimingsRouter.get('/admin', adminAuthMiddleware, getAllTableTimingsRowsController);
tableTimingsRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableTimingsRowParamSchema.pick({ rowId: true })),
  getSingleTableTimingsRowController
);
tableTimingsRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tableTimingsRowSchema), createTableTimingsRowController);
tableTimingsRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(tableTimingsReorderSchema), reorderTableTimingsRowController);
tableTimingsRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableTimingsRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableTimingsRowSchema),
  editTableTimingsRowController
);
tableTimingsRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableTimingsRowParamSchema.pick({ rowId: true })),
  deleteTableTimingsRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableTimingsRouter.get('/public/school/:schoolId', zParamsValidator(tableTimingsSchoolParamSchema), getAllTableTimingsRowsController);
tableTimingsRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: mongoIdZod,
      rowId: mongoIdZod,
    })
  ),
  getSingleTableTimingsRowController
);
