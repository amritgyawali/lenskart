"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/products';
import { Product, FilterOptions } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Filter, SlidersHorizontal, Grid, List, ChevronDown, Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import VirtualTryOn from './VirtualTryOn';

export default function ProductsGrid() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'newest' | 'popular'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') ? [searchParams.get('category')!] : [],
    frameShape: [],
    priceRange: [0, 5000],
    brand: [],
    color: [],
    material: [],
    inStock: true
  });

  // Update search query when URL search params change
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');

    setSearchQuery(query);
    if (category) {
      setFilters(prev => ({ ...prev, category: [category] }));
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.features.some(feature => feature.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(product.category)) return false;
      }

      // Frame shape filter
      if (filters.frameShape && filters.frameShape.length > 0) {
        if (!filters.frameShape.includes(product.frameShape)) return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        if (product.price < minPrice || product.price > maxPrice) return false;
      }

      // Brand filter
      if (filters.brand && filters.brand.length > 0) {
        if (!filters.brand.includes(product.brand)) return false;
      }

      // In stock filter
      if (filters.inStock && !product.inStock) return false;

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming higher ID means newer
        case 'popular':
        default:
          return b.reviewsCount - a.reviewsCount;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleFilterChange = (filterType: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      frameShape: [],
      priceRange: [0, 5000],
      brand: [],
      color: [],
      material: [],
      inStock: true
    });
    setSearchQuery('');
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  // Get unique values for filter options
  const uniqueBrands = [...new Set(products.map(p => p.brand))];
  const uniqueShapes = [...new Set(products.map(p => p.frameShape))];
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </h1>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort by <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('popular')}>
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low')}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high')}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('rating')}>
                  Highest Rated
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('newest')}>
                  Newest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.category?.length || filters.frameShape?.length || filters.brand?.length || searchQuery) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary">
                Search: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.category?.map(cat => (
              <Badge key={cat} variant="secondary">
                {cat.replace('-', ' ')}
                <button
                  onClick={() => handleFilterChange('category', filters.category?.filter(c => c !== cat))}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
            {filters.frameShape?.map(shape => (
              <Badge key={shape} variant="secondary">
                {shape}
                <button
                  onClick={() => handleFilterChange('frameShape', filters.frameShape?.filter(s => s !== shape))}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
            {filters.brand?.map(brand => (
              <Badge key={brand} variant="secondary">
                {brand}
                <button
                  onClick={() => handleFilterChange('brand', filters.brand?.filter(b => b !== brand))}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-64 flex-shrink-0">
            <div className="bg-white border rounded-lg p-6 space-y-6">
              <h3 className="font-semibold text-lg">Filters</h3>

              {/* Category Filter */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {uniqueCategories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category?.includes(category) || false}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...(filters.category || []), category]
                            : filters.category?.filter(c => c !== category) || [];
                          handleFilterChange('category', newCategories);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{category.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Frame Shape Filter */}
              <div>
                <h4 className="font-medium mb-3">Frame Shape</h4>
                <div className="space-y-2">
                  {uniqueShapes.map(shape => (
                    <label key={shape} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.frameShape?.includes(shape) || false}
                        onChange={(e) => {
                          const newShapes = e.target.checked
                            ? [...(filters.frameShape || []), shape]
                            : filters.frameShape?.filter(s => s !== shape) || [];
                          handleFilterChange('frameShape', newShapes);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{shape}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Brand Filter */}
              <div>
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {uniqueBrands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brand?.includes(brand) || false}
                        onChange={(e) => {
                          const newBrands = e.target.checked
                            ? [...(filters.brand || []), brand]
                            : filters.brand?.filter(b => b !== brand) || [];
                          handleFilterChange('brand', newBrands);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

function ProductCard({ product, viewMode }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <div className="flex gap-4">
          <Link href={`/products/${product.id}`} className="flex-shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={120}
              height={120}
              className="w-30 h-30 object-cover rounded-lg"
            />
          </Link>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg hover:text-blue-600">{product.name}</h3>
                </Link>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({product.reviewsCount})</span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">{feature}</Badge>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <VirtualTryOn product={product}>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </VirtualTryOn>
                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <VirtualTryOn product={product}>
                <Button size="sm" variant="secondary">
                  <Eye className="h-4 w-4 mr-2" />
                  Try On
                </Button>
              </VirtualTryOn>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold mb-2 hover:text-blue-600 line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviewsCount})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button size="sm" variant="outline">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={handleAddToCart} className="flex-1 ml-2">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
