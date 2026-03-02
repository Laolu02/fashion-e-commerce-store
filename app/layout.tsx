import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Fashion Store',
  description: 'Premium fashion e-commerce',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  let peculiarItemsCount = 0;

  if (session?.user?.id) {
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      select: {
        _count: {
          select: { items: true } 
        }
      }
    });
    peculiarItemsCount = cart?._count.items || 0;
  }

  return (
    <html lang="en">
      <body className="bg-neutral text-primary">
        <SessionProvider session={session}>
          <Navbar peculiarItemsCount={peculiarItemsCount} />
          <main className="min-h-screen bg-accent/20">{children}</main>
          <Footer />
        </SessionProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}