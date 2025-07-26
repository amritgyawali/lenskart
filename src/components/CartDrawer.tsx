"use client";

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some glasses to get started!</p>
          <Button onClick={onClose}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle>Shopping Cart ({cart.itemCount} items)</SheetTitle>
      </SheetHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.product.name}
                </h4>
                <p className="text-sm text-gray-500">{item.product.brand}</p>
                <p className="text-sm font-semibold text-gray-900">₹{item.product.price}</p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                {/* Quantity Controls */}
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded-l-md"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="px-2 py-1 text-sm border-x min-w-[40px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded-r-md"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-4 mt-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium">₹{cart.total}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm font-medium text-green-600">Free</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-base font-semibold">Total</span>
            <span className="text-base font-bold">₹{cart.total}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              Proceed to Checkout
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-xs text-gray-500 text-center pt-2">
            Secure checkout with 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  );
}
