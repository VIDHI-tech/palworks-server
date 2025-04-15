import { Hono } from 'hono';
import { adminAuthMiddleware } from '@/middlewares/auth-middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { schoolIdParamSchema } from '@/db/common-schemas';
import {
  createTableTsIssuedController,
  getAllTableTsIssuedController,
  getTableTsIssuedByIdController,
  updateTableTsIssuedController,
  deleteTableTsIssuedController,
} from '@/controllers/entities/table_ts_issued.controller';
import { tsIssuedCreateSchema, tsIssuedParamsSchema, tsIssuedUpdateSchema } from '@/db/models/table_ts_issued';

export const tableTsIssuedRouter = new Hono();

/* ───────────── ADMIN ENDPOINTS ───────────── */
// GET all records (admin).
tableTsIssuedRouter.get('/admin', adminAuthMiddleware, getAllTableTsIssuedController);

// GET one record by ID (admin).
tableTsIssuedRouter.get('/admin/:tsIssuedId', adminAuthMiddleware, zParamsValidator(tsIssuedParamsSchema), getTableTsIssuedByIdController);

// CREATE a record (admin).
tableTsIssuedRouter.post('/admin', adminAuthMiddleware, zJsonValidator(tsIssuedCreateSchema), createTableTsIssuedController);

// UPDATE a record (admin).
tableTsIssuedRouter.patch(
  '/admin/:tsIssuedId',
  adminAuthMiddleware,
  zParamsValidator(tsIssuedParamsSchema),
  zJsonValidator(tsIssuedUpdateSchema),
  updateTableTsIssuedController
);

// DELETE a record (admin).
tableTsIssuedRouter.delete('/admin/:tsIssuedId', adminAuthMiddleware, zParamsValidator(tsIssuedParamsSchema), deleteTableTsIssuedController);

/* ───────────── PUBLIC ENDPOINTS ───────────── */
// GET all records for a given school (public).
tableTsIssuedRouter.get('/public/school/:schoolId', zParamsValidator(schoolIdParamSchema), getAllTableTsIssuedController);

// GET one record by ID (public).
tableTsIssuedRouter.get('/public/:tsIssuedId', zParamsValidator(tsIssuedParamsSchema), getTableTsIssuedByIdController);
