"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, ChevronUp, ChevronDown, Heart } from "lucide-react";

// Assuming these are in your /public/videos folder
const clientVideos = [
  { id: 1, src: "/videos/client-1.mp4", client: "@Amina_CT", description: "Bespoke Agbada for the wedding season." },
  { id: 2, src: "/videos/client-2.mp4", client: "@Kofi_Design", description: "Perfect fit for the Cape Town Jazz Fest." },
  { id: 3, src: "/videos/client-3.mp4", client: "@Sarah_Style", description: "Custom tailored evening gown in silk." },
  { id: 4, src: "/videos/client-4.mp4", client: "@Musa_Atelier", description: "Traditional prints met with modern lines." },
];

export default function ClientGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.5em] text-[#C9A35A] uppercase font-bold">The Ibrahim Circle</span>
          <h2 className="font-serif text-4xl md:text-5xl">Our Clients in Motion</h2>
        </div>

        {/* INSTAGRAM GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clientVideos.map((video, index) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={() => setSelectedIndex(index)} 
            />
          ))}
        </div>
      </div>

      {/* FULLSCREEN REELS POPUP */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
          >
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-8 right-8 z-[210] text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-8 left-8 z-[210] text-white/50 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            <div className="relative h-full w-full max-w-[450px] bg-neutral-900 shadow-2xl flex items-center justify-center">
              <motion.div
                key={selectedIndex}
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -300, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative h-full w-full"
              >
                <video
                  src={clientVideos[selectedIndex].src}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                />
                
                {/* Reel UI Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C9A35A] border-2 border-white flex items-center justify-center font-serif text-white uppercase italic">
                        {clientVideos[selectedIndex].client[1]}
                      </div>
                      <span className="text-white font-bold tracking-wide">{clientVideos[selectedIndex].client}</span>
                    </div>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      {clientVideos[selectedIndex].description}
                    </p>
                  </div>
                </div>

                {/* Vertical Navigation Controls */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-white/70">
                  <button 
                    onClick={() => setSelectedIndex(prev => Math.max(0, prev - 1))}
                    className="hover:text-[#C9A35A] transition-colors"
                  >
                    <ChevronUp size={28} />
                  </button>
                  <div className="flex flex-col items-center gap-1">
                    <Heart size={28} className="fill-[#C9A35A] text-[#C9A35A]" />
                    <span className="text-[10px] font-bold">LIVE</span>
                  </div>
                  <button 
                    onClick={() => setSelectedIndex(prev => Math.min(clientVideos.length - 1, prev + 1))}
                    className="hover:text-[#C9A35A] transition-colors"
                  >
                    <ChevronDown size={28} />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoCard({ video, onClick }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.div 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[9/16] bg-neutral-100 overflow-hidden cursor-pointer group"
    >
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-bold tracking-widest uppercase">View Reel</p>
      </div>
    </motion.div>
  );
}
