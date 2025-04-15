import { Hono } from 'hono';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { miscellaneousPageParamSchema, miscellaneousPageUpdateBodySchema } from '@/db/models/miscellaneous-page';
import { getMiscellaneousPage, updateMiscellaneousPage } from '@/controllers/pages/miscellaneous-page.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const miscellaneousPageRouter = new Hono();

/* ───────── ADMIN ROUTES ───────── */
// In admin routes, schoolId is extracted from admin auth middleware.
miscellaneousPageRouter.get('/admin', adminAuthMiddleware, getMiscellaneousPage);
miscellaneousPageRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(miscellaneousPageUpdateBodySchema), updateMiscellaneousPage);

/* ───────── PUBLIC ROUTES (GET only) ───────── */
// For public routes, schoolId is provided via URL.
miscellaneousPageRouter.get('/public/:schoolId', zParamsValidator(miscellaneousPageParamSchema), getMiscellaneousPage);
