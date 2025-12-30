import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validatePaystackWebhook, verifyPaystackTransaction } from '@/lib/paystack';

export async function POST(request: Request) {
  if (!validatePaystackWebhook(request)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = await request.json();

  if (event.event === 'charge.success') {
    const { reference } = event.data;

    const verification = await verifyPaystackTransaction(reference);

    if (verification.status === 'success') {
      const order = await prisma.order.findUnique({ where: { paymentReference: reference } });

      if (order && order.paymentStatus === 'PENDING') {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: 'PAID' },
        });

        // Clear cart
        const cart = await prisma.cart.findUnique({ where: { userId: order.userId } });
        if (cart) {
          await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}