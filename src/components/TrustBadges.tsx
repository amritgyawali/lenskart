import Image from "next/image";

const badges = [
  {
    icon: "https://ext.same-assets.com/2368309368/412454321.jpeg",
    title: "10 Million+",
    subtitle: "Glasses Sold"
  },
  {
    icon: "https://ext.same-assets.com/2368309368/412454321.jpeg",
    title: "100% Accurate Lenses",
    subtitle: "Made By Robots"
  },
  {
    icon: "https://ext.same-assets.com/2368309368/412454321.jpeg",
    title: "Virtual Try On",
    subtitle: "With AR Technology"
  },
  {
    icon: "https://ext.same-assets.com/2368309368/412454321.jpeg",
    title: "30 Days",
    subtitle: "Return & Exchange"
  }
];

export default function TrustBadges() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-4xl">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 mb-4 relative group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={badge.icon}
                    alt={badge.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {badge.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
