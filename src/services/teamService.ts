import type { ClientSession } from 'mongoose';
import { EmployeeModel } from '../db/models/employee';
import { TeamModel } from '../db/models/team';
import { EmployeeTeamModel } from '../db/models/employeeTeam';

export async function addEmployeeToTeam(empId: string, teamName: string, session?: ClientSession) {
  const emp = await EmployeeModel.findById(empId).session(session ?? null);
  if (!emp) throw new Error('Employee not found');

  let team = await TeamModel.findOne({ teamName }).session(session ?? null);

  if (!team) {
    [team] = await TeamModel.create([{ teamName }], { session });
  }

  await EmployeeTeamModel.updateOne({ employeeId: empId, teamId: team._id }, { employeeId: empId, teamId: team._id }, { upsert: true, session });

  return { employee: emp.name, team: team.teamName };
}

export async function getTeamsForEmployee(empId: string, session?: ClientSession): Promise<string[]> {
  const docs = await EmployeeTeamModel.find({ employeeId: empId })
    .session(session ?? null)
    .populate('teamId')
    .lean<{ teamId: { teamName: string } }[]>()
    .exec();

  return docs.map((d) => d.teamId.teamName);
}
