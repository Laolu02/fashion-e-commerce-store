'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shirt, Handbag, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // formatted like "₦6,500"
  imageUrl: string;
  category: string;
}

interface CategoryTabsProps {
  menProducts: Product[];
  womenProducts: Product[];
  accessoriesProducts: Product[];
}

export default function CategoryTabs({
  menProducts,
  womenProducts,
  accessoriesProducts,
}: CategoryTabsProps) {
  const [activeTab, setActiveTab] = useState<'men' | 'women' | 'accessories'>('men');

  const tabs = [
    {
      id: 'men' as const,
      name: 'Men',
      icon: Shirt,
      products: menProducts,
    },
    {
      id: 'women' as const,
      name: 'Women',
      icon: Handbag,
      products: womenProducts,
    },
    {
      id: 'accessories' as const,
      name: 'Accessories',
      icon: Sparkles,
      products: accessoriesProducts,
    },
  ];

  const activeProducts = tabs.find((tab) => tab.id === activeTab)?.products || [];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>

        {/* Tab Navigation - Full-width, no gaps */}
        <div className="flex justify-center mb-12 -mx-8">
          <div className="inline-flex rounded-xl overflow-hidden shadow-lg border border-border">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-10 py-5 font-semibold text-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-neutral'
                      : 'bg-neutral text-primary hover:bg-accent'
                  } ${index !== tabs.length - 1 ? '' : ''}`}
                >
                  <Icon size={28} strokeWidth={2} />
                  <span>{tab.name}</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {tab.products.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activeProducts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-muted">
                No products available in this category yet.
              </p>
            </div>
          ) : (
            activeProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block bg-neutral rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-neutral px-4 py-2 rounded-full font-bold">
                    {product.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-muted text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted bg-accent px-4 py-2 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* View All Button */}
        {activeProducts.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href={`/products?category=${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              className="inline-block bg-primary text-neutral px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All {tabs.find((t) => t.id === activeTab)?.name} Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}