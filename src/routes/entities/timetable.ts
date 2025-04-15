import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import {
  timetableSchoolParamSchema,
  timetableSubParamSchema,
  timetableRowParamSchema,
  subTimetableSchema,
  timetableReorderSubSchema,
  timetableRowSchema,
  timetableReorderRowSchema,
} from '@/db/models/timetable';
import {
  createSubTimetableController,
  getAllSubTimetablesController,
  getSingleSubTimetableController,
  editSubTimetableController,
  deleteSubTimetableController,
  reorderSubTimetableController,
  createRowController,
  getAllRowsController,
  getSingleRowController,
  editRowController,
  deleteRowController,
  reorderRowController,
} from '@/controllers/entities/timetable.controller';
import { z } from 'zod';

export const timetableRouter = new Hono();

/** ───────── ADMIN ENDPOINTS ─────────
 * Admin endpoints use adminAuthMiddleware and extract schoolId from context.
 */

// ADMIN: Create a sub-timetable
timetableRouter.post('/admin', adminAuthMiddleware, zJsonValidator(subTimetableSchema.pick({ name: true })), createSubTimetableController);

// ADMIN: Reorder a sub-timetable
timetableRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(timetableReorderSubSchema), reorderSubTimetableController);

// ADMIN: Get all sub-timetables
timetableRouter.get('/admin', adminAuthMiddleware, getAllSubTimetablesController);

// ADMIN: Get a single sub-timetable
timetableRouter.get(
  '/admin/:subTimetableId',
  adminAuthMiddleware,
  zParamsValidator(
    // Validate only subTimetableId; schoolId is from auth.
    z.object({ subTimetableId: timetableSubParamSchema.shape.subTimetableId })
  ),
  getSingleSubTimetableController
);

// ADMIN: Edit a sub-timetable
timetableRouter.patch(
  '/admin/:subTimetableId',
  adminAuthMiddleware,
  zParamsValidator(z.object({ subTimetableId: timetableSubParamSchema.shape.subTimetableId })),
  zJsonValidator(subTimetableSchema.pick({ name: true })),
  editSubTimetableController
);

// ADMIN: Delete a sub-timetable
timetableRouter.delete(
  '/admin/:subTimetableId',
  adminAuthMiddleware,
  zParamsValidator(z.object({ subTimetableId: timetableSubParamSchema.shape.subTimetableId })),
  deleteSubTimetableController
);

/** Admin: ROW OPERATIONS **/

// ADMIN: Create a row
timetableRouter.post(
  '/admin/:subTimetableId/row',
  adminAuthMiddleware,
  zParamsValidator(z.object({ subTimetableId: timetableSubParamSchema.shape.subTimetableId })),
  zJsonValidator(timetableRowSchema),
  createRowController
);

// ADMIN: Reorder a row
timetableRouter.patch(
  '/admin/:subTimetableId/row/reorder',
  adminAuthMiddleware,
  zParamsValidator(z.object({ subTimetableId: timetableSubParamSchema.shape.subTimetableId })),
  zJsonValidator(timetableReorderRowSchema),
  reorderRowController
);

// ADMIN: Get all rows
timetableRouter.get(
  '/admin/:subTimetableId/row',
  adminAuthMiddleware,
  zParamsValidator(z.object({ subTimetableId: timetableSubParamSchema.shape.subTimetableId })),
  getAllRowsController
);

// ADMIN: Get a single row
timetableRouter.get(
  '/admin/:subTimetableId/row/:rowId',
  adminAuthMiddleware,
  zParamsValidator(timetableRowParamSchema.omit({ schoolId: true })),
  getSingleRowController
);

// ADMIN: Edit a row
timetableRouter.patch(
  '/admin/:subTimetableId/row/:rowId',
  adminAuthMiddleware,
  zParamsValidator(timetableRowParamSchema.omit({ schoolId: true })),
  zJsonValidator(timetableRowSchema),
  editRowController
);

// ADMIN: Delete a row
timetableRouter.delete(
  '/admin/:subTimetableId/row/:rowId',
  adminAuthMiddleware,
  zParamsValidator(timetableRowParamSchema.omit({ schoolId: true })),
  deleteRowController
);

/** ───────── PUBLIC ENDPOINTS (GET only) ───────── **/

// Public: Get all sub-timetables
timetableRouter.get('/public/school/:schoolId', zParamsValidator(timetableSchoolParamSchema), getAllSubTimetablesController);

// Public: Get a single sub-timetable
timetableRouter.get('/public/school/:schoolId/:subTimetableId', zParamsValidator(timetableSubParamSchema), getSingleSubTimetableController);

// Public: Get all rows of a sub-timetable
timetableRouter.get('/public/school/:schoolId/:subTimetableId/row', zParamsValidator(timetableSubParamSchema), getAllRowsController);

// Public: Get a single row
timetableRouter.get('/public/school/:schoolId/:subTimetableId/row/:rowId', zParamsValidator(timetableRowParamSchema), getSingleRowController);
