import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import {
  gallerySchoolParamSchema,
  galleryFolderParamSchema,
  galleryYearFolderParamSchema,
  galleryFolderSchema,
  galleryReorderFolderSchema,
  galleryCreateYearSchema,
  addImagesSchema,
  removeImagesSchema,
  addVideosSchema,
  removeVideosSchema,
} from '@/db/models/gallery';
import {
  createGalleryFolderController,
  getAllGalleryFoldersController,
  getSingleGalleryFolderController,
  editGalleryFolderController,
  deleteGalleryFolderController,
  reorderGalleryFolderController,
  createYearFolderController,
  editYearFolderController,
  deleteYearFolderController,
  getAllYearFoldersController,
  getSingleYearFolderController,
  addImagesController,
  removeImagesController,
  addVideosController,
  removeVideosController,
} from '@/controllers/entities/gallery.controller';
import { z } from 'zod';

export const galleryRouter = new Hono();

/**
 * ───────── ADMIN ENDPOINTS ─────────
 * These endpoints are protected by adminAuthMiddleware.
 * Note: The schoolId is obtained from the admin auth; only folderId (and yearFolderId where needed) is validated.
 */

// Create a new folder (Admin)
// POST /entities/gallery/admin
galleryRouter.post(
  '/admin',
  adminAuthMiddleware,
  // Validate body; no schoolId needed here
  zJsonValidator(galleryFolderSchema.pick({ folder_name: true })),
  createGalleryFolderController
);

// Reorder a folder (Admin)
// PATCH /entities/gallery/admin/reorder
galleryRouter.patch('/admin/reorder', adminAuthMiddleware, zJsonValidator(galleryReorderFolderSchema), reorderGalleryFolderController);

// Get all folders (Admin)
// GET /entities/gallery/admin
galleryRouter.get('/admin', adminAuthMiddleware, getAllGalleryFoldersController);

// Get a single folder (Admin)
// GET /entities/gallery/admin/:folderId
galleryRouter.get(
  '/admin/:folderId',
  adminAuthMiddleware,
  zParamsValidator(
    // Validate only folderId
    z.object({ folderId: galleryFolderParamSchema.shape.folderId })
  ),
  getSingleGalleryFolderController
);

// Edit a folder (Admin)
// PATCH /entities/gallery/admin/:folderId
galleryRouter.patch(
  '/admin/:folderId',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: galleryFolderParamSchema.shape.folderId })),
  zJsonValidator(galleryFolderSchema.pick({ folder_name: true })),
  editGalleryFolderController
);

// Delete a folder (Admin)
// DELETE /entities/gallery/admin/:folderId
galleryRouter.delete(
  '/admin/:folderId',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: galleryFolderParamSchema.shape.folderId })),
  deleteGalleryFolderController
);

// Year folder endpoints for admin
galleryRouter.post(
  '/admin/:folderId/year',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: galleryFolderParamSchema.shape.folderId })),
  zJsonValidator(galleryCreateYearSchema),
  createYearFolderController
);

galleryRouter.get(
  '/admin/:folderId/year',
  adminAuthMiddleware,
  zParamsValidator(z.object({ folderId: galleryFolderParamSchema.shape.folderId })),
  getAllYearFoldersController
);

galleryRouter.get(
  '/admin/:folderId/year/:yearFolderId',
  adminAuthMiddleware,
  zParamsValidator(
    z.object({
      folderId: galleryFolderParamSchema.shape.folderId,
      yearFolderId: galleryYearFolderParamSchema.shape.yearFolderId,
    })
  ),
  getSingleYearFolderController
);

galleryRouter.patch(
  '/admin/:folderId/year/:yearFolderId',
  adminAuthMiddleware,
  zParamsValidator(
    z.object({
      folderId: galleryFolderParamSchema.shape.folderId,
      yearFolderId: galleryYearFolderParamSchema.shape.yearFolderId,
    })
  ),
  zJsonValidator(galleryCreateYearSchema),
  editYearFolderController
);

galleryRouter.delete(
  '/admin/:folderId/year/:yearFolderId',
  adminAuthMiddleware,
  zParamsValidator(
    z.object({
      folderId: galleryFolderParamSchema.shape.folderId,
      yearFolderId: galleryYearFolderParamSchema.shape.yearFolderId,
    })
  ),
  deleteYearFolderController
);

// Images/Videos endpoints for admin
galleryRouter.patch(
  '/admin/:folderId/year/:yearFolderId/add-images',
  adminAuthMiddleware,
  zParamsValidator(
    z.object({
      folderId: galleryFolderParamSchema.shape.folderId,
      yearFolderId: galleryYearFolderParamSchema.shape.yearFolderId,
    })
  ),
  zJsonValidator(addImagesSchema),
  addImagesController
);

galleryRouter.patch(
  '/admin/:folderId/year/:yearFolderId/remove-images',
  adminAuthMiddleware,
  zParamsValidator(
    z.object({
      folderId: galleryFolderParamSchema.shape.folderId,
      yearFolderId: galleryYearFolderParamSchema.shape.yearFolderId,
    })
  ),
  zJsonValidator(removeImagesSchema),
  removeImagesController
);

galleryRouter.patch(
  '/admin/:folderId/year/:yearFolderId/add-videos',
  adminAuthMiddleware,
  zParamsValidator(
    z.object({
      folderId: galleryFolderParamSchema.shape.folderId,
      yearFolderId: galleryYearFolderParamSchema.shape.yearFolderId,
    })
  ),
  zJsonValidator(addVideosSchema),
  addVideosController
);

galleryRouter.patch(
  '/admin/:folderId/year/:yearFolderId/remove-videos',
  adminAuthMiddleware,
  zParamsValidator(
    z.object({
      folderId: galleryFolderParamSchema.shape.folderId,
      yearFolderId: galleryYearFolderParamSchema.shape.yearFolderId,
    })
  ),
  zJsonValidator(removeVideosSchema),
  removeVideosController
);

/**
 * ───────── PUBLIC GET ENDPOINTS ─────────
 * These endpoints expose only GET operations.
 */
galleryRouter.get('/public/school/:schoolId', zParamsValidator(gallerySchoolParamSchema), getAllGalleryFoldersController);

galleryRouter.get('/public/school/:schoolId/:folderId', zParamsValidator(galleryFolderParamSchema), getSingleGalleryFolderController);

galleryRouter.get('/public/school/:schoolId/:folderId/year', zParamsValidator(galleryFolderParamSchema), getAllYearFoldersController);

galleryRouter.get(
  '/public/school/:schoolId/:folderId/year/:yearFolderId',
  zParamsValidator(galleryYearFolderParamSchema),
  getSingleYearFolderController
);
