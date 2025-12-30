// components/CartItem.tsx
'use client';

import { updateCartQuantity, removeCartItem } from '@/app/actions/cart';

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div>
        <h4 className="font-medium">{item.product.name}</h4>
        <p className="text-gray-600">
          ₦{(item.product.price / 100).toLocaleString('en-NG')}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <form action={updateCartQuantity.bind(null, item.id)}>
          <input
            type="number"
            name="quantity"
            defaultValue={item.quantity}
            min="0"
            className="w-20 px-2 py-1 border rounded text-center"
          />
          <button type="submit" className="ml-2 text-sm text-blue-600">
            Update
          </button>
        </form>

        <form action={removeCartItem.bind(null, item.id)}>
          <button type="submit" className="text-red-600 text-sm">
            Remove
          </button>
        </form>
      </div>

      <div className="font-medium">
        ₦{((item.product.price * item.quantity) / 100).toLocaleString('en-NG')}
      </div>
    </div>
  );
}