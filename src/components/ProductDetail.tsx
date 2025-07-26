"use client";

import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, Share2, ShoppingCart, Eye, Truck, RotateCcw, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import VirtualTryOn from './VirtualTryOn';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  const { authState } = useAuth();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Remove this function as it's now handled by VirtualTryOn component

  const currentCartQuantity = getCartItemQuantity(product.id);
  const isProductInCart = isInCart(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li>/</li>
          <li><Link href={`/products?category=${product.category}`} className="hover:text-gray-900 capitalize">{product.category.replace('-', ' ')}</Link></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <div className="mb-4">
            <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <Badge key={index} variant="outline">{feature}</Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              {isProductInCart && (
                <span className="text-sm text-gray-600">
                  {currentCartQuantity} in cart
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isProductInCart ? 'Add More to Cart' : 'Add to Cart'}
              </Button>

              <Button
                onClick={handleTryOn}
                variant="outline"
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Virtual Try-On
              </Button>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? 'text-red-500 border-red-500' : ''}
              >
                <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                Wishlist
              </Button>

              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center text-sm">
              <Truck className="h-4 w-4 mr-2 text-green-600" />
              <span>Free shipping on orders above ₹1000</span>
            </div>
            <div className="flex items-center text-sm">
              <RotateCcw className="h-4 w-4 mr-2 text-blue-600" />
              <span>30 days return & exchange</span>
            </div>
            <div className="flex items-center text-sm">
              <Shield className="h-4 w-4 mr-2 text-purple-600" />
              <span>100% authentic products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Specifications</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Frame Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frame Shape:</span>
                      <span className="capitalize">{product.frameShape}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frame Color:</span>
                      <span>{product.frameColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span>{product.material}</span>
                    </div>
                    {product.lensColor && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lens Color:</span>
                        <span>{product.lensColor}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Size Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frame Width:</span>
                      <span>{product.size.width}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frame Height:</span>
                      <span>{product.size.height}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bridge:</span>
                      <span>{product.size.bridge}mm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="description" className="mt-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              {product.collection && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Collection</h4>
                  <Badge variant="secondary">{product.collection}</Badge>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="text-center py-8 text-gray-500">
                <p>Reviews feature coming soon!</p>
                <p className="text-sm mt-2">Be the first to review this product.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
