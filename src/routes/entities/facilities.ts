import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import {
  facilitiesSchoolParamSchema,
  facilitiesRowParamSchema,
  folderRowSchema,
  facilitiesReorderSchema,
  facilitiesAddImagesSchema,
  facilitiesRemoveImagesSchema,
} from '@/db/models/facilities';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import {
  createFacilitiesFolderController,
  getAllFacilitiesFoldersController,
  getSingleFacilitiesFolderController,
  editFacilitiesFolderController,
  deleteFacilitiesFolderController,
  reorderFacilitiesFolderController,
  addImagesToFacilitiesFolderController,
  removeImagesFromFacilitiesFolderController,
} from '@/controllers/entities/facilities.controller';
import { z } from 'zod';

export const facilitiesRouter = new Hono();

/* ───────────── ADMIN ROUTES ───────────── */
// Note: School ID is obtained from adminAuthMiddleware (set on context).
facilitiesRouter.post(
  '/admin',
  adminAuthMiddleware,
  // For creation, admin sends folder_name and folder_description (images can be added later)
  zJsonValidator(folderRowSchema.omit({ images: true })),
  createFacilitiesFolderController
);

facilitiesRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(facilitiesReorderSchema), reorderFacilitiesFolderController);

facilitiesRouter.patch(
  '/admin/:folderId/add-images',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: facilitiesRowParamSchema.shape.folderId })),
  zJsonValidator(facilitiesAddImagesSchema),
  addImagesToFacilitiesFolderController
);

facilitiesRouter.patch(
  '/admin/:folderId/remove-images',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: facilitiesRowParamSchema.shape.folderId })),
  zJsonValidator(facilitiesRemoveImagesSchema),
  removeImagesFromFacilitiesFolderController
);

facilitiesRouter.get('/admin', adminAuthMiddleware, getAllFacilitiesFoldersController);

facilitiesRouter.get(
  '/admin/:folderId',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: facilitiesRowParamSchema.shape.folderId })),
  getSingleFacilitiesFolderController
);

facilitiesRouter.patch(
  '/admin/:folderId',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: facilitiesRowParamSchema.shape.folderId })),
  zJsonValidator(folderRowSchema.pick({ folder_name: true, folder_description: true })),
  editFacilitiesFolderController
);

facilitiesRouter.delete(
  '/admin/:folderId',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: facilitiesRowParamSchema.shape.folderId })),
  deleteFacilitiesFolderController
);

/* ───────────── PUBLIC ROUTES ───────────── */
facilitiesRouter.get('/public/school/:schoolId', zParamsValidator(facilitiesSchoolParamSchema), getAllFacilitiesFoldersController);

facilitiesRouter.get('/public/school/:schoolId/:folderId', zParamsValidator(facilitiesRowParamSchema), getSingleFacilitiesFolderController);
