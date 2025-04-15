import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  tableCircularSchoolParamSchema,
  tableCircularRowParamSchema,
  tableCircularRowSchema,
  tableCircularReorderSchema,
} from '@/db/models/table_circular';
import {
  createTableCircularRowController,
  getAllTableCircularRowsController,
  getSingleTableCircularRowController,
  editTableCircularRowController,
  deleteTableCircularRowController,
  reorderTableCircularRowController,
} from '@/controllers/entities/table_circular.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableCircularRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first.
tableCircularRouter.get('/admin', adminAuthMiddleware, getAllTableCircularRowsController);
tableCircularRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableCircularRowParamSchema.pick({ rowId: true })),
  getSingleTableCircularRowController
);
tableCircularRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tableCircularRowSchema), createTableCircularRowController);
tableCircularRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(tableCircularReorderSchema), reorderTableCircularRowController);
tableCircularRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableCircularRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableCircularRowSchema),
  editTableCircularRowController
);
tableCircularRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableCircularRowParamSchema.pick({ rowId: true })),
  deleteTableCircularRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableCircularRouter.get('/public/school/:schoolId', zParamsValidator(tableCircularSchoolParamSchema), getAllTableCircularRowsController);
tableCircularRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: tableCircularSchoolParamSchema.shape.schoolId,
      rowId: tableCircularRowParamSchema.shape.rowId,
    })
  ),
  getSingleTableCircularRowController
);
