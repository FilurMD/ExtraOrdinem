"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "HOLDET", href: "#players" },
  { name: "KAMPE", href: "#matches" },
  { name: "MUSIK", href: "#music" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <motion.nav
        className="flex items-center justify-between px-6 py-3 transition-all duration-300 rounded-full w-full max-w-5xl bg-[rgba(18,18,18,0.6)] backdrop-blur-[12px] border border-[rgba(212,175,55,0.2)] shadow-2xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50 shrink-0">
          <span className="font-heading text-lg md:text-xl font-bold tracking-widest text-[#F5F5DC]">
            EXTRA <span className="text-[#D4AF37]">ORDINEM</span>
          </span>
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <div className="flex gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-[0.15em] hover:text-[#BF9B30] transition-colors relative group ${link.name === "HOLDET" ? "text-[#BF9B30] font-bold" : "text-[#F5F5DC] font-medium"}`}
              >
                {link.name}
                <span 
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#BF9B30] transition-all duration-300 ease-out ${link.name === "HOLDET" ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA - Right */}
        <div className="hidden md:block shrink-0 z-50">
          <Link
            href="#clips"
            className="px-8 py-2.5 rounded-full bg-[#BF9B30] text-black font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(191,155,48,0.5)] transition-all"
          >
            KLIPS
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 bg-zinc-900 border border-border rounded-2xl p-4 flex flex-col gap-4 shadow-xl md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium tracking-wider text-muted-foreground hover:text-[#BF9B30] transition-colors uppercase p-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#clips"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-8 py-3 rounded-full bg-[#BF9B30] text-black font-bold uppercase tracking-widest mt-2"
          >
            KLIPS
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
