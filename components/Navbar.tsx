"use client";

import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ContactModal = dynamic(() => import("./ContactModal"), { ssr: false });

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "https://forms.gle/wxqvGBVTwzZVB1bL8";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          isScrolled ? "py-2 glass" : "py-4 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gold-400 to-amber-600 text-black font-display font-bold text-xl">
              A
            </div>
            <span className="font-display font-semibold text-xl tracking-tight hidden sm:block">
              Aarambh
            </span>
          </Link>

          {/* CENTER: Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#conclave" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Conclave
            </Link>
            <Link href="#workflow" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Workflow
            </Link>
            <Link href="#backbone" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Backbone
            </Link>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* RIGHT: CTA, Admin & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Admin Shield Button Hidden
            <Link 
              href="/admin/login"
              className="hidden md:flex p-2 rounded-full glass text-white/50 hover:text-white transition-colors"
              aria-label="Admin Access"
            >
              <Shield className="w-5 h-5" />
            </Link>
            */}
            <button
              onClick={() => window.open(googleFormUrl, '_blank', 'noopener,noreferrer')}
              className="bg-gradient-to-r from-gold-500 to-amber-500 text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-gold-500/20"
            >
              Apply to Pitch
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 glass rounded-2xl p-4 md:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <Link
            href="#conclave"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-white/5 text-center font-medium"
          >
            Conclave
          </Link>
          <Link
            href="#workflow"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-white/5 text-center font-medium"
          >
            Workflow
          </Link>
          <Link
            href="#backbone"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-white/5 text-center font-medium"
          >
            Backbone
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsContactOpen(true);
            }}
            className="block w-full p-3 rounded-xl hover:bg-white/5 text-center font-medium"
          >
            Contact
          </button>
          {/* Admin Access Mobile Link Hidden
          <Link
            href="/admin/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-white/5 text-center font-medium text-white/50 hover:text-white"
          >
            <Shield className="w-4 h-4" /> Admin Access
          </Link>
          */}
        </div>
      )}

      {/* MODALS */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
