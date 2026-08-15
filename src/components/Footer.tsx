export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#222] pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col gap-16">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 mb-6">
              <h2 className="text-2xl tracking-widest mb-4 text-[#E1E0CC] font-medium uppercase">SILAVA</h2>
              <p className="text-sm text-gray-400 max-w-[300px] leading-relaxed">
                Smart Innovation, Logic, Applications, Vision & Automation. A premium digital product engineering studio.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[#E1E0CC] mb-4 font-medium">Company</h4>
              <ul className="list-none p-0 flex flex-col gap-2">
                <li><a href="#work" className="text-gray-400 hover:text-white transition-colors text-sm">Work</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Social & Legal combined to save space */}
            <div>
              <h4 className="text-[#E1E0CC] mb-4 font-medium">Connect</h4>
              <ul className="list-none p-0 flex flex-col gap-2">
                <li><a href="https://www.linkedin.com/in/sivaganeshadapa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a></li>
                <li><a href="https://github.com/sivaganeshadapa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="flex flex-wrap justify-between items-center pt-6 border-t border-[#222] text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} SILAVA. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Engineered with <span className="text-gray-400">precision</span>
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
