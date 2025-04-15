import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { schoolIdParamSchema } from '@/db/common-schemas';
import {
  createEventBySchool,
  getAllEventsBySchool,
  getEventById,
  updateEventBySchool,
  deleteEventBySchool,
  getEventsByMonthController,
  getEventsByDateController,
  getUpcomingEventsController,
} from '@/controllers/entities/event.controller';
import { eventCreateSchema, eventParamsSchema, eventUpdateSchema } from '@/db/models/event';

export const eventRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Then dynamic route
eventRouter.get('/admin', adminAuthMiddleware, getAllEventsBySchool);
eventRouter.get('/admin/:eventId', adminAuthMiddleware, zParamsValidator(eventParamsSchema), getEventById);
eventRouter.post('/admin', adminAuthMiddleware, zJsonValidator(eventCreateSchema), createEventBySchool);
eventRouter.patch(
  '/admin/:eventId',
  adminAuthMiddleware,
  zParamsValidator(eventParamsSchema),
  zJsonValidator(eventUpdateSchema),
  updateEventBySchool
);
eventRouter.delete('/admin/:eventId', adminAuthMiddleware, zParamsValidator(eventParamsSchema), deleteEventBySchool);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
eventRouter.get('/public/school/:schoolId', zParamsValidator(schoolIdParamSchema), getAllEventsBySchool);
eventRouter.get('/public/:eventId', zParamsValidator(eventParamsSchema), getEventById);
eventRouter.get('/public/school/:schoolId/byMonth', zParamsValidator(schoolIdParamSchema), getEventsByMonthController);
eventRouter.get('/public/school/:schoolId/byDate', zParamsValidator(schoolIdParamSchema), getEventsByDateController);
eventRouter.get('/public/school/:schoolId/upcoming', zParamsValidator(schoolIdParamSchema), getUpcomingEventsController);
