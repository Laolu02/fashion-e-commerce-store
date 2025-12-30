// app/actions/cart.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateCartQuantity(cartItemId: string, quantity: number) {
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
  } else {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }
  revalidatePath('/cart');
}

export async function removeCartItem(cartItemId: string) {
  await prisma.cartItem.delete({ where: { id: cartItemId } });
  revalidatePath('/cart');
}