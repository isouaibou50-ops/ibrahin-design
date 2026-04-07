"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ACCENT = "#C9A35A";

export default function AboutPage() {
  return (
    <main className="bg-white text-neutral-900 min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Editorial Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <span className="text-[10px] tracking-[0.5em] text-[#C9A35A] uppercase font-bold">
              The Atelier Story
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">
              Crafting <br /> 
              <span className="italic font-light">Cultural Pride</span>
            </h1>
            <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-md">
              Based in the heart of Cape Town, we are a bespoke tailoring studio 
              dedicated to the intersection of African heritage and modern luxury.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl"
          >
            <Image
              src={assets.about}
              alt="Ibrahim Design tailoring studio Cape Town"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
          </motion.div>
        </section>

        {/* Our Story - Split Layout */}
        <section className="grid lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-3xl sticky top-32">Our Legacy</h2>
          </div>
          <motion.div 
            className="lg:col-span-8 space-y-10 border-l border-neutral-100 pl-8 md:pl-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-light leading-relaxed text-neutral-800">
              Founded in Cape Town’s vibrant city bowl, Ibrahim Design started with a singular vision: to weave the rich tapestry of African heritage into the precision of modern tailoring.
            </p>
            <p className="text-neutral-500 leading-relaxed font-light">
              From sourcing premium global fabrics to the final hand-finished stitch, every garment is an individual masterpiece. Whether it’s traditional attire for a milestone celebration or a sharp contemporary custom suit, our studio offers a full made-to-measure experience that honors your unique silhouette.
            </p>
          </motion.div>
        </section>

        {/* Why Choose Us - Modern Cards */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] text-[#C9A35A] uppercase font-bold">Value</span>
            <h2 className="font-serif text-4xl mt-2">The Ibrahim Standard</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Bespoke Fit", desc: "Every piece begins with 20+ precise measurements for a flawless silhouette." },
              { title: "Heritage Fabrics", desc: "We source authentic textures and bold prints that honor African culture." },
              { title: "Local Artistry", desc: "Hand-crafted entirely within our Cape Town atelier by master artisans." },
              { title: "Timeless Quality", desc: "Garments designed to be celebrated and passed down through generations." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-neutral-50 hover:bg-neutral-900 hover:text-white transition-all duration-500 group"
              >
                <h3 className="font-serif text-xl mb-4 group-hover:text-[#C9A35A]">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed opacity-70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Section - Visual Timeline */}
        <section className="bg-neutral-900 text-white p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
            <h2 className="text-[30vw] font-serif">PROCESS</h2>
          </div>
          
          <div className="relative z-10">
            <h2 className="font-serif text-4xl mb-16 italic">The Journey to Perfection</h2>
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
              {[
                { step: "01", title: "Consultation", desc: "A private one-on-one session to select fabrics, fits, and intricate design details." },
                { step: "02", title: "Pattern Drafting", desc: "We draft a unique architectural pattern based on your specific body measurements." },
                { step: "03", title: "Atelier Tailoring", desc: "Master tailors bring the vision to life, followed by a series of precise fittings." },
                { step: "04", title: "Final Reveal", desc: "Your bespoke garment is finished, pressed, and presented for its first wearing." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 border-b border-white/10 pb-8">
                  <span className="text-[#C9A35A] font-serif text-2xl">{step.step}</span>
                  <div>
                    <h4 className="text-lg font-medium mb-2 uppercase tracking-widest">{step.title}</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          className="mt-32 text-center space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl">Begin Your Bespoke Journey</h2>
          <p className="text-neutral-500 font-light max-w-xl mx-auto">
            Experience the luxury of a fit designed exclusively for you. 
            Book your consultation at our Cape Town studio today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#C9A35A] transition-all duration-300"
          >
            Request a Fitting <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
