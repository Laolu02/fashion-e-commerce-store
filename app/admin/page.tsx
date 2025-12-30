'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function Admin() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') redirect('/');

  const products = await prisma.product.findMany();
  const orders = await prisma.order.findMany({ include: { orderItems: true } });

  async function addProduct(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price')) * 100; // to kobo
    const imageUrl = formData.get('imageUrl') as string;
    const category = formData.get('category') as string;

    await prisma.product.create({ data: { name, description, price, imageUrl, category } });
    revalidatePath('/admin');
  }

  async function editProduct(id: string, formData: FormData) {
    'use server';
    // Similar to add, but update
    // Implement as needed
  }

  async function deleteProduct(id: string) {
    'use server';
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl">Admin Dashboard</h1>
      {/* Add Product Form */}
      <form action={addProduct} className="flex flex-col gap-2 my-4">
        <input name="name" placeholder="Name" required className="border p-2" />
        <input name="description" placeholder="Description" required className="border p-2" />
        <input name="price" type="number" placeholder="Price (NGN)" required className="border p-2" />
        <input name="imageUrl" placeholder="Image URL" required className="border p-2" />
        <input name="category" placeholder="Category" required className="border p-2" />
        <button type="submit" className="bg-black text-white p-2">Add Product</button>
      </form>
      {/* Products List with Edit/Delete */}
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id} className="flex justify-between">
          <p>{product.name}</p>
          <form action={deleteProduct.bind(null, product.id)}>
            <button type="submit" className="text-red-500">Delete</button>
          </form>
        </div>
      ))}
      {/* Orders List */}
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id} - Status: {order.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
}