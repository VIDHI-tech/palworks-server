import { Hono } from 'hono';
import { admissionsPageRouter } from './admissions-page';
import { cbsePageRouter } from './cbse-page';
import { academicsPageRouter } from './academics-page';
import { aboutPageRouter } from './about-page';
import { homePageRouter } from './home-page';
import { achievementPageRouter } from './achievement-page';
import { miscellaneousPageRouter } from './miscellaneous-page';

export const pagesRouter = new Hono();

pagesRouter
  .route('/miscellaneous-page', miscellaneousPageRouter)
  .route('/achievement-page', achievementPageRouter)
  .route('/admissions-page', admissionsPageRouter)
  .route('/cbse-page', cbsePageRouter)
  .route('/academics-page', academicsPageRouter)
  .route('/about-page', aboutPageRouter)
  .route('/home-page', homePageRouter);
