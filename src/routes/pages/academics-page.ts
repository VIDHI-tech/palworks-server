import { Hono } from 'hono';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { academicsPageParamSchema, academicsPageUpdateBodySchema } from '@/db/models/academics-page';
import { getAcademicsPage, updateAcademicsPage } from '@/controllers/pages/academics-page.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const academicsPageRouter = new Hono();

/* ───────── ADMIN ROUTES ───────── */
// For admin routes, schoolId is extracted from the auth middleware.
academicsPageRouter.get('/admin', adminAuthMiddleware, getAcademicsPage);
academicsPageRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(academicsPageUpdateBodySchema), updateAcademicsPage);

/* ───────── PUBLIC ROUTES (GET only) ───────── */
// For public routes, schoolId is provided via URL parameter.
academicsPageRouter.get('/public/:schoolId', zParamsValidator(academicsPageParamSchema), getAcademicsPage);
