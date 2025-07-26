import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-black via-gray-900 to-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative z-10 text-center">
          {/* Lenskart Boost Logo */}
          <div className="mb-8">
            <Image
              src="https://ext.same-assets.com/2368309368/1471343510.gif"
              alt="Lenskart Boost"
              width={300}
              height={80}
              className="mx-auto"
            />
          </div>

          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="text-white drop-shadow-2xl">SPORTS</span>
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="text-white drop-shadow-2xl">EYEWEAR</span>
            </h1>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Button>

          {/* Tagline */}
          <div className="mt-8">
            <p className="text-white text-sm tracking-wider">
              PLAY BETTER. PLAY BETTER. SEE BETTER. PLAY BETTER. SEE BETTER.
            </p>
          </div>
        </div>

        {/* Background Images */}
        <div className="absolute inset-0 flex items-center justify-between">
          {/* Left Image */}
          <div className="w-1/3 h-full relative opacity-80">
            <Image
              src="https://ext.same-assets.com/2368309368/3331958388.gif"
              alt="Sports person with eyewear"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Image */}
          <div className="w-1/3 h-full relative opacity-80">
            <Image
              src="https://ext.same-assets.com/2368309368/3331958388.gif"
              alt="Sports eyewear close-up"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
