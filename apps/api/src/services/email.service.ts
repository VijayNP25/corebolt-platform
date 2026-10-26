import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { env } from '../config/env.js';

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

let sesClient: SESClient | null = null;

function sesReady(): boolean {
  return env.AWS_ACCESS_KEY_ID.length > 0 && env.AWS_SECRET_ACCESS_KEY.length > 0;
}

function getSesClient(): SESClient {
  if (!sesClient) {
    sesClient = new SESClient({
      region: env.SES_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return sesClient;
}

/**
 * Amazon SES. With empty AWS keys the message is written to the API log
 * so local checkout still completes.
 */
export class SesEmailService {
  async send(input: SendEmailInput): Promise<{ messageId: string }> {
    const to = Array.isArray(input.to) ? input.to : [input.to];

    if (!sesReady()) {
      const messageId = `ses-log-${Date.now()}`;
      if (env.NODE_ENV !== 'test') {
        console.info('[email] logged because SES keys are empty', {
          from: env.SES_FROM_EMAIL,
          region: env.SES_REGION,
          to,
          subject: input.subject,
          messageId,
        });
      }
      return { messageId };
    }

    try {
      const result = await getSesClient().send(
        new SendEmailCommand({
          Source: env.SES_FROM_EMAIL,
          Destination: { ToAddresses: to },
          Message: {
            Subject: { Data: input.subject, Charset: 'UTF-8' },
            Body: {
              Html: { Data: input.html, Charset: 'UTF-8' },
              ...(input.text ? { Text: { Data: input.text, Charset: 'UTF-8' } } : {}),
            },
          },
        }),
      );
      return { messageId: result.MessageId ?? '' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'SES send failed';
      console.error('[email] SES send failed', message);
      return { messageId: '' };
    }
  }

  async sendVerificationEmail(to: string, verifyUrl: string): Promise<void> {
    if (env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test') {
      console.info('[email] confirmation link', verifyUrl);
    }
    await this.send({
      to,
      subject: 'Verify your COREBOLT account',
      html: `<p>Please verify your email by visiting <a href="${verifyUrl}">${verifyUrl}</a></p>`,
      text: `Please verify your email: ${verifyUrl}`,
    });
  }

  async sendEnquiryNotification(enquiry: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    productName?: string | null;
  }): Promise<void> {
    await this.send({
      to: env.OPS_NOTIFY_EMAIL,
      subject: `New enquiry from ${enquiry.name}`,
      html: `<p>Enquiry <strong>${enquiry.id}</strong> from ${enquiry.name} (${enquiry.email} / ${enquiry.mobile})</p>
             <p>Product: ${enquiry.productName ?? 'n/a'}</p>`,
    });
  }

  async sendOrderConfirmation(to: string, orderNumber: string): Promise<void> {
    await this.send({
      to,
      subject: `Order ${orderNumber} confirmed — COREBOLT`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been confirmed.</p>`,
      text: `Your order ${orderNumber} has been confirmed.`,
    });
    await this.notifyOps(
      to,
      `Order ${orderNumber} confirmed`,
      `Order ${orderNumber} was confirmed for ${to}.`,
    );
  }

  async sendOrderReceived(to: string, orderNumber: string): Promise<void> {
    await this.send({
      to,
      subject: `Order ${orderNumber} received — COREBOLT`,
      html: `<p>We received your order <strong>${orderNumber}</strong>. Payment still needs to be completed before it is confirmed.</p>`,
      text: `We received your order ${orderNumber}. Payment still needs to be completed before it is confirmed.`,
    });
    await this.notifyOps(
      to,
      `New order ${orderNumber}`,
      `Order ${orderNumber} was placed by ${to}.`,
    );
  }

  async sendOrderStatus(input: {
    to: string;
    orderNumber: string;
    status: string;
    carrier?: string | null;
    trackingNumber?: string | null;
    note?: string | null;
  }): Promise<void> {
    const tracking =
      input.status === 'SHIPPED' && (input.carrier || input.trackingNumber)
        ? ` Carrier: ${input.carrier ?? '—'}. Tracking: ${input.trackingNumber ?? '—'}.`
        : '';
    const note = input.note?.trim() ? ` Note: ${input.note.trim()}` : '';
    const text = `Order ${input.orderNumber} is now ${input.status}.${tracking}${note}`;
    await this.send({
      to: input.to,
      subject: `Order ${input.orderNumber} is ${input.status} — COREBOLT`,
      html: `<p>${text}</p>`,
      text,
    });
    await this.notifyOps(input.to, `Order ${input.orderNumber} is ${input.status}`, text);
  }

  private async notifyOps(customerEmail: string, subject: string, text: string): Promise<void> {
    if (customerEmail.toLowerCase() === env.OPS_NOTIFY_EMAIL.toLowerCase()) return;
    await this.send({
      to: env.OPS_NOTIFY_EMAIL,
      subject,
      html: `<p>${text}</p>`,
      text,
    });
  }
}

export const emailService = new SesEmailService();
