import crypto from 'node:crypto';
import { env } from '../../config/env.js';
import type {
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  WebhookResult,
} from './types.js';

/**
 * Stripe PaymentIntents stub with Stripe-Signature verification structure.
 * Real SDK can replace createPayment; keep verifyAndParseWebhook shape.
 */
export class StripeProvider implements PaymentProvider {
  readonly name = 'stripe' as const;

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const paymentIntentId = `pi_stub_${input.orderId}_${Date.now()}`;
    return {
      provider: 'stripe',
      paymentIntentId,
      clientPayload: {
        clientSecret: `${paymentIntentId}_secret_stub`,
        publishableKey: 'pk_test_stub',
        amount: input.amount,
        currency: input.currency.toLowerCase(),
        stub: true,
      },
    };
  }

  async verifyAndParseWebhook(
    rawBody: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): Promise<WebhookResult> {
    const signatureHeader = headerValue(headers, 'stripe-signature');
    const secret = env.STRIPE_WEBHOOK_SECRET;

    if (!secret) {
      if (env.NODE_ENV === 'production') {
        return { verified: false, status: 'failed' };
      }
      return this.parseEvent(rawBody, true);
    }

    if (!signatureHeader) {
      return { verified: false, status: 'failed' };
    }

    // Stripe-Signature: t=timestamp,v1=hmac
    const parts = Object.fromEntries(
      signatureHeader.split(',').map((p) => {
        const [k, ...rest] = p.split('=');
        return [k, rest.join('=')];
      }),
    );
    const timestamp = parts['t'];
    const v1 = parts['v1'];
    if (!timestamp || !v1) {
      return { verified: false, status: 'failed' };
    }

    const signedPayload = `${timestamp}.${rawBody.toString('utf8')}`;
    const expected = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex');

    const a = Buffer.from(expected);
    const b = Buffer.from(v1);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return { verified: false, status: 'failed' };
    }

    // Reject stale timestamps (>5 min) in production-like fashion
    const ageSec = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
    if (Number.isFinite(ageSec) && ageSec > 300) {
      return { verified: false, status: 'failed' };
    }

    return this.parseEvent(rawBody, true);
  }

  private parseEvent(rawBody: Buffer, verified: boolean): WebhookResult {
    try {
      const event = JSON.parse(rawBody.toString('utf8')) as {
        type?: string;
        data?: {
          object?: {
            id?: string;
            metadata?: { orderId?: string };
            status?: string;
          };
        };
      };
      const obj = event.data?.object;
      const type = event.type ?? '';
      let status: WebhookResult['status'] = 'pending';
      if (type === 'payment_intent.succeeded' || obj?.status === 'succeeded') {
        status = 'paid';
      } else if (
        type === 'payment_intent.payment_failed' ||
        obj?.status === 'requires_payment_method'
      ) {
        status = 'failed';
      } else if (type === 'charge.refunded') {
        status = 'refunded';
      }

      return {
        verified,
        orderId: obj?.metadata?.orderId,
        paymentIntentId: obj?.id,
        status,
        rawEventType: type,
      };
    } catch {
      return { verified: false, status: 'failed' };
    }
  }
}

function headerValue(
  headers: Record<string, string | string[] | undefined>,
  name: string,
): string | undefined {
  const key = Object.keys(headers).find((k) => k.toLowerCase() === name.toLowerCase());
  if (!key) return undefined;
  const v = headers[key];
  return Array.isArray(v) ? v[0] : v;
}
