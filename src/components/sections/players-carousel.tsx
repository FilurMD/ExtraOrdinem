"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

// The new real images are in /players/ 
const players = [
  { id: "baahr", name: "BAAHR", role: "Entry Fragger", image: "/players/baahr.png", position: "center top" },
  { id: "filur", name: "FILUR", role: "IGL / AWP", image: "/players/filur.png", position: "center" },
  { id: "imp", name: "IMPIS KAHN", role: "Support", image: "/players/imp.png", position: "center" },
  { id: "mango", name: "MANGO", role: "Entry Fragger", image: "/players/mango.png", position: "center" },
  { id: "sprit", name: "SPRIT", role: "2nd Entry", image: "/players/sprit.png", position: "center" }
];

export function PlayersCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Prevent scroll when video open
  if (typeof window !== "undefined") {
    document.body.style.overflow = isVideoOpen ? "hidden" : "auto";
  }

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % players.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + players.length) % players.length);
  };

  const getPositionVariant = (index: number, active: number, total: number) => {
    if (index === active) {
      return {
        x: "0%",
        scale: 1,
        zIndex: 10,
        filter: "blur(0px) brightness(1.2)",
        opacity: 1
      };
    }

    // Right neighbor
    if (index === active + 1 || (active === total - 1 && index === 0)) {
      return { x: "115%", scale: 0.75, zIndex: 5, filter: "blur(4px) brightness(0.6)", opacity: 0.8 };
    }

    // Left neighbor
    if (index === active - 1 || (active === 0 && index === total - 1)) {
      return { x: "-115%", scale: 0.75, zIndex: 5, filter: "blur(4px) brightness(0.6)", opacity: 0.8 };
    }

    // Hidden behind
    return { x: "0%", scale: 0.5, zIndex: 0, filter: "blur(10px) brightness(0.3)", opacity: 0 };
  };

  return (
    <section id="players" className="py-24 bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[900px]">

      {/* 
        The NEW background image provided by the user (Background_Holdet.png).
        We scale it to 115% to easily crop off the "Gemini" watermark in the bottom right corner without distorting.
      */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center origin-center transform scale-[1.15]"
        style={{
          backgroundImage: `url('/players-bg-new.png')`
        }}
      />

      {/* Dark overlay specifically to keep the cave feel but allow the texture through */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />

      {/* 
        Real Video Smoke Layer with mix-blend-screen to blend the smoke into the background seamlessly.
        We use scale-[1.25] and origin-top so the video zooms in and stretches down, permanently cropping out any bottom logos if they exist.
        Radial-gradient mask applied so the smoke is thickest in center and fades completely towards the edges.
      */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen opacity-100"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 70%)',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 70%)'
        }}
      >
        <video 
          className="w-full h-full object-cover scale-[1.25] origin-top"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/smoke-bg-2.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container relative z-20 mx-auto px-4 max-w-7xl flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#BF9B30] tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-2 block drop-shadow-md">Holdet</span>
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[6rem] text-[#F5F5DC] uppercase tracking-tighter drop-shadow-2xl">
            Extra <span className="text-[#BF9B30]">Ordinem</span>
          </h2>
        </motion.div>

        {/* Carousel Area */}
        <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center">

          {/* Fixed external navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-12 lg:-left-4 z-40 p-4 rounded-full bg-black/60 border border-[#BF9B30]/30 text-[#F5F5DC] hover:text-[#BF9B30] hover:bg-black/80 hover:scale-110 transition-all backdrop-blur-md hidden sm:block shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={next}
            className="absolute right-2 md:right-12 lg:-right-4 z-40 p-4 rounded-full bg-black/60 border border-[#BF9B30]/30 text-[#F5F5DC] hover:text-[#BF9B30] hover:bg-black/80 hover:scale-110 transition-all backdrop-blur-md hidden sm:block shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            <ChevronRight size={32} />
          </button>

          {/* Cards Container */}
          <div className="relative w-[300px] h-[450px] sm:w-[340px] sm:h-[510px] md:w-[400px] md:h-[580px] perspective-1000">
            {players.map((player, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={player.id}
                  animate={getPositionVariant(index, activeIndex, players.length)}
                  transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-xl overflow-hidden cursor-pointer origin-center 
                    transition-shadow duration-300
                    ${isActive ? 'border-[1px] border-[#BF9B30] shadow-[0_40px_80px_10px_rgba(0,0,0,1),0_0_50px_rgba(191,155,48,0.2)] hover:shadow-[0_50px_100px_15px_rgba(0,0,0,1),0_0_70px_rgba(191,155,48,0.4)] z-20 -translate-y-2' : 'border border-[#BF9B30]/10 shadow-[0_30px_60px_5px_rgba(0,0,0,0.9)] z-10'}`}
                  onClick={() => {
                    if (isActive) setIsVideoOpen(true);
                    else setActiveIndex(index);
                  }}
                >
                  {/* Outer gradient glow applied specifically to active card to match reference picture glow */}
                  {isActive && (
                    <div className="absolute inset-0 -z-10 shadow-[inset_0_0_30px_rgba(191,155,48,0.4)]" />
                  )}

                  {/* Dark green/smoky background layer specifically matching the card texture base */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a120e] via-[#051c10] to-[#020805]" />

                  {/* Image wrapper */}
                  <div
                    className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${player.image}')`,
                      backgroundPosition: player.position || "center top",
                      /* Fallback base removed since we added explicit gradient div above */
                    }}
                  />

                  {/* Gradient to darken bottom 30% for text readability like reference */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent h-full w-full pointer-events-none ${isActive ? 'opacity-90' : 'opacity-100'}`} />

                  {/* Play Button - Exactly centered based on reference */}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative w-16 h-16 rounded-full border-[1.5px] border-[#BF9B30]/80 bg-black/10 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-[#BF9B30]/40 hover:scale-110 transition-all cursor-pointer group shadow-[0_0_30px_rgba(191,155,48,0.4)]">
                        {/* Arrow icon matching the outline style playback */}
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#F5F5DC] border-b-[8px] border-b-transparent ml-1 drop-shadow-[0_0_5px_rgba(191,155,48,0.8)]" />
                      </div>
                    </div>
                  )}

                  {/* Player Text Details at Bottom Center */}
                  <div className="absolute bottom-6 left-0 w-full text-center flex flex-col items-center justify-end">
                    <h3 className={`font-heading uppercase transition-all duration-300
                      ${isActive ? 'text-4xl md:text-6xl font-black text-[#eacf94] drop-shadow-[0_0_15px_rgba(234,207,148,0.7)] leading-none' : 'text-2xl font-bold text-[#eacf94]/60'}
                    `}>
                      {player.name}
                    </h3>
                    <p className={`uppercase tracking-[0.2em] font-bold transition-all duration-300
                      ${isActive ? 'text-[10px] md:text-sm text-[#eacf94] mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]' : 'text-[9px] text-[#eacf94]/50 mt-1'}
                    `}>
                      {player.role}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-3 mt-12 z-30">
          {players.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full 
                ${i === activeIndex
                  ? "w-10 h-2 bg-[#BF9B30] shadow-[0_0_10px_rgba(191,155,48,0.8)]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/50"}`}
              aria-label={`Gå til spiller ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal Display */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
            onClick={() => setIsVideoOpen(false)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-3 rounded-full bg-white/5 hover:bg-white/10"
              onClick={() => setIsVideoOpen(false)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl aspect-video bg-[#0a0a0a] rounded-3xl overflow-hidden border border-[#BF9B30]/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-center p-8">
                <h3 className="font-heading text-6xl md:text-8xl text-[#BF9B30] mb-4 uppercase drop-shadow-[0_0_20px_rgba(191,155,48,0.5)]">
                  {players[activeIndex].name}
                </h3>
                <p className="text-xl md:text-3xl text-white/70 mb-12 uppercase tracking-[0.2em]">{players[activeIndex].role}</p>
                <div className="w-32 h-32 rounded-full bg-[#BF9B30]/10 flex items-center justify-center text-[#BF9B30] border-2 border-[#BF9B30]/50 shadow-[0_0_40px_rgba(191,155,48,0.3)]">
                  <Play size={64} className="ml-3 fill-[#BF9B30]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
