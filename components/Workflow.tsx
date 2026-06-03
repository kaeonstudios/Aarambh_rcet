"use client";

import { Lightbulb, CheckSquare, Rocket, Activity, LineChart } from "lucide-react";

const PHASES = [
  {
    id: 1,
    title: "Ideation",
    description: "Refining raw concepts into viable business models with clear value propositions.",
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "Validation",
    description: "Testing assumptions against real market feedback and potential user data.",
    icon: CheckSquare,
  },
  {
    id: 3,
    title: "Prototype",
    description: "Building the MVP to demonstrate core functionality and technical feasibility.",
    icon: Rocket,
  },
  {
    id: 4,
    title: "Trial Run",
    description: "Executing closed beta tests to identify friction points and operational gaps.",
    icon: Activity,
  },
  {
    id: 5,
    title: "Scale",
    description: "Deploying capital for user acquisition and structured market expansion.",
    icon: LineChart,
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="w-full py-20 lg:py-28 relative overflow-hidden bg-surface">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-black/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-4 inline-block">
            The Pipeline
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-6">
            From idea to <span className="gradient-text-gold">institution.</span>
          </h2>
          <p className="text-lg text-white/60">
            We follow a structured execution framework. Success isn't about vague growth—it's about passing rigorous validation gateways before moving to the next stage of capital deployment.
          </p>
        </div>

        {/* Pipeline Container */}
        <div className="relative">
          
          {/* Desktop Horizontal Line */}
          <div className="hidden lg:block absolute top-[48px] left-0 right-0 h-px bg-white/10">
            <div className="h-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent w-1/3 animate-[flow_3s_linear_infinite]" />
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-4 relative">
            
            {/* Mobile Vertical Line */}
            <div className="lg:hidden absolute top-4 bottom-4 left-[24px] w-px bg-white/10" />

            {PHASES.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={phase.id} 
                  className="relative flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-8 group animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                  style={{ animationDelay: `${index * 150}ms`, animationDuration: '700ms' }}
                >
                  
                  {/* Node */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-12 h-12 lg:w-24 lg:h-24 rounded-full bg-background border border-white/10 flex items-center justify-center group-hover:border-gold-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 group-hover:scale-105 relative">
                      <Icon className="w-5 h-5 lg:w-8 lg:h-8 text-white/50 group-hover:text-gold-400 transition-colors" />
                      
                      {/* Step Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/80 z-20">
                        {phase.id}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:text-center mt-1 lg:mt-0 flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
                      {phase.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </section>
  );
}
