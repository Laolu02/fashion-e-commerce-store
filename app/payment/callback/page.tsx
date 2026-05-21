import { redirect } from 'next/navigation';
import { verifyPaystackTransaction } from '@/lib/paystack';
import prisma from '@/lib/prisma';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    reference?: string;
  }>;
}

export default async function PaymentCallback({ searchParams }: PageProps) {
  const { reference } = await searchParams;

  if (!reference) {
    redirect('/cart');
  }

  let paymentStatus: 'success' | 'failed' | 'pending' = 'pending';
  let order = null;

  try {
    const verification = await verifyPaystackTransaction(reference);

    console.log('Verification result:', JSON.stringify(verification));

    const isSuccess =
      verification?.status === true ||
      verification?.status === 'success' ||
      verification?.data?.status === 'success';

    if (isSuccess) {
      await prisma.order.updateMany({
        where: {
          paymentReference: reference,
          paymentStatus: { not: 'PAID' },
        },
        data: { paymentStatus: 'PAID' },
      });

      order = await prisma.order.findFirst({
        where: { paymentReference: reference },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      paymentStatus = 'success';
    } else {
      console.log('Payment not successful:', verification?.status);
      paymentStatus = 'failed';
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    paymentStatus = 'failed';
  }

  if (paymentStatus === 'success' && order) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] py-12 px-4 flex flex-col items-center justify-center font-mono">
        <div className="w-full max-w-2xl bg-white p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative border-t-8 border-green-600">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-green-600 tracking-tighter uppercase mb-2">Payment Successful!</h1>
            <p className="text-sm text-gray-600">Your order has been confirmed</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold mb-1">Order ID</p>
                <p className="font-bold">{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold mb-1">Reference</p>
                <p className="font-bold">{reference}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold mb-1">Total Amount</p>
                <p className="font-bold text-lg text-green-600">₦{(order.totalAmount / 100).toLocaleString('en-NG')}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold mb-1">Status</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">PAID</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-black uppercase mb-4 text-gray-700">Order Items</h2>
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <div>
                    <p className="font-bold text-gray-800">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ₦{(item.price / 100).toLocaleString('en-NG')}</p>
                  </div>
                  <p className="font-bold">₦{(item.price * item.quantity / 100).toLocaleString('en-NG')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>What's Next?</strong><br />
                  A payment receipt has been sent to your email. We'll notify you once your order is ready for shipping.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/" className="flex-1 bg-primary text-white py-4 text-center text-xs font-black uppercase tracking-wider hover:bg-black transition-colors">
              Continue Shopping
            </Link>
            <Link href="/orders" className="flex-1 border-2 border-primary text-primary py-4 text-center text-xs font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4 flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-md bg-white p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative border-t-8 border-red-600">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-red-600 tracking-tighter uppercase mb-2">Payment Failed</h1>
          <p className="text-sm text-gray-600">Your payment could not be processed</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
          <p className="text-sm text-red-700">
            Your payment was unsuccessful. Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/cart" className="flex-1 bg-primary text-white py-4 text-center text-xs font-black uppercase tracking-wider hover:bg-black transition-colors">
            Return to Cart
          </Link>
          <Link href="/" className="flex-1 border-2 border-primary text-primary py-4 text-center text-xs font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}