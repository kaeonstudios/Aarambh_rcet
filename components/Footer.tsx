export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-gold-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gold-400 to-amber-600 text-black font-display font-bold text-xl flex-shrink-0">
                A
              </div>
              <span className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
                Aarambh<span className="gradient-text-gold font-bold">X</span>
              </span>
            </div>
            <p className="mt-6 text-white/60 max-w-sm">
              India's elite founder hub where early-stage ideas connect directly with investors.
              Not a competition. A live investment platform.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "https://forms.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-gradient-to-r from-gold-500 to-amber-500 text-black font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-gold-500/20 text-center"
            >
              Apply to Pitch
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <a href="#conclave" className="text-white/60 hover:text-white transition-colors">Conclave</a>
              </li>
              <li>
                <a href="#workflow" className="text-white/60 hover:text-white transition-colors">Workflow</a>
              </li>
              <li>
                <a href="#backbone" className="text-white/60 hover:text-white transition-colors">Backbone</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li>RCET, Thrissur</li>
              <li>Kerala, India</li>
              <li>
                <a href="mailto:hello@aarambhx.com" className="hover:text-white transition-colors">hello@aarambhx.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {currentYear} AarambhX. All rights reserved.</p>
          <p>
            Designed & Engineered by{" "}
            <a
              href="https://avenirstudios.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400 hover:underline transition-colors"
            >
              Avenir Studios
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
