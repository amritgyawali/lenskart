import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BrandPurpose() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          {/* Purpose Label */}
          <p className="text-blue-600 font-medium mb-4 tracking-wide">
            Our Purpose
          </p>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Do More, Be More.
          </h2>

          {/* CTA Button */}
          <Button
            variant="outline"
            size="lg"
            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
          >
            Discover
          </Button>
        </div>

        {/* Background Image */}
        <div className="mt-16 relative">
          <Image
            src="https://ext.same-assets.com/2368309368/3437690621.jpeg"
            alt="Our Purpose"
            width={1200}
            height={400}
            className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
