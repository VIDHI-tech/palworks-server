import { Hono } from 'hono';
import {
  createProjectHandler,
  updateProjectHandler,
  getProjectHandler,
  listProjectsHandler,
  getProjectCostHandler,
} from '../controllers/project.controller';
import { adminAuthMiddleware } from '../middlewares';
import { zJsonValidator, zParamsValidator } from '@/utils/zValidators';
import { projectCreateSchema } from '@/db/models';
import { zodIdSchema } from '@/db/common-schemas';

export const projectRouter = new Hono();

// Create Project
projectRouter.post('/', adminAuthMiddleware, zJsonValidator(projectCreateSchema), createProjectHandler);

// Update Project
projectRouter.patch('/:_id', adminAuthMiddleware, zParamsValidator(zodIdSchema), updateProjectHandler);

// Get Project by ID
projectRouter.get('/:_id', adminAuthMiddleware, getProjectHandler);

// List Projects
projectRouter.get('/', adminAuthMiddleware, listProjectsHandler);

// Get cost breakdown for a Project
projectRouter.get('/:_id/cost', adminAuthMiddleware, getProjectCostHandler);
