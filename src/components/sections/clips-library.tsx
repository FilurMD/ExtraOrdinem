"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const clips = [
  { id: 1, title: "FILUR 1v4 Clutch", duration: "0:45", views: "12K", thumbnail: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "SPRIT Entry på A", duration: "0:20", views: "8.5K", thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" },
  { id: 3, title: "BAAHR 4k AWP Hold", duration: "0:55", views: "15K", thumbnail: "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?q=80&w=1974&auto=format&fit=crop" },
  { id: 4, title: "IMP Spray Transfer", duration: "0:15", views: "20K", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, title: "MANGO Vanvittig Lurk", duration: "1:10", views: "5K", thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" },
];

export function ClipsLibrary() {
  return (
    <section id="clips" className="py-24 bg-background relative border-t border-border/50">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="text-primary tracking-widest uppercase text-sm font-bold mb-2 block">Højdepunkter</span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-tight">
              CS2 <span className="text-muted-foreground">Klips</span>
            </h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer text-sm font-bold tracking-widest text-primary uppercase border-b border-primary pb-1"
          >
            Gå Til Arkiv
          </motion.div>
        </motion.div>

        {/* Bento Grid layout for clips */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {clips.map((clip, i) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group hover:z-10 relative rounded-3xl overflow-hidden cursor-pointer bg-card border border-border hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/20
                ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              `}
            >
              {/* Thumbnail */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                style={{ backgroundImage: `url(${clip.thumbnail})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-background/90 ${i === 0 ? 'via-background/40' : 'via-background/60'} to-transparent`} />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary flex items-center justify-center text-primary shadow-[0_0_15px_rgba(191,155,48,0.5)]">
                  <Play className="ml-1 w-8 h-8" />
                </div>
              </div>

              {/* Clip Info */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-mono px-2 py-1 rounded backdrop-blur-md">
                    {clip.duration}
                  </span>
                  <span className="text-muted-foreground text-xs font-mono">
                    {clip.views} visninger
                  </span>
                </div>
                <h3 className={`font-heading font-bold uppercase tracking-wide group-hover:text-primary transition-colors ${i === 0 ? 'text-3xl lg:text-4xl' : 'text-xl'}`}>
                  {clip.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
