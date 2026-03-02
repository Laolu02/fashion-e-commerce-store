{/*import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { auth } from '@/lib/auth';

export default async function Products({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string }> 
}) {
  const session = await auth();
  const { category } = await searchParams;
  
  const where = category ? { category } : {};

  const products = await prisma.product.findMany({ where });

  return (
    <div className="p-8">
      <h1 className="text-4xl p-8">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}*/}
{/*}
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
//import { Search } from 'lucide-react';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const rawSearch = typeof params.search === 'string' 
    ? params.search.trim() 
    : '';

  const searchTerm = rawSearch.toLowerCase();

  // Check if search term exactly matches one of the categories (case-insensitive)
  const categoryMatch = ['men', 'women', 'accessories'].find(cat => cat === searchTerm);

  const whereClause = searchTerm
    ? {
        OR: [
          // Text search (always applied)
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },

          // Category exact match (only if user typed exactly "men", "women" or "accessories")
          ...(categoryMatch
            ? [{ category: categoryMatch.toUpperCase() as 'MEN' | 'WOMEN' | 'ACCESSORIES' }]
            : []),
        ],
      }
    : undefined;

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      category: true,
    },
  });*/}

  import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { Prisma } from '@prisma/client'; // 1. Added this import

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const rawSearch = typeof params.search === 'string' 
    ? params.search.trim() 
    : '';

  const searchTerm = rawSearch.toLowerCase();

  // Check if search term exactly matches one of the categories
  const categoryMatch = ['men', 'women', 'accessories'].find(cat => cat === searchTerm);

  // 2. Explicitly type the whereClause using Prisma.ProductWhereInput
  const whereClause: Prisma.ProductWhereInput = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' as Prisma.QueryMode } },
          { description: { contains: searchTerm, mode: 'insensitive' as Prisma.QueryMode } },
          ...(categoryMatch
            ? [{ category: { equals: categoryMatch.toUpperCase() as any } }]
            : []),
        ],
      }
    : {};

  // 3. One single, clean query call
  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      category: true,
    },
  });



  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header with integrated search form */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h1 className="text-4xl font-bold text-primary">
          {searchTerm
            ? `Search results for "${rawSearch}" (${products.length})`
            : 'Our Collections'}
        </h1>
{/*}
        <form 
          action="/products" 
          method="GET" 
          className="relative w-full md:w-80"
        >
          <input
            type="search"
            name="search"
            defaultValue={rawSearch}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-neutral border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-primary placeholder:text-muted"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-gray-800"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>*/}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6 text-muted/50">😕</div>
          <h2 className="text-2xl font-bold text-primary mb-3">No products found</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            We couldn’t find anything matching "{rawSearch}". Try different keywords or browse categories.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-gray-800 transition"
          >
            Clear Search
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}