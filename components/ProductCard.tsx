import Link from 'next/link';

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
    <div className="bg-neutral rounded-xl shadow-lg overflow-hidden product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-80 object-cover"
      />
      <div className="p-6 bg-neutral">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-muted mb-3">{product.category}</p>
        <p className="text-primary text-2xl font-bold mb-4">
          ₦{(product.price / 100).toLocaleString('en-NG')}
        </p>
        <Link
          href={`/products/${product.id}`}
          className="block text-center bg-primary text-neutral py-3 rounded-lg hover:bg-gray-800 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}