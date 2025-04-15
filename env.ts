import { z, ZodError } from 'zod';

const envVariables = z.object({
  // SERVER
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string(),

  // DB
  MONGO_URI: z.string().url(), // Validate it's a valid Mongo URI

  ORIGINS: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export const parsedEnv = () => {
  try {
    envVariables.parse(process.env);
  } catch (e) {
    const errors = (e as ZodError).errors.map((issue: any) => ({
      field: issue.path.join('.'),
      errorMessage: issue.message,
    }));
    console.log({
      message: 'Invalid environment variables',
      errors,
    });
    process.exit(1);
  }
};
