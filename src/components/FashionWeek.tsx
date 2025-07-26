import Image from "next/image";
import Link from "next/link";

export default function FashionWeek() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LENSKART AT NEW YORK FASHION WEEK
          </h2>
        </div>

        {/* Fashion Week Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="relative">
            <Image
              src="https://ext.same-assets.com/2368309368/3123981181.gif"
              alt="New York Fashion Week"
              width={600}
              height={400}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Right Content */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              New York Fashion Week
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Experience the latest in eyewear fashion straight from the runways of New York Fashion Week.
              Discover cutting-edge designs that blend style with innovation.
            </p>
            <Link
              href="/fashion-week"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
