import { Hono } from 'hono';
import { zParamsValidator, zJsonValidator } from '@/utils/zValidators';
import { homeworkZodSchema } from '@/db/models/homework';
import { updateHomework, getHomeworkBySchoolId } from '@/controllers/entities/homework.controller';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';

export const homeworkRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// GET Homework for admin (schoolId from auth)
homeworkRouter.get('/admin', adminAuthMiddleware, getHomeworkBySchoolId);
// UPDATE Homework for admin (upsert behavior)
homeworkRouter.patch('/admin', adminAuthMiddleware, zJsonValidator(homeworkZodSchema.omit({ schoolId: true }).partial()), updateHomework);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
// GET Homework by schoolId (provided in URL)
homeworkRouter.get('/school/:schoolId', zParamsValidator(homeworkZodSchema.pick({ schoolId: true })), getHomeworkBySchoolId);
