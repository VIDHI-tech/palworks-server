import { Hono } from 'hono';
import {
  createProjectHandler,
  updateProjectHandler,
  getProjectHandler,
  listProjectsHandler,
  getProjectCostHandler,
} from '../controllers/project.controller';
import { adminAuthMiddleware } from '../middlewares';

export const projectRouter = new Hono();

// Create Project
projectRouter.post('/', adminAuthMiddleware, createProjectHandler);

// Update Project
projectRouter.patch('/:id', adminAuthMiddleware, updateProjectHandler);

// Get Project by ID
projectRouter.get('/:id', adminAuthMiddleware, getProjectHandler);

// List Projects
projectRouter.get('/', adminAuthMiddleware, listProjectsHandler);

// Get cost breakdown for a Project
projectRouter.get('/:id/cost', adminAuthMiddleware, getProjectCostHandler);
