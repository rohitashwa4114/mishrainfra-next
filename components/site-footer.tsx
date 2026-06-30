import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-amber-500/15 bg-[#070709] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Left Column: Brand & Contact Info */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                MISHRA <span className="text-amber-500 font-sans text-xs uppercase tracking-widest block font-medium">Capital Infra</span>
              </span>
            </div>
            
            {/* Corporate Headquarters & Contact Grid */}
            <div className="space-y-4 text-sm font-light">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-500/80 mb-1">Corporate Presence</h4>
                <p className="text-white">Lucknow,</p>
                <p>Uttar Pradesh, India</p>
              </div>
              
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-500/80 mb-1">Procurement Desk</h4>
                <p className="text-white hover:text-amber-400 transition">
                  <a href="mailto:contact@mishrainfra.in">contact@mishrainfra.in</a>
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-500/80 mb-1">Direct Line</h4>
                <p className="text-white hover:text-amber-400 transition">
                  <a href="tel:+919194294114">+91-9194294114</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Columns: Dynamic Nav Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-500">Capabilities</h3>
                <ul role="list" className="mt-4 space-y-2 text-sm">
                  <li><a href="#capabilities" className="hover:text-white transition">EPC & Engineering</a></li>
                  <li><a href="#capabilities" className="hover:text-white transition">Renewable Energy</a></li>
                  <li><a href="#capabilities" className="hover:text-white transition">Power Transmission</a></li>
                  <li><a href="#capabilities" className="hover:text-white transition">AI Data Centers</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-500">Company</h3>
                <ul role="list" className="mt-4 space-y-2 text-sm">
                  <li><a href="#top" className="hover:text-white transition">About Mishra</a></li>
                  <li><a href="#top" className="hover:text-white transition">Leadership</a></li>
                  <li><a href="#top" className="hover:text-white transition">Sustainability</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-500">Resources</h3>
                <ul role="list" className="mt-4 space-y-2 text-sm">
                  <li><a href="#tenders" className="hover:text-white transition">Tender Portal</a></li>
                  <li><a href="#tenders" className="hover:text-white transition">Compliance</a></li>
                  <li><a href="#tenders" className="hover:text-white transition">Partner Registration</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Mishra Capital Infra Solutions LLP. All rights reserved.</p>
          <div className="flex gap-6 font-mono opacity-60">
            <span>CIN: U45200UP2026PTC000000</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
