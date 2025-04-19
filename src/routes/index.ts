import { Hono } from 'hono';

import { ApiResponse } from '@/utils/ApiResponse';
import { employeeRouter } from './employee';
import { teamRouter } from './team';
import { quotaTaskRouter } from './quotaTask';
import { leadRouter } from './lead';
import { leadExpenseRouter } from './leadExpense';
import { projectRouter } from './project';
import { taskRouter } from './task';
import { variableExpenseRouter } from './variableExpense';
import { invoiceRouter } from './invoice';
import { paymentRouter } from './payment';
import { efficiencyRouter } from './efficiency';

const app = new Hono();

export const routes = app
  .get('/health-check', (c) => {
    console.log('health check');
    return c.json(
      new ApiResponse(200, {
        status: 'api working, live and kicking!',
      })
    );
  })
  .route('/employees', employeeRouter)
  .route('/teams', teamRouter)
  .route('/quota-tasks', quotaTaskRouter)
  .route('/leads', leadRouter)
  .route('/lead-expenses', leadExpenseRouter)
  .route('/projects', projectRouter)
  .route('/tasks', taskRouter)
  .route('/variable-expenses', variableExpenseRouter)
  .route('/invoices', invoiceRouter)
  .route('/payments', paymentRouter)
  .route('/efficiency', efficiencyRouter);

export type AppType = typeof routes;
