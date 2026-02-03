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
        <h2 className="text-5xl font-black text-center mb-12 uppercase tracking-tighter text-primary">
          Shop by Category<span className="opacity-20 italic">_</span>
        </h2>

        {/* Tab Navigation  */}
        <div className="flex justify-center mb-12 -mx-8">
          <div className="inline-flex border border-primary overflow-hidden">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-10 py-5 font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary hover:bg-neutral-50'
                  } ${index !== tabs.length - 1 ? 'border-r border-primary' : ''}`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                  <span>{tab.name}</span>
                  <span
                    className={`ml-2 font-mono text-[9px] ${
                      activeTab === tab.id
                        ? 'text-white/40'
                        : 'text-primary/30'
                    }`}
                  >
                    ({tab.products.length.toString().padStart(2, '0')})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activeProducts.length === 0 ? (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-primary/10">
              <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/30">
                No_Artifacts_Found_In_Directory
              </p>
            </div>
          ) : (
            activeProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block bg-white border border-primary/10 hover:border-primary transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden bg-neutral-50">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 font-black text-[10px] tracking-widest">
                    {product.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black mb-2 uppercase tracking-tighter text-primary group-hover:italic transition-all line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-primary/60 text-[11px] uppercase tracking-widest leading-relaxed line-clamp-2 mb-6 italic">
                    "{product.description}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                    <span className="text-[9px] font-mono font-black text-primary/30 uppercase tracking-[0.3em]">
                      {product.category}_
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                      View_Details
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
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
              className="inline-block bg-primary text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black transition-all"
            >
              View_Full_{activeTab}_Archive
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}