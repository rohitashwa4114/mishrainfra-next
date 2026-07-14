import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Sectors } from "@/components/sectors"
import { Capabilities } from "@/components/capabilities"
import { EquipmentDashboard } from "@/components/equipment-dashboard"
import { TenderForm } from "@/components/tender-form"
import { FounderSection } from "@/components/founder-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Targets "About Mishra" right at the core introduction */}
        <div id="about">
          <Hero />
          <Sectors />
        </div>

        {/* Targets the "Capabilities" matrix column links */}
        <div id="capabilities">
          <Capabilities />
          <EquipmentDashboard />
        </div>

        {/* Strategic Execution Workflow Timeline */}
        <TenderForm />

        {/* Brand New Corporate Founder Profile Section */}
        <FounderSection />
      </main>
      <SiteFooter />
    </div>
  )
}
