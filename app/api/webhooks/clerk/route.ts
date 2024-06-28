import { Webhook, WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  type EventType = 'user.created' | 'user.updated' | '*';

  type Event = {
    data: EventDataType;
    object: 'event';
    type: EventType;
  };

  type EventDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: EmailAddressType[];
    primary_email_address_id: string;
    attributes: Record<string, string | number>;
  };

  type EmailAddressType = {
    id: string;
    email_address: string;
  };

  
async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: Event | null = null;

  
  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
      ...attributes
    } = evt.data;

    await prisma.client.upsert({
      where: { externalId: id as string },
      create: {
        id: id as string,
        externalId: id as string,
        attributes,
      },
      update: {
        attributes,
      },
    });
  }
}
}
