import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { mongoIdZod } from '@/db/common-schemas';
import {
  createTableAchievementsRowController,
  getAllTableAchievementsRowsController,
  getSingleTableAchievementsRowController,
  editTableAchievementsRowController,
  deleteTableAchievementsRowController,
  reorderTableAchievementsRowController,
  getAllRowsPublicController,
  getSingleRowPublicController,
} from '@/controllers/entities/table-achievements.controller';
import {
  tableAchievementsSchoolParamSchema,
  tableAchievementsRowParamSchema,
  tableAchievementsRowSchema,
  tableAchievementsReorderSchema,
} from '@/db/models/table-achievements';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const tableAchievementsRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first

tableAchievementsRouter.get('/admin', adminAuthMiddleware, getAllTableAchievementsRowsController);
tableAchievementsRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableAchievementsRowParamSchema.pick({ rowId: true })),
  getSingleTableAchievementsRowController
);
tableAchievementsRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tableAchievementsRowSchema), createTableAchievementsRowController);
tableAchievementsRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableAchievementsReorderSchema),
  reorderTableAchievementsRowController
);
tableAchievementsRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableAchievementsRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableAchievementsRowSchema),
  editTableAchievementsRowController
);
tableAchievementsRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableAchievementsRowParamSchema.pick({ rowId: true })),
  deleteTableAchievementsRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableAchievementsRouter.get('/public/school/:schoolId', zParamsValidator(tableAchievementsSchoolParamSchema), getAllRowsPublicController);
tableAchievementsRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: mongoIdZod,
      rowId: mongoIdZod,
    })
  ),
  getSingleRowPublicController
);
