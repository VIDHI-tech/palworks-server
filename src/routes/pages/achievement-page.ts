import { Hono } from 'hono';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { createAchievementPageSchema, achievementPageParamSchema, achievementPageUpdateBodySchema } from '@/db/models/achievement-page';
import { createAchievementPage, getAchievementPage, updateAchievementPage } from '@/controllers/pages/achievement-page.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const achievementPageRouter = new Hono();

/* ───────── ADMIN ROUTES ───────── */
// In admin routes, schoolId is extracted from admin auth middleware.
achievementPageRouter.get('/admin', adminAuthMiddleware, getAchievementPage);
achievementPageRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(achievementPageUpdateBodySchema), updateAchievementPage);

/* ───────── PUBLIC ROUTES (GET only) ───────── */
// For public routes, schoolId is provided via URL.
achievementPageRouter.get('/public/:schoolId', zParamsValidator(achievementPageParamSchema), getAchievementPage);
