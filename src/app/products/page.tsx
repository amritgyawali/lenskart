import { Suspense } from 'react';
import ProductsGrid from '@/components/ProductsGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<div className="p-8">Loading products...</div>}>
        <ProductsGrid />
      </Suspense>
      <Footer />
    </main>
  );
}
