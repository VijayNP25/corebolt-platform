import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import v1 from './routes/index.js';
import webhooksRoutes from './routes/webhooks.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
    }),
  );

  // Payment webhooks need raw body for signature verification
  app.use(
    '/api/v1/webhooks',
    express.raw({ type: '*/*' }),
    webhooksRoutes,
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get('/', (_req, res) => {
    res.json({
      name: 'COREBOLT API',
      version: 'v1',
      health: '/api/v1/health',
      openapi: '/openapi.json',
    });
  });

  app.get('/openapi.json', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/openapi.json'));
  });

  app.use('/api/v1', v1);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
