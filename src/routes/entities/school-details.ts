import { Hono } from 'hono';
import { updateSchoolDetails, getSchoolDetails, createSchoolDetails, incrementVisitorCount } from '@/controllers/entities/school-details.controller';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { schoolDetailsParamSchema, schoolDetailsUpdateBodySchema } from '@/db/models/school-details';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const schoolDetailsRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// GET school details for admin (schoolId from auth)
schoolDetailsRouter.get('/admin', adminAuthMiddleware, getSchoolDetails);
// UPDATE (upsert) school details for admin
schoolDetailsRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(schoolDetailsUpdateBodySchema), updateSchoolDetails);
// Optionally, you can also have a POST endpoint for creation.
// schoolDetailsRouter.post('/admin', adminAuthMiddleware, zJsonValidator(createSchoolDetailsSchema), createSchoolDetails);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
// GET school details by schoolId (public)
schoolDetailsRouter.get('/public/:schoolId', zParamsValidator(schoolDetailsParamSchema), getSchoolDetails);

// New endpoint: Increment visitor count (public)
schoolDetailsRouter.post('/public/:schoolId/visitor', zParamsValidator(schoolDetailsParamSchema), incrementVisitorCount);

export default schoolDetailsRouter;
