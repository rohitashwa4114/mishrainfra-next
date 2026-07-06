"use client"

import { useState, useMemo } from "react"
import { Search, ShieldCheck, Cpu, Layers, HardHat, Bolt, Construction, Hammer, Paintbrush, Home, Milestone } from "lucide-react"

// Fully mapped 9 official NIC Classifications from your certificate
const CATEGORIES = [
  { id: "all", label: "All Sectors", icon: Layers },
  { id: "nic-46593", label: "Electrical Machinery", nic: "NIC 46593", icon: Bolt },
  { id: "nic-46620", label: "Metals & Ores", nic: "NIC 46620", icon: Cpu },
  { id: "nic-46632", label: "Construction Materials", nic: "NIC 46632", icon: Construction },
  { id: "nic-46594", label: "Civil Engineering Machinery", nic: "NIC 46594", icon: HardHat },
  { id: "nic-46599", label: "Other Industrial Machinery", nic: "NIC 46599", icon: ShieldCheck },
  { id: "nic-46633", label: "Hardware & Fittings", nic: "NIC 46633", icon: Hammer },
  { id: "nic-46634", label: "Paints & Varnishes", nic: "NIC 46634", icon: Paintbrush },
  { id: "nic-41001", label: "Building Construction", nic: "NIC 41001", icon: Home },
  { id: "nic-42101", label: "Civil Infrastructure & Roads", nic: "NIC 42101", icon: Milestone },
]

const CATALOG_ITEMS = [
  // --- ELECTRICAL MACHINERY (NIC: 46593) ---
  { name: "Power Transformers & Distribution Units", category: "nic-46593", mode: "Made to Order" },
  { name: "Current & Potential Instrument Transformers", category: "nic-46593", mode: "In Catalog" },
  { name: "HT / LT Power Cables & Control Networks (XLPE/PVC)", category: "nic-46593", mode: "In Catalog" },
  { name: "Industrial Switchgears & PCC/MCC Distribution Panels", category: "nic-46593", mode: "Made to Order" },
  { name: "Circuit Breakers (MCB, MCCB, RCCB, ACB, VCB, SF6)", category: "nic-46593", mode: "In Catalog" },
  { name: "Commercial LED Lights, Luminaires & High-Bay Streetlights", category: "nic-46593", mode: "In Catalog" },
  { name: "Solar Grid Modules, Inverters & Industrial Charge Controllers", category: "nic-46593", mode: "On Request" },
  { name: "High-Volume Air Movement Systems & BLDC Exhaust Fans", category: "nic-46593", mode: "In Catalog" },
  { name: "Heavy-Duty Online UPS Systems & Modular VRLA Batteries", category: "nic-46593", mode: "On Request" },
  { name: "High-Conductivity Transmission Conductors (ACSR/AAAC)", category: "nic-46593", mode: "In Catalog" },
  { name: "Advanced Earthings, Surge Arresters & Smart Energy Meters", category: "nic-46593", mode: "In Catalog" },
  { name: "High-Capacity Diesel Generator Sets (DG Sets)", category: "nic-46593", mode: "On Request" },

  // --- METALS & ORES (NIC: 46620) ---
  { name: "GI Pipes, MS Mild Steel Pipes & Seamless ERW Conduits", category: "nic-46620", mode: "In Catalog" },
  { name: "Structural Angles, Channels, Heavy Beams & Flats", category: "nic-46620", mode: "In Catalog" },
  { name: "High-Tensile TMT Bars, Rebars & Reinforcement Steel", category: "nic-46620", mode: "In Catalog" },
  { name: "Aluminium Custom Sections & Engineered Extrusions", category: "nic-46620", mode: "Made to Order" },
  { name: "Industrial Copper Strips, Bars & Precision Wire Assets", category: "nic-46620", mode: "In Catalog" },
  { name: "Heavy-Duty Brass Fittings & Solid Bronze Components", category: "nic-46620", mode: "In Catalog" },
  { name: "Steel Sheets & Plate Stock (GI, CR, HR, Checkered Plates)", category: "nic-46620", mode: "In Catalog" },
  { name: "High-Grade Fasteners, Structural Bolts, Nuts & Studs", category: "nic-46620", mode: "In Catalog" },
  { name: "Ferrous & Non-Ferrous Industrial Scrap Metals", category: "nic-46620", mode: "On Request" },

  // --- CONSTRUCTION MATERIALS (NIC: 46632) ---
  { name: "Structural Cements (OPC, PPC, White Cement Formulations)", category: "nic-46632", mode: "In Catalog" },
  { name: "Bulk Raw Materials (River Sand, M-Sand, Coarse Aggregates)", category: "nic-46632", mode: "On Request" },
  { name: "Fly Ash Bricks, Clay Bricks & High-Temp Refractories", category: "nic-46632", mode: "In Catalog" },
  { name: "Ready Mix Concrete (RMC) & Specialized Flow Batches", category: "nic-46632", mode: "Made to Order" },
  { name: "Precast Concrete Slabs, Structural Beams & Columns", category: "nic-46632", mode: "Made to Order" },
  { name: "Vitrified Tiles, Wall Liners & Commercial DADO Ceramics", category: "nic-46632", mode: "In Catalog" },
  { name: "Commercial Sanitaryware, Wash Basins & Cistern Arrays", category: "nic-46632", mode: "In Catalog" },

  // --- CIVIL ENGINEERING MACHINERY (NIC: 46594) ---
  { name: "Heavy Crawlers, Hydraulic Excavators & Backhoe Loaders", category: "nic-46594", mode: "On Request" },
  { name: "Mobile Cranes, Heavy Tower Cranes & Piling Rig Frameworks", category: "nic-46594", mode: "On Request" },
  { name: "Automated Concrete Batching Plants & Transit Mixers", category: "nic-46594", mode: "Made to Order" },
  { name: "Vibratory Rollers, Soil Compactors & Motor Graders", category: "nic-46594", mode: "On Request" },

  // --- OTHER INDUSTRIAL MACHINERY (NIC: 46599) ---
  { name: "Rack, Blade & Tower Enterprise Servers & Data Racks", category: "nic-46599", mode: "On Request" },
  { name: "Secure Networking Arrays (Firewalls, Managed Switches, Routers)", category: "nic-46599", mode: "In Catalog" },
  { name: "Data Center Precision Air Conditioning & Cooling Matrices", category: "nic-46599", mode: "Made to Order" },
  { name: "Surveillance Architecture (IP Cameras, Biometrics, Access Control)", category: "nic-46599", mode: "In Catalog" },
  { name: "Industrial Automation Units (Smart IoT Sensors, PLC, SCADA)", category: "nic-46599", mode: "Made to Order" },

  // --- HARDWARE & FITTINGS (NIC: 46633) ---
  { name: "Industrial CP Fittings, Bib Taps & Stop Valves", category: "nic-46633", mode: "In Catalog" },
  { name: "Sanitary Fixtures, Flat Glass, and Toughened Safety Panes", category: "nic-46633", mode: "In Catalog" },
  { name: "Precision Structural Hand Tools (Hammers, Saws, Screwdrivers)", category: "nic-46633", mode: "In Catalog" },
  { name: "Building Hardware, High-Volume SWR Pipes & Couplings", category: "nic-46633", mode: "In Catalog" },

  // --- PAINTS & VARNISHES (NIC: 46634) ---
  { name: "Protective Coatings, Distempers, Primers & Emulsion Paints", category: "nic-46634", mode: "In Catalog" },
  { name: "Industrial Enamel Paints, Synthetic Varnishes & Lacquers", category: "nic-46634", mode: "In Catalog" },
  { name: "High-Performance Waterproofing Membranes & Base Sealants", category: "nic-46634", mode: "Made to Order" },

  // --- BUILDING CONSTRUCTION (NIC: 41001) ---
  { name: "Residential Complex Civil & Engineering Procurement", category: "nic-41001", mode: "Made to Order" },
  { name: "Commercial Office Blocks & Institutional Building Setups", category: "nic-41001", mode: "Made to Order" },
  { name: "Turnkey School, College, Hostel, & Hospital Shell Construction", category: "nic-41001", mode: "Made to Order" },

  // --- CIVIL INFRASTRUCTURE & ROADS (NIC: 42101) ---
  { name: "National Highways, Motorways & Urban Street Development", category: "nic-42101", mode: "Made to Order" },
  { name: "Heavy Civil Infrastructure Bridges, Tunnels, and Subways", category: "nic-42101", mode: "Made to Order" },
  { name: "Large-Scale Pipeline Routing (Water Supply, Sewerage, & Drainage)", category: "nic-42101", mode: "Made to Order" },
]

export function EquipmentDashboard() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeMode, setActiveMode] = useState("All")

  // Filter catalog rows on the fly
  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory
      const matchesMode = activeMode === "All" || item.mode === activeMode
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesMode && matchesSearch
    })
  }, [activeCategory, activeMode, searchQuery])

  // Count values computed on complete inventory list
  const stats = useMemo(() => {
    return {
      totalLines: CATALOG_ITEMS.length,
      categoriesCount: CATEGORIES.length - 1,
      readyToQuote: CATALOG_ITEMS.filter(i => i.mode === "In Catalog").length
    }
  }, [])

  return (
    <section id="equipment" className="border-t border-border/40 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
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

        {/* Counter Panels reflecting all 9 regulatory divisions */}
        <div className="mt-10 grid grid-cols-3 gap-px bg-border/40 border border-border/60 rounded-md overflow-hidden text-center max-w-2xl bg-secondary/10">
          <div className="p-4 sm:p-5">
            <span className="block text-2xl font-bold font-mono text-gold">{stats.totalLines}</span>
            <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-1">Catalog Lines</span>
          </div>
          <div className="p-4 sm:p-5 border-x border-border/40">
            <span className="block text-2xl font-bold font-mono text-gold">{stats.categoriesCount}</span>
            <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-1">NIC Classifications</span>
          </div>
          <div className="p-4 sm:p-5">
            <span className="block text-2xl font-bold font-mono text-gold">{stats.readyToQuote}</span>
            <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-1">Ready to Quote</span>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          
          {/* Complete 9-Pill Horizontal Filter Deck */}
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
                  className={`inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? "border-gold bg-gold/10 text-gold shadow-md"
                      : "border-border/60 bg-secondary/20 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{cat.label}</span>
                  {cat.nic && <span className="text-[9px] opacity-60 font-mono ml-0.5">({cat.nic})</span>}
                </button>
              )
            })}
          </div>

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

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-2">
            <span className="font-semibold tracking-wider uppercase text-[10px]">Sourcing Filter:</span>
            <div className="flex items-center gap-2">
              {["All", "In Catalog", "On Request", "Made to Order"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={`underline-offset-4 hover:text-foreground cursor-pointer transition-colors ${
                    activeMode === mode ? "text-gold font-bold underline" : "text-muted-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

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
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-mono border uppercase tracking-wider ${
                      item.mode === "In Catalog" ? "border-green-500/20 bg-green-500/5 text-green-400" :
                      item.mode === "On Request" ? "border-gold/20 bg-gold/5 text-gold" :
                      "border-blue-500/20 bg-blue-500/5 text-blue-400"
                    }`}
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
