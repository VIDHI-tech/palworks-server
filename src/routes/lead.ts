import { leadUpdateSchema } from './../db/models/lead';
import { Hono } from 'hono';
import { createLeadHandler, updateLeadHandler, getLeadHandler, listLeadsHandler } from '../controllers/lead.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { leadCreateSchema } from '@/db/models';
import { zodIdSchema } from '@/db/common-schemas';

export const leadRouter = new Hono();

// Create a new Lead
leadRouter.post('/', adminAuthMiddleware, zJsonValidator(leadCreateSchema), createLeadHandler);

// Update a Lead
leadRouter.patch('/:_id', adminAuthMiddleware, zParamsValidator(zodIdSchema), zJsonValidator(leadUpdateSchema), updateLeadHandler);

// Fetch one Lead
leadRouter.get('/:_id', adminAuthMiddleware, getLeadHandler);

// List all Leads
leadRouter.get('/', adminAuthMiddleware, listLeadsHandler);
