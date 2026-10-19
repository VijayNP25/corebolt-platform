import { Router, type Request, type Response } from 'express';
import { eq } from 'drizzle-orm';
import { asyncHandler } from '../lib/asyncHandler.js';
import { db } from '../db/client.js';
import { orders } from '../db/schema.js';
import { getProviderByName } from '../services/payments/index.js';
import * as ordersService from '../services/orders.service.js';

const router = Router();

/**
 * Raw body must be preserved for signature verification.
 * Mount these routes with express.raw() in app.ts.
 */
async function handleWebhook(
  providerName: 'icici' | 'stripe',
  req: Request,
  res: Response,
): Promise<void> {
  const rawBody = Buffer.isBuffer(req.body)
    ? req.body
    : Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {}));

  const provider = getProviderByName(providerName);
  const result = await provider.verifyAndParseWebhook(rawBody, req.headers);

  if (!result.verified) {
    res.status(400).json({ error: { code: 'INVALID_SIGNATURE', message: 'Webhook rejected' } });
    return;
  }

  let orderId = result.orderId;
  if (!orderId && result.paymentIntentId) {
    const order = await db.query.orders.findFirst({
      where: eq(orders.paymentIntentId, result.paymentIntentId),
    });
    orderId = order?.id;
  }

  if (!orderId) {
    res.status(202).json({ received: true, handled: false });
    return;
  }

  if (result.status === 'paid') {
    await ordersService.markOrderPaid(orderId, result.paymentIntentId);
  } else if (result.status === 'failed') {
    await ordersService.markOrderPaymentFailed(orderId);
  }

  res.json({ received: true, handled: true, status: result.status });
}

router.post(
  '/icici',
  asyncHandler(async (req, res) => {
    await handleWebhook('icici', req, res);
  }),
);

router.post(
  '/stripe',
  asyncHandler(async (req, res) => {
    await handleWebhook('stripe', req, res);
  }),
);

export function rawBodySaver(
  req: Request,
  _res: Response,
  buf: Buffer,
  _encoding: string,
): void {
  (req as Request & { rawBody?: Buffer }).rawBody = buf;
}

export default router;
