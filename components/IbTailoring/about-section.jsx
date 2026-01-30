"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div
            className={`relative aspect-[4/5] overflow-hidden transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Image
              src="/about-bg.webp"
              alt="Atelier craftsmanship"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <span className="text-xs tracking-[0.3em] text-muted-foreground mb-4 block">
              ABOUT THE ATELIER
            </span>

            <h2 className="font-serif text-3xl md:text-4xl tracking-wide mb-6 leading-tight">
              Where Dreams Become Reality
            </h2>

            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-8">
              <p>
               Founded in Cape Town’s vibrant city bowl, Ibrahim Design started with a vision: to weave African heritage into modern tailoring. From sourcing premium fabrics to the final stitch, every garment is made with precision, culture and character.
              </p>
              <p>
                Whether it’s a traditional attire for a special celebration or a contemporary custom suit, our studio offers a full made-to-measure service — personalized fittings, fabric selection, and finishing touches that reflect who you are.
              </p>
              <p>
                Our team of skilled artisans combines traditional techniques with
                contemporary vision, ensuring that every gown tells a story of
                sophistication and grace.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-foreground text-background text-xs tracking-[0.2em] hover:bg-foreground/90 transition-colors"
            >
              DISCOVER MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
