import { Product, ProductId, CategoryType, FrameShapeType } from './types';
import { AppError, ErrorCode } from './errors';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vincent Chase Retro Rectangle',
    brand: 'Vincent Chase',
    price: 1200,
    originalPrice: 1500,
    images: [
      'https://ext.same-assets.com/2368309368/4236837394.jpeg',
      'https://ext.same-assets.com/2368309368/2828971850.jpeg'
    ],
    category: 'eyeglasses',
    frameShape: 'rectangle',
    frameColor: 'Black',
    material: 'Acetate',
    size: {
      width: 54,
      height: 42,
      bridge: 18
    },
    features: ['Blue Light Protection', 'Anti-Glare', 'Lightweight'],
    description: 'Classic rectangle frame with modern aesthetics. Perfect for professional and casual wear.',
    inStock: true,
    stockQuantity: 25,
    rating: 4.5,
    reviewsCount: 324,
    collection: 'Vincent Chase',
    tags: ['professional', 'classic', 'blue-light'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    seoTitle: 'Vincent Chase Retro Rectangle Eyeglasses - Blue Light Protection',
    seoDescription: 'Shop Vincent Chase Retro Rectangle eyeglasses with blue light protection. Classic design perfect for professional and casual wear.',
    weight: 28,
    warranty: '1 year manufacturer warranty',
    careInstructions: ['Clean with microfiber cloth', 'Store in protective case', 'Avoid extreme temperatures']
  },
  {
    id: '2',
    name: 'John Jacobs Round Vintage',
    brand: 'John Jacobs',
    price: 1800,
    originalPrice: 2200,
    images: [
      'https://ext.same-assets.com/2368309368/2828971850.jpeg',
      'https://ext.same-assets.com/2368309368/3717482288.jpeg'
    ],
    category: 'eyeglasses',
    frameShape: 'round',
    frameColor: 'Tortoise',
    material: 'Metal',
    size: {
      width: 50,
      height: 48,
      bridge: 20
    },
    features: ['Vintage Style', 'Premium Metal', 'Adjustable Nose Pads'],
    description: 'Timeless round frame with vintage appeal. Handcrafted with premium materials.',
    inStock: true,
    stockQuantity: 18,
    rating: 4.7,
    reviewsCount: 198,
    collection: 'John Jacobs',
    tags: ['vintage', 'premium', 'handcrafted'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    seoTitle: 'John Jacobs Round Vintage Eyeglasses - Premium Metal Frame',
    seoDescription: 'Discover John Jacobs Round Vintage eyeglasses with premium metal construction and adjustable nose pads.',
    weight: 32,
    warranty: '2 year manufacturer warranty',
    careInstructions: ['Clean with lens solution', 'Adjust nose pads carefully', 'Store in hard case']
  },
  {
    id: '3',
    name: 'Lenskart Air Wrap Sports',
    brand: 'Lenskart',
    price: 2500,
    images: [
      'https://ext.same-assets.com/2368309368/4263523015.jpeg',
      'https://ext.same-assets.com/2368309368/3184420008.jpeg'
    ],
    category: 'sunglasses',
    frameShape: 'aviator',
    frameColor: 'Silver',
    lensColor: 'Mirror Blue',
    material: 'Titanium',
    size: {
      width: 58,
      height: 52,
      bridge: 16
    },
    features: ['UV Protection', 'Polarized', 'Unbreakable', 'Snug Fit'],
    description: 'High-performance sports sunglasses with advanced wrap technology for active lifestyles.',
    inStock: true,
    stockQuantity: 12,
    rating: 4.8,
    reviewsCount: 456,
    collection: 'Air Wrap',
    tags: ['sports', 'performance', 'titanium', 'polarized'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-22'),
    seoTitle: 'Lenskart Air Wrap Sports Sunglasses - Titanium Frame with UV Protection',
    seoDescription: 'Premium sports sunglasses with titanium frame, polarized lenses, and UV protection for active lifestyles.',
    weight: 24,
    warranty: '1 year manufacturer warranty',
    careInstructions: ['Rinse with clean water after sports', 'Use lens cleaning solution', 'Store in protective pouch']
  },
  {
    id: '4',
    name: 'Hustlr Blue Light Blockers',
    brand: 'Hustlr',
    price: 999,
    originalPrice: 1299,
    images: [
      'https://ext.same-assets.com/2368309368/135582018.png',
      'https://ext.same-assets.com/2368309368/1111610242.png'
    ],
    category: 'computer-glasses',
    frameShape: 'wayfarer',
    frameColor: 'Clear Blue',
    material: 'TR90',
    size: {
      width: 52,
      height: 44,
      bridge: 19
    },
    features: ['Blue Light Filter', 'Anti-Fatigue', 'Lightweight', 'Flexible'],
    description: 'Essential computer glasses for digital professionals. Reduces eye strain and improves focus.',
    inStock: true,
    stockQuantity: 35,
    rating: 4.6,
    reviewsCount: 891,
    collection: 'Hustlr',
    tags: ['computer', 'blue-light', 'professional', 'anti-fatigue'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-25'),
    seoTitle: 'Hustlr Blue Light Blocking Computer Glasses - Anti-Fatigue',
    seoDescription: 'Protect your eyes with Hustlr blue light blocking glasses. Perfect for digital professionals and computer users.',
    weight: 22,
    warranty: '6 months manufacturer warranty',
    careInstructions: ['Clean regularly with microfiber cloth', 'Avoid harsh chemicals', 'Store safely when not in use']
  },
  {
    id: '5',
    name: 'Roman Holiday Cat-Eye',
    brand: 'Vincent Chase',
    price: 1650,
    originalPrice: 1950,
    images: [
      'https://ext.same-assets.com/2368309368/3717482288.jpeg',
      'https://ext.same-assets.com/2368309368/1341939864.jpeg'
    ],
    category: 'eyeglasses',
    frameShape: 'cat-eye',
    frameColor: 'Rose Gold',
    material: 'Metal Acetate Combo',
    size: {
      width: 53,
      height: 46,
      bridge: 17
    },
    features: ['Premium Design', 'Lightweight', 'Comfortable Fit', 'Stylish'],
    description: 'Elegant cat-eye frame inspired by Roman holiday fashion. Perfect for making a statement.',
    inStock: true,
    stockQuantity: 20,
    rating: 4.4,
    reviewsCount: 267,
    collection: 'Roman Holiday',
    tags: ['elegant', 'cat-eye', 'fashion', 'statement'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-19'),
    seoTitle: 'Roman Holiday Cat-Eye Eyeglasses - Rose Gold Frame',
    seoDescription: 'Make a statement with Roman Holiday cat-eye eyeglasses in rose gold. Elegant design inspired by classic fashion.',
    weight: 26,
    warranty: '1 year manufacturer warranty',
    careInstructions: ['Handle with care', 'Clean with soft cloth', 'Store in protective case']
  },
  {
    id: '6',
    name: 'Surrealist Hexagonal',
    brand: 'Lenskart',
    price: 2100,
    images: [
      'https://ext.same-assets.com/2368309368/2870062446.jpeg',
      'https://ext.same-assets.com/2368309368/3450756294.jpeg'
    ],
    category: 'eyeglasses',
    frameShape: 'hexagonal',
    frameColor: 'Gradient Purple',
    material: 'Premium Acetate',
    size: {
      width: 55,
      height: 47,
      bridge: 18
    },
    features: ['Unique Shape', 'Gradient Colors', 'Premium Material', 'Artist Inspired'],
    description: 'Enter a virtual dream with these surrealist-inspired hexagonal frames.',
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewsCount: 123,
    collection: 'Surrealist',
    tags: ['unique', 'artistic', 'hexagonal', 'gradient'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-21'),
    seoTitle: 'Surrealist Hexagonal Eyeglasses - Gradient Purple Frame',
    seoDescription: 'Unique hexagonal eyeglasses with gradient purple design. Artist-inspired frames for creative individuals.',
    weight: 30,
    warranty: '1 year manufacturer warranty',
    careInstructions: ['Clean gently with lens cloth', 'Avoid dropping', 'Store in original case']
  },
  {
    id: '7',
    name: 'Kids Explorer Frames',
    brand: 'Lenskart Kids',
    price: 800,
    originalPrice: 1000,
    images: [
      'https://ext.same-assets.com/2368309368/2974312501.jpeg',
      'https://ext.same-assets.com/2368309368/1111610242.png'
    ],
    category: 'kids-glasses',
    frameShape: 'round',
    frameColor: 'Blue',
    material: 'Flexible TR90',
    size: {
      width: 46,
      height: 40,
      bridge: 16
    },
    features: ['Kid Safe', 'Flexible', 'Durable', 'Fun Colors'],
    description: 'Safe and durable glasses designed specifically for children with active lifestyles.',
    inStock: true,
    stockQuantity: 30,
    rating: 4.7,
    reviewsCount: 445,
    collection: 'Kids Collection',
    tags: ['kids', 'safe', 'durable', 'flexible'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-23'),
    seoTitle: 'Kids Explorer Eyeglasses - Safe and Durable Frames',
    seoDescription: 'Safe and durable eyeglasses for kids. Flexible TR90 material perfect for active children.',
    weight: 18,
    warranty: '1 year manufacturer warranty',
    careInstructions: ['Supervise cleaning', 'Check fit regularly', 'Replace if damaged']
  },
  {
    id: '8',
    name: 'Prism Light Reader',
    brand: 'Lenskart',
    price: 699,
    images: [
      'https://ext.same-assets.com/2368309368/2721969670.jpeg',
      'https://ext.same-assets.com/2368309368/3761654728.jpeg'
    ],
    category: 'reading-glasses',
    frameShape: 'rectangle',
    frameColor: 'Crystal Clear',
    material: 'Lightweight Plastic',
    size: {
      width: 52,
      height: 41,
      bridge: 19
    },
    features: ['Reading Optimized', 'Sharp Vision', 'Edgy Design', 'Light Weight'],
    description: 'Sharp, edgy, and light reading glasses with prism technology for enhanced clarity.',
    inStock: true,
    stockQuantity: 40,
    rating: 4.5,
    reviewsCount: 678,
    collection: 'Prism',
    tags: ['reading', 'lightweight', 'clarity', 'prism'],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-24'),
    seoTitle: 'Prism Light Reading Glasses - Enhanced Clarity Technology',
    seoDescription: 'Lightweight reading glasses with prism technology for enhanced clarity and sharp vision.',
    weight: 20,
    warranty: '6 months manufacturer warranty',
    careInstructions: ['Clean lenses regularly', 'Handle with care', 'Store in soft pouch']
  }
];

/**
 * Enhanced product retrieval with error handling
 */
export const getProductById = (id: ProductId): Product => {
  const product = products.find(product => product.id === id);
  if (!product) {
    throw new AppError(`Product with ID ${id} not found`, ErrorCode.PRODUCT_NOT_FOUND, 404);
  }
  return product;
};

/**
 * Get products by category with validation
 */
export const getProductsByCategory = (category: CategoryType): Product[] => {
  if (!category) {
    throw new AppError('Category is required', ErrorCode.INVALID_INPUT, 400);
  }
  return products.filter(product => product.category === category);
};

/**
 * Get products by frame shape
 */
export const getProductsByFrameShape = (frameShape: FrameShapeType): Product[] => {
  if (!frameShape) {
    throw new AppError('Frame shape is required', ErrorCode.INVALID_INPUT, 400);
  }
  return products.filter(product => product.frameShape === frameShape);
};

/**
 * Get products by collection
 */
export const getProductsByCollection = (collection: string): Product[] => {
  if (!collection) {
    throw new AppError('Collection is required', ErrorCode.INVALID_INPUT, 400);
  }
  return products.filter(product => product.collection === collection);
};

/**
 * Enhanced search with better matching algorithm
 */
export const searchProducts = (query: string): Product[] => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const lowercaseQuery = query.toLowerCase();
  
  return products
    .map(product => {
      let score = 0;
      
      // Exact matches get highest score
      if (product.name.toLowerCase() === lowercaseQuery) score += 100;
      if (product.brand.toLowerCase() === lowercaseQuery) score += 80;
      
      // Partial matches
      if (product.name.toLowerCase().includes(lowercaseQuery)) score += 50;
      if (product.brand.toLowerCase().includes(lowercaseQuery)) score += 40;
      if (product.description.toLowerCase().includes(lowercaseQuery)) score += 20;
      if (product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))) score += 30;
      if (product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))) score += 25;
      if (product.collection?.toLowerCase().includes(lowercaseQuery)) score += 35;
      
      return { product, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
};

/**
 * Get featured products
 */
export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return products
    .filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/**
 * Get products on sale
 */
export const getSaleProducts = (limit?: number): Product[] => {
  const saleProducts = products.filter(product => product.originalPrice && product.originalPrice > product.price);
  return limit ? saleProducts.slice(0, limit) : saleProducts;
};

/**
 * Get new arrivals
 */
export const getNewArrivals = (limit: number = 8): Product[] => {
  return products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

/**
 * Get related products based on category and brand
 */
export const getRelatedProducts = (productId: ProductId, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  
  return products
    .filter(p => 
      p.id !== productId && 
      (p.category === product.category || p.brand === product.brand)
    )
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === product.category && b.category !== product.category) return -1;
      if (b.category === product.category && a.category !== product.category) return 1;
      
      // Then by rating
      return b.rating - a.rating;
    })
    .slice(0, limit);
};

/**
 * Check product availability
 */
export const checkProductAvailability = (productId: ProductId, quantity: number = 1): boolean => {
  const product = getProductById(productId);
  return product.inStock && product.stockQuantity >= quantity;
};

/**
 * Get product statistics
 */
export const getProductStats = () => {
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const averageRating = products.reduce((sum, p) => sum + p.rating, 0) / totalProducts;
  const totalReviews = products.reduce((sum, p) => sum + p.reviewsCount, 0);
  
  const categoryStats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<CategoryType, number>);
  
  const brandStats = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalProducts,
    inStockProducts,
    outOfStockProducts,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
    categoryStats,
    brandStats,
  };
};
