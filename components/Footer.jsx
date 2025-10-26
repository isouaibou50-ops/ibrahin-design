import Link from "next/link";
import { Instagram, Facebook, Star, MapPin, Phone, Clock } from "lucide-react";

const TikTokIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-white border-t border-[#C5A34A]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-semibold text-[#C5A34A] tracking-wide">
                Ibrahim Design
              </span>
            </Link>
            <p className="text-sm text-gray-300/90 leading-relaxed italic mb-2">
              Tailored with heritage. Worn with pride.
            </p>
            <p className="text-sm text-gray-400/90 leading-relaxed max-w-md mb-4">
              Bespoke African fashion handcrafted in Cape Town — blending
              culture, craftsmanship, and contemporary design for every
              generation.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#C5A34A] text-[#C5A34A]"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-300 font-medium">
                5,000+ Happy Clients
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-[#C5A34A]">
              Our Creations
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Men’s Fashion", href: "/collections/mens" },
                { name: "Women’s Fashion", href: "/collections/womens" },
                { name: "Children’s Fashion", href: "/collections/childrens" },
                { name: "Gallery", href: "/gallery" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-[#C5A34A] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Section */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-[#C5A34A]">
              Visit Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#C5A34A] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  Green Market, Protea House, 7, 
                  <br />
                  Cape Town City Centre
                  <br />
                  Cape Town, 8001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#C5A34A]" />
                <a
                  href="tel:0837212432"
                  className="text-sm text-gray-400 hover:text-[#C5A34A] transition-colors"
                >
                  083 721 2432
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#C5A34A] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400 leading-relaxed">
                  <p>Mon–Fri: 8am–6pm</p>
                  <p>Sat: 8:30am–5:30pm</p>
                  <p>Sun: 9am–5pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#C5A34A]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} Ibrahim Design. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/ibrahimdesign20/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C5A34A] transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/p/Ibrahim-Designs-Sb-100063653645951"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C5A34A] transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@ibrahimdesign20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C5A34A] transition-colors"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
