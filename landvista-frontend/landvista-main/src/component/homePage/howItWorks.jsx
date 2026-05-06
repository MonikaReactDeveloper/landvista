import React, { useState } from "react";
import { Check, ShieldCheck, Zap, Database, Layers, BarChart3, ArrowRight } from "lucide-react";

const buildSteps = [
  {
    id: "01",
    title: "Data Aggregation",
    icon: <Database size={20} />,
    detail: "Systematic collection of policy, spatial, infrastructure, and development data from verified institutional sources.",
  },
  {
    id: "02",
    title: "Multi-Source Validation",
    icon: <ShieldCheck size={20} />,
    detail: "Cross-verification across independent data sources to ensure signal integrity and eliminate single-point failure.",
  },
  {
    id: "03",
    title: "Processing",
    icon: <Layers size={20} />,
    detail: "Structuring and normalization of heterogeneous data into comparable, queryable formats for analysis.",
  },
  {
    id: "04",
    title: "Signal Generation",
    icon: <Zap size={20} />,
    detail: "Conversion of validated data into structured signals that indicate market movement and policy shifts.",
  },
  {
    id: "05",
    title: "Insight Structuring",
    icon: <BarChart3 size={20} />,
    detail: "Formatting signals into decision-support intelligence outputs, ready for institutional deployment.",
  },
];

const comparison = [
  { feature: "System", generic: "Static reports", landvista: "Dynamic intelligence system" },
  { feature: "Insights", generic: "Opinion-driven", landvista: "Signal-based insights" },
  { feature: "Validation", generic: "Single-source", landvista: "Multi-source validation" },
  { feature: "Output", generic: "Informational", landvista: "Decision-support structured outputs" },
  { feature: "Updates", generic: "Periodic updates", landvista: "Continuous signal updates" },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="w-full bg-landvista-bg py-20 md:py-32 border-t border-landvista-grey/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* 01. HOW INTELLIGENCE IS BUILT */}
        <div className="mb-24">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-landvista-grey mb-4">
              Intelligence Architecture
            </p>
            <h2 className="text-[40px] md:text-[56px] font-black text-landvista-charcoal uppercase tracking-tighter leading-none mb-6">
              HOW <span className="font-thin text-landvista-grey">INTELLIGENCE IS BUILT</span>
            </h2>
            <div className="w-20 h-1.5 bg-landvista-blue"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {buildSteps.map((step, i) => (
              <div key={step.id} className="relative">
                <div className="flex flex-col gap-6">
                  <div className="w-12 h-12 bg-white border border-landvista-blue/10 flex items-center justify-center text-landvista-charcoal shadow-xl shadow-landvista-blue/5 rounded-xl">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.2em] mb-2">{step.id}</p>
                    <h3 className="text-[16px] font-black text-landvista-charcoal uppercase tracking-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-landvista-grey leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
                {i < buildSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-6 text-landvista-grey/20">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 02. WHAT MAKES THIS DIFFERENT */}
        <div className="pt-20 border-t border-landvista-grey/10">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-landvista-grey mb-4">
              Comparative Governance
            </p>
            <h2 className="text-[32px] md:text-[44px] font-black text-landvista-charcoal uppercase tracking-tighter leading-tight">
              FROM RESEARCH <span className="font-thin text-landvista-grey">TO STRUCTURED INTELLIGENCE</span>
            </h2>
          </div>

          <div className="bg-white rounded-[2rem] border border-landvista-grey/10 overflow-hidden shadow-2xl shadow-landvista-blue/5">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-landvista-blue p-6 md:p-8">
              <div className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Feature</div>
              <div className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] hidden md:block">Generic Research</div>
              <div className="text-[11px] font-black text-white uppercase tracking-[0.3em]">LandVista Intelligence</div>
            </div>
            
            <div className="divide-y divide-landvista-grey/10">
              {comparison.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-8 hover:bg-landvista-alt transition-colors group">
                  <div className="text-[12px] font-black text-landvista-charcoal uppercase tracking-widest mb-2 md:mb-0">
                    {item.feature}
                  </div>
                  <div className="text-[14px] font-medium text-landvista-grey md:pr-8 mb-4 md:mb-0">
                    <span className="md:hidden text-[10px] font-black uppercase text-landvista-grey/40 block mb-1">Generic Research</span>
                    {item.generic}
                  </div>
                  <div className="text-[14px] font-black text-landvista-charcoal flex items-center gap-3">
                    <span className="md:hidden text-[10px] font-black uppercase text-landvista-charcoal/40 block mb-1">LandVista</span>
                    <div className="w-5 h-5 bg-landvista-green/10 text-landvista-green rounded-full flex items-center justify-center">
                      <Check size={12} />
                    </div>
                    {item.landvista}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
