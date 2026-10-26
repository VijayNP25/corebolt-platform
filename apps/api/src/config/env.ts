import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),

  COOKIE_DOMAIN: z.string().default('localhost'),
  COOKIE_SECURE: z
    .string()
    .optional()
    .transform((v) => v === 'true'),

  WEB_ORIGIN: z.string().default('http://localhost:3000'),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000')
    .transform((v) =>
      v
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    ),

  EXCHANGE_RATE_API_KEY: z.string().optional().default(''),
  EXCHANGE_RATE_API_URL: z
    .string()
    .default('https://v6.exchangerate-api.com/v6'),
  DEFAULT_FX_MARKUP_PERCENT: z.string().default('2.5'),
  GST_PERCENT: z.string().default('18'),

  ICICI_MERCHANT_ID: z.string().optional().default(''),
  ICICI_SECRET_KEY: z.string().optional().default(''),
  ICICI_WEBHOOK_SECRET: z.string().optional().default(''),
  STRIPE_SECRET_KEY: z.string().optional().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default(''),

  AWS_ACCESS_KEY_ID: z.string().optional().default(''),
  AWS_SECRET_ACCESS_KEY: z.string().optional().default(''),
  SES_FROM_EMAIL: z.string().email().default('sales@core-bolt.com'),
  SES_REGION: z.string().default('ap-south-1'),
  OPS_NOTIFY_EMAIL: z.string().email().default('sales@core-bolt.com'),

  SEED_ADMIN_EMAIL: z.string().email().default('admin@core-bolt.com'),
  SEED_ADMIN_PASSWORD: z.string().min(8).default('ChangeMeAdmin123!'),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${details}`);
  }
  return parsed.data;
}

export const env = loadEnv();
