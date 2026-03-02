import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Illustration / Icon */}
      <div className="relative mb-10">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent/30 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-16 h-16 md:w-20 md:h-20 text-primary/40" strokeWidth={1.5} />
        </div>
        {/* Subtle floating dots for visual interest */}
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary/10 rounded-full animate-pulse" />
        <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-accent rounded-full animate-pulse delay-500" />
      </div>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        Your Bag is empty
      </h2>
      <p className="text-muted max-w-md text-base md:text-lg mb-10">
        Looks like you haven’t added anything yet. Let’s find something you’ll love!
      </p>

      {/* CTA Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-medium text-lg  shadow-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-xl active:scale-95"
      >
        Start Shopping
        <span className="text-xl">→</span>
      </Link>

      {/* Optional subtle hint */}
      <p className="mt-12 text-sm text-muted/70 italic">
        Discover our curated collections — new arrivals added weekly
      </p>
    </div>
  );
}