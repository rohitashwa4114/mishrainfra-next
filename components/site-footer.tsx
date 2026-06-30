import { MapPin, Mail, Phone } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

const columns = [
  {
    title: "Capabilities",
    links: ["EPC & Engineering", "Renewable Energy", "Power Transmission", "AI Data Centers", "Water & Sanitation"],
  },
  {
    title: "Company",
    links: ["About Mishra", "Leadership", "Project Portfolio", "Sustainability", "Careers"],
  },
  {
    title: "Resources",
    links: ["Tender Portal", "Compliance & Certifications", "Press & Media", "Investor Relations", "Contact"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
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
                <a href="tel:+919194294114" className="hover:text-foreground transition-colors">+91-9194294114</a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
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
    </footer>
  )
}
