import crypto from 'node:crypto';
import { env } from '../../config/env.js';
import type {
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  WebhookResult,
} from './types.js';

/**
 * ICICI Bank PG stub.
 * Real integration will use api-portal.icici.bank.in once credentials are available.
 * Webhook verification structure mirrors HMAC-SHA256 over raw body.
 */
export class IciciProvider implements PaymentProvider {
  readonly name = 'icici' as const;

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const paymentIntentId = `icici_${input.orderId}_${Date.now()}`;
    return {
      provider: 'icici',
      paymentIntentId,
      clientPayload: {
        merchantId: env.ICICI_MERCHANT_ID || 'ICICI_STUB_MERCHANT',
        orderId: input.orderId,
        orderNumber: input.orderNumber,
        amount: input.amount,
        currency: input.currency,
        redirectUrl: input.returnUrl,
        stub: true,
      },
    };
  }

  async verifyAndParseWebhook(
    rawBody: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): Promise<WebhookResult> {
    const signatureHeader = headerValue(headers, 'x-icici-signature');
    const secret = env.ICICI_WEBHOOK_SECRET;

    if (!secret) {
      if (env.NODE_ENV === 'production') {
        return { verified: false, status: 'failed' };
      }
      // allow unsigned in non-production for local stubs
      return this.parseBody(rawBody, true);
    }

    if (!signatureHeader) {
      return { verified: false, status: 'failed' };
    }

    const expected = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const a = Buffer.from(expected);
    const b = Buffer.from(signatureHeader);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return { verified: false, status: 'failed' };
    }

    return this.parseBody(rawBody, true);
  }

  private parseBody(rawBody: Buffer, verified: boolean): WebhookResult {
    try {
      const payload = JSON.parse(rawBody.toString('utf8')) as {
        orderId?: string;
        paymentIntentId?: string;
        status?: string;
        event?: string;
      };
      const status =
        payload.status === 'SUCCESS' || payload.status === 'paid'
          ? 'paid'
          : payload.status === 'FAILED' || payload.status === 'failed'
            ? 'failed'
            : 'pending';

      return {
        verified,
        orderId: payload.orderId,
        paymentIntentId: payload.paymentIntentId,
        status,
        rawEventType: payload.event,
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
