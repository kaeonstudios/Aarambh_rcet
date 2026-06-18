"use client";

import heroBg from "@/src/assets/videos/hero-background.mp4";

export default function Hero() {
  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "https://forms.gle/wxqvGBVTwzZVB1bL8";

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-background pt-28 pb-12 md:pt-36 md:pb-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80 z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10" />

        {/* Placeholder video - TODO: Replace with real campus/startup video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-50"
          aria-hidden="true"
        >
          <source src={heroBg} type="video/mp4" />
        </video>
      </div>

      {/* Floating Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[128px] animate-pulse-glow z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[128px] animate-pulse-glow z-0" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">

        {/* Eyebrow Badge */}
        <div className="glass px-4 py-2 rounded-full flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-white/90">
            AarambhX Hub · Conclave 2K26 · Limited Slots
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
          Royal's <span className="gradient-text-gold">founder hub</span><br />
          where ideas meet capital.
        </h1>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
          AarambhX is a startup ecosystem that takes founders from idea to funding.
          Join our flagship conclave to connect directly with a live investor panel.
        </p>

        {/* Clarity Line */}
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 fill-mode-both">
          Not a competition · A live investment platform
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700 fill-mode-both">
          <button
            onClick={() => window.open(googleFormUrl, '_blank', 'noopener,noreferrer')}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-500 rounded-full text-black font-semibold text-lg hover:scale-105 transition-all w-full sm:w-auto shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
          >
            Apply to Pitch
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <a
            href="#conclave"
            className="px-8 py-4 glass rounded-full text-white font-medium text-lg hover:bg-white/10 transition-all w-full sm:w-auto text-center"
          >
            Inside the Conclave
          </a>
        </div>

        {/* Trust Strip */}
        <div className="mt-16 sm:mt-24 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-white/50 animate-in fade-in duration-1000 delay-1000 fill-mode-both">
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/30" /> Hosted at RCET, Thrissur
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/30" /> Live investor panel
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/30" /> Post-event accelerator
          </span>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 z-20 animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-widest writing-vertical-lr text-white">Scroll</span>
        <div className="w-px h-8 bg-white/50" />
      </div>

    </section>
  );
}
