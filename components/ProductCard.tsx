import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white border border-primary/20 overflow-hidden transition-all duration-700 hover:border-primary">
      <div className="relative h-80 overflow-hidden bg-neutral-50">
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/40 z-10 pointer-events-none group-hover:border-primary transition-colors" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/40 z-10 pointer-events-none group-hover:border-primary transition-colors" />
        
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-size-[100%_4px,3px_100%] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full" />
              <p className="text-[10px] font-mono font-black text-primary/40 uppercase tracking-[.4em]">
                {product.category}_
              </p>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-[0.9] text-primary group-hover:italic group-hover:translate-x-1 transition-all">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
             <p className="text-[9px] font-mono text-primary/30 uppercase tracking-tighter mb-1">Price_Unit</p>
             <p className="text-lg font-black text-primary tracking-tighter">
               ₦{(product.price / 100).toLocaleString('en-NG')}
             </p>
          </div>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="flex items-center justify-between w-full bg-primary text-white py-4 px-5 text-[10px] font-black uppercase tracking-[.5em] transition-all duration-500 hover:bg-black group/btn"
        >
          <span className="flex items-center gap-2">
            <Plus className="w-3 h-3 group-hover/btn:rotate-90 transition-transform" />
            View_Details
          </span>
          <ArrowUpRight className="w-4 h-4 opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
        </Link>
      </div>
     
    </div>
  );
}