import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function OrdersPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-primary tracking-tighter uppercase mb-2">Your Orders</h1>
          <p className="text-sm text-gray-600">View and track your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center shadow-lg">
            <div className="mb-4">
              <svg className="w-20 h-20 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link 
              href="/"
              className="inline-block bg-primary text-white px-8 py-3 text-sm font-black uppercase tracking-wider hover:bg-black transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-lg border-l-4 border-primary overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Order ID</p>
                      <p className="text-lg font-black text-primary">{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Date</p>
                      <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString('en-NG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total</p>
                      <p className="text-lg font-black text-primary">₦{(order.totalAmount / 100).toLocaleString('en-NG')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${
                        order.paymentStatus === 'PAID' 
                          ? 'bg-green-100 text-green-800' 
                          : order.paymentStatus === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h3 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-wider">Order Items</h3>
                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 truncate">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">₦{(item.price / 100).toLocaleString('en-NG')} each</p>
                          <p className="font-bold text-primary">₦{(item.price * item.quantity / 100).toLocaleString('en-NG')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.paymentReference && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Payment Reference: <span className="font-mono font-bold text-gray-700">{order.paymentReference}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="text-xs uppercase tracking-wider font-black text-primary/60 hover:text-primary transition-colors"
          >
            ← Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}