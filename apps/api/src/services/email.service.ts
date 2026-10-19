import { env } from '../config/env.js';

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Amazon SES stub — logs in development; swap for AWS SDK SES client in production.
 */
export class SesEmailService {
  async send(input: SendEmailInput): Promise<{ messageId: string }> {
    const to = Array.isArray(input.to) ? input.to : [input.to];
    const messageId = `ses-stub-${Date.now()}`;

    if (env.NODE_ENV !== 'test') {
      console.info('[SES stub] send', {
        from: env.SES_FROM_EMAIL,
        region: env.SES_REGION,
        to,
        subject: input.subject,
        messageId,
      });
    }

    return { messageId };
  }

  async sendVerificationEmail(to: string, verifyUrl: string): Promise<void> {
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
    });
  }
}

export const emailService = new SesEmailService();
