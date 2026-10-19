export type PaymentCurrency = 'INR' | 'USD';

export interface CreatePaymentInput {
  orderId: string;
  orderNumber: string;
  amount: string;
  currency: PaymentCurrency;
  customerEmail: string;
  customerName: string;
  returnUrl: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentResult {
  provider: 'icici' | 'stripe';
  paymentIntentId: string;
  /** Client redirect / checkout URL or client secret depending on provider */
  clientPayload: Record<string, unknown>;
}

export interface WebhookResult {
  verified: boolean;
  orderId?: string;
  paymentIntentId?: string;
  status: 'paid' | 'failed' | 'pending' | 'refunded';
  rawEventType?: string;
}

export interface PaymentProvider {
  readonly name: 'icici' | 'stripe';
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  /**
   * Verify webhook signature and parse event.
   * Implementations must reject unsigned / invalid payloads.
   */
  verifyAndParseWebhook(
    rawBody: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): Promise<WebhookResult>;
}
