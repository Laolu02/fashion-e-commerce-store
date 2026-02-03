'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Search, ShoppingBag, LogOut, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  peculiarItemsCount?: number;
}

export default function Navbar({ peculiarItemsCount = 0 }: NavbarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b border-primary sticky top-0 z-100 font-sans">
      <div className="max-w-362.5 mx-auto px-4 md:px-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="shrink-0 group">
            <div className="text-lg font-black text-primary uppercase tracking-tighter leading-tight">
              ATELIER<span className="text-primary/20 group-hover:text-primary transition-colors duration-500">_ARCHIVE</span>
            </div>
          </Link>
          <div className="hidden md:flex flex-1 max-w-md mx-6 lg:mx-12">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH"
                className="w-full bg-transparent border-b border-primary/20 py-1 text-[8px] font-black uppercase tracking-[0.3em] focus:border-primary focus:outline-none transition-all placeholder:text-primary/30"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2">
                <Search className="w-3.5 h-3.5 text-primary/60 group-focus-within:text-primary transition-colors" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2 md:gap-4 lg:gap-10">
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="p-2 text-primary hover:bg-neutral-50 transition-colors"
              >
                <Search size={18} strokeWidth={2.5} />
              </button>

              <Link href="/cart" className="relative p-2">
                <ShoppingBag className="w-18px h-18px text-primary" strokeWidth={2.5} />
                {peculiarItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-white text-[7px] font-black w-3.5 h-3.5 flex items-center justify-center ring-1 ring-white">
                    {peculiarItemsCount}
                  </span>
                )}
              </Link>
            </div>
            <div className="hidden lg:block">
              <Link href="/products" className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/40 hover:text-primary transition-all">
                Collection
              </Link>
            </div>

            <Link href="/cart" className="hidden md:flex relative group items-center gap-2 py-2 px-2">
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
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-8 h-8 border border-primary flex items-center justify-center font-black text-[10px] hover:bg-primary hover:text-white transition-all shadow-[3px_3px_0px_0px] shadow-primary/5"
                  >
                    {session.user?.name?.[0]?.toUpperCase()}
                  </button>
                </div>
              ) : (
                <><div className="flex items-center gap-2">
                    <Link href="/register" className="bg-primary text-white px-5 py-2 border border-primary text-[9px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all">
                     Sign_Up_ {/*Member_Access_*/}
                    </Link>
                  </div><div className="flex items-center gap-2">
                      <Link href="/login" className="bg-primary text-white px-5 py-2 border border-primary text-[9px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all">
                        Log_In_ {/*Member_Entry_*/}
                      </Link>
                    </div></>
              )}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 border-2 border-primary text-primary active:bg-primary active:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-200 p-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-4 border-b-4 border-primary pb-2 mt-12">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH_INDEX_"
              className="flex-1 bg-transparent outline-none text-3xl font-black uppercase tracking-tighter"
            />
            <button onClick={handleSearch} className="p-3 bg-primary text-white">
              <Search className="w-6 h-6" />
            </button>
            <button onClick={() => setIsMobileSearchOpen(false)} className="p-3 border border-primary/20">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-150 flex flex-col p-10 pt-24 animate-in slide-in-from-right duration-500">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-3 border-2 border-primary">
            <X size={24} />
          </button>

          <div className="flex flex-col space-y-10">
            <Link 
              href="/products" 
              className="text-5xl font-black uppercase tracking-tighter text-primary hover:italic transition-all" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop_
            </Link>
            
            <div className="flex flex-col space-y-6">
              {!session ? (
                <>
                  <Link 
                    href="/login" 
                    className="text-4xl font-black uppercase tracking-tighter text-primary border-l-12px border-primary pl-6 hover:pl-9 transition-all" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Member_Entry_
                  </Link>
                  <Link 
                    href="/register" 
                    className="text-4xl font-black uppercase tracking-tighter text-primary/30 pl-18px hover:text-primary transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Member_Access_
                  </Link>
                </>
              ) : (
                <>
                  {session.user?.role === "ADMIN" && (
                    <Link 
                      href="/admin" 
                      className="text-4xl font-black uppercase tracking-tighter text-primary border-l-12px border-black pl-6 hover:pl-9 transition-all" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin_Control_
                    </Link>
                  )}
                  <Link 
                    href="/manifests" 
                    className="text-4xl font-black uppercase tracking-tighter text-primary pl-18px" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Manifest_Log_
                  </Link>
                </>
              )}
            </div>
            <div className="mt-auto pb-10 border-t border-primary/10 pt-10">
              {session ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[.3em] text-primary/40">Active_Protocol</p>
                    <p className="text-sm font-black uppercase tracking-tight">{session.user?.name}</p>
                    <p className="text-[9px] font-mono text-primary/30 uppercase">{session.user?.email}</p>
                  </div>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); signOut(); }} 
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 border-b-2 border-red-600 pb-1"
                  >
                    Terminate_Session_
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-primary/20 uppercase tracking-widest italic">Guest_Access_Active</p>
                  <p className="text-[8px] font-mono text-primary/10 uppercase tracking-tighter">System_Status: Stable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}