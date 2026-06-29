import Image from "next/image"
import { ArrowUpRight, ChevronDown } from "lucide-react"

const panels = [
  {
    src: "/hero-solar-wind.png",
    label: "Renewable Grids",
    sub: "Solar & Wind",
    code: "01",
  },
  {
    src: "/hero-transmission.png",
    label: "Power Transmission",
    sub: "High-Voltage",
    code: "02",
  },
  {
    src: "/hero-datacenter.png",
    label: "AI Data Centers",
    sub: "Hyperscale Networks",
    code: "03",
  },
]

const stats = [
  { value: "Udyam", label: "Registered Micro-Enterprise" },
  { value: "GeM", label: "Listed Procurement Seller" },
  { value: "Lucknow", label: "Uttar Pradesh · India" },
  { value: "Pan-India", label: "Sourcing Network" },
]

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#070709]">
      {/* Split-panel image matrix backdrop */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
        {panels.map((panel) => (
          <div
            key={panel.code}
            className="group relative overflow-hidden border-amber-500/15 md:border-l md:first:border-l-0"
          >
            <Image
              src={panel.src || "/placeholder.svg"}
              alt={panel.label}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-60 grayscale-[35%] transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0"
            />
            {/* tint + readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/65 to-[#070709]/30 transition-opacity duration-700 group-hover:from-[#070709]/95 group-hover:via-[#070709]/40" />

            {/* panel caption — revealed on hover */}
            <div className="absolute bottom-28 left-0 right-0 px-6 opacity-0 translate-y-3 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-32">
              <div className="flex items-center gap-3">
                <span className="font-serif text-sm text-amber-500/70">{panel.code}</span>
                <span className="h-px w-8 bg-amber-500/50 transition-all duration-500 group-hover:w-14" />
              </div>
              <p className="mt-2 text-lg font-semibold text-white">{panel.label}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{panel.sub}</p>
            </div>

            {/* static panel index — always visible, top corner */}
            <div className="absolute left-6 top-24 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400/70 transition-opacity duration-500 group-hover:opacity-0">
              <span className="font-serif text-amber-500/60">{panel.code}</span>
              {panel.label}
            </div>
          </div>
        ))}
      </div>

      {/* Centered content layer */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pt-24 text-center sm:px-6">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-[#070709]/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-400 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          B2B &amp; B2G Procurement &bull; Udyam MSME &bull; GeM Registered
        </div>

        <h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Your Agile Sourcing Gateway for{" "}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent font-sans font-black tracking-tighter inline-block">
            Infrastructure Procurement
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
          Mishra Capital Infra Solutions LLP is a Lucknow-based, Udyam-registered micro-enterprise. We
          source, supply and resell the equipment and components your projects need across power,
          renewables, transmission and digital infrastructure — through GeM and institutional tenders.
        </p>

        <div className="pointer-events-auto mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#tenders"
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-amber-500 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30"
          >
            Submit Government Tender
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#capabilities"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-800 bg-[#070709]/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:text-amber-400"
          >
            Explore Capabilities
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-amber-500/15 bg-[#070709]/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-800/60 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-5 text-center md:py-6">
              <p className="font-serif text-2xl font-bold text-amber-400 md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-28 left-1/2 z-10 -translate-x-1/2 text-slate-500">
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  )
}
