import prisma from '@/lib/prisma';
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

