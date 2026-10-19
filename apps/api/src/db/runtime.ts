import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Local dev without Docker/Postgres: DATABASE_URL=pglite:./.data/pglite
 * Production / Docker: DATABASE_URL=postgresql://...
 */
export function isPgliteUrl(url: string): boolean {
  return url === 'pglite' || url.startsWith('pglite:');
}

export function resolvePgliteDataDir(url: string, baseDir = process.cwd()): string {
  if (url === 'pglite') {
    return path.resolve(baseDir, '.data', 'pglite');
  }
  const raw = url.slice('pglite:'.length).trim();
  if (!raw || raw === '.' || raw === './') {
    return path.resolve(baseDir, '.data', 'pglite');
  }
  return path.isAbsolute(raw) ? raw : path.resolve(baseDir, raw);
}

export function apiPackageRoot(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
}

export function explainDbConnectionError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  const code =
    err && typeof err === 'object' && 'code' in err
      ? String((err as { code?: string }).code)
      : '';

  if (code === 'ECONNREFUSED' || msg.includes('ECONNREFUSED')) {
    return [
      '',
      '❌ Could not connect to PostgreSQL on localhost:5432.',
      '',
      'You do not have Docker/Postgres running. Use one of:',
      '',
      '  A) Zero-install local DB (recommended right now):',
      '     In apps/api/.env set:',
      '       DATABASE_URL=pglite:./.data/pglite',
      '     Then:  npx pnpm@9.15.0 db:migrate && npx pnpm@9.15.0 db:seed',
      '',
      '  B) Install Docker Desktop, then:',
      '       docker compose up -d',
      '       DATABASE_URL=postgresql://corebolt:corebolt@localhost:5432/corebolt',
      '',
      '  C) Install Postgres (Homebrew) later when ready.',
      '',
    ].join('\n');
  }

  return msg;
}
