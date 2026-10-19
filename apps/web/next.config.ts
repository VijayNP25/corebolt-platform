import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@corebolt/shared'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.core-bolt.com' },
      { protocol: 'https', hostname: '**.core-bolt.com' },
    ],
  },
  // Copied CoreBolt pages import `wouter`; resolve to our Next.js shim.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      wouter: path.resolve(rootDir, 'src/lib/wouter-compat.tsx'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
