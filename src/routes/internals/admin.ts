import { Hono } from 'hono';
import { signInAdmin, logoutAdmin, refreshAdminToken, checkAdminAuth } from '@/controllers/internals/admin.controller';
import { adminAuthMiddleware } from '@/middlewares';

export const adminRouter = new Hono();

adminRouter.post('/signin', signInAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.post('/refresh', refreshAdminToken);
adminRouter.get('/check', adminAuthMiddleware, checkAdminAuth);
