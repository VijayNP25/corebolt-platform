import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';
import fs from 'node:fs';
import { env } from '../config/env.js';
import * as schema from './schema.js';
import { apiPackageRoot, isPgliteUrl, resolvePgliteDataDir } from './runtime.js';

type AppDb =
  | ReturnType<typeof drizzlePg<typeof schema>>
  | ReturnType<typeof drizzlePglite<typeof schema>>;

let _db: AppDb | null = null;
let _pool: pg.Pool | null = null;
let _pglite: PGlite | null = null;

export function getDb(): AppDb {
  if (_db) return _db;

  const url = env.DATABASE_URL;

  if (isPgliteUrl(url)) {
    const dataDir = resolvePgliteDataDir(url, apiPackageRoot());
    fs.mkdirSync(dataDir, { recursive: true });
    _pglite = new PGlite(dataDir);
    _db = drizzlePglite(_pglite, { schema });
    console.log(`[db] Using PGlite at ${dataDir} (no Docker required)`);
    return _db;
  }

  _pool = new pg.Pool({
    connectionString: url,
    max: 20,
  });
  _db = drizzlePg(_pool, { schema });
  return _db;
}

/** Lazy singleton used by services */
export const db = new Proxy({} as AppDb, {
  get(_target, prop, receiver) {
    const real = getDb() as unknown as Record<PropertyKey, unknown>;
    const value = Reflect.get(real, prop, receiver);
    return typeof value === 'function' ? value.bind(real) : value;
  },
});

export type Db = AppDb;

export async function closeDb(): Promise<void> {
  if (_pool) {
    await _pool.end();
    _pool = null;
  }
  if (_pglite) {
    await _pglite.close();
    _pglite = null;
  }
  _db = null;
}
