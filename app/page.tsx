import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import HeroCarousel from '@/components/Hero';
import CategoryTabs from '@/components/CategoryTab';
import { Truck, ShieldCheck, Award } from "lucide-react";

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
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-primary text-neutral px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              View All Products
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
<section className="py-20 bg-accent">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Why Shop With Us
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Experience seamless shopping with trusted services that put you first
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      {/* Fast Delivery */}
      <div className="group relative bg-card bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 p-5 bg-primary/10 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Truck className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-foreground">Fast Delivery</h3>
          <p className="text-gray-600 leading-relaxed">
            Quick and reliable shipping across Nigeria with real-time tracking
          </p>
        </div>
      </div>

      {/* Secure Payment */}
      <div className="group relative bg-card bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border/50">
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 p-5 bg-primary/10 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <ShieldCheck className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-foreground">Secure Payment</h3>
          <p className="text-gray-600 leading-relaxed">
            Safe and encrypted transactions powered by Paystack – shop with confidence
          </p>
        </div>
      </div>

      {/* Quality Products */}
      <div className="group relative bg-card bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 p-5 bg-primary/10 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Award className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-foreground">Premium Quality</h3>
          <p className="text-gray-600 leading-relaxed">
            Handpicked collection of authentic, high-quality fashion items
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}