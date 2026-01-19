'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Search, ShoppingBag, LogOut, Settings, Package, Menu, X, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  peculiarItemsCount?: number;
}

export default function Navbar({ peculiarItemsCount = 0 }: NavbarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b border-primary sticky top-0 z-100 font-sans">
      <div className="max-w-450 mx-auto px-4 md:px-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="shrink-0 group">
            <div className="text-lg font-black text-primary uppercase tracking-tighter leading-tight">
              ATELIER<span className="text-primary/20 group-hover:text-primary transition-colors duration-500">_ARCHIVE</span>
            </div>
          </Link>
          <div className="hidden md:flex flex-1 max-w-37.5 lg:max-w-xs xl:max-w-md mx-6 lg:mx-12">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH"
                className="w-full bg-transparent border-b border-primary/10 py-1 text-[8px] font-black uppercase tracking-[0.3em] focus:border-primary focus:outline-none transition-all placeholder:text-primary/10"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2">
                <Search className="w-3 h-3 text-primary/30 group-focus-within:text-primary transition-colors" />
              </button>
            </form>
          </div>
          <div className="flex items-center gap-4 lg:gap-10">
            <Link
              href="/products"
              className="hidden lg:block text-[9px] font-black uppercase tracking-[0.4em] text-primary/40 hover:text-primary transition-all"
            >
              Product
            </Link>
            <div className="flex items-center gap-2 lg:gap-6">
              <Link href="/cart" className="relative group flex items-center gap-2 py-2 px-1 lg:px-2">
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  {peculiarItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[7px] font-black w-3.5 h-3.5 flex items-center justify-center ring-1 ring-white">
                      {peculiarItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary group-hover:italic transition-all">
                  Bag
                </span>
              </Link>

              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-8 h-8 border border-primary flex items-center justify-center font-black text-[10px] hover:bg-primary hover:text-white transition-all shadow-[3px_3px_0px_0px] shadow-primary/5 active:translate-x-2px active:translate-y-2px active:shadow-none"
                  >
                    {session.user?.name?.[0]?.toUpperCase()}
                  </button>

                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-4 w-56 bg-white border border-primary z-50 animate-in fade-in slide-in-from-top-1"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <div className="p-4 border-b border-primary/10 bg-neutral-50">
                        <p className="text-[9px] font-black uppercase tracking-widest leading-none truncate text-primary">
                          {session.user?.name}
                        </p>
                      </div>
                      {/* To review orders made*/}
                      <Link href="/" className="flex items-center justify-between px-4 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 hover:bg-primary/5 transition-all">
                        <span>Manifests</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </Link>
                      <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-red-600 border-t border-primary/10 hover:bg-red-50 transition-all text-left">
                        <LogOut className="w-2.5 h-2.5" />
                        <span>Terminate_Session</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/register"
                    className="hidden sm:block border border-primary text-primary px-4 py-2 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all active:scale-95"
                  >
                    Member_Access
                  </Link>
                  <Link
                    href="/login"
                    className="bg-primary text-white px-5 py-2 border border-primary text-[9px] font-black uppercase tracking-[0.3em] hover:bg-black hover:border-black transition-all active:shadow-none active:translate-x-2px active:translate-y-2px"
                  >
                    Member_Entry
                  </Link>
                </div>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 border border-primary text-primary"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-150 flex flex-col p-10 pt-24 animate-in slide-in-from-right duration-500">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-3 border border-primary">
            <X size={24} className="text-primary" />
          </button>
          
          <div className="flex flex-col space-y-8">
            <form onSubmit={handleSearch} className="mb-8 relative border-b-2 border-primary">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH_ENTRY_"
                className="w-full py-4 bg-transparent outline-none text-3xl font-bold uppercase tracking-tighter"
              />
            </form>
            <Link href="/products" className="text-5xl font-bold uppercase tracking-tighter text-primary" onClick={() => setIsMobileMenuOpen(false)}>Shop_</Link>
            <Link href="/cart" className="text-5xl font-bold uppercase tracking-tighter text-primary" onClick={() => setIsMobileMenuOpen(false)}>Bag_({peculiarItemsCount})</Link>
            <div className="pt-10">
              <button onClick={() => signOut()} className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Logout_</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}