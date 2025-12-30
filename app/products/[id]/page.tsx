'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return <p>Please login to add to cart.</p>;

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return <p>Product not found.</p>;

  async function addToCart(formData: FormData) {
    'use server';
    const userId = session.user.id;
    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId: product.id },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId: product.id, quantity: 1 },
      });
    }

    revalidatePath('/cart');
  }

  return (
    <div className="p-8 flex">
      <img src={product.imageUrl} alt={product.name} className="w-1/2" />
      <div className="ml-8">
        <h1 className="text-3xl">{product.name}</h1>
        <p>{(product.price / 100).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
        <p>{product.description}</p>
        <form action={addToCart}>
          <button type="submit" className="bg-black text-white p-2">Add to Cart</button>
        </form>
      </div>
    </div>
  );
}