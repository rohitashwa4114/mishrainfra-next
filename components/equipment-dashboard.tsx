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
  { name: "Power Transformers & Heavy Substation Units", category: "nic-46593", mode: "Made to Order" },
  { name: "Distribution Transformers (Oil-Cooled & Dry-Type)", category: "nic-46593", mode: "Made to Order" },
  { name: "Current Transformers (CT) & Potential Transformers (PT)", category: "nic-46593", mode: "In Catalog" },
  { name: "High-Voltage (HT) & Low-Voltage (LT) Power Cables", category: "nic-46593", mode: "In Catalog" },
  { name: "Control Cables, XLPE Armored & PVC Insulated Cables", category: "nic-46593", mode: "In Catalog" },
  { name: "Industrial Switchgears (HT & LT Safe Breakers)", category: "nic-46593", mode: "Made to Order" },
  { name: "PCC Panels, MCC Panels & Power Distribution Boards", category: "nic-46593", mode: "Made to Order" },
  { name: "Circuit Breakers (MCB, MCCB, RCCB, ACB, VCB, SF6)", category: "nic-46593", mode: "In Catalog" },
  { name: "Commercial LED Lights, Panel Luminaires & High-Bay Lamps", category: "nic-46593", mode: "In Catalog" },
  { name: "Industrial LED Streetlights & Outer Bulkhead Lighting", category: "nic-46593", mode: "In Catalog" },
  { name: "Solar Grid Modules, Inverters & Charge Controllers", category: "nic-46593", mode: "On Request" },
  { name: "Solar Dedicated High-Fulfillment Cabling & Arrays", category: "nic-46593", mode: "On Request" },
  { name: "Heavy Air Movement Exhaust Fans & BLDC Ceiling Fans", category: "nic-46593", mode: "In Catalog" },
  { name: "Instant Industrial Water Heaters & Heavy Geysers", category: "nic-46593", mode: "In Catalog" },
  { name: "Online Enterprise UPS, Inverters & Storage Batteries", category: "nic-46593", mode: "On Request" },
  { name: "High-Conductivity Transmission Conductors (ACSR / AAAC)", category: "nic-46593", mode: "In Catalog" },
  { name: "Copper & Chemical Earthing, Lightning & Surge Arresters", category: "nic-46593", mode: "In Catalog" },
  { name: "Smart Energy Meters & Electronic Grid Metering Units", category: "nic-46593", mode: "In Catalog" },
  { name: "High-Capacity Diesel Generator Sets (DG Sets & Gensets)", category: "nic-46593", mode: "On Request" },

  // --- METALS & ORES (NIC: 46620) ---
  { name: "GI Pipes (Galvanized Iron) & Heavy MS Mild Steel Pipes", category: "nic-46620", mode: "In Catalog" },
  { name: "High-Pressure Seamless Pipes & ERW Conduits", category: "nic-46620", mode: "In Catalog" },
  { name: "Structural Fabrications (MS Angles, Channels, & Beams)", category: "nic-46620", mode: "In Catalog" },
  { name: "Heavy MS Flats, Girders, Purlins, & Core Plates", category: "nic-46620", mode: "In Catalog" },
  { name: "High-Tensile TMT Bars, Rebars & Reinforcement Steel", category: "nic-46620", mode: "In Catalog" },
  { name: "Aluminium Custom Sections & Architectural Extrusions", category: "nic-46620", mode: "Made to Order" },
  { name: "Industrial Copper Strips, Bars & Grounding Wires", category: "nic-46620", mode: "In Catalog" },
  { name: "Heavy-Duty Brass Fittings & Solid Bronze Components", category: "nic-46620", mode: "In Catalog" },
  { name: "Steel Sheet Stock (GI Sheets, CR Sheets, HR Sheets)", category: "nic-46620", mode: "In Catalog" },
  { name: "Heavy Checked Steel Plates & Structural Footing Units", category: "nic-46620", mode: "In Catalog" },
  { name: "High-Grade Anchor Fasteners, Structural Bolts & Studs", category: "nic-46620", mode: "In Catalog" },
  { name: "Ferrous & Non-Ferrous Bulk Metal Recycling Scrap", category: "nic-46620", mode: "On Request" },

  // --- CONSTRUCTION MATERIALS (NIC: 46632) ---
  { name: "Structural Cements (OPC Cement & PPC Cement Grades)", category: "nic-46632", mode: "In Catalog" },
  { name: "Bulk Raw Materials (River Sand, M-Sand, Fine Aggregates)", category: "nic-46632", mode: "On Request" },
  { name: "Fly Ash Bricks, Clay Bricks & High-Temp Refractories", category: "nic-46632", mode: "In Catalog" },
  { name: "Crushed Stone Chips & Coarse Aggregate Formations", category: "nic-46632", mode: "In Catalog" },
  { name: "Ready Mix Concrete (RMC) Custom Pour Delivery Batches", category: "nic-46632", mode: "Made to Order" },
  { name: "Precast Concrete Slabs, Structural Beams & Columns", category: "nic-46632", mode: "Made to Order" },
  { name: "Vitrified Tiles, Ceramic Flooring Tiles & Wall Liners", category: "nic-46632", mode: "In Catalog" },
  { name: "Commercial DADO Ceramics & Skirting Borders", category: "nic-46632", mode: "In Catalog" },
  { name: "Commercial Sanitaryware (Wash Basins, Commodes, Urinals)", category: "nic-46632", mode: "In Catalog" },
  { name: "Waterproofing Membranes, Protective Slurry & Base Coatings", category: "nic-46632", mode: "In Catalog" },
  { name: "Flat Glass Panes, Sheet Glass & Toughened Security Glass", category: "nic-46632", mode: "In Catalog" },
  { name: "Structural Plywood, Blockboards, MDF & Particle Boards", category: "nic-46632", mode: "In Catalog" },

  // --- CIVIL ENGINEERING MACHINERY (NIC: 46594) ---
  { name: "Heavy Crawlers, Hydraulic Excavators & Front Loaders", category: "nic-46594", mode: "On Request" },
  { name: "Backhoes, Industrial Loaders & Heavy Tracked Dozers", category: "nic-46594", mode: "On Request" },
  { name: "Mobile Cranes, Heavy Tower Cranes & Crawler Lifters", category: "nic-46594", mode: "On Request" },
  { name: "Automated Concrete Batching Plants & Transit Mixers", category: "nic-46594", mode: "Made to Order" },
  { name: "Vibratory Rollers, Soil Compactors & Motor Graders", category: "nic-46594", mode: "On Request" },
  { name: "Heavy-Duty Dump Trucks & High-Capacity Tippers", category: "nic-46594", mode: "On Request" },
  { name: "Piling Rig Frameworks & Deep-Earth Rotary Drilling Drills", category: "nic-46594", mode: "On Request" },

  // --- OTHER INDUSTRIAL MACHINERY (NIC: 46599) ---
  { name: "Rack, Blade & Tower Enterprise Data Center Servers", category: "nic-46599", mode: "On Request" },
  { name: "Secure Networking Arrays (Firewalls, Switches, Routers)", category: "nic-46599", mode: "In Catalog" },
  { name: "Data Center Precision Air Conditioning & Cooling Matrices", category: "nic-46599", mode: "Made to Order" },
  { name: "Surveillance Architecture (IP Cameras, Biometrics, RFID)", category: "nic-46599", mode: "In Catalog" },
  { name: "Industrial Automation Hardware (Smart IoT Sensors, PLC)", category: "nic-46599", mode: "Made to Order" },
  { name: "SCADA Infrastructure Control & Analytics Software Suites", category: "nic-46599", mode: "Made to Order" },

  // --- HARDWARE & FITTINGS (NIC: 46633) ---
  { name: "Industrial CP Fittings, Bib Taps & Stop Valves", category: "nic-46633", mode: "In Catalog" },
  { name: "Precision Structural Hand Tools (Hammers, Saws, Screwdrivers)", category: "nic-46633", mode: "In Catalog" },
  { name: "Building Hardware, High-Volume SWR Pipes & Couplings", category: "nic-46633", mode: "In Catalog" },
  { name: "Bathroom Showers, Towel Rails & Sanitary Fixtures", category: "nic-46633", mode: "In Catalog" },
  { name: "High-Volume Fluid Manhole Covers & Septic Tank Enclosures", category: "nic-46633", mode: "In Catalog" },
  { name: "Submersible Pumps & Centrifugal Water Handling Pumps", category: "nic-46633", mode: "In Catalog" },

  // --- PAINTS & VARNISHES (NIC: 46634) ---
  { name: "Protective Outer Coatings, Wall Primers & Distempers", category: "nic-46634", mode: "In Catalog" },
  { name: "Acrylic Emulsion Wall Paints & Protective Enamels", category: "nic-46634", mode: "In Catalog" },
  { name: "Industrial Synthetic Varnishes, Sealants & Base Lacquers", category: "nic-46634", mode: "In Catalog" },
  { name: "High-Performance Tile Grouts & Specialized Adhesives", category: "nic-46634", mode: "In Catalog" },

  // --- BUILDING CONSTRUCTION (NIC: 41001) ---
  { name: "Residential Complex Civil Engineering Procurement", category: "nic-41001", mode: "Made to Order" },
  { name: "Commercial Office Blocks & Institutional Building Setups", category: "nic-41001", mode: "Made to Order" },
  { name: "Turnkey School, College & Student Hostel Shell Engineering", category: "nic-41001", mode: "Made to Order" },
  { name: "Multi-Specialty Hospital Blocks & Technical Healthcare Shells", category: "nic-41001", mode: "Made to Order" },

  // --- CIVIL INFRASTRUCTURE & ROADS (NIC: 42101) ---
  { name: "National Highways, Motorways & Express Road Development", category: "nic-42101", mode: "Made to Order" },
  { name: "Heavy Flyovers, Concrete Bridges, Tunnels, & Foot Culverts", category: "nic-42101", mode: "Made to Order" },
  { name: "Large-Scale Water Supply Pipelines & Cross-Country Networks", category: "nic-42101", mode: "Made to Order" },
  { name: "Municipal Sewerage Gridways & High-Capacity Drainage Systems", category: "nic-42101", mode: "Made to Order" },
  { name: "Grid Substation Electrification & Large-Scale Solar Plants", category: "nic-42101", mode: "Made to Order" },
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
