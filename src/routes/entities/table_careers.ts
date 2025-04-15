import { Hono } from 'hono';
import {
  createTableCareer,
  getAllTableCareersBySchool,
  getTableCareerById,
  editTableCareer,
  toggleActiveTableCareer,
  deleteTableCareer,
  getAllTableCareersPublic,
  getTableCareerPublic,
} from '@/controllers/entities/table_careers.controller';
import { tableCareersCreateSchema, tableCareersParamsSchema, tableCareersToggleSchema, tableCareersUpdateSchema } from '@/db/models/table_careers';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { schoolIdParamSchema } from '@/db/common-schemas';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const tableCareersRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// Note: adminAuthMiddleware populates 'schoolId' in the context.
tableCareersRouter.get('/admin', adminAuthMiddleware, getAllTableCareersBySchool);
tableCareersRouter.get('/admin/:vacancyId', adminAuthMiddleware, zParamsValidator(tableCareersParamsSchema), getTableCareerById);
tableCareersRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tableCareersCreateSchema), createTableCareer);
tableCareersRouter.patch(
  '/admin/edit/:vacancyId',
  adminAuthMiddleware,
  zParamsValidator(tableCareersParamsSchema),
  zJsonValidator(tableCareersUpdateSchema),
  editTableCareer
);
tableCareersRouter.patch('/admin/toggle', adminAuthMiddleware, zJsonValidator(tableCareersToggleSchema), toggleActiveTableCareer);
tableCareersRouter.delete('/admin/delete/:vacancyId', adminAuthMiddleware, zParamsValidator(tableCareersParamsSchema), deleteTableCareer);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
// Public endpoints require the schoolId in the URL.
tableCareersRouter.get('/public/school/:schoolId', zParamsValidator(schoolIdParamSchema), getAllTableCareersPublic);
tableCareersRouter.get('/public/:vacancyId', zParamsValidator(tableCareersParamsSchema), getTableCareerPublic);
