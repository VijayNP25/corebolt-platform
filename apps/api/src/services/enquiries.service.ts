import { desc, eq } from 'drizzle-orm';
import type { EnquiryInput, EnquiryStatus } from '@corebolt/shared';
import { db } from '../db/client.js';
import { enquiries, enquiryStatusHistory } from '../db/schema.js';
import { NotFoundError, ValidationError } from '../lib/errors.js';
import { emailService } from './email.service.js';

export async function createEnquiry(
  input: EnquiryInput,
  userId?: string,
) {
  const [enquiry] = await db
    .insert(enquiries)
    .values({
      status: 'NEW',
      name: input.name,
      email: input.email.toLowerCase(),
      mobile: input.mobile,
      company: input.company,
      topic: input.topic,
      message: input.message,
      action: input.action,
      productId: input.productId,
      productSlug: input.productSlug,
      productName: input.productName,
      productIds: input.productIds ?? [],
      products: input.products ?? [],
      systemCore: input.systemCore,
      orderInformation: input.orderInformation,
      userId,
    })
    .returning();

  if (!enquiry) throw new Error('Failed to create enquiry');

  await db.insert(enquiryStatusHistory).values({
    enquiryId: enquiry.id,
    fromStatus: null,
    toStatus: 'NEW',
    note: 'Enquiry submitted',
    changedByUserId: userId,
  });

  await emailService.sendEnquiryNotification({
    id: enquiry.id,
    name: enquiry.name,
    email: enquiry.email,
    mobile: enquiry.mobile,
    productName: enquiry.productName,
  });

  await emailService.send({
    to: enquiry.email,
    subject: 'We received your enquiry — COREBOLT',
    html: `<p>Thanks ${enquiry.name}, our team will contact you shortly.</p>`,
  });

  return enquiry;
}

export async function listEnquiries(opts?: { status?: EnquiryStatus }) {
  return db.query.enquiries.findMany({
    where: opts?.status ? eq(enquiries.status, opts.status) : undefined,
    orderBy: [desc(enquiries.createdAt)],
  });
}

export async function getEnquiry(id: string) {
  const enquiry = await db.query.enquiries.findFirst({
    where: eq(enquiries.id, id),
  });
  if (!enquiry) throw new NotFoundError('Enquiry not found');

  const history = await db.query.enquiryStatusHistory.findMany({
    where: eq(enquiryStatusHistory.enquiryId, id),
    orderBy: [desc(enquiryStatusHistory.createdAt)],
  });

  return { ...enquiry, history };
}

const ENQUIRY_FLOW: EnquiryStatus[] = ['NEW', 'CONTACTED', 'BOOKED', 'CLOSED'];

export async function updateEnquiryStatus(input: {
  enquiryId: string;
  toStatus: EnquiryStatus;
  actorUserId: string;
  note?: string;
}) {
  const enquiry = await db.query.enquiries.findFirst({
    where: eq(enquiries.id, input.enquiryId),
  });
  if (!enquiry) throw new NotFoundError('Enquiry not found');

  const terminal = ['SPAM', 'REJECTED', 'CLOSED'] as EnquiryStatus[];
  if (terminal.includes(enquiry.status) && !['SPAM', 'REJECTED'].includes(input.toStatus)) {
    // allow reopen only via admin note path — for v1 block
    if (enquiry.status === 'CLOSED' && input.toStatus !== 'CLOSED') {
      throw new ValidationError('Closed enquiries cannot be reopened');
    }
  }

  // Allow SPAM/REJECTED from any non-terminal, and forward pipeline
  const fromIdx = ENQUIRY_FLOW.indexOf(enquiry.status as (typeof ENQUIRY_FLOW)[number]);
  const toIdx = ENQUIRY_FLOW.indexOf(input.toStatus as (typeof ENQUIRY_FLOW)[number]);
  const isSpamish = input.toStatus === 'SPAM' || input.toStatus === 'REJECTED';

  if (!isSpamish && (fromIdx === -1 || toIdx === -1 || toIdx < fromIdx)) {
    throw new ValidationError(
      `Cannot transition from ${enquiry.status} to ${input.toStatus}`,
    );
  }

  const [updated] = await db
    .update(enquiries)
    .set({ status: input.toStatus })
    .where(eq(enquiries.id, enquiry.id))
    .returning();

  await db.insert(enquiryStatusHistory).values({
    enquiryId: enquiry.id,
    fromStatus: enquiry.status,
    toStatus: input.toStatus,
    note: input.note,
    changedByUserId: input.actorUserId,
  });

  return updated;
}
