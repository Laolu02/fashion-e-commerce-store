import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import CartItemComponent from '@/components/CartItem';
import Link from 'next/link';

export default async function Cart() {
  const session = await auth();
  if (!session) return <p>Please login.</p>;

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) return <p>Cart is empty.</p>;

  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl">Cart</h1>
      {cart.items.map((item) => (
        <CartItemComponent key={item.id} item={item} userId={session.user.id} />
      ))}
      <p className="text-xl">Subtotal: {(subtotal / 100).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
      <Link href="/checkout" className="bg-black text-white p-2">Checkout</Link>
    </div>
  );
}