import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Sectors } from "@/components/sectors"
import { Capabilities } from "@/components/capabilities"
import { EquipmentDashboard } from "@/components/equipment-dashboard"
import { TenderForm } from "@/components/tender-form"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Sectors />
        <Capabilities />
        <EquipmentDashboard />
        <TenderForm />
      </main>
      <SiteFooter />
    </div>
  )
}
