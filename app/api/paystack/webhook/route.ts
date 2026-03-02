

// app/api/paystack/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { sendPaymentConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  console.log('🔔 Webhook received!');
  
  try {
    // Get the request body
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    console.log('Signature:', signature);
    console.log('Body:', body);

    // Verify the webhook signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      console.log('❌ Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse the event data
    const event = JSON.parse(body);
    console.log('Event type:', event.event);

    // Handle the charge.success event
    if (event.event === 'charge.success') {
      const { reference, amount, customer } = event.data;
      console.log('Payment reference:', reference);
      console.log('Amount:', amount);

      // Find the order by payment reference
      const order = await prisma.order.findFirst({
        where: { paymentReference: reference },
        include: {
          user: true,
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        console.log('❌ Order not found for reference:', reference);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      console.log('Found order:', order.id);

      // Update order payment status
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'PAID',
        },
      });

      // Clear the user's cart
      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId: order.userId,
          },
        },
      });

      console.log('✅ Order updated to PAID and cart cleared for user:', order.userId);

      // Send payment confirmation email
      try {
        await sendPaymentConfirmationEmail({
          to: order.user.email,
          customerName: order.user.name,
          orderId: order.id,
          amount: amount / 100, // Convert kobo to NGN
          reference,
          orderItems: order.orderItems.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.price / 100,
          })),
        });
        console.log('📧 Email sent to:', order.user.email);
      } catch (emailError) {
        console.error('⚠️ Failed to send email:', emailError);
        // Don't fail the webhook — email failure isn't critical
      }

      return NextResponse.json({ message: 'Webhook processed successfully' });
    }

    // Handle payment failure
    if (event.event === 'charge.failed') {
      const { reference } = event.data;

      const order = await prisma.order.findFirst({
        where: { paymentReference: reference },
      });

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: 'FAILED' },
        });
        console.log('❌ Payment failed - order updated for reference:', reference);
      }

      return NextResponse.json({ message: 'Payment failed recorded' });
    }

    console.log('⚠️ Event not handled:', event.event);
    return NextResponse.json({ message: 'Event not handled' });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}