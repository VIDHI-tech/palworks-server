import { Hono } from 'hono';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { admissionsPageParamSchema, admissionsPageUpdateBodySchema } from '@/db/models/admissions-page';
import { getAdmissionsPage, updateAdmissionsPage } from '@/controllers/pages/admissions-page.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const admissionsPageRouter = new Hono();

/* ───────── ADMIN ROUTES ───────── */
// For admin routes, the schoolId is extracted from the admin auth middleware.
admissionsPageRouter.get('/admin', adminAuthMiddleware, getAdmissionsPage);
admissionsPageRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(admissionsPageUpdateBodySchema), updateAdmissionsPage);

/* ───────── PUBLIC ROUTES (GET only) ───────── */
// For public routes, the schoolId is provided via URL.
admissionsPageRouter.get('/public/:schoolId', zParamsValidator(admissionsPageParamSchema), getAdmissionsPage);
