import { prometheus } from '@hono/prometheus';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { poweredBy } from 'hono/powered-by';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';
import connectDB from './db/connect';
import { errorHandler, notFound } from './middlewares';
import { routes } from './routes';
import { parsedEnv } from '../env';

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'None',
  secure: true,
} as const;
const app = new Hono();
// app.basePath('/api/v1');
parsedEnv();
await connectDB();

const { printMetrics, registerMetrics } = prometheus();
const origins = process.env.ORIGINS ? process.env.ORIGINS.split(',') : [];

// (async () => {
//   const payload = {
//     name: 'airforce-admin',
//     email: 'airforceschool.avc@gmail.com',
//     password: 'Airforceschool@123',
//     schoolId: '67c6e081f81758fea74a0e2b',
//   };
//   const admin = await createAdminService(payload);
// })();

// -----------------------------------------------------------------------------

// async function setBucketPublic(digitalOceanCreds) {
//   const s3Client = new S3Client({
//     region: digitalOceanCreds.region,
//     endpoint: `https://${digitalOceanCreds.region}.digitaloceanspaces.com`,
//     credentials: {
//       accessKeyId: digitalOceanCreds.key,
//       secretAccessKey: digitalOceanCreds.secret,
//     },
//   });

//   try {
//     const command = new PutBucketAclCommand({
//       Bucket: digitalOceanCreds.bucket,
//       ACL: 'public-read',
//     });
//     const response = await s3Client.send(command);
//     console.log('Bucket ACL updated successfully:', response);
//   } catch (error) {
//     console.error('Error setting bucket ACL:', error);
//   }
// }
// setBucketPublic({
//   region: digitalOceanCreds?.region,
//   key: digitalOceanCreds?.key,
//   secret: digitalOceanCreds?.secret,
//   bucket: digitalOceanCreds?.bucket,
// });

// -----------------------------------------------------------------------------
app.use(poweredBy());
app.use(logger());
app.use('*', registerMetrics);
app.get('/metrics', printMetrics);
app.use(secureHeaders());
app.use(prettyJSON());
app.use(
  cors({
    origin: origins,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(csrf());
app.use('/assets/*', serveStatic({ path: './assets' }));

app.route('/', routes);
app.onError((err, c) => {
  const error = errorHandler(c);
  return error;
});

app.notFound((c) => {
  const error = notFound(c);
  return error;
});

export default {
  port: +(Bun.env.PORT || 4500),
  fetch: app.fetch,
};

export type { AppType } from './routes';
