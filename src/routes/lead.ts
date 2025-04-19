import { Hono } from 'hono';
import { createLeadHandler, updateLeadHandler, getLeadHandler, listLeadsHandler } from '../controllers/lead.controller';
import { adminAuthMiddleware } from '../middlewares';

export const leadRouter = new Hono();

// Create a new Lead
leadRouter.post('/', adminAuthMiddleware, createLeadHandler);

// Update a Lead
leadRouter.patch('/:id', adminAuthMiddleware, updateLeadHandler);

// Fetch one Lead
leadRouter.get('/:id', adminAuthMiddleware, getLeadHandler);

// List all Leads
leadRouter.get('/', adminAuthMiddleware, listLeadsHandler);
