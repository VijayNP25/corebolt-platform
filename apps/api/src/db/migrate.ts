import { config as loadDotenv } from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  explainDbConnectionError,
  isPgliteUrl,
  resolvePgliteDataDir,
} from './runtime.js';

loadDotenv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main(): Promise<void> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is required');
  }

  // Resolve relative pglite paths from apps/api
  process.chdir(path.resolve(__dirname, '../..'));

  const migrationsFolder = path.resolve(process.cwd(), 'drizzle');
  console.log(`Running migrations from ${migrationsFolder}`);

  try {
    if (isPgliteUrl(url)) {
      const { PGlite } = await import('@electric-sql/pglite');
      const { drizzle } = await import('drizzle-orm/pglite');
      const { migrate } = await import('drizzle-orm/pglite/migrator');
      const dataDir = resolvePgliteDataDir(url);
      fs.mkdirSync(dataDir, { recursive: true });
      const client = new PGlite(dataDir);
      const db = drizzle(client);
      await migrate(db, { migrationsFolder });
      await client.close();
      console.log(`Migrations complete (PGlite → ${dataDir})`);
      return;
    }

    const { default: pg } = await import('pg');
    const { drizzle } = await import('drizzle-orm/node-postgres');
    const { migrate } = await import('drizzle-orm/node-postgres/migrator');
    const pool = new pg.Pool({ connectionString: url });
    const db = drizzle(pool);
    await migrate(db, { migrationsFolder });
    await pool.end();
    console.log('Migrations complete (PostgreSQL)');
  } catch (err) {
    console.error(explainDbConnectionError(err));
    process.exit(1);
  }
}

main();
