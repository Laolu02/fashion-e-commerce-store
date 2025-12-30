'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { initializePaystackTransaction } from '@/lib/paystack';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default async function Checkout() {
  const session = await auth();
  if (!session) redirect('/login');

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) redirect('/cart');

  const totalAmount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  async function handlePayment() {
    'use server';
    const reference = uuidv4();

    // Create pending order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        paymentReference: reference,
        orderItems: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    const authUrl = await initializePaystackTransaction(session.user.email, totalAmount, reference);

    // Redirect to Paystack
    redirect(authUrl);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl">Checkout</h1>
      <p>Email: {session.user.email}</p>
      <p>Total: {(totalAmount / 100).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
      <form action={handlePayment}>
        <button type="submit" className="bg-black text-white p-2">Pay with Paystack</button>
      </form>
    </div>
  );
}