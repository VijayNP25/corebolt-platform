import { Router } from 'express';
import { sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { asyncHandler } from '../lib/asyncHandler.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    let database: 'up' | 'down' = 'down';
    try {
      await db.execute(sql`select 1`);
      database = 'up';
    } catch {
      database = 'down';
    }

    res.status(database === 'up' ? 200 : 503).json({
      data: {
        status: database === 'up' ? 'ok' : 'degraded',
        service: 'corebolt-api',
        database,
        timestamp: new Date().toISOString(),
        note:
          database === 'down'
            ? 'Postgres unavailable — start Docker/Postgres then run migrate + seed. Web UI still works with static catalogue + local cart.'
            : undefined,
      },
    });
  }),
);

export default router;
