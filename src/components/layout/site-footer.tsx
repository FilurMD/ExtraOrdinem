export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 px-6 rounded-t-[3rem] mt-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-foreground mb-4">
              Extra <span className="text-primary">Ordinem</span>
            </h2>
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-6 leading-relaxed">
              Ekspertise i Counter-Strike 2. <br/>
              Skaber den næste generation af e-sport.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-primary tracking-widest uppercase font-bold text-sm mb-6">Hold</h4>
            <ul className="space-y-4">
              <li><a href="#players" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Spillere</a></li>
              <li><a href="#matches" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Kampe</a></li>
              <li><a href="#clips" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Klips</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-primary tracking-widest uppercase font-bold text-sm mb-6">Socials</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Twitch</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Discord</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-primary tracking-widest uppercase font-bold text-sm mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li><a href="mailto:contact@extraordinem.gg" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Partnerskaber</a></li>
              <li><a href="mailto:contact@extraordinem.gg" className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Presse</a></li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-border/50 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm tracking-widest">© 2026 EXTRA ORDINEM</p>
          
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping text-primary absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </div>
            <span className="text-xs font-mono uppercase text-muted-foreground">Systemer Operationelle</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
