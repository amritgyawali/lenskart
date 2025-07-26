import Header from "@/components/Header";
import ProductCategories from "@/components/ProductCategories";
import HeroBanner from "@/components/HeroBanner";
import TrustBadges from "@/components/TrustBadges";
import BrandPurpose from "@/components/BrandPurpose";
import FashionWeek from "@/components/FashionWeek";
import FrameShapes from "@/components/FrameShapes";
import Collections from "@/components/Collections";
import SharkTank from "@/components/SharkTank";
import InstagramGallery from "@/components/InstagramGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ProductCategories />
      <HeroBanner />
      <TrustBadges />
      <BrandPurpose />
      <FashionWeek />
      <FrameShapes />
      <Collections />
      <SharkTank />
      <InstagramGallery />
      <Footer />
    </main>
  );
}
