'use client'

import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white p-6 lg:p-24 flex flex-col justify-center items-center">
      <div className="max-w-300 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 border-l-8 border-primary pl-8 lg:pl-16">
          <span className="text-[10px] tracking-[0.6em] font-black text-primary/30 uppercase block mb-6">
            Status: Completed
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary uppercase leading-[0.85] tracking-tighter mb-10">
            Payment <br /> Accepted.
          </h1>
          <p className="text-lg lg:text-xl text-primary/60 font-medium max-w-md leading-relaxed">
            Your acquisition has been logged into our archive. Our logistics team is currently preparing your dispatch manifest.
          </p>
        </div>
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="relative w-48 h-48 border-4 border-primary rounded-full flex items-center justify-center mb-12 rotate-12 hover:rotate-0 transition-transform duration-700">
            <div className="absolute inset-2 border border-primary/20 rounded-full border-dashed"></div>
            <div className="text-center">
                <Check className="w-12 h-12 text-primary mx-auto mb-1" strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Verified</span>
            </div>
          </div>

          <div className="w-full space-y-4 text-right">
            <div className="group">
              <Link 
                href="/orders" 
                className="inline-flex items-center gap-4 text-sm font-black text-primary uppercase tracking-[0.3em] hover:gap-8 transition-all"
              >
                Track Order <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="pt-8 border-t border-primary/10">
               <p className="text-[9px] uppercase tracking-[0.4em] text-primary/30 font-bold mb-4">Post_Action</p>
               <Link 
                href="/products" 
                className="block w-full lg:w-64 bg-primary text-white py-5 text-center text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black transition-colors"
               >
                Shop More
               </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-12 left-12 hidden lg:block">
        <div className="flex items-center gap-4 opacity-20">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="text-[8px] uppercase tracking-[0.8em] font-black text-primary">
            End-to-End Encryption Secured
          </span>
        </div>
      </div>
    </div>
  );
}