import { Hono } from 'hono';
import {
  getAllBlogsBySchoolId,
  getBlogById,
  createBlogBySchoolId,
  updateBlogBySchoolId,
  deleteBlogBySchoolId,
  getAllBlogsPublic,
  getBlogPublic,
} from '@/controllers/entities/blog.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { blogZodSchema, blogUpdateSchema, idParamSchema, blogCreateSchema } from '@/db/models/blog';
import { schoolIdParamSchema } from '@/db/common-schemas';

const blogRouter = new Hono();

// ────────────── ADMIN ENDPOINTS ──────────────
// All admin endpoints require authentication.
blogRouter.get('/admin', adminAuthMiddleware, getAllBlogsBySchoolId);
blogRouter.get('/admin/:id', adminAuthMiddleware, zParamsValidator(idParamSchema), getBlogById);
blogRouter.post('/admin', adminAuthMiddleware, zJsonValidator(blogCreateSchema), createBlogBySchoolId);
blogRouter.patch('/admin/:id', adminAuthMiddleware, zParamsValidator(idParamSchema), zJsonValidator(blogUpdateSchema), updateBlogBySchoolId);
blogRouter.delete('/admin/:id', adminAuthMiddleware, zParamsValidator(idParamSchema), deleteBlogBySchoolId);

// ────────────── PUBLIC ENDPOINTS ──────────────
// Public endpoints require the schoolId in the URL.
blogRouter.get('/public/school/:schoolId', zParamsValidator(schoolIdParamSchema), getAllBlogsPublic);
blogRouter.get('/public/:id', zParamsValidator(idParamSchema), getBlogPublic);

export { blogRouter };
