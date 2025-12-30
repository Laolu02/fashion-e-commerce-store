import { headers } from 'next/headers';
import crypto from 'crypto';

// Initialize transaction
export async function initializePaystackTransaction(email: string, amount: number, reference: string) {
  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount, // in kobo
      reference,
    }),
  });

  if (!res.ok) throw new Error('Failed to initialize transaction');

  const data = await res.json();
  return data.data.authorization_url;
}

// Verify transaction
export async function verifyPaystackTransaction(reference: string) {
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  });

  if (!res.ok) throw new Error('Failed to verify transaction');

  const data = await res.json();
  return data.data;
}

// Validate webhook signature
export function validatePaystackWebhook(request: Request) {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET!)
    .update(JSON.stringify(request.body))
    .digest('hex');

  return hash === headers().get('x-paystack-signature');
}