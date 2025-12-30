// prisma.config.ts
import 'dotenv/config'; // Loads .env variables
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts', // This tells Prisma how to run your seed file
  },
  datasource: {
    url: env('DATABASE_URL'), // Required for PostgreSQL connection in v7
  },
});
