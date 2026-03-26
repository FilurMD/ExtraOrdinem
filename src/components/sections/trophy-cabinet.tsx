"use client";

import { motion } from "framer-motion";

const trophies = [
  {
    id: "silver",
    title: "SØLV",
    // Subtext is omitted for now as requested, only placeholders inside the boxes
    colorClass: "text-slate-300",
    borderClass: "border-slate-400/50",
    glowClass: "shadow-[0_0_40px_rgba(148,163,184,0.2)]",
    bgClass: "bg-slate-900/40",
    scale: "scale-90",
    zIndex: "z-0"
  },
  {
    id: "gold",
    title: "GULD",
    colorClass: "text-[#D4AF37]",
    borderClass: "border-[#D4AF37]",
    glowClass: "shadow-[0_0_60px_rgba(212,175,55,0.5),inset_0_0_30px_rgba(212,175,55,0.2)]",
    bgClass: "bg-[#D4AF37]/10",
    scale: "scale-110",
    zIndex: "z-10"
  },
  {
    id: "bronze",
    title: "BRONZE",
    colorClass: "text-amber-700",
    borderClass: "border-amber-700/50",
    glowClass: "shadow-[0_0_40px_rgba(180,83,9,0.2)]",
    bgClass: "bg-amber-900/30",
    scale: "scale-90",
    zIndex: "z-0"
  }
];

export function TrophyCabinet() {
  return (
    <section id="trophies" className="py-24 bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[900px]">
      
      {/* 
        Background image based on Trofæ_baggrund.png 
        Scaled to comfortably fill and avoid artifacts
      */}
      <div 
        className="absolute inset-[0] bg-cover bg-center bg-no-repeat opacity-90 transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url('/trophy-bg.png')` }}
      />
      
      {/* Deep overlay to enhance the cinematic glow effect matching image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 z-0" />

      <div className="container relative z-20 mx-auto px-4 max-w-7xl flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24" // mb-24 gives huge room before trophies 
        >
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#F5F5DC] uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,255,220,0.5)]">
            Trofæ<span className="text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">skabet</span>
          </h2>
          <span className="text-[#BF9B30] tracking-[0.3em] uppercase text-sm md:text-base font-bold mt-4 block drop-shadow-md">
            Vores Præstationer
          </span>
        </motion.div>

        {/* Trophies Showcase (Static 3-layout as requested for placeholders) */}
        <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-12">
          
          {trophies.map((trophy, i) => (
            <motion.div
              key={trophy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col items-center ${trophy.zIndex}`}
            >
              {/* Title above box */}
              <h3 className={`font-heading uppercase tracking-widest text-2xl md:text-3xl font-bold mb-6 ${trophy.colorClass} drop-shadow-lg`}>
                {trophy.title}
              </h3>
              
              {/* Box Placeholder (The Glass Display Case) */}
              <div 
                className={`relative w-[260px] h-[300px] md:w-[320px] md:h-[380px] rounded-2xl border-2 flex items-center justify-center backdrop-blur-md transition-transform duration-500
                ${trophy.borderClass} ${trophy.bgClass} ${trophy.glowClass} ${trophy.scale}
              `}>
                {/* 
                  Inner glowing frame lines simulating the glass showcase box in the reference image
                  We can do this with internal inset shadows and thin borders 
                */}
                <div className={`absolute inset-4 border border-white/10 rounded-xl pointer-events-none ${trophy.id === 'gold' ? 'border-[#D4AF37]/30' : ''}`} />
                <div className="absolute inset-8 border border-white/5 rounded-lg pointer-events-none" />

                {/* The Object Placeholder (Simulating the Trophy) */}
                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border border-dashed flex items-center justify-center opacity-50
                  ${trophy.colorClass} ${trophy.borderClass}
                `}>
                  <span className="text-xs tracking-widest uppercase font-bold opacity-60">
                    Billede
                  </span>
                </div>

                {/* Corner Accents for technical look */}
                <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl ${trophy.borderClass}`} />
                <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl ${trophy.borderClass}`} />
                <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl ${trophy.borderClass}`} />
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl ${trophy.borderClass}`} />
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
