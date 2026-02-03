'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
}

interface HeroCarouselProps {
  products: Product[];
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!products || products.length === 0) {
    return (
      <div className="">
        <section className="bg-linear-to-b from-accent to-background py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Timeless Fashion, Modern Style</h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-10">
            Discover curated pieces that blend comfort and elegance
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-primary text-neutral px-10 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
          >
            Shop Collection
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="">
      <section className="relative bg-linear-to-b from-accent to-background py-2 overflow-hidden">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product) => (
              <div key={product.id} className="flex-[0_0_100%] min-w-0">
                <div className="relative">
                  {/* Background Product Image */}
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-accent/80 to-background/90" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      {/* Left Side - Text Content */}
                      <div className="text-center md:text-left">
                        <div className="mb-4">
                          <span className="inline-block bg-primary/20 text-primary px-4 py-1 text-[10px] font-mono font-black uppercase tracking-[0.3em]">
                            {product.category}_
                          </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-primary">
                          {product.name}
                        </h1>
                        
                        <p className="text-[13px] font-medium uppercase tracking-widest text-secondary max-w-2xl mb-6 italic leading-relaxed">
                          "{product.description}"
                        </p>
                        
                        <div className="text-3xl font-black text-primary mb-8 tracking-tighter">
                          {product.price}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                          <Link 
                            href={`/products/${product.id}`}
                            className="inline-block bg-primary text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all active:translate-y-1"
                          >
                            View_Entry
                          </Link>
                          <Link 
                            href="/products"
                            className="inline-block border-2 border-primary text-primary px-10 py-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all active:translate-y-1"
                          >
                            Shop_Archive
                          </Link>
                        </div>
                      </div>

                      {/* Right Side - Product Image */}
                      <div className="relative">
                        <div className="relative h-100 md:h-125">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition z-20"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition z-20"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all ${
                index === selectedIndex 
                  ? 'bg-primary w-8 h-0.5' 
                  : 'bg-gray-400 w-3 h-0.5 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}