import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { schoolIdParamSchema } from '@/db/common-schemas';

import {
  getRajBhashaImagesAdminController,
  addRajBhashaImagesAdminController,
  removeRajBhashaImagesAdminController,
  getRajBhashaImagesPublicController,
} from '@/controllers/entities/raj_bhasha.controller';

import { rajBhashaAddImagesSchema, rajBhashaRemoveImagesSchema } from '@/db/models/raj_bhasha';

export const rajBhashaRouter = new Hono();

/* ───────── ADMIN ENDPOINTS ───────── */
// (1) GET all images for admin’s school
rajBhashaRouter.get('/admin', adminAuthMiddleware, getRajBhashaImagesAdminController);

// (2) Add images
rajBhashaRouter.patch('/admin/add-images', adminAuthMiddleware, zJsonValidator(rajBhashaAddImagesSchema), addRajBhashaImagesAdminController);

// (3) Remove images
rajBhashaRouter.patch('/admin/remove-images', adminAuthMiddleware, zJsonValidator(rajBhashaRemoveImagesSchema), removeRajBhashaImagesAdminController);

/* ───────── PUBLIC ENDPOINTS ───────── */
// GET all images by :schoolId
rajBhashaRouter.get('/public/school/:schoolId', zParamsValidator(schoolIdParamSchema), getRajBhashaImagesPublicController);
