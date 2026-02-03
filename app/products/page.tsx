import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { auth } from '@/lib/auth';

export default async function Products({ 
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
  });


  return (
    <div className="max-w-362.5 mx-auto px-6 py-12 md:px-10">
      <header className="flex flex-col md:flex-row justify-between items-baseline border-b border-primary/10 pb-10 mb-12">
        <div className="space-y-1">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-primary">
            Products<span className="text-primary/10 italic">_</span>
          </h1>
        </div>
      </header>

      {/* Responsive Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 border-2 border-dashed border-primary/5 flex items-center justify-center">
             <p className="text-[10px] font-mono uppercase tracking-[.5em] text-primary/20">
               No_Artifacts_Found_In_Directory
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
