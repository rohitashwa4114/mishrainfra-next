"use client"

import { useState } from "react"
import { MapPin, Mail, Phone, X, Award, Shield, Landmark, User, Briefcase, Leaf } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

export function SiteFooter() {
  const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode } | null>(null)

  const openModal = (type: string) => {
    if (type === "Leadership") {
      setModalContent({
        title: "Corporate Leadership",
        body: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <div className="flex items-center gap-3 border-b border-border/40 pb-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-foreground font-serif font-bold text-base">Rohitashwa Mishra</h4>
                <p className="text-xs text-gold font-mono uppercase tracking-wider">Founder & Managing Partner</p>
              </div>
            </div>
            <p>
              Mishra Capital Infra Solutions LLP is led directly by its founder, <strong>Rohitashwa Mishra</strong>, who oversees strategic capital allocation, public sector bid management, and core infrastructure supply operations.
            </p>
            <p>
              Backed by a hands-on approach to project lifecycle management, he commands the firm’s central operations cell in Uttar Pradesh—driving end-to-end supply chain integration for state utilities, data center networks, and heavy engineering setups. By eliminating corporate bureaucracy, he ensures that government contractors and enterprise stakeholders have a direct, single point of contact to expedite technical clearances and critical fulfillment timelines.
            </p>
          </div>
        )
      })
    } else if (type === "Compliance & Certifications") {
      setModalContent({
        title: "Compliance & Government Registration",
        body: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>We maintain full corporate and fiscal authorization under the Ministry of Corporate Affairs and MSME sectors.</p>
            <div className="space-y-3 mt-4">
              <div className="flex gap-3 items-start p-3 bg-secondary/20 border border-border rounded-sm">
                <Landmark className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold text-xs uppercase tracking-wider font-mono">LLP Integration</h4>
                  <p className="text-sm mt-0.5 select-all font-mono text-foreground/90">LLPIN: ACW-9180</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-secondary/20 border border-border rounded-sm">
                <Shield className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold text-xs uppercase tracking-wider font-mono">MSME Certification</h4>
                  <p className="text-sm mt-0.5 select-all font-mono text-foreground/90">UDYAM-UP-50-0269779</p>
                  <p className="text-xs text-muted-foreground/80 mt-1 leading-normal">
                    Eligible for state procurement exemptions, earnest money deposit (EMD) waivers, and specialized technical bidding considerations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })
    } else if (type === "Project Portfolio") {
      setModalContent({
        title: "Project Portfolio Desk",
        body: (
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>Our commercial desk handles high-stakes procurement pipelines across multiple core infrastructure verticals. Active domains include:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-foreground/90 font-sans pl-1">
              <li><strong className="text-gold">Grid Infrastructure:</strong> Component sourcing and logistics for high-voltage transmission setups.</li>
              <li><strong className="text-gold">Public Utilities:</strong> Equipment routing for regional water management and smart city modules.</li>
              <li><strong className="text-gold">GeM Fulfillment:</strong> High-volume public procurement order management.</li>
            </ul>
            <p className="text-xs pt-2 border-t border-border/40 mt-2 text-muted-foreground/80">
              To protect project confidentiality and state compliance standards, historical project logs are restricted. Please email our secure bid desk at <a href="mailto:contact@mishrainfra.in" className="text-gold underline font-medium">contact@mishrainfra.in</a> to request detailed capability briefs.
            </p>
          </div>
        )
      })
    } else if (type === "Sustainability") {
      setModalContent({
        title: "Sustainability Framework",
        body: (
          <p className="text-sm text-muted-foreground leading-relaxed">
            We prioritize eco-conscious logistical planning and partner exclusively with industrial manufacturers who implement low-impact, energy-efficient production cycles for heavy infrastructure components and digital assets.
          </p>
        )
      })
    } else if (type === "Careers") {
      setModalContent({
        title: "Careers & Human Capital",
        body: (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mishra Capital Infra is always looking for agile engineering consultants, bid management specialists, and logistics experts. Forward your credentials and enterprise background directly to our administrative hub at <a href="mailto:contact@mishrainfra.in" className="text-gold underline font-medium">contact@mishrainfra.in</a>.
          </p>
        )
      })
    } else if (type === "Press & Media") {
      setModalContent({
        title: "Press & Media Desk",
        body: (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Official corporate announcements, public tender qualifications, and media briefs regarding our ongoing infrastructure partnerships are indexed exclusively through our corporate communications desk.
          </p>
        )
      })
    } else if (type === "Investor Relations") {
      setModalContent({
        title: "Investor Relations Cell",
        body: (
          <p className="text-sm text-muted-foreground leading-relaxed">
            As a structured Limited Liability Partnership, we manage project-specific capital allocations and infrastructure asset financing under strict fiscal auditing standards. For corporate investment inquires, contact our management cell.
          </p>
        )
      })
    }
  }

  const columns = [
    {
      title: "Capabilities",
      links: [
        { label: "EPC & Engineering", href: "#capabilities" },
        { label: "Renewable Energy", href: "#capabilities" },
        { label: "Power Transmission", href: "#capabilities" },
        { label: "AI Data Centers", href: "#capabilities" },
        { label: "Water & Sanitation", href: "#capabilities" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Mishra", href: "#about" },
        { label: "Leadership", action: () => openModal("Leadership") },
        { label: "Project Portfolio", action: () => openModal("Project Portfolio") },
        { label: "Sustainability", action: () => openModal("Sustainability") },
        { label: "Careers", action: () => openModal("Careers") },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Tender Portal", href: "#tenders" },
        { label: "Compliance & Certifications", action: () => openModal("Compliance & Certifications") },
        { label: "Press & Media", action: () => openModal("Press & Media") },
        { label: "Investor Relations", action: () => openModal("Investor Relations") },
        { label: "Contact", href: "#tenders" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border/60 bg-secondary/30 relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo size="md" className="items-start text-left" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Engineering, financing and operating nation-scale infrastructure for government and
              enterprise partners across power, renewables, transmission and digital assets.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0" /> Lucknow, Uttar Pradesh, India
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" /> 
                <a href="mailto:contact@mishrainfra.in" className="hover:text-foreground transition-colors">contact@mishrainfra.in</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" /> 
                <a href="tel:+919194294114" className="hover:text-foreground transition-colors">+91-9194294114 (Mobile)</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" /> 
                <a href="tel:+915223586330" className="hover:text-foreground transition-colors">+91-522-3586330 (Landline)</a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-all hover:text-foreground active:text-gold"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <button
                        onClick={link.action}
                        type="button"
                        className="text-sm text-left text-muted-foreground transition-all hover:text-foreground active:text-gold cursor-pointer"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Mishra Capital Infra Solutions LLP. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-end text-[11px] font-mono opacity-80">
            <span className="cursor-default select-all">LLPIN: ACW-9180</span>
            <span className="cursor-default select-all">UDYAM: UDYAM-UP-50-0269779</span>
          </div>
        </div>
      </div>

      {/* Pop-up Overlay Panel (Modal) */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
              <h3 className="font-serif text-base font-bold text-foreground flex items-center gap-2">
                <Award className="h-4 w-4 text-gold" />
                {modalContent.title}
              </h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="rounded-sm p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors active:scale-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              {modalContent.body}
            </div>
            <button
              type="button"
              onClick={() => setModalContent(null)}
              className="mt-6 w-full rounded-sm bg-secondary px-4 py-2 text-xs font-semibold text-foreground border border-border hover:bg-secondary/80 transition-colors active:scale-[0.98]"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
