import { Product } from './types';

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
    rating: 4.5,
    reviewsCount: 324,
    collection: 'Vincent Chase'
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
    rating: 4.7,
    reviewsCount: 198,
    collection: 'John Jacobs'
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
    rating: 4.8,
    reviewsCount: 456,
    collection: 'Air Wrap'
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
    rating: 4.6,
    reviewsCount: 891,
    collection: 'Hustlr'
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
    rating: 4.4,
    reviewsCount: 267,
    collection: 'Roman Holiday'
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
    rating: 4.9,
    reviewsCount: 123,
    collection: 'Surrealist'
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
    rating: 4.7,
    reviewsCount: 445,
    collection: 'Kids Collection'
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
    rating: 4.5,
    reviewsCount: 678,
    collection: 'Prism'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByCollection = (collection: string): Product[] => {
  return products.filter(product => product.collection === collection);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};
