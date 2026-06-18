"use client";

import { useEffect } from "react";
import { X, Mail, Phone, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-surface-elevated rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[100dvh] overflow-y-auto">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300" />
        
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-xs font-mono text-gold-400 uppercase tracking-wider mb-2 block">
                Get in touch
              </span>
              <h2 id="contact-modal-title" className="text-2xl font-display font-semibold">
                Contact <span className="gradient-text-gold">Aarambh</span>
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors glass"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <a href="mailto:royaldruv360@gmail.com" className="flex items-start gap-4 group">
              <div className="p-3 rounded-2xl glass text-gold-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-white/50 mb-1">Email</p>
                <p className="text-white/90 group-hover:text-gold-400 transition-colors">royaldruv360@gmail.com</p>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl glass text-gold-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-white/50 mb-1">Phone</p>
                <a href="tel:+919995428208" className="block text-white/90 hover:text-gold-400 transition-colors">+91 9995428208</a>
                <a href="tel:+917736150789" className="block text-white/90 hover:text-gold-400 transition-colors">+91 7736150789</a>
                <a href="tel:+917907125266" className="block text-white/90 hover:text-gold-400 transition-colors">+91 7907125266</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl glass text-gold-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-white/50 mb-1">Location</p>
                <p className="text-white/90">
                  Royal College of Engineering & Technology<br/>
                  Akkikavu, Thrissur, Kerala
                </p>
              </div>
            </div>

            {/*<div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl glass text-gold-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-white/50 mb-1">Hours</p>
                <p className="text-white/90">Mon-Fri, 9:00 AM - 6:00 PM</p>
              </div>
            </div>*/}
          </div>

          {/*<div className="mt-8 pt-6 border-t border-white/10 flex justify-center gap-4">
            <a href="#" className="p-3 rounded-full glass hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="p-3 rounded-full glass hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="p-3 rounded-full glass hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>*/}
        </div>
      </div>
    </div>
  );
}
