"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {Search, User,ShoppingBag, Menu, Sparkles, Diamond, Leaf, Instagram, Twitter, Facebook } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "The Vanguard Dress", desc: "An exploration of form.",img: "https://images.unsplash.com/photo-1550630993-c5f35bb6363d?q=80&w=800"},
  { id: 2, name: "The Orbital Bag", desc: "Handcrafted precision.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800" }, 
  { id: 3, name: "The Structure Blazer", desc: "Modern tailoring.", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800" },
  { id: 4, name: "The Flux Trousers", desc: "Fluid silhouette.", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800" },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-emerald-300/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-300/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-360 mx-auto">
        {/* Navigation */}
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-275 z-50">
          <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1 bg-emerald-300 rounded-sm group-hover:rotate-45 transition-transform duration-500">
                <Sparkles size={16} className="text-slate-950" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">Project</span>
            </Link>

            <div className="hidden md:flex gap-10 items-center">
              {['Shop', 'Collections', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-xs font-bold uppercase tracking-widest hover:text-emerald-300 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {[Search, User, ShoppingBag].map((Icon, i) => (
                <button key={i} className="hover:text-emerald-300 transition-colors">
                  <Icon size={20} strokeWidth={1.5} />
                </button>
              ))}
              <button className="md:hidden">
                <Menu size={20} />
              </button>
            </div>
          </motion.header>
        </nav>

        {/* Hero Section */}
        <main className="pt-40 px-6 sm:px-12">
          <section className="flex flex-col lg:flex-row gap-12 items-center mb-32">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                REDEFINE <br /> 
                <span className="text-emerald-300">REALITY.</span>
              </h1>
              <p className="max-w-md text-lg text-white/60 font-light leading-relaxed italic">
                Wear your art. Discover a collection where geometric precision meets fluid craftsmanship.
              </p>
              <button className="group relative px-8 py-4 bg-emerald-300 text-slate-950 font-bold rounded-full overflow-hidden transition-all hover:pr-12">
                <span className="relative z-10">EXPLORE COLLECTION</span>
                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all">→</div>
              </button>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="relative w-full lg:w-1/2 aspect-4/5 rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            >
              <Image 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000" 
                alt="Editorial Fashion" 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </section>

          {/* Featured Looks - Horizontal Scroll */}
          <section className="mb-32">
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">Featured Looks</h2>
              <Link href="/shop" className="text-xs font-bold border-b border-emerald-300 pb-1 text-emerald-300">
                VIEW ALL
              </Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory">
              {PRODUCTS.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -10 }}
                  className="min-w-75 snap-start bg-slate-900 rounded-4xl overflow-hidden border border-white/5"
                >
                  <div className="relative aspect-3/4">
                    <Image 
                      src={product.img} 
                      alt={product.name} 
                      fill 
                      className="object-cover" 
                      sizes="300px"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-sm text-white/40">{product.desc}</p>
                    </div>
                    <button className="w-full py-3 rounded-full border border-emerald-900 text-xs font-bold hover:bg-emerald-300 hover:text-slate-950 transition-all">
                      SHOP NOW
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section className="grid md:grid-cols-3 gap-8 py-20 border-y border-white/10 mb-32">
            {[
              { icon: Sparkles, title: "UNIQUE DESIGN", body: "Every piece is a statement, crafted to be as unique as you are." },
              { icon: Diamond, title: "CRAFTSMANSHIP", body: "We use only the finest materials and meticulous techniques." },
              { icon: Leaf, title: "SUSTAINABILITY", body: "Committed to ethical sourcing and environmentally friendly production." }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-3xl hover:bg-white/5 transition-colors">
                <item.icon className="mb-6 text-emerald-300" size={32} strokeWidth={1} />
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.body}</p>
              </div>
            ))}
          </section>
        </main>

        <footer className="px-12 py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">© 2024 VANGUARD EXPERIMENTAL</p>
          <div className="flex gap-12 text-[10px] font-bold tracking-widest opacity-60">
            <Link href="#">TERMS</Link>
            <Link href="#">PRIVACY</Link>
          </div>
          <div className="flex gap-6 opacity-40">
            <Instagram size={18} />
            <Twitter size={18} />
            <Facebook size={18} />
          </div>
        </footer>
      </div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default LandingPage