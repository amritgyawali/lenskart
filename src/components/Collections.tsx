import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const collections = [
  {
    title: "ROMAN HOLIDAY",
    subtitle: "Rendezvous in Style",
    image: "https://ext.same-assets.com/2368309368/1341939864.jpeg",
    href: "/roman-holiday",
    className: "bg-gradient-to-br from-amber-100 to-orange-100"
  },
  {
    title: "SURREALIST",
    subtitle: "Enter a Virtual Dream",
    image: "https://ext.same-assets.com/2368309368/3450756294.jpeg",
    href: "/surrealist",
    className: "bg-gradient-to-br from-purple-100 to-pink-100"
  },
  {
    title: "PRISM",
    subtitle: "Sharp. Edgy. Light.",
    image: "https://ext.same-assets.com/2368309368/3761654728.jpeg",
    href: "/prism",
    className: "bg-gradient-to-br from-blue-100 to-purple-100"
  },
  {
    title: "WRAP",
    subtitle: "Unbreakable. Snug Fit.",
    image: "https://ext.same-assets.com/2368309368/4263523015.jpeg",
    href: "/wrap",
    className: "bg-gradient-to-br from-gray-100 to-blue-100"
  }
];

export default function Collections() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ADD A TOUCH OF STYLE WITH INNOVATIVE COLLECTIONS
          </h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={collection.href}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`relative h-64 ${collection.className}`}>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-lg text-white/90 mb-6">
                    {collection.subtitle}
                  </p>
                  <Button
                    size="sm"
                    className="w-fit bg-black/80 hover:bg-black text-white rounded-full px-6"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
