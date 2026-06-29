"use client"

import { useMemo, useState } from "react"
import {
  Search,
  Factory,
  Clock,
  Truck,
  Hammer,
  Zap,
  Cable,
  Cog,
  Box,
  Package,
  type LucideIcon,
} from "lucide-react"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

type Sourcing = "In Catalog" | "On Request" | "Made to Order"

interface CatalogItem {
  id: string
  name: string
  category: string
  icon: LucideIcon
  spec: string
  origin: string
  leadTime: string
  moq: string
  sourcing: Sourcing
}

const categories = [
  "All",
  "Earthmoving",
  "Cranes & Lifting",
  "Power Systems",
  "Transmission",
  "Drilling",
] as const

// Indicative sourcing catalog — items we procure and resell to order.
// We hold no inventory; everything is sourced from vetted OEMs and suppliers.
const catalog: CatalogItem[] = [
  { id: "EM-EXC", name: "Hydraulic Excavators", category: "Earthmoving", icon: Truck, spec: "Up to 9 m³ bucket", origin: "Domestic OEM", leadTime: "4–6 wks", moq: "1 unit", sourcing: "On Request" },
  { id: "EM-DZR", name: "Crawler Dozers", category: "Earthmoving", icon: Hammer, spec: "Up to 850 HP", origin: "OEM Direct", leadTime: "6–8 wks", moq: "1 unit", sourcing: "Made to Order" },
  { id: "CL-CCR", name: "Crawler & Mobile Cranes", category: "Cranes & Lifting", icon: Box, spec: "Up to 1,200 T", origin: "Imported", leadTime: "10–14 wks", moq: "1 unit", sourcing: "Made to Order" },
  { id: "CL-TWR", name: "Tower Cranes", category: "Cranes & Lifting", icon: Box, spec: "Up to 80 m jib", origin: "OEM Direct", leadTime: "8–10 wks", moq: "1 unit", sourcing: "On Request" },
  { id: "PS-GEN", name: "Diesel Gensets", category: "Power Systems", icon: Cog, spec: "62.5 – 2,000 kVA", origin: "Domestic OEM", leadTime: "2–4 wks", moq: "1 unit", sourcing: "In Catalog" },
  { id: "PS-TRF", name: "Distribution Transformers", category: "Power Systems", icon: Zap, spec: "100 – 5,000 kVA", origin: "Domestic OEM", leadTime: "3–5 wks", moq: "1 unit", sourcing: "In Catalog" },
  { id: "TR-COND", name: "ACSR / AAAC Conductors", category: "Transmission", icon: Cable, spec: "11 – 765 kV grade", origin: "Domestic OEM", leadTime: "2–4 wks", moq: "By drum", sourcing: "In Catalog" },
  { id: "TR-INS", name: "Insulators & Switchgear", category: "Transmission", icon: Cable, spec: "11 – 400 kV class", origin: "OEM Direct", leadTime: "3–6 wks", moq: "By lot", sourcing: "On Request" },
  { id: "DR-ROT", name: "Rotary Drilling Rigs", category: "Drilling", icon: Cog, spec: "Up to 3,000 m", origin: "Imported", leadTime: "12–16 wks", moq: "1 unit", sourcing: "Made to Order" },
  { id: "DR-PIL", name: "Piling Rigs", category: "Drilling", icon: Cog, spec: "Up to 1.8 m dia", origin: "OEM Direct", leadTime: "8–12 wks", moq: "1 unit", sourcing: "On Request" },
  { id: "EM-WHL", name: "Wheel Loaders", category: "Earthmoving", icon: Truck, spec: "Up to 7.0 m³", origin: "Domestic OEM", leadTime: "4–6 wks", moq: "1 unit", sourcing: "On Request" },
  { id: "PS-PNL", name: "LT / HT Control Panels", category: "Power Systems", icon: Package, spec: "Custom build", origin: "Domestic OEM", leadTime: "4–7 wks", moq: "By spec", sourcing: "Made to Order" },
]

const sourcingStyles: Record<Sourcing, string> = {
  "In Catalog": "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  "On Request": "border-gold/40 bg-gold/10 text-gold",
  "Made to Order": "border-steel/50 bg-secondary text-muted-foreground",
}

const sourcingFilters: ("All" | Sourcing)[] = ["All", "In Catalog", "On Request", "Made to Order"]

export function EquipmentDashboard() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All")
  const [sourcing, setSourcing] = useState<"All" | Sourcing>("All")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return catalog.filter((item) => {
      const matchCat = category === "All" || item.category === category
      const matchSourcing = sourcing === "All" || item.sourcing === sourcing
      const matchQuery =
        query.trim() === "" ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchSourcing && matchQuery
    })
  }, [category, sourcing, query])

  const categoryCount = new Set(filtered.map((i) => i.category)).size
  const readyCount = filtered.filter((i) => i.sourcing === "In Catalog").length

  return (
    <section id="equipment" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 bg-gold" />
              Sourcing Catalog
            </p>
            <h2 className="mt-5 text-balance font-serif text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              What we can source for you
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
              We hold no inventory and own no fleet — we procure to order from a vetted network of OEMs
              and suppliers. Filter the indicative catalog below by category and sourcing mode. Need
              something not listed? We can source it on request.
            </p>
          </div>

          {/* live summary */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border/60 bg-border/60 text-center">
            {[
              { v: filtered.length, l: "Catalog Lines" },
              { v: categoryCount, l: "Categories" },
              { v: readyCount, l: "Ready to Quote" },
            ].map((s) => (
              <div key={s.l} className="bg-card px-5 py-4">
                <p className="font-serif text-2xl font-bold text-gold">{s.v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Controls */}
        <Reveal delay={120} className="mt-12">
          <div className="flex flex-col gap-4 rounded-md border border-border/60 bg-card/60 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-sm border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-300",
                    category === cat
                      ? "border-gold bg-gold text-primary-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-gold/50 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search item, code or category..."
                className="w-full rounded-sm border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-gold/60"
              />
            </div>
          </div>

          {/* sourcing filter */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Sourcing</span>
            {sourcingFilters.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSourcing(st)}
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-300",
                  sourcing === st
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Catalog grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 50, 300)}>
              <article className="group relative h-full overflow-hidden rounded-md border border-border/70 bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-black/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-gold/25 bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      sourcingStyles[item.sourcing],
                    )}
                  >
                    {item.sourcing}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="font-mono text-[11px] tracking-widest text-gold/70">{item.id}</p>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">{item.name}</h3>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {item.category}
                  </p>
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <dt className="flex items-center gap-1.5">
                      <Package className="h-3.5 w-3.5" /> Spec
                    </dt>
                    <dd className="font-medium text-foreground">{item.spec}</dd>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <dt className="flex items-center gap-1.5">
                      <Factory className="h-3.5 w-3.5" /> Source
                    </dt>
                    <dd className="font-medium text-foreground">{item.origin}</dd>
                  </div>
                </dl>

                {/* lead time + MOQ */}
                <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-foreground">
                    <Clock className="h-3.5 w-3.5 text-gold" /> Lead {item.leadTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-foreground">
                    MOQ {item.moq}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-md border border-dashed border-border py-16 text-center">
            <p className="font-serif text-xl text-foreground">No catalog items match your filters</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Adjust the category, sourcing mode or search query — or send us a tender enquiry and we
              will source it for you.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
