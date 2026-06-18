"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import keynotePoster from "@/src/assets/images/keynote-poster.webp";
import panelPoster from "@/src/assets/images/panel-poster.webp";
import pitchPoster from "@/src/assets/images/pitch-poster.webp";
import comingsoon from "@/src/assets/images/coming_soon.webp";

const POSTERS = [
  { id: 1, image: keynotePoster, title: "Keynote Session" },
  { id: 2, image: panelPoster, title: "Panel Discussion" },
  { id: 3, image: pitchPoster, title: "Pitch Competition" },
  { id: 4, image: comingsoon, title: "More Events Coming Soon" },
];

export default function Conclave() {
  const [activePoster, setActivePoster] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Poster Carousel Auto-rotation
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActivePoster((prev) => (prev + 1) % POSTERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

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
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="conclave" className="w-full py-20 lg:py-28 relative overflow-hidden bg-background">
      {/* Background Variation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/10 via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-4 inline-block">
            The Conclave
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-6">
            A serious room.<br />
            <span className="gradient-text-gold">Serious capital.</span>
          </h2>
          <p className="text-lg text-white/60">
            This isn't a college fest pitching competition. It's an arena where early-stage startups present their vision to active angel investors and institutional funds ready to deploy capital.
          </p>
        </div>

        {/* Media Section */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 lg:gap-8">

          {/* LEFT: Video */}
          <div className="md:col-span-8 w-full group">
            <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-surface shadow-2xl transition-all duration-500 hover:shadow-gold-500/10">
              {/* Conclave Highlights Video */}
              <video
                ref={videoRef}
                controls
                muted
                playsInline
                preload="metadata"
                poster="/assets/images/conclave-highlights-poster.webp"
                className="w-full h-full object-cover"
                aria-label="Conclave highlights video"
              >
                {/* Desktop: 1080p */}
                <source src="/assets/videos/conclave-highlights-1080p.webm" type="video/webm" media="(min-width: 1024px)" />
                <source src="/assets/videos/conclave-highlights-1080p.mp4" type="video/mp4" media="(min-width: 1024px)" />
                {/* Tablet: 720p */}
                <source src="/assets/videos/conclave-highlights-720p.webm" type="video/webm" media="(min-width: 768px)" />
                <source src="/assets/videos/conclave-highlights-720p.mp4" type="video/mp4" media="(min-width: 768px)" />
                {/* Mobile: 480p */}
                <source src="/assets/videos/conclave-highlights-480p.webm" type="video/webm" />
                <source src="/assets/videos/conclave-highlights-480p.mp4" type="video/mp4" />
                Your browser does not support this video format.
              </video>
            </div>
          </div>

          {/* RIGHT: Poster Carousel */}
          <div
            className="md:col-span-4 w-full flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-surface shadow-2xl group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
              {/* Posters */}
              {POSTERS.map((poster, index) => (
                <div
                  key={poster.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    index === activePoster ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <Image
                    src={poster.image}
                    alt={`Conclave poster ${poster.title}`}
                    placeholder="blur"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {POSTERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePoster(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    index === activePoster ? "w-8 bg-gold-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
