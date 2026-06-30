"use client"

import { useState } from "react"
import { CheckCircle2, ShieldCheck, FileText, Clock, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { sendTenderEmail } from "@/app/actions"

const sectors = [
  "Power & Energy",
  "Renewable Energy",
  "Transmission & Grid",
  "Data Center",
  "Water & Sanitation",
  "Roads & Highways",
  "Ports & Logistics",
  "Other",
]

const projectTypes = [
  "Equipment Supply",
  "Component Procurement",
  "GeM Order Fulfilment",
  "Spares & Consumables",
  "Rate Contract Supply",
]

const budgets = ["Under ₹5 Lakh", "₹5 – 25 Lakh", "₹25 Lakh – 1 Cr", "₹1 – 5 Cr", "Above ₹5 Cr"]

const highlights = [
  { icon: ShieldCheck, title: "Udyam-registered MSME", desc: "A verified micro-enterprise eligible for MSME procurement benefits and exemptions." },
  { icon: FileText, title: "GeM-ready quotations", desc: "We respond with quotes, specifications and compliance documents for GeM and tenders." },
  { icon: Clock, title: "Prompt, hands-on response", desc: "Enquiries are handled directly by our agile sourcing team — no layers, no delays." },
]

export function TenderForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await sendTenderEmail(formData)
    
    setIsSending(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError("Something went wrong routing your message. Please try again or contact us directly.")
    }
  }

  return (
    <section id="tenders" className="relative border-t border-border/60 py-16 sm:py-32 overflow-hidden">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-20 sm:opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        
        {/* Left intro: Stays crisp and unstacked on mobile */}
        <Reveal>
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 sm:w-10 bg-gold" />
              Government Tenders
            </p>
            <h2 className="mt-4 text-balance font-serif text-2xl font-bold leading-tight text-foreground sm:text-5xl">
              Invite us to your next tender
            </h2>
            <p className="mt-3 max-w-md text-pretty text-sm sm:text-lg text-muted-foreground">
              Submit your tender brief and our public-sector bid desk will respond with eligibility,
              technical capability statements and commercial structuring options.
            </p>

            {/* Mobile Touch Optimized Highlights Grid */}
            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-1">
              {highlights.map((h) => (
                <div key={h.title} className="flex gap-4 p-3.5 rounded-sm bg-secondary/10 border border-border/30 backdrop-blur-xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gold/20 bg-gold/5 text-gold">
                    <h.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-foreground">{h.title}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-normal">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right form: Enhanced input touch states */}
        <Reveal delay={120}>
          <div className="rounded-lg border border-border/70 bg-card/40 sm:bg-card/80 p-5 backdrop-blur-md sm:p-8 shadow-2xl shadow-background/50">
            {submitted ? (
              <div className="flex min-h-[400px] sm:min-h-[480px] flex-col items-center justify-center text-center p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold animate-scaleIn">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl sm:text-2xl font-bold text-foreground">Tender brief received</h3>
                <p className="mt-2.5 max-w-sm text-xs sm:text-sm text-muted-foreground">
                  Thank you. Our tender management cell will acknowledge your submission within 72 hours
                  with a dedicated bid reference.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground transition-all active:scale-95 active:bg-secondary"
                >
                  Submit another tender
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <Field label="Department / Organization" required>
                    <input required name="department" type="text" placeholder="e.g. State Power Utility" className={inputCls} />
                  </Field>
                  <Field label="Contact Person" required>
                    <input required name="contactName" type="text" placeholder="Full name" className={inputCls} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <Field label="Official Email" required>
                    <input required name="email" type="email" placeholder="name@gov.in" className={inputCls} />
                  </Field>
                  <Field label="Phone" required>
                    <input required name="phone" type="tel" placeholder="+91 00000 00000" className={inputCls} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <Field label="Sector" required>
                    <select required name="sector" defaultValue="" className={inputCls}>
                      <option value="" disabled>Select sector</option>
                      {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Project Type" required>
                    <select required name="projectType" defaultValue="" className={inputCls}>
                      <option value="" disabled>Select type</option>
                      {projectTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <Field label="Estimated Budget" required>
                    <select required name="budget" defaultValue="" className={inputCls}>
                      <option value="" disabled>Select range</option>
                      {budgets.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Tender Reference No.">
                    <input name="refNo" type="text" placeholder="Optional" className={inputCls} />
                  </Field>
                </div>

                <Field label="State / Location" required>
                  <input required name="location" type="text" placeholder="e.g. Rajasthan, India" className={inputCls} />
                </Field>

                <Field label="Scope & Requirements" required>
                  <textarea
                    required
                    name="scope"
                    rows={4}
                    placeholder="Briefly describe the tender scope, timelines and key deliverables..."
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={isSending}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-gold/10 transition-all duration-200 active:scale-[0.99] active:brightness-95 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSending ? "Routing Submission..." : "Submit Tender Brief"}
                  {!isSending && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>
                <p className="text-center text-[10px] sm:text-xs text-muted-foreground/80">
                  Encrypted submission. Used solely for tender evaluation purposes.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Added safe font size (text-base on mobile prevents iOS from zooming in automatically on click)
const inputCls =
  "w-full rounded-sm border border-border bg-background/50 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-gold/60 focus:bg-background active:bg-background [&>option]:bg-card"

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  )
}
