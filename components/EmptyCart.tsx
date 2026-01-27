'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Archive, Wind } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white selection:bg-primary selection:text-white">
      <div className="relative mb-12">
        <div className="w-32 h-32 border-2 border-primary/5 flex items-center justify-center rounded-full animate-pulse">
          <Wind className="w-12 h-12 text-primary/10" strokeWidth={1} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <div className="space-y-4 max-w-md">
        <p className="text-[11px] font-mono font-bold uppercase tracking-[.6em] text-primary/40">
          Bag_Status: 000
        </p>
        <h1 className="text-5xl md:text-6xl font-serif tracking-tighter uppercase leading-none text-primary">
          Manifest<span className="text-primary/20">_</span>Void
        </h1>
        <p className="text-[13px] font-medium uppercase tracking-widest text-primary/60 leading-relaxed pt-4">
          Your current session contains no active artifacts. The registry is currently awaiting input.
        </p>
      </div>
      <div className="mt-16 flex flex-col items-center gap-6">
        <Link 
          href="/products" 
          className="group relative bg-primary text-white py-6 px-12 text-[11px] font-black uppercase tracking-[.5em] transition-all hover:bg-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Archive className="w-4 h-4 transition-transform group-hover:-rotate-12" />
            Resume_Shopping
          </span>
        </Link>
        
        <Link 
          href="/" 
          className="text-[10px] font-mono font-bold uppercase tracking-[.3em] text-primary/40 hover:text-primary transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={12} /> Return_To_Base
        </Link>
      </div>

      {/* Technical Footer Decoration */}
      <div className="absolute bottom-12 left-0 right-0 hidden md:flex justify-between px-12 opacity-20 pointer-events-none">
        <div className="font-mono text-[9px] uppercase tracking-widest">
          Ref: NULL_PTR_MANIFEST
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest">
          Loc: {typeof window !== 'undefined' ? window.location.hostname : 'SERVER'}
        </div>
      </div>
    </div>
  );
}