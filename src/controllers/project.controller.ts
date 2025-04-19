import type { Context } from 'hono';
import { z } from 'zod';
import { upsertProject, getProjectById, listProjects, calculateProjectCost } from '../services/projectService';
import { projectZod } from '../db/models/project';

const projectCreateSchema = projectZod;
const projectUpdateSchema = projectZod.partial().extend({ id: z.string() });
const idParam = z.object({ id: z.string() });

export async function createProjectHandler(c: Context) {
  const data = projectCreateSchema.parse(await c.req.json());
  const proj = await upsertProject(data);
  return c.json(proj, 201);
}

export async function updateProjectHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const body = projectUpdateSchema.parse({ ...(await c.req.json()), id });
  const proj = await upsertProject(body);
  return c.json(proj);
}

export async function getProjectHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const proj = await getProjectById(id);
  return c.json(proj);
}

export async function listProjectsHandler(c: Context) {
  const list = await listProjects();
  return c.json(list);
}

export async function getProjectCostHandler(c: Context) {
  const { id } = idParam.parse({ id: c.req.param('id') });
  const costs = await calculateProjectCost(id);
  return c.json(costs);
}
