import { type Context, type Next } from 'hono';
import { EmployeeTeamModel } from '../db/models/employeeTeam';
import { TeamModel } from '../db/models/team';

export function requireTeam(teams: string[]) {
  return async (c: Context, next: Next) => {
    const empId = c.get('userId');
    if (!empId) return c.text('Unauthorized', 401);
    const memberships = await EmployeeTeamModel.find({ employeeId: empId }).populate('teamId');
    const userTeams = memberships.map((m) => (m.teamId as any).teamName);
    if (!teams.some((t) => userTeams.includes(t))) {
      return c.text('Forbidden', 403);
    }
    await next();
  };
}
