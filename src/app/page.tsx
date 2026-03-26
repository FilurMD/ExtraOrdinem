import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { PlayersCarousel } from "@/components/sections/players-carousel";
import { TrophyCabinet } from "@/components/sections/trophy-cabinet";
import { MusicSection } from "@/components/sections/music-section";
import { ClipsLibrary } from "@/components/sections/clips-library";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <PlayersCarousel />
        <TrophyCabinet />
        <MusicSection />
        <ClipsLibrary />
      </main>
      <SiteFooter />
    </div>
  );
}
