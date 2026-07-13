"use client"

import { FileSpreadsheet, ShieldCheck, Truck, ClipboardCheck } from "lucide-react"

const WORKFLOW_STEPS = [
  {
    phase: "Phase 01",
    title: "Bid Evaluation & BOQ Analysis",
    description:
      "Our commercial estimating desk parses your technical drawings, material formulations, and strict Bill of Quantities (BOQ). We run complete compliance matching against state guidelines and tender parameters.",
    icon: FileSpreadsheet,
  },
  {
    phase: "Phase 02",
    title: "Tier-1 OEM Sourcing Loop",
    description:
      "We engage our pre-vetted network of authorized industrial manufacturers and global OEMs. By pulling direct, high-volume price quotes, we lock down highly competitive commercial structuring for your project.",
    icon: ShieldCheck,
  },
  {
    phase: "Phase 03",
    title: "Logistics & Fleet Coordination",
    description:
      "Our supply chain managers coordinate heavy freight routing, strategic dispatch, and multi-point transport networks to eliminate field delays, ensuring all components arrive strictly on schedule.",
    icon: Truck,
  },
  {
    phase: "Phase 04",
    title: "On-Site Delivery & Handover",
    description:
      "Materials undergo final technical inspection upon site arrival. We execute seamless corporate handover logs and clear compliance documentation to finalize regulatory verification loops.",
    icon: ClipboardCheck,
  },
]

export function TenderForm() {
  return (
    <section id="tenders" className="border-t border-border/40 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold block mb-2">
            Operational Blueprint
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">
            Our Strategic Execution Workflow
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From the initial submission of technical criteria to physical project handover, we implement 
            a rigid, structured procurement pipeline designed for high-stakes infrastructure delivery.
          </p>
        </div>

        {/* Timeline Grid Layout */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
          
          {/* Subtle connecting track line behind cards on desktop */}
          <div className="hidden lg:block absolute top-[2.25rem] left-8 right-8 h-px bg-gradient-to-r from-gold/30 via-border/40 to-transparent z-0" />

          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <div 
                key={idx} 
                className="relative bg-secondary/10 border border-border/40 rounded-sm p-6 flex flex-col justify-between hover:border-gold/40 hover:bg-secondary/20 transition-all group z-10"
              >
                <div>
                  {/* Phase Counter and Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-gold bg-gold/5 border border-gold/20 px-2 py-0.5 rounded-sm uppercase">
                      {step.phase}
                    </span>
                    <div className="h-9 w-9 rounded-full border border-border/60 bg-background flex items-center justify-center text-muted-foreground group-hover:text-gold group-hover:border-gold/30 transition-colors shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <h3 className="text-sm font-semibold tracking-wide text-foreground group-hover:text-gold transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
