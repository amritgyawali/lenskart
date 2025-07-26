import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Eyeglasses",
    image: "https://ext.same-assets.com/2368309368/1111610242.png",
    href: "/eyeglasses"
  },
  {
    name: "Sunglasses",
    image: "https://ext.same-assets.com/2368309368/1920314565.png",
    href: "/sunglasses"
  },
  {
    name: "Power Sunglasses",
    image: "https://ext.same-assets.com/2368309368/2970266713.png",
    href: "/power-sunglasses"
  },
  {
    name: "Kids Glasses",
    image: "https://ext.same-assets.com/2368309368/2974312501.jpeg",
    href: "/kids-glasses"
  },
  {
    name: "Computer Glasses",
    image: "https://ext.same-assets.com/2368309368/135582018.png",
    href: "/computer-glasses"
  },
  {
    name: "Reading Glasses",
    image: "https://ext.same-assets.com/2368309368/2721969670.jpeg",
    href: "/reading-glasses"
  }
];

export default function ProductCategories() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center p-6 bg-white rounded-full hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
