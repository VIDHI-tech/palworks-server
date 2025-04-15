import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { alumniSchoolParamSchema, alumniRowParamSchema, alumniRowSchema, alumniReorderSchema } from '@/db/models/alumni';
import {
  createAlumniRowController,
  getAllAlumniRowsController,
  getSingleAlumniRowController,
  editAlumniRowController,
  deleteAlumniRowController,
  reorderAlumniRowController,
} from '@/controllers/entities/alumni.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { z } from 'zod';

export const alumniRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// (Static routes first)
alumniRouter.get('/admin', adminAuthMiddleware, getAllAlumniRowsController);
alumniRouter.get('/admin/:rowId', adminAuthMiddleware, zParamsValidator(alumniRowParamSchema.pick({ rowId: true })), getSingleAlumniRowController);
alumniRouter.post('/admin', adminAuthMiddleware, zJsonValidator(alumniRowSchema), createAlumniRowController);
alumniRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(alumniReorderSchema), reorderAlumniRowController);
alumniRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(alumniRowParamSchema.pick({ rowId: true })),
  zJsonValidator(alumniRowSchema),
  editAlumniRowController
);
alumniRouter.delete('/admin/:rowId', adminAuthMiddleware, zParamsValidator(alumniRowParamSchema.pick({ rowId: true })), deleteAlumniRowController);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
alumniRouter.get('/public/school/:schoolId', zParamsValidator(alumniSchoolParamSchema), getAllAlumniRowsController);
alumniRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: alumniSchoolParamSchema.shape.schoolId,
      rowId: alumniRowParamSchema.shape.rowId,
    })
  ),
  getSingleAlumniRowController
);
