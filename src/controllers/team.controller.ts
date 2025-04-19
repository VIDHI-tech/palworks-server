import type { Context } from 'hono';
import { addEmployeeToTeam, getTeamsForEmployee } from '../services/teamService';

export async function addEmployeeToTeamHandler(c: Context) {
  const empId = c.req.param('empId');
  const teamName = c.req.param('teamName');
  const result = await addEmployeeToTeam(empId, teamName);
  return c.json(result, 201);
}

export async function getTeamsForEmployeeHandler(c: Context) {
  const empId = c.req.param('empId');
  const teams = await getTeamsForEmployee(empId);
  return c.json({ teams });
}
