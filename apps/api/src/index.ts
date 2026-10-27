import { createApp } from './app.js';
import { env } from './config/env.js';
import { refreshFromExchangeRateApi } from './services/currency.service.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`COREBOLT API listening on http://localhost:${env.PORT}`);
  console.log(`Health: http://localhost:${env.PORT}/api/v1/health`);
  void refreshFromExchangeRateApi();
});

const fxRefresh = setInterval(
  () => {
    void refreshFromExchangeRateApi();
  },
  12 * 60 * 60 * 1000,
);
fxRefresh.unref();

function shutdown(signal: string) {
  console.log(`${signal} received, shutting down…`);
  clearInterval(fxRefresh);
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
