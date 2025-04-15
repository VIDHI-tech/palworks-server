import { Hono } from 'hono';
import { schoolRouter } from './school';
import { tableManagementRouter } from './table-management';
import { schoolDetailsRouter } from './school-details';
import { tableStaffGvTeachingRouter } from './table_staff_gv_teaching';
import { tableStaffAvTeachingRouter } from './table_staff_av_teaching';
import { tableStaffGvNonTeachingRouter } from './table_staff_gv_non_teaching';
import { tableStaffAvNonTeachingRouter } from './table_staff_av_non_teaching';
import { tableStudentCouncilGvRouter } from './table_student_council_gv';
import { tableStudentCouncilAvRouter } from './table_student_council_av';
import { homeworkRouter } from './homework';
import { tableAchievementsRouter } from './table-achievements';
import { topperRouter } from './topper';
import { tableCareersRouter } from './table_careers';
import { tableTimingsRouter } from './table_timings';
import { blogRouter } from './blog';
import { tableCircularRouter } from './table_circular';
import { eventRouter } from './event';
import { alumniRouter } from './alumni';
import { tableExamTimetableRouter } from './table_exam_timetable';
import { galleryRouter } from './gallery';
import { timetableRouter } from './timetable';
import { rajBhashaRouter } from './raj_bhasha';
import { tableCurriculumRouter } from './table_curriculum';
import { facilitiesRouter } from './facilities';
import { tableTsIssuedRouter } from './table_ts_issued';
import { tableLatestUpdatesRouter } from './table_latest_updates';
import { tableNotificationRouter } from './table_notification';

export const entitiesRouter = new Hono();

entitiesRouter
  .route('/school', schoolRouter)
  .route('/blog', blogRouter)
  .route('/school-details', schoolDetailsRouter)
  .route('/table-management', tableManagementRouter)
  .route('/table_staff_gv_teaching', tableStaffGvTeachingRouter)
  .route('/table_staff_av_teaching', tableStaffAvTeachingRouter)
  .route('/table_staff_gv_non_teaching', tableStaffGvNonTeachingRouter)
  .route('/table_staff_av_non_teaching', tableStaffAvNonTeachingRouter)
  .route('/table_student_council_gv', tableStudentCouncilGvRouter)
  .route('/table_student_council_av', tableStudentCouncilAvRouter)
  .route('/homework', homeworkRouter)
  .route('/table-achievements', tableAchievementsRouter)
  .route('/event', eventRouter)
  .route('/topper', topperRouter)
  .route('/table_careers', tableCareersRouter)
  .route('/table_circular', tableCircularRouter)
  .route('/alumni', alumniRouter)
  .route('/table_timings', tableTimingsRouter)
  .route('/table_exam_timetable', tableExamTimetableRouter)
  .route('/facilities', facilitiesRouter)
  .route('/gallery', galleryRouter)
  .route('/timetable', timetableRouter)
  .route('/raj-bhasha', rajBhashaRouter)
  .route('/table_curriculum', tableCurriculumRouter)
  .route('/table_ts_issued', tableTsIssuedRouter)
  .route('/table_latest_updates', tableLatestUpdatesRouter)
  .route('/notification', tableNotificationRouter);
