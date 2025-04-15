import { Hono } from 'hono';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { cbsePageParamSchema, cbsePageUpdateBodySchema } from '@/db/models/cbse-page';
import { getCBSEPage, updateCBSEPage } from '@/controllers/pages/cbse-page.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const cbsePageRouter = new Hono();

/* ───────── ADMIN ROUTES ───────── */
// For admin routes, schoolId is extracted from the auth middleware.
cbsePageRouter.get('/admin', adminAuthMiddleware, getCBSEPage);
cbsePageRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(cbsePageUpdateBodySchema), updateCBSEPage);

/* ───────── PUBLIC ROUTES (GET only) ───────── */
// For public routes, schoolId is provided via URL.
cbsePageRouter.get('/public/:schoolId', zParamsValidator(cbsePageParamSchema), getCBSEPage);
