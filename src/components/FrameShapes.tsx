import Image from "next/image";
import Link from "next/link";

const shapes = [
  {
    name: "Rectangle",
    image: "https://ext.same-assets.com/2368309368/4236837394.jpeg",
    href: "/rectangle"
  },
  {
    name: "Round",
    image: "https://ext.same-assets.com/2368309368/2828971850.jpeg",
    href: "/round"
  },
  {
    name: "Wayfarer",
    image: "https://ext.same-assets.com/2368309368/3701591810.jpeg",
    href: "/wayfarer"
  },
  {
    name: "Cat-Eye",
    image: "https://ext.same-assets.com/2368309368/3717482288.jpeg",
    href: "/cat-eye"
  },
  {
    name: "Hexagonal",
    image: "https://ext.same-assets.com/2368309368/2870062446.jpeg",
    href: "/hexagonal"
  },
  {
    name: "Aviator",
    image: "https://ext.same-assets.com/2368309368/3184420008.jpeg",
    href: "/aviator"
  }
];

export default function FrameShapes() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            CHOOSE YOUR FAVORITE SHAPE
          </h2>
        </div>

        {/* Shapes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {shapes.map((shape) => (
            <Link
              key={shape.name}
              href={shape.href}
              className="group text-center"
            >
              <div className="bg-white rounded-lg p-6 mb-3 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="relative w-full h-24 mb-4">
                  <Image
                    src={shape.image}
                    alt={shape.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {shape.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
