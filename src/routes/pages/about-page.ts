import { Hono } from 'hono';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { createAboutPageSchema, aboutPageParamSchema, aboutPageUpdateBodySchema } from '@/db/models/about-page';
import { getAboutPage, updateAboutPage } from '@/controllers/pages/about-page.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const aboutPageRouter = new Hono();

/* ───────── ADMIN ROUTES ───────── */
// For admin routes, schoolId is extracted from the auth middleware.
aboutPageRouter.get('/admin', adminAuthMiddleware, getAboutPage);
aboutPageRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(aboutPageUpdateBodySchema), updateAboutPage);

/* ───────── PUBLIC ROUTES (GET only) ───────── */
// For public routes, schoolId is provided via URL.
aboutPageRouter.get('/public/:schoolId', zParamsValidator(aboutPageParamSchema), getAboutPage);
