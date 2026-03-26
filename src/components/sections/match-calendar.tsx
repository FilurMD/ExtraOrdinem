"use client";

import { motion } from "framer-motion";
import { Calendar, Trophy, Clock, Twitch } from "lucide-react";

const matches = [
  { id: 1, opponent: "Astralis Talent", date: "24. Okt, 2026", time: "18:00 CET", league: "Esportligaen", status: "Kommende" },
  { id: 2, opponent: "Sashi Esport", date: "28. Okt, 2026", time: "20:00 CET", league: "Esportligaen", status: "Kommende" },
  { id: 3, opponent: "Copenhagen Wolves", date: "02. Nov, 2026", time: "19:00 CET", league: "Esportligaen", status: "Kommende" },
];

export function MatchCalendar() {
  return (
    <section id="matches" className="py-24 bg-card relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="text-primary tracking-widest flex items-center gap-2 uppercase text-sm font-bold mb-2">
              <Trophy size={16} /> Officielle Kampe
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-tight">
              Kamp <span className="text-muted-foreground">Log</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-balance">
            Følg vores rejse gennem Esportligaen. Track kommende kampe og stream-tider.
          </p>
        </motion.div>

        <div className="space-y-4">
          {matches.map((match, i) => (
            <motion.div 
              key={match.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(191,155,48,0.1)]"
            >
              <div className="flex flex-col md:flex-row items-center md:gap-12 w-full md:w-auto text-center md:text-left">
                {/* Date & Time */}
                <div className="mb-4 md:mb-0">
                  <p className="text-primary font-bold uppercase tracking-wider flex items-center justify-center md:justify-start gap-2 text-sm">
                    <Calendar size={14} /> {match.date}
                  </p>
                  <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm mt-1">
                    <Clock size={14} /> {match.time}
                  </p>
                </div>

                {/* Matchup */}
                <div className="flex items-center gap-4 text-xl md:text-2xl font-heading font-bold uppercase">
                  <span>Extra Ordinem</span>
                  <span className="text-muted-foreground text-sm">VS</span>
                  <span>{match.opponent}</span>
                </div>
              </div>

              {/* Action / League */}
              <div className="flex items-center gap-6 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold tracking-wider text-muted-foreground uppercase">{match.league}</p>
                </div>
                <a 
                  href="https://twitch.tv" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-full transition-colors w-full md:w-auto font-bold uppercase tracking-wider text-sm"
                >
                  <Twitch size={16} /> Se Live
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
