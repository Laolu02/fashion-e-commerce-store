// components/CartItem.tsx
'use client';

import { updateCartQuantity, removeCartItem } from '@/app/actions/cart';
import { Plus, Minus, X } from 'lucide-react';

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  if (!item.product) return null;

  return (
    <div className="flex flex-col py-8 border-b border-primary/20 group animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      
        <div className="md:col-span-5 flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.5em] text-primary/60 font-black block mb-2">
            REF_{item.product.id.slice(-6).toUpperCase()}
          </span>
          <h4 className="text-3xl md:text-2xl font-black tracking-tighter text-primary uppercase leading-tight group-hover:italic transition-all">
            {item.product.name}
          </h4>
          <p className="text-[11px] uppercase tracking-widest text-primary/80 font-bold mt-1">
            UNIT: ₦{(item.product.price / 100).toLocaleString('en-NG')}
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col items-start md:items-center py-4 md:py-0 border-y md:border-none border-primary/5">
          <span className="text-[9px] uppercase tracking-[0.4em] text-primary/60 font-black mb-3">Quantity</span>
          <div className="flex items-center border-2 border-primary overflow-hidden">
            <form action={updateCartQuantity.bind(null, item.id, item.quantity - 1)}>
              <button 
                type="submit" 
                disabled={item.quantity <= 1}
                className="p-3 hover:bg-primary hover:text-white transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-primary"
              >
                <Minus className="w-4 h-4" />
              </button>
            </form>

            <span className="w-12 text-center text-sm font-black text-primary border-x-2 border-primary py-2">
              {item.quantity}
            </span>
            <form action={updateCartQuantity.bind(null, item.id, item.quantity + 1)}>
              <button 
                type="submit" 
                className="p-3 hover:bg-primary hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col items-start md:items-end">
          <span className="text-[9px] uppercase tracking-[0.4em] text-primary/60 font-black mb-1">
            Sub_Total
          </span>
          <div className="text-2xl font-black text-primary tracking-tighter">
            ₦{((item.product.price * item.quantity) / 100).toLocaleString('en-NG')}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-start md:justify-end">
          <form action={removeCartItem.bind(null, item.id)}>
            <button 
              type="submit" 
              className="group/remove flex items-center gap-2 border-2 border-transparent hover:border-red-500/20 px-2 py-1 transition-all"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/40 group-hover/remove:text-red-500">
                Discard
              </span>
              <X className="w-4 h-4 text-primary/40 group-hover/remove:text-red-500" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}