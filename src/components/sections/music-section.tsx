"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

const tracks = [
  { id: 1, title: "Extra Ordinem Anthem", duration: "3:45", producer: "Team DJ" },
  { id: 2, title: "Clutch Moments", duration: "2:30", producer: "Team DJ" },
  { id: 3, title: "Rush B Vibe", duration: "4:05", producer: "Team DJ" },
];

export function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [progress, setProgress] = useState(0); // 0 to 100
  
  // Note: audioRef isn't strictly functional without a real src, 
  // but simulates the UI perfectly for a landing page prototype.

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatProgress = () => {
    // Dummy progression logic for visual effect could go here
    return isPlaying ? "1:15" : "0:00"; 
  };

  return (
    <section id="music" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-primary tracking-widest uppercase text-sm font-bold mb-2 block">Vores Lyd</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-tight">
            Hold <span className="text-secondary opacity-80">Hymner</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Player Graphic / Vinyl */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full filter blur-3xl animate-pulse" />
            
            <div className={`relative w-full h-full rounded-full border border-border/50 bg-card p-2 shadow-2xl transition-transform duration-1000 ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}>
              <div 
                className="w-full h-full rounded-full bg-cover bg-center border-4 border-background"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop')" }}
              />
              {/* Hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-2 border-border" />
            </div>
          </motion.div>

          {/* Player Controls & Tracklist */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 bg-card border border-border rounded-3xl p-8 lg:p-12"
          >
            {/* Now Playing */}
            <div>
              <p className="text-primary text-sm tracking-widest uppercase font-bold mb-2">Afspiller Nu</p>
              <h3 className="font-heading text-3xl font-bold uppercase tracking-wide">{currentTrack.title}</h3>
              <p className="text-muted-foreground mt-1">Produceret af {currentTrack.producer}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: isPlaying ? '35%' : '0%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground font-mono">
                <span>{formatProgress()}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Volume2 size={24} />
              </button>
              
              <div className="flex items-center gap-6">
                <button className="text-foreground hover:text-primary transition-colors">
                  <SkipBack size={32} />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(191,155,48,0.3)]"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                <button className="text-foreground hover:text-primary transition-colors">
                  <SkipForward size={32} />
                </button>
              </div>
              
              <div className="w-6" /> {/* Spacer for balance */}
            </div>

            {/* Tracklist */}
            <div className="mt-8 space-y-2">
              <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4 border-b border-border pb-2">Trackliste</p>
              {tracks.map((track) => (
                <button 
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(track);
                    setIsPlaying(true);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${currentTrack.id === track.id ? 'bg-primary/10 text-primary' : 'hover:bg-background text-foreground'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm opacity-50 font-mono">0{track.id}</span>
                    <span className="font-bold tracking-wide">{track.title}</span>
                  </div>
                  <span className="text-sm opacity-70 font-mono">{track.duration}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
