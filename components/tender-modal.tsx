"use client"

import { useState, useRef } from "react"
import { X, Upload, FileText, Send, Building2, User, Mail, HelpCircle } from "lucide-react"

const EXPANDED_NIC_CODES = [
  { code: "42101", label: "Turnkey Civil/Road Build (NIC 41001/42101)" },
  { code: "42102", label: "Bridges, Flyovers & Tunnels (NIC 42102)" },
  { code: "42201", label: "Power Transmission Lines & Grids (NIC 42201)" },
  { code: "42202", label: "Telecommunication & Optic Fiber (NIC 42202)" },
  { code: "42204", label: "Water Infrastructure & Pipelines (NIC 42204)" },
  { code: "42901", label: "Power Generation Plants (NIC 42901)" },
  { code: "42902", label: "Heavy Industrial Plant Facilities (NIC 42902)" },
  { code: "43210", label: "Electrical Systems & Substation Wiring (NIC 43210)" },
  { code: "43220", label: "Industrial HVAC & Plumbing Setup (NIC 43220)" },
  { code: "46620", label: "Wholesale Metals & Structural Ores (NIC 46620)" },
  { code: "46631", label: "Wholesale Construction Materials (NIC 46632)" },
  { code: "46692", label: "Electrical Machinery & Transformers (NIC 46593/46692)" },
  { code: "71100", label: "Core Technical Engineering Consultancy (NIC 71100)" }
]

interface TenderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TenderModal({ isOpen, onClose }: TenderModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    scope: "46692", // Default tracking set to Electrical Machinery category code
    timeline: "Immediate (< 30 days)",
    additionalDetails: ""
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate enterprise-grade file parsing & mail submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      // Reset form states
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        scope: "46692",
        timeline: "Immediate (< 30 days)",
        additionalDetails: ""
      })
      setFile(null)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-md border border-border bg-card p-6 shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Close Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground tracking-tight">
              SUBMIT SECURE RFQ / TENDER
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Mishra Capital Infra Bidding Desk</p>
          </div>
          <button
            type="button"
            onClick={() => { setIsSuccess(false); onClose(); }}
            className="rounded-sm p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-foreground font-serif font-bold text-base">Tender Transmitted Successfully</h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Your specifications, structural data sheets, or BOQs have been routed directly to our commercial estimating desk. A confirmation log has been deployed.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setIsSuccess(false); onClose(); }}
              className="mt-4 rounded-sm bg-secondary px-6 py-2 text-xs font-semibold text-foreground border border-border hover:bg-secondary/80 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Company Block */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wider text-gold uppercase mb-1.5">Company / Authority Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
                <input
                  type="text"
                  required
                  placeholder="e.g., UP Power Corporation / National Highways Board"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full rounded-sm border border-border/60 bg-secondary/10 py-2.5 pr-4 pl-9 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
                />
              </div>
            </div>

            {/* Contact Person & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-gold uppercase mb-1.5">Contact Authority</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full rounded-sm border border-border/60 bg-secondary/10 py-2.5 pr-4 pl-9 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-gold uppercase mb-1.5">Official Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
                  <input
                    type="email"
                    required
                    placeholder="procurement@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-sm border border-border/60 bg-secondary/10 py-2.5 pr-4 pl-9 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
                  />
                </div>
              </div>
            </div>

            {/* Scope Selection Dropdown matching core setup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-gold uppercase mb-1.5 flex items-center gap-1">
                  Primary Procurement Scope
                  <HelpCircle className="h-3 w-3 text-muted-foreground/40 cursor-help" title="Select core industrial segment code" />
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full rounded-sm border border-border/60 bg-secondary/20 py-2.5 px-3 text-xs text-foreground focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40 cursor-pointer text-left"
                >
                  {EXPANDED_NIC_CODES.map((item) => (
                    <option key={item.code} value={item.code} className="bg-card text-foreground">
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-gold uppercase mb-1.5">Required Delivery Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full rounded-sm border border-border/60 bg-secondary/20 py-2.5 px-3 text-xs text-foreground focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40 cursor-pointer"
                >
                  <option className="bg-card">Immediate (&lt; 30 days)</option>
                  <option className="bg-card">Standard QTR Block (30-90 days)</option>
                  <option className="bg-card">Long Term Project Phase Layout</option>
                </select>
              </div>
            </div>

            {/* Additional Technical Notes */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wider text-gold uppercase mb-1.5">Scope / Specification Summary</label>
              <textarea
                rows={3}
                placeholder="Detail out custom transformer ratings, line measurements, steel quantities or custom hardware requirements..."
                value={formData.additionalDetails}
                onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                className="w-full rounded-sm border border-border/60 bg-secondary/10 py-2 px-3 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40 resize-none"
              />
            </div>

            {/* Interactive File Drag & Drop Field */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wider text-gold uppercase mb-1.5">Attach BOQ Sheets, Drawings or Tender Specifications</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.xlsx,.xls,.docx"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-border/80 rounded-sm bg-secondary/5 p-4 text-center cursor-pointer hover:bg-secondary/20 hover:border-gold/40 transition-all flex flex-col items-center gap-1.5 group"
              >
                <Upload className="h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                {file ? (
                  <span className="text-xs font-mono font-medium text-gold select-all flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" /> {file.name}
                  </span>
                ) : (
                  <>
                    <span className="text-xs font-medium text-foreground/80">Click to upload document layout</span>
                    <span className="text-[10px] text-muted-foreground">Supports PDF, Excel Spreadsheet (XLSX), or Word formats up to 25MB</span>
                  </>
                )}
              </div>
            </div>

            {/* Execute Form Transmission */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-sm bg-gold/10 hover:bg-gold/20 text-gold border border-gold/40 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                  <span>Encrypting & Routing Data...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit to Estimation Desk</span>
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  )
}
