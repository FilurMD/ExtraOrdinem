"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#242526]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient overlay for "cave" effect: Dark top/bottom, green-tinted transparent middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#056630]/30 to-black/80" />
      </div>

      <div className="container relative z-20 mx-auto px-6 flex flex-col items-center justify-center h-full max-w-[1400px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center text-center mt-20"
        >
          {/* Overlapping Typography Container */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-start justify-center mt-4">

            {/* The small text - positioned above EXTRA */}
            <motion.span
              variants={itemVariants}
              className="font-sans text-[10px] md:text-sm lg:text-base tracking-[0.3em] uppercase font-bold text-white mb-2 ml-4 md:ml-8 z-30 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}
            >
              [ STRÆBEN EFTER DET PERFEKTE ]
            </motion.span>

            <div className="relative flex flex-col items-start">
              {/* EXTRA - Cream fill, black stroke */}
              <motion.h1
                variants={itemVariants}
                className="font-heading text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] xl:text-[15rem] leading-[0.8] font-bold uppercase tracking-tighter drop-shadow-2xl z-10"
                style={{
                  color: '#F5F5DC', // Valor Cream
                  WebkitTextStroke: '2px #111',
                  textShadow: '0px 10px 30px rgba(0,0,0,0.5)'
                }}
              >
                EXTRA
              </motion.h1>

              {/* ORDINEM - Gold fill, tracking close to EXTRA */}
              <motion.h1
                variants={itemVariants}
                className="font-heading text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] xl:text-[15rem] leading-[0.8] font-bold uppercase tracking-tighter z-20 -mt-1 sm:-mt-2 md:-mt-4 lg:-mt-6 xl:-mt-8 ml-4 md:ml-12"
                style={{
                  color: '#BF9B30', // Polished Gold
                  WebkitTextStroke: '2px #111',
                  textShadow: '0px 15px 35px rgba(0,0,0,0.6)'
                }}
              >
                ORDINEM
              </motion.h1>
            </div>

            <motion.div variants={itemVariants} className="w-full mt-12 md:mt-16 z-30 flex items-center justify-center">
              {/* Animated Liquid Gold CTA Button */}
              <button 
                className="relative inline-flex h-14 md:h-16 overflow-hidden rounded-full p-[2px] group shadow-[0_0_20px_rgba(191,155,48,0.3)] hover:shadow-[0_0_40px_rgba(191,155,48,0.6)] transition-all duration-500 hover:scale-[1.05] focus:outline-none"
              >
                {/* The continuous stream of liquid gold light */}
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#BF9B30_40%,#F5F5DC_50%,#BF9B30_60%,transparent_100%)] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* The deep green base */}
                <div className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-[#054a23] px-8 md:px-10 group-hover:bg-[#065e2d] transition-colors duration-300">
                  {/* Sharper and thicker text for clear contrast */}
                  <span className="flex items-center gap-3 text-sm md:text-base uppercase tracking-[0.25em] font-black text-[#F5F5DC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    MØD HOLDET <ArrowDown className="w-5 h-5 group-hover:-translate-y-1 transition-transform stroke-[3px]" />
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
