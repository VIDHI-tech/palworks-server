import * as invoiceController from './invoice.controller';
import * as employeeController from './employee.controller';
import * as teamController from './team.controller';
import * as leadController from './lead.controller';
import * as quotaTaskController from './quotaTask.controller';
import * as projectController from './project.controller';
import * as taskController from './task.controller';
import * as variableExpenseController from './variableExpense.controller';
import * as paymentController from './payment.controller';
import * as efficiencyController from './efficiency.controller';

export const controllers = {
  invoiceController,
  employeeController,
  teamController,
  leadController,
  quotaTaskController,
  projectController,
  taskController,
  variableExpenseController,
  paymentController,
  efficiencyController,
};

export type Controllers = typeof controllers;
