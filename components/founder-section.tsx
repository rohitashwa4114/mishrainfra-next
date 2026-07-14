"use client"

import Image from "next/image"
import { Quote, CheckCircle2 } from "lucide-react"

const CORE_PRINCIPLES = [
  "Integrity in every transaction",
  "Transparent procurement",
  "OEM-first sourcing strategy",
  "Long-term partnerships over short-term sales",
  "Nationwide execution capability"
]

export function FounderSection() {
  return (
    <section id="founder" className="border-t border-border/40 bg-secondary/10 py-20 sm:py-24 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.01] to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Block: Corporate Portrait Card (Updated for Landscape/Rectangle Image) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative mb-6 w-full max-w-sm sm:max-w-md">
              {/* Studio Portrait Frame optimized for 896x500 aspect ratio */}
              <div className="aspect-[16/9] w-full rounded-sm border border-gold/40 bg-background flex items-center justify-center p-2 shadow-2xl shadow-black/60 overflow-hidden">
                <div className="relative h-full w-full bg-secondary/30 border border-border/60 flex flex-col items-center justify-center rounded-sm group">
                  <Image 
                    src="/rohitashwa.jpg" 
                    alt="Rohitashwa Mishra - Designated Partner"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center filter grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0"
                    priority
                  />
                </div>
              </div>
              <Quote className="absolute -bottom-4 -right-3 h-10 w-10 text-gold/10 transform rotate-180 hidden sm:block" />
            </div>

            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Rohitashwa Mishra
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-gold mt-1.5 font-medium">
              Designated Partner
            </p>
            <p className="text-[11px] text-muted-foreground/80 font-sans mt-0.5">
              Mishra Capital Infra Solutions LLP
            </p>
          </div>

          {/* Right Block: Official Vision & Core Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold block">
                Meet the Founder
              </span>
              <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl uppercase tracking-tight">
                Simplifying Enterprise Procurement
              </h3>
            </div>

            {/* Introduction & Vision */}
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p className="text-foreground/95 font-medium italic border-l-2 border-gold/40 pl-4">
                “Mishra Capital Infra Solutions LLP was founded with a clear vision—to simplify infrastructure procurement for government bodies, public sector undertakings, EPC contractors, and institutional buyers. We focus on building a trusted sourcing network that delivers quality industrial products, competitive pricing, and dependable execution across India.”
              </p>
              <div className="space-y-1 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Our Strategic Vision</h4>
                <p className="text-xs">
                  “Our long-term vision is to become one of India’s most trusted infrastructure procurement and supply partners, supporting the nation’s growth in power transmission, renewable energy, digital infrastructure, water systems, and next-generation industrial development.”
                </p>
              </div>
            </div>

            {/* Core Principles Grid */}
            <div className="pt-5 border-t border-border/40">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">Core Operating Principles</h4>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {CORE_PRINCIPLES.map((principle, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Powerful Corporate Quote Row */}
        <div className="mt-16 pt-8 border-t border-border/40 text-center max-w-3xl mx-auto space-y-2">
          <p className="font-serif text-base sm:text-lg italic text-foreground/80 tracking-wide leading-relaxed">
            “Infrastructure is not built by materials alone—it is built by trust, execution, and long-term partnerships.”
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-gold font-medium">
            — Rohitashwa Mishra
          </p>
        </div>

      </div>
    </section>
  )
}
