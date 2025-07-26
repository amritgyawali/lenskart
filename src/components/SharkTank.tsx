import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SharkTank() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            AS SEEN ON SHARK TANK INDIA
          </h2>
        </div>

        {/* Content */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <Image
                  src="https://ext.same-assets.com/2368309368/2522968148.gif"
                  alt="Shark Tank India"
                  width={400}
                  height={200}
                  className="mx-auto lg:mx-0"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                hustlr
              </h3>
              <p className="text-xl font-semibold text-gray-800 mb-4">
                DO MORE, BE MORE.
              </p>
              <p className="text-gray-600 mb-6">
                As seen on Shark Tank India
              </p>

              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium"
              >
                Shop Now
              </Button>
            </div>

            {/* Right Images */}
            <div className="relative">
              <div className="flex items-center justify-center space-x-4">
                <div className="relative w-40 h-40">
                  <Image
                    src="https://ext.same-assets.com/2368309368/2522968148.gif"
                    alt="Eyewear 1"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-40 h-40">
                  <Image
                    src="https://ext.same-assets.com/2368309368/2522968148.gif"
                    alt="Eyewear 2"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
