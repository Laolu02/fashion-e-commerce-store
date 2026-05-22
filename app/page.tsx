import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import HeroCarousel from '@/components/Hero';
import CategoryTabs from '@/components/CategoryTab';
import { Truck, ShieldCheck, Award, ArrowUpRight } from "lucide-react";

export default async function Home() {
  // Fetch featured products for hero carousel
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  const formattedFeatured = featuredProducts.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: `₦${(product.price / 100).toLocaleString()}`,
    imageUrl: product.imageUrl,
    category: product.category,
  }));

  // Fetch products by category for tabs
  const [menProducts, womenProducts, accessoriesProducts] = await Promise.all([
    prisma.product.findMany({
      where: { category: 'MEN' },
      take: 8,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.findMany({
      where: { category: 'WOMEN' },
      take: 8,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.findMany({
      where: { category: 'ACCESSORIES' },
      take: 8,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  // Format products for CategoryTabs component
  const formatProducts = (products: any[]) =>
    products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: `₦${(product.price / 100).toLocaleString()}`,
      imageUrl: product.imageUrl,
      category: product.category,
    }));

  return (
    <div>
      {/* Hero Carousel Section */}
      <main>
        <HeroCarousel products={formattedFeatured} />
      </main>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-362.5 mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-primary/10 pb-8">
            <div className="space-y-1">
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tighter">
  Featured_<br className="md:hidden" />Selection<span className="text-primary/20 italic">_</span>
</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-20 flex justify-center">
            <Link
              href="/products"
              className="px-12 py-5 border-2 border-primary text-primary text-[11px] font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-white transition-all text-center"
            >
              Full_Archive_Load
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Tabs Section */}
      <CategoryTabs
        menProducts={formatProducts(menProducts)}
        womenProducts={formatProducts(womenProducts)}
        accessoriesProducts={formatProducts(accessoriesProducts)}
      />

      {/* Why Shop With Us Section - Improved Modern Design */}
      <section className="py-24 bg-accent border-y border-primary/10">
        <div className="max-w-362.5 mx-auto px-6 lg:px-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-black text-primary/30 uppercase tracking-[.5em]">
                Service_Protocols
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none">
                Archive_Standards
                <span className="text-primary/10 italic">_</span>
              </h2>
            </div>
           <div className="max-w-xs md:text-right">
              <p className="text-[11px] font-medium text-primary/60 uppercase tracking-widest italic leading-relaxed">
                "Committed to the preservation of quality through specialized
                distribution networks."
              </p>
              <p className="text-[9px] font-mono font-bold text-primary/30 uppercase tracking-[0.2em] mt-4">
                Experience seamless shopping with trusted services that put you first
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-primary/20">
            <div className="group relative bg-accent p-10 border-r border-b border-primary/20 transition-all duration-500 hover:bg-white overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 border border-primary/10 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Truck className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                    [ _01 ]
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-4 text-primary uppercase tracking-tighter group-hover:italic transition-all">
                  Fast Delivery
                </h3>
                <p className="text-[12px] text-primary/60 uppercase tracking-wider leading-relaxed font-medium">
                  Quick and reliable shipping across Nigeria with real-time
                  tracking
                </p>
              </div>
            </div>

            {/* 02. Secure Payment */}
            <div className="group relative bg-accent p-10 border-r border-b border-primary/20 transition-all duration-500 hover:bg-white overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 border border-primary/10 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                    [ _02 ]
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-4 text-primary uppercase tracking-tighter group-hover:italic transition-all">
                  Secure Payment
                </h3>
                <p className="text-[12px] text-primary/60 uppercase tracking-wider leading-relaxed font-medium">
                  Safe and encrypted transactions powered by Paystack – shop
                  with confidence
                </p>
              </div>
            </div>

            {/* 03. Premium Quality */}
            <div className="group relative bg-accent p-10 border-r border-b border-primary/20 transition-all duration-500 hover:bg-white overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 border border-primary/10 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Award className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                    [ _03 ]
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-4 text-primary uppercase tracking-tighter group-hover:italic transition-all">
                  Premium Quality
                </h3>
                <p className="text-[12px] text-primary/60 uppercase tracking-wider leading-relaxed font-medium">
                  Stringent archival standards for handpicked garments and
                  premium aesthetic artifacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
