# airforce_server

## Throwing Error/////

Always throw error like
throw new ApiError(500, "Not Implemented");
can refer to class ApiError in utils/ApiError.ts

## Sending Responses

Always send response like
return c.json(new ApiResponse(200, data));
can refer to class ApiResponse in utils/ApiResponse.ts

We are taking this approach because we want to have a consistent response format for all our APIs. This will make it easier to understand and handle errors and responses in the frontend.

## Environment Variables

We are using Zod to validate the environment variables.
You can refer to the env.ts file for the validation logic.
You just need to add environment variables to the zod object (envVariables) env.ts file whenever you add a new environment variable.

<!-- Page base model -->

## Admission

admission_hero_img
admission_hero_pdf
admission_lkg_pdf
admission_class_pdf
admission_tc_pdf

testtest
testtest

"scripts": {
"dev": "cp src/env/.env.local .env && bun run --hot src/index.ts",
"start": "bun run src/index.ts",
"build": "bun build src/index.ts --outdir src/dist --target bun",
"dev:test": "cp src/env/.env.local .env && bun run --hot src/index.ts",
"dev:prod": "cp envs/.env.prod .env && bun run --hot src/index.ts",
"start:test": "cp src/env/.env.local .env && bun run src/index.ts",
"start:prod": "cp src/env/.env.prod .env && bun run src/index.ts"
},
