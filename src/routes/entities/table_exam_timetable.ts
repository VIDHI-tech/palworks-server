import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  createTableExamTimetableRowController,
  getAllTableExamTimetableRowsController,
  getSingleTableExamTimetableRowController,
  editTableExamTimetableRowController,
  deleteTableExamTimetableRowController,
  reorderTableExamTimetableRowController,
} from '@/controllers/entities/table_exam_timetable.controller';
import {
  tableExamTimetableRowSchema,
  tableExamTimetableReorderSchema,
  tableExamTimetableSchoolParamSchema,
  tableExamTimetableRowParamSchema,
} from '@/db/models/table_exam_timetable';
import { mongoIdZod } from '@/db/common-schemas';
import { z } from 'zod';

export const tableExamTimetableRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Static routes first.
tableExamTimetableRouter.get('/admin', adminAuthMiddleware, getAllTableExamTimetableRowsController);
tableExamTimetableRouter.get(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableExamTimetableRowParamSchema.pick({ rowId: true })),
  getSingleTableExamTimetableRowController
);
tableExamTimetableRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tableExamTimetableRowSchema), createTableExamTimetableRowController);
tableExamTimetableRouter.patch(
  '/admin/reorder',
  adminAuthMiddleware,
  zJsonValidator(tableExamTimetableReorderSchema),
  reorderTableExamTimetableRowController
);
tableExamTimetableRouter.patch(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableExamTimetableRowParamSchema.pick({ rowId: true })),
  zJsonValidator(tableExamTimetableRowSchema),
  editTableExamTimetableRowController
);
tableExamTimetableRouter.delete(
  '/admin/:rowId',
  adminAuthMiddleware,
  zParamsValidator(tableExamTimetableRowParamSchema.pick({ rowId: true })),
  deleteTableExamTimetableRowController
);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
tableExamTimetableRouter.get(
  '/public/school/:schoolId',
  zParamsValidator(tableExamTimetableSchoolParamSchema),
  getAllTableExamTimetableRowsController
);
tableExamTimetableRouter.get(
  '/public/school/:schoolId/:rowId',
  zParamsValidator(
    z.object({
      schoolId: mongoIdZod,
      rowId: mongoIdZod,
    })
  ),
  getSingleTableExamTimetableRowController
);
