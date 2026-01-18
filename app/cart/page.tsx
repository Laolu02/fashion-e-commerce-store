import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import CartItemComponent from '@/components/CartItem';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default async function Cart() {
  const session = await auth();
  if (!session || !session.user ) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white p-6 border-x border-primary/10 max-w-362.5 mx-auto">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-150" />
        <Lock className="w-12 h-12 text-primary relative z-10" strokeWidth={1} />
      </div>
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-primary">
          Access_Restricted
        </h2>
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary/40">
          Authentication required to view this manifest
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm">
        <Link
          href="/login"
          className="group relative flex items-center justify-center bg-primary text-white py-4 px-8 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-black overflow-hidden"
        >
          <span className="relative z-10">Member_Access</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>

        <Link
          href="/register"
          className="flex items-center justify-center border border-primary text-primary py-4 px-8 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-primary/5 active:scale-[0.98]"
        >
          Member_Entry
        </Link>
      </div>
      <div className="mt-16 pt-8 border-t border-primary/5 w-full max-w-xs text-center">
        <p className="text-[8px] font-mono text-primary/20 uppercase">
          Error_Code: 401 // Unauthorized_Entry
        </p>
      </div>
    </div>
  );;

  const userId = session?.user?.id!;

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) return <p>Cart is empty.</p>;

  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white p-4 lg:p-12">
      <div className="max-w-350 mx-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 border-b-4 border-primary pb-10">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-black text-primary/30 uppercase block mb-4">Inventory_Control</span>
            <h1 className="text-7xl lg:text-9xl font-black text-primary tracking-tighter leading-[0.8] uppercase">
              Current <br /> Selection.
            </h1>
          </div>
          <div className="mt-8 lg:mt-0 text-right">
            <p className="text-[10px] tracking-[0.4em] font-black text-primary/40 uppercase mb-2">Manifest Total</p>
            <p className="text-5xl lg:text-6xl font-light text-primary tracking-tighter">
              ₦{(subtotal / 100).toLocaleString('en-NG')}
            </p>
          </div>
        </header>
        <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-primary/10 pb-4 mb-4">
          <div className="col-span-6 text-[9px] uppercase tracking-[0.4em] font-black text-primary/30">Item Description</div>
          <div className="col-span-2 text-[9px] uppercase tracking-[0.4em] font-black text-primary/30 text-center">Quantity</div>
          <div className="col-span-2 text-[9px] uppercase tracking-[0.4em] font-black text-primary/30 text-right">Unit Price</div>
          <div className="col-span-2 text-[9px] uppercase tracking-[0.4em] font-black text-primary/30 text-right">Valuation</div>
        </div>
        <div className="divide-y divide-primary/5 mb-20">
          {cart.items.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>

        <footer className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <div className="max-w-xs">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-primary mb-4">Terms of Acquisition</h3>
              <p className="text-[10px] leading-relaxed text-primary/50 uppercase tracking-tighter font-medium">
                Items in your bag are not reserved until checkout is complete. 
                International priority shipping calculated at final step.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-end">
            <div className="w-full lg:max-w-md bg-white border-2 border-primary p-8 shadow-[12px_12px_0px_0px] shadow-primary">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-primary">Subtotal</span>
                <span className="text-2xl font-black text-primary tracking-tighter">₦{(subtotal / 100).toLocaleString('en-NG')}</span>
              </div>
              
              <Link 
                href="/checkout" 
                className="group relative block w-full bg-primary py-6 text-center overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10 text-[12px] uppercase tracking-[0.6em] font-black text-white group-hover:text-primary transition-colors duration-500">
                  Execute Checkout
                </span>
                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </Link>
            </div>
            
            <Link href="/products" className="mt-6 text-[9px] uppercase tracking-[0.4em] font-black text-primary/40 hover:text-primary transition-colors">
              ← Continue Exploring Collections
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}