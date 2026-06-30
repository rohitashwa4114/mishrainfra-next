"use client"

import { useEffect, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Sectors", href: "#sectors" },
  { label: "Equipment", href: "#equipment" },
  { label: "Tenders", href: "#tenders" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-background/80 to-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Scaled brand lockup for prominent visibility */}
        <a href="#top" className="group flex items-center" aria-label="Mishra Capital Infra Solutions LLP — home">
          <BrandLogo size="md" className="transition-transform duration-500 group-hover:scale-[1.02]" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#tenders"
            className="hidden items-center gap-1.5 rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground sm:inline-flex"
          >
            Submit Tender
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col px-4 py-2 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#tenders"
            onClick={() => setOpen(false)}
            className="mt-3 mb-2 inline-flex items-center justify-center gap-1.5 rounded-sm bg-gold px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Submit Tender
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
