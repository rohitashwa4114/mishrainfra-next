const sectors = [
  "GeM Marketplace",
  "State PSUs & Discoms",
  "Municipal Corporations",
  "Public Works Departments",
  "EPC Contractors",
  "Smart Cities Mission",
  "Renewable Developers",
  "Educational Institutions",
  "Industrial Buyers",
  "Cooperative Bodies",
]

export function Sectors() {
  return (
    <section id="sectors" className="relative overflow-hidden border-y border-border/60 bg-secondary/40 py-10">
      <div className="mx-auto mb-7 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Sourcing &amp; supplying for government bodies, public undertakings &amp; institutional buyers
        </p>
      </div>

      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex shrink-0 [animation:var(--animate-marquee)] group-hover:[animation-play-state:paused]">
          {[...sectors, ...sectors].map((sector, i) => (
            <div
              key={`${sector}-${i}`}
              className="flex items-center gap-4 whitespace-nowrap px-8"
            >
              <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
              <span className="font-serif text-xl font-semibold text-foreground/80">{sector}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
