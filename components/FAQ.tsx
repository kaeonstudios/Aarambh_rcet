"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is AarambhX Hub?",
    answer: "AarambhX is an elite startup platform and founder incubator hosted at the Royal College of Engineering & Technology (RCET), Thrissur, Kerala. It connects early-stage startup founders directly with active angel investors and institutional funds for live funding, scaling, and structured mentorship.",
  },
  {
    question: "Where is AarambhX hosted?",
    answer: "AarambhX is hosted at the Royal College of Engineering & Technology (RCET) in Akkikavu, Thrissur, Kerala, India. It serves startup founders and investors across Kerala (including Thrissur, Kochi, and Trivandrum) and the wider Indian ecosystem.",
  },
  {
    question: "How does the AarambhX Conclave pitch process work?",
    answer: "Founders submit their startup details, team credentials, traction stage, and a clear pitch video. All applications are validated and reviewed within 7 days by our review board. Selected startups are invited to pitch live in front of active investors ready to deploy capital.",
  },
  {
    question: "Is AarambhX a pitch competition?",
    answer: "No, AarambhX is not a pitch competition or a college fest event. It is a live investment platform where founders present their business models directly to active angel investors to secure real seed capital, equity partnerships, and post-event accelerator access.",
  },
  {
    question: "What are the benefits of pitching at AarambhX?",
    answer: "Founders receive direct seed-funding opportunities, structured validation gate reviews, access to co-working facilities and labs, active mentor matching with industry operators, and post-event scaling support.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-20 lg:py-28 bg-surface relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold-900/10 via-background to-background pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-4 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-6">
            Got questions?<br />
            <span className="gradient-text-gold">We have answers.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to know about the platform, pitching process, and investment opportunities.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "border rounded-2xl transition-all duration-300 bg-background/50",
                  isOpen 
                    ? "border-gold-500/30 bg-surface-elevated/40 shadow-[0_0_20px_rgba(245,158,11,0.05)]" 
                    : "border-white/5 hover:border-white/10"
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-white/40 transition-transform duration-300 flex-shrink-0 ml-4",
                      isOpen && "transform rotate-180 text-gold-400"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  )}
                >
                  <p className="px-6 pb-6 text-white/60 leading-relaxed text-sm sm:text-base border-t border-white/5 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
