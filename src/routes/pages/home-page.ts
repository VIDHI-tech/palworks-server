import { Hono } from 'hono';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { createHomePageSchema, homePageParamSchema, homePageUpdateBodySchema } from '@/db/models/home-page';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { getHomePage, updateHomePage } from '@/controllers';

export const homePageRouter = new Hono();

/* ───────── ADMIN ROUTES ───────── */
// For admin, schoolId is extracted from the auth middleware.
homePageRouter.get('/admin', adminAuthMiddleware, getHomePage);
homePageRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(homePageUpdateBodySchema), updateHomePage);

/* ───────── PUBLIC ROUTES (GET only) ───────── */
// For public, schoolId is provided via URL.
homePageRouter.get('/public/:schoolId', zParamsValidator(homePageParamSchema), getHomePage);
