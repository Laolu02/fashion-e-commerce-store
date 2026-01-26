import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-primary py-16 mt-auto font-sans">
      <div className="max-w-[1450px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand / Core Identity */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="group inline-block">
              <div className="text-3xl font-black text-primary uppercase tracking-tighter leading-tight">
                ATELIER<span className="text-primary/20 group-hover:text-primary transition-colors duration-500">_ARCHIVE</span>
              </div>
            </Link>
            <p className="text-[13px] leading-relaxed uppercase font-medium tracking-wide text-primary/70 max-w-sm">
              A curated repository of timeless garments and objects. 
              Designed for longevity. Catalogued for the persistent seeker.
            </p>
            <div className="pt-4">
              <span className="text-[10px] font-mono font-bold bg-primary text-white px-3 py-1 uppercase tracking-widest">
                Established_2026
              </span>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-[11px] font-mono font-black mb-8 uppercase tracking-[.4em] text-primary/30 underline decoration-primary/10 underline-offset-8">
                Catalogue_
              </h3>
              <ul className="space-y-4">
                {['Shop_All', 'Apparel', 'Accessories', 'Objects'].map((link) => (
                  <li key={link}>
                    <Link href={`/products?category=${link}`} className="text-[11px] font-black uppercase tracking-widest hover:italic hover:translate-x-1 inline-block transition-all">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-mono font-black mb-8 uppercase tracking-[.4em] text-primary/30 underline decoration-primary/10 underline-offset-8">
                Protocol_
              </h3>
              <ul className="space-y-4">
                {['Shipping', 'Returns', 'Privacy', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link href={`/${link.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-widest hover:italic hover:translate-x-1 inline-block transition-all text-primary/60 hover:text-primary">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[11px] font-mono font-black mb-8 uppercase tracking-[.4em] text-primary/30 underline decoration-primary/10 underline-offset-8">
                Connect_
              </h3>
              <div className="flex flex-wrap gap-4">
                {['IG', 'FB', 'TW', 'LN'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="w-10 h-10 border border-primary/20 flex items-center justify-center text-[10px] font-mono font-bold hover:bg-primary hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ledger Bar */}
        <div className="border-t border-primary/10 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono">
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-primary/40 uppercase tracking-tighter">
              &copy; {new Date().getFullYear()} ATELIER_ARCHIVE. ALL_RIGHTS_RESERVED.
            </p>
            <p className="text-[9px] font-bold text-primary/20 uppercase tracking-tighter">
              LOC: 9.0579° N, 7.4951° E // SYSTEM_STABLE
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-primary/40 uppercase tracking-[.2em]">Server_Active</span>
            </div>
            <p className="text-[9px] font-bold text-primary/40 uppercase tracking-[.2em]">Ver_2.0.4</p>
          </div>
        </div>
      </div>
    </footer>
  );
}