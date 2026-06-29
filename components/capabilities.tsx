import { Sun, Zap, Server, HardHat, Droplets, Landmark, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/reveal"

interface Capability {
  icon: LucideIcon
  title: string
  desc: string
  tag: string
}

const capabilities: Capability[] = [
  {
    icon: HardHat,
    title: "Equipment Procurement",
    desc: "We source heavy machinery, construction equipment and industrial plant from vetted manufacturers and supply it against your purchase orders.",
    tag: "Sourcing",
  },
  {
    icon: Sun,
    title: "Renewable Energy Supply",
    desc: "Procurement of solar modules, inverters, mounting structures, wind components and storage hardware for project developers and EPC partners.",
    tag: "Solar · Wind",
  },
  {
    icon: Zap,
    title: "Power & Transmission Goods",
    desc: "Supply of transformers, switchgear, conductors, insulators, cables and substation components sourced to tender specifications.",
    tag: "Grid Supply",
  },
  {
    icon: Server,
    title: "IT & Data Center Hardware",
    desc: "Sourcing of servers, networking gear, racks, cooling units and structured cabling for institutional and data infrastructure needs.",
    tag: "Hardware",
  },
  {
    icon: Droplets,
    title: "Water & Sanitation Supplies",
    desc: "Procurement of pumps, pipes, valves, treatment media and fittings for municipal and industrial water and sanitation works.",
    tag: "Utilities",
  },
  {
    icon: Landmark,
    title: "GeM & Tender Fulfilment",
    desc: "End-to-end bid participation and order fulfilment on GeM and institutional tenders — from quotation to delivery and documentation.",
    tag: "Procurement",
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold" />
            What We Source
          </p>
          <h2 className="mt-5 text-balance font-serif text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            A single sourcing partner for infrastructure goods
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            Asset-light and agile, we connect buyers with the right manufacturers and suppliers. If your
            project or tender needs it, we can source it — across power, renewables, transmission, water
            and digital infrastructure.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 80}>
              <article className="group relative h-full bg-card p-8 transition-colors duration-500 hover:bg-secondary">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-gold/30 bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-primary-foreground">
                  <cap.icon className="h-6 w-6" />
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{cap.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
                <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
                  {cap.tag}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
