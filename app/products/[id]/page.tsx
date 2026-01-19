'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return <p>Please login to add to cart.</p>;

  const product = await prisma.product.findUnique({ where: { id: (await params).id } });
  if (!product) return <p>Product not found.</p>;

  async function addToCart(formData: FormData) {
    'use server';
    const userId = session?.user?.id!;
    if (!userId) {
      return redirect ('/login');
    }
    const userRecord = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true }
  });
  if (!userRecord) {
    console.error("CRITICAL: Session ID exists but User record is missing from DB.");
    return redirect('/login?error=SessionExpired');
  }
    let cart = await prisma.cart.findUnique({ where: { userId: userId } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { user: {connect: { id: userId}} } });
    }

    const productId = product?.id;
    if (!productId) throw new Error("PRODUCT_NOT_FOUND");

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId: product?.id },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId: product?.id, quantity: 1 },
      });
    }

    revalidatePath('/cart');
    revalidatePath(`/products/${productId}`);
    revalidatePath('/', 'layout');
  }

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white font-sans overflow-x-hidden">
      <div className="flex flex-col lg:flex-row max-w-400 mx-auto min-h-screen">
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20">
          <div className="relative w-full max-w-95 lg:max-w-md aspect-3/4 overflow-hidden border border-primary/10 shadow-[15px_15px_0px_0px] shadow-primary/5">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000" 
            />
            <div className="absolute bottom-4 left-4">
               <span className="text-[8px] tracking-[0.6em] text-white mix-blend-difference uppercase font-bold">
                Atelier_Visual_Ref
              </span>
            </div>
          </div>
        </section>
        <section className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 flex flex-col justify-center text-center lg:text-left">
          <header className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary uppercase leading-[0.9] mb-8 wrap-break-word">
              {product.name}
            </h1>
            
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 justify-center lg:justify-start">
              <span className="text-3xl lg:text-4xl font-light text-primary tracking-tighter">
                ₦{(product.price / 100).toLocaleString('en-NG')}
              </span>
              <div className="hidden lg:block h-px w-12 bg-primary/30"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-primary/40 font-bold">
                Authentic Archive
              </span>
            </div>
          </header>
          <article className="mb-16 mx-auto lg:mx-0 max-w-md lg:max-w-lg">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary/30 font-black mb-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="w-4 h-px bg-primary/20"></span>
              The Cut
            </h3>
            <p className="text-base lg:text-lg leading-relaxed text-primary/70 font-medium">
              {product.description}
            </p>
          </article>
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <form action={addToCart}>
              <button 
                type="submit" 
                className="group relative w-full overflow-hidden border-2 border-primary py-6 transition-all duration-500 bg-white"
              >
                <span className="relative z-10 text-[12px] uppercase tracking-[0.6em] font-bold text-primary group-hover:text-white transition-colors duration-500">
                  Add to Bag
                </span>
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-primary/5 grid grid-cols-2 gap-4">
              <div className="text-center lg:text-left">
                <p className="text-[8px] uppercase tracking-widest text-primary/30 font-bold mb-1">Shipping</p>
                <p className="text-[9px] uppercase font-bold text-primary">Priority Courier</p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-[8px] uppercase tracking-widest text-primary/30 font-bold mb-1">Origin</p>
                <p className="text-[9px] uppercase font-bold text-primary">Imported Archive</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="hidden xl:block fixed -right-20 top-1/2 -rotate-90 origin-center opacity-[0.02] select-none pointer-events-none">
        <span className="text-[140px] font-bold text-primary uppercase tracking-tighter whitespace-nowrap">
          {product.name}
        </span>
      </div>
    </div>
  );
}