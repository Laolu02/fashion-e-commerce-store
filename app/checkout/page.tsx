import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { initializePaystackTransaction } from '@/lib/paystack';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';


export default async function Checkout() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) redirect('/cart');

  const totalAmount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const date = new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: '2-digit' });

  async function handlePayment() {
    'use server';
    const reference = uuidv4();

    await prisma.order.create({
      data: {
        userId: session?.user?.id as string,
        totalAmount,
        paymentReference: reference,
        orderItems: {
          create: cart?.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    const authUrl = await initializePaystackTransaction(session?.user?.email!, totalAmount, reference);

     // Redirect to Paystack
    redirect(authUrl);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4 flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-md bg-white p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative border-t-8 border-primary">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-primary tracking-tighter uppercase mb-2">ATELIER RECEIPT</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 font-bold mb-6">Official Acquisition Manifest</p>
          <div className="flex justify-between text-[9px] font-bold text-primary/40 uppercase tracking-widest border-y border-dashed border-primary/20 py-3">
            <span>Date: {date}</span>
            <span>Ref: {uuidv4().slice(0, 8).toUpperCase()}</span>
          </div>
        </div>
        <div className="space-y-4 mb-10">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/30 block mb-4">Items_Summary</span>
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-xs border-b border-dotted border-primary/10 pb-2">
              <div className="max-w-[70%]">
                <p className="font-bold text-primary uppercase">{item.product.name}</p>
                <p className="text-[9px] text-primary/50 uppercase">Qty: {item.quantity} x ₦{(item.product.price / 100).toLocaleString('en-NG')}</p>
              </div>
              <span className="font-bold text-primary">
                ₦{((item.product.price * item.quantity) / 100).toLocaleString('en-NG')}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2 mb-12">
          <div className="flex justify-between text-xs font-bold text-primary/60 uppercase">
            <span>Subtotal</span>
            <span>₦{(totalAmount / 100).toLocaleString('en-NG')}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-primary/60 uppercase">
            <span>Shipping</span>
            <span>₦0.00</span>
          </div>
          <div className="flex justify-between items-end pt-4 border-t-2 border-primary">
            <span className="text-xs font-black uppercase tracking-widest text-primary">Grand Total</span>
            <span className="text-3xl font-black text-primary tracking-tighter">
              ₦{(totalAmount / 100).toLocaleString('en-NG')}
            </span>
          </div>
        </div>
        <form action={handlePayment} className="relative z-10">
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-5 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black transition-colors"
          >
            Authorize Payment
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary/70 leading-relaxed italic">
            Secure processing via Paystack Gateway.<br />
            This is a digital transaction record.
          </p>
        </div>
        <div className="absolute -bottom-4 left-0 w-full overflow-hidden leading-0">
          <svg className="relative block w-full h-4" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 L40,80 L80,120 L120,80 L160,120 L200,80 L240,120 L280,80 L320,120 L360,80 L400,120 L440,80 L480,120 L520,80 L560,120 L600,80 L640,120 L680,80 L720,120 L760,80 L800,120 L840,80 L880,120 L920,80 L960,120 L1000,80 L1040,120 L1080,80 L1120,120 L1160,80 L1200,120 L1200,0 L0,0 Z" fill="white"></path>
          </svg>
        </div>
      </div>
      
      <Link href="/cart" className="mt-12 text-[9px] uppercase tracking-[0.4em] font-black text-primary/40 hover:text-primary transition-colors">
        ← Return to Archive
      </Link>
    </div>
  );
}