import emailjs from '@emailjs/browser';

export type AskPriceMail = {
  name: string;
  email: string;
  mobile: string;
  company?: string;
  product: string;
  topic?: string;
  message?: string;
};

/**
 * Sends an Ask Price form to the Outlook inbox configured on the EmailJS template.
 * The recipient is set in EmailJS, not by the visitor.
 *
 * Template variables: name, email, reply_to, mobile, company, product, topic, message.
 */
export async function sendAskPriceEmail(input: AskPriceMail) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured');
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      name: input.name,
      email: input.email,
      reply_to: input.email,
      mobile: input.mobile,
      company: input.company ?? '',
      product: input.product,
      topic: input.topic ?? '',
      message: input.message ?? '',
    },
    { publicKey },
  );
}
