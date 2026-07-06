"use client"

import { useState, useMemo } from "react"
import { Search, ShieldCheck, Cpu, Layers, HardHat, Bolt, Construction } from "lucide-react"

// Complete item catalog structural mapping based on official NIC classifications
const CATEGORIES = [
  { id: "all", label: "All Items", icon: Layers },
  { id: "electrical", label: "Electrical Systems", nic: "NIC: 46593", icon: Bolt },
  { id: "metals", label: "Metals & Structural", nic: "NIC: 46620", icon: Cpu },
  { id: "construction", label: "Construction Materials", nic: "NIC: 46632", icon: Construction },
  { id: "machinery", label: "Industrial Machinery", nic: "NIC: 46595", icon: HardHat },
  { id: "it-digital", label: "IT & Digital Assets", nic: "NIC: 46599", icon: ShieldCheck },
]

const CATALOG_ITEMS = [
  // --- ELECTRICAL (NIC: 46593) ---
  { name: "Power Transformers & Distribution Units", category: "electrical", mode: "Made to Order" },
  { name: "Current & Potential Instrument Transformers", category: "electrical", mode: "In Catalog" },
  { name: "HT/LT Power Cables & Control Networks (XLPE/PVC)", category: "electrical", mode: "In Catalog" },
  { name: "Industrial Switchgears & PCC/MCC Distribution Panels", category: "electrical", mode: "Made to Order" },
  { name: "Circuit Breakers (MCB, MCCB, RCCB, ACB, VCB, SF6)", category: "electrical", mode: "In Catalog" },
  { name: "Commercial LED Lights, Luminaires & High-Bay Streetlights", category: "electrical", mode: "In Catalog" },
  { name: "Solar Grid Modules, Inverters & Industrial Charge Controllers", category: "electrical", mode: "On Request" },
  { name: "High-Volume Air Movement Systems & BLDC Exhaust Fans", category: "electrical", mode: "In Catalog" },
  { name: "Heavy-Duty Online UPS Systems & Modular VRLA Batteries", category: "electrical", mode: "On Request" },
  { name: "High-Conductivity Transmission Conductors (ACSR/AAAC)", category: "electrical", mode: "In Catalog" },
  { name: "Advanced Earthings, Surge Arresters & Smart Energy Meters", category: "electrical", mode: "In Catalog" },
  { name: "High-Capacity Diesel Generator Sets (DG Sets)", category: "electrical", mode: "On Request" },

  // --- METALS (NIC: 46620) ---
  { name: "GI Pipes, MS Mild Steel Pipes & Seamless ERW Conduits", category: "metals", mode: "In Catalog" },
  { name: "Structural Angles, Channels, Heavy Beams & Flats", category: "metals", mode: "In Catalog" },
  { name: "High-Tensile TMT Bars, Rebars & Reinforcement Steel", category: "metals", mode: "In Catalog" },
  { name: "Aluminium Custom Sections & Engineered Extrusions", category: "metals", mode: "Made to Order" },
  { name: "Industrial Copper Strips, Bars & Precision Wire Assets", category: "metals", mode: "In Catalog" },
  { name: "Heavy-Duty Brass Fittings & Solid Bronze Components", category: "metals", mode: "In Catalog" },
  { name: "Steel Sheets & Plate Stock (GI, CR, HR, Checkered Plates)", category: "metals", mode: "In Catalog" },
  { name: "High-Grade Fasteners, Structural Bolts, Nuts & Studs", category: "metals", mode: "In Catalog" },

  // --- CONSTRUCTION MATERIALS (NIC: 46632) ---
  { name: "Structural Cements (OPC, PPC, White Cement Formulations)", category: "construction", mode: "In Catalog" },
  { name: "Bulk Raw Materials (River Sand, M-Sand, Coarse Aggregates)", category: "construction", mode: "On Request" },
  { name: "Fly Ash Bricks, Clay Bricks & High-Temp Refractories", category: "construction", mode: "In Catalog" },
  { name: "Ready Mix Concrete (RMC) & Specialized Flow Batches", category: "construction", mode: "Made to Order" },
  { name: "Precast Concrete Slabs, Structural Beams & Columns", category: "construction", mode: "Made to Order" },
  { name: "Vitrified Tiles, Wall Liners & Commercial DADO Ceramics", category: "construction", mode: "In Catalog" },
  { name: "Commercial Sanitaryware, Basins & Flushing Cistern System arrays", category: "construction", mode: "In Catalog" },
  { name: "CP Fittings, Valves, Stopcocks & Architectural Hardware", category: "construction", mode: "In Catalog" },
  { name: "Protective Coatings, Distempers, Primers & Emulsion Paints", category: "construction", mode: "In Catalog" },
  { name: "UPVC Multi-Lock Doors & Double-Glazed Aluminium Windows", category: "construction", mode: "Made to Order" },

  // --- INDUSTRIAL MACHINERY (NIC: 46595) ---
  { name: "Heavy Crawlers, Hydraulic Excavators & Front Loaders", category: "machinery", mode: "On Request" },
  { name: "Mobile Cranes, Heavy Tower Cranes & Piling Rig Frameworks", category: "machinery", mode: "On Request" },
  { name: "Automated Concrete Batching Plants & Transit Mixers", category: "machinery", mode: "Made to Order" },
  { name: "Vibratory Rollers, Soil Compactors & Motor Graders", category: "machinery", mode: "On Request" },
  { name: "High-Pressure Air Compressors & Dewatering Submersibles", category: "machinery", mode: "In Catalog" },
  { name: "Commercial Forklifts, Conveyor Systems & Automated Material Handling", category: "machinery", mode: "On Request" },
  { name: "Modular Structural Scaffolding, Shuttering Panels & Formworks", category: "machinery", mode: "In Catalog" },

  // --- OTHER MACHINERY & IT (NIC: 46599) ---
  { name: "Rack, Blade & Tower Enterprise Servers & Data Racks", category: "it-digital", mode: "On Request" },
  { name: "Secure Networking Arrays (Firewalls, Managed Switches, Routers)", category: "it-digital", mode: "In Catalog" },
  { name: "Data Center Precision Air Conditioning & Cooling Matrices", category: "it-digital", mode: "Made to Order" },
  { name: "Surveillance Architecture (IP Cameras, Biometrics, Access Control)", category: "it-digital", mode: "In Catalog" },
  { name: "Enterprise Automation Units (Smart IoT Sensors, PLC, SCADA Controllers)", category: "it-digital", mode: "Made to Order" },
  { name: "Ergonomic Corporate Office Workstations & Secure Cabinets", category: "it-digital", mode: "In Catalog" },
]

export function EquipmentDashboard() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeMode, setActiveMode] = useState("All")

  // High performance filtered query execution memoization
  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory
      const matchesMode = activeMode === "All" || item.mode === activeMode
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesMode && matchesSearch
    })
  }, [activeCategory, activeMode, searchQuery])

  const stats = useMemo(() => {
    return {
      totalLines: CATALOG_ITEMS.length,
      categoriesCount: CATEGORIES.length - 1, // Exclude 'all'
      readyToQuote: CATALOG_ITEMS.filter(i => i.mode === "In Catalog").length
    }
  }, [])

  return (
    <section id="equipment" className="border-t border-border/40 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            WHAT WE CAN SOURCE FOR YOU
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We hold no inventory and own no fleet — we procure directly to order from an officially 
            vetted corporate network of industrial OEMs and authorized suppliers. Filter our indicative 
            procurement catalog below by regulatory category code or operational fulfillment mode.
          </p>
        </div>

        {/* Dynamic Metric Stat Badges */}
        <div className="mt-10 grid grid-cols-3 gap-px bg-border/40 border border-border/60 rounded-md overflow-hidden text-center max-w-2xl bg-secondary/10">
          <div className="p-4 sm:p-5">
            <span className="block text-2xl font-bold font-mono text-gold">{stats.totalLines}</span>
            <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-1">Catalog Lines</span>
          </div>
          <div className="p-4 sm:p-5 border-x border-border/40">
            <span className="block text-2xl font-bold font-mono text-gold">{stats.categoriesCount}</span>
            <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-1">NIC Categories</span>
          </div>
          <div className="p-4 sm:p-5">
            <span className="block text-2xl font-bold font-mono text-gold">{stats.readyToQuote}</span>
            <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-1">Ready to Quote</span>
          </div>
        </div>

        {/* Interactive Filters Grid Block */}
        <div className="mt-12 space-y-6">
          
          {/* Main Category Filter Triggers */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isSelected = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSearchQuery("")
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer",
                    isSelected
                      ? "border-gold bg-gold/10 text-gold shadow-md"
                      : "border-border/60 bg-secondary/20 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{cat.label}</span>
                  {cat.nic && <span className="text-[9px] opacity-60 font-mono">({cat.nic})</span>}
                </button>
              )
            })}
          </div>

          {/* Search Box Inputs */}
          <div className="relative max-w-md">
            <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Search specific item keyword, material formulation or hardware line..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-border/60 bg-secondary/10 py-2.5 pr-4 pl-9 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
            />
          </div>

          {/* Sourcing Fulfillment Mode Sub-filters */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-2">
            <span className="font-semibold tracking-wider uppercase text-[10px]">Sourcing Filter:</span>
            <div className="flex items-center gap-2">
              {["All", "In Catalog", "On Request", "Made to Order"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={cn(
                    "underline-offset-4 hover:text-foreground cursor-pointer transition-colors",
                    activeMode === mode ? "text-gold font-bold underline" : "text-muted-foreground"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Render Grid Output */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 border border-border/40 bg-secondary/5 p-4 rounded-sm hover:border-border hover:bg-secondary/20 transition-all group"
                >
                  <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors leading-normal">
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-mono border uppercase tracking-wider",
                      item.mode === "In Catalog" && "border-green-500/20 bg-green-500/5 text-green-400",
                      item.mode === "On Request" && "border-gold/20 bg-gold/5 text-gold",
                      item.mode === "Made to Order" && "border-blue-500/20 bg-blue-500/5 text-blue-400"
                    )}
                  >
                    {item.mode}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-full border border-dashed border-border p-8 text-center text-sm text-muted-foreground rounded-sm">
                No indexed parts found matching that specific keyword. Send an overlay request to the bid desk.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}

// Utility styling function fall-back block mechanism
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
