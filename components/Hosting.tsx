"use client";

import { useEffect, useRef } from "react";

export default function Hosting() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video Autoplay Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => { });
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.2 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Content First */}
        <div className="flex flex-col mb-12 sm:mb-16">
          {/* Eyebrow Label */}
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-4 inline-block">
            Institutional Partner
          </span>
          
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight max-w-4xl text-white">
            Hosted at <span className="italic font-light gradient-text-gold">Royal College</span> of Engineering & Technology, Thrissur
          </h2>
          
          {/* Supporting Text */}
          <p className="mt-6 text-lg text-white/60 max-w-2xl">
            A state-of-the-art campus providing the perfect foundation for serious founders. We transform world-class infrastructure into an outcome-driven environment where startups meet real capital.
          </p>
        </div>

        {/* Video Card */}
        <div className="relative w-full aspect-[21/9] min-h-[300px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />

          <video 
            ref={videoRef}
            muted 
            loop 
            playsInline
            preload="metadata"
            poster="/assets/images/rcet-campus-poster.webp"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            aria-label="RCET Campus overview"
          >
            {/* Desktop: 1080p */}
            <source src="/assets/videos/rcet-campus-1080p.webm" type="video/webm" media="(min-width: 1024px)" />
            <source src="/assets/videos/rcet-campus-1080p.mp4" type="video/mp4" media="(min-width: 1024px)" />
            {/* Tablet: 720p */}
            <source src="/assets/videos/rcet-campus-720p.webm" type="video/webm" media="(min-width: 768px)" />
            <source src="/assets/videos/rcet-campus-720p.mp4" type="video/mp4" media="(min-width: 768px)" />
            {/* Mobile: 480p */}
            <source src="/assets/videos/rcet-campus-480p.webm" type="video/webm" />
            <source src="/assets/videos/rcet-campus-480p.mp4" type="video/mp4" />
            Your browser does not support this video format.
          </video>

          {/* Overlay Content */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            
            {/* Left: Location */}
            <div>
              <p className="text-white font-display text-xl sm:text-2xl font-semibold mb-1">
                Akkikavu, Thrissur
              </p>
              <p className="text-white/60 font-mono text-sm uppercase tracking-wider">
                Kerala, India
              </p>
            </div>

            {/* Right: Status Pill */}
            <div className="glass px-4 py-2 rounded-full flex items-center gap-3 w-fit">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/90 whitespace-nowrap">
                Live · Feb 2026
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
