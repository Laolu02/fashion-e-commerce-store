import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { auth } from '@/lib/auth';

export default async function Products({ searchParams }: { searchParams: { category?: string } }) {
  const session = await auth();
  const where = searchParams.category ? { category: searchParams.category } : {};

  const products = await prisma.product.findMany({ where });

  return (
    <div className="p-8">
      <h1 className="text-4xl p-8">Products </h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}