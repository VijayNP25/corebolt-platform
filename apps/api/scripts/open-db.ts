import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as schema from '../src/db/schema.js';
import {
  explainDbConnectionError,
  isPgliteUrl,
  resolvePgliteDataDir,
} from '../src/db/runtime.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function openScriptDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL required');

  // Ensure cwd-relative pglite paths resolve from apps/api
  process.chdir(path.resolve(__dirname, '..'));

  if (isPgliteUrl(url)) {
    const { PGlite } = await import('@electric-sql/pglite');
    const { drizzle } = await import('drizzle-orm/pglite');
    const dataDir = resolvePgliteDataDir(url);
    fs.mkdirSync(dataDir, { recursive: true });
    const client = new PGlite(dataDir);
    const db = drizzle(client, { schema });
    return {
      db,
      async close() {
        await client.close();
      },
    };
  }

  const { default: pg } = await import('pg');
  const { drizzle } = await import('drizzle-orm/node-postgres');
  const pool = new pg.Pool({ connectionString: url });
  const db = drizzle(pool, { schema });
  return {
    db,
    async close() {
      await pool.end();
    },
  };
}

export { explainDbConnectionError };
