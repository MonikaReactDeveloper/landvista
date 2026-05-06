import React from "react";
import { Check, ShieldCheck, Zap, Database, Layers, BarChart3, ArrowRight } from "lucide-react";
import Footer from "../homePage/footer";

const buildSteps = [
  {
    id: "01",
    title: "Data Aggregation",
    icon: <Database size={24} />,
    detail: "Systematic collection of policy, spatial, infrastructure, and development data from verified institutional sources.",
  },
  {
    id: "02",
    title: "Multi-Source Validation",
    icon: <ShieldCheck size={24} />,
    detail: "Cross-verification across independent data sources to ensure signal integrity and eliminate single-point failure.",
  },
  {
    id: "03",
    title: "Processing",
    icon: <Layers size={24} />,
    detail: "Structuring and normalization of heterogeneous data into comparable, queryable formats for analysis.",
  },
  {
    id: "04",
    title: "Signal Generation",
    icon: <Zap size={24} />,
    detail: "Conversion of validated data into structured signals that indicate market movement and policy shifts.",
  },
  {
    id: "05",
    title: "Insight Structuring",
    icon: <BarChart3 size={24} />,
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

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-24 md:py-40 bg-landvista-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#3A4F7A_0%,transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          <p className="text-[12px] font-black uppercase tracking-[0.6em] text-white/40 mb-6">
            Institutional Intelligence Layer
          </p>
          <h1 className="text-[48px] md:text-[84px] font-black text-white uppercase tracking-tighter leading-none mb-8">
            HOW <span className="font-thin text-white/40 italic">INTELLIGENCE</span> IS BUILT
          </h1>
          <p className="text-[18px] md:text-[22px] font-medium text-white/60 max-w-2xl leading-relaxed">
            The LandVista framework converts raw, fragmented data into structured, validated signals for institutional decision support.
          </p>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 md:py-40 bg-landvista-bg">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-24">
            <h2 className="text-[32px] md:text-[44px] font-black text-landvista-blue uppercase tracking-tighter mb-12">
              THE CONSTRUCTION <span className="font-thin text-landvista-grey">PROCESS</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {buildSteps.map((step, i) => (
                <div key={step.id} className="bg-white p-8 rounded-3xl border border-landvista-grey/10 shadow-2xl shadow-landvista-blue/5 flex flex-col gap-8 group hover:border-landvista-blue/20 transition-all duration-500">
                  <div className="w-16 h-16 bg-landvista-alt flex items-center justify-center text-landvista-blue rounded-2xl group-hover:bg-landvista-blue group-hover:text-white transition-all duration-500">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.3em] block mb-3">
                      STAGE {step.id}
                    </span>
                    <h3 className="text-[18px] font-black text-landvista-blue uppercase tracking-tight mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[14px] font-medium text-landvista-grey leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-24 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-landvista-grey mb-6">
                Comparative Governance
              </p>
              <h2 className="text-[40px] md:text-[56px] font-black text-landvista-blue uppercase tracking-tighter leading-[0.95] mb-10">
                FROM RESEARCH <span className="font-thin text-landvista-grey">TO STRUCTURED INTELLIGENCE</span>
              </h2>
              <p className="text-[16px] text-landvista-grey font-medium leading-relaxed mb-12">
                Generic research often relies on periodic, opinion-driven reports. LandVista provides a dynamic, continuous signal-based architecture built on multi-source validation.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 bg-landvista-alt rounded-2xl border border-landvista-blue/5">
                  <div className="w-10 h-10 bg-landvista-blue text-white rounded-xl flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-[13px] font-black text-landvista-blue uppercase tracking-widest">Governed Data Integrity</p>
                </div>
                <div className="flex items-center gap-4 p-6 bg-landvista-alt rounded-2xl border border-landvista-blue/5">
                  <div className="w-10 h-10 bg-landvista-blue text-white rounded-xl flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <p className="text-[13px] font-black text-landvista-blue uppercase tracking-widest">Real-Time Signal Generation</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] border-2 border-landvista-blue shadow-[0_40px_100px_-20px_rgba(15,42,68,0.15)] overflow-hidden">
              <div className="bg-landvista-blue p-8 md:p-10">
                <h3 className="text-white text-[11px] font-black uppercase tracking-[0.4em]">Governance Comparison</h3>
              </div>
              <div className="divide-y divide-landvista-grey/10">
                {comparison.map((item, i) => (
                  <div key={i} className="p-8 md:p-10 grid grid-cols-2 gap-8 items-center hover:bg-landvista-alt transition-colors group">
                    <div>
                      <p className="text-[9px] font-black text-landvista-grey uppercase tracking-widest mb-3 opacity-40">{item.feature}</p>
                      <p className="text-[14px] font-medium text-landvista-grey">{item.generic}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 bg-landvista-green text-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-landvista-blue uppercase tracking-widest mb-2">LANDVISTA</p>
                        <p className="text-[15px] font-black text-landvista-blue uppercase tracking-tight leading-tight">{item.landvista}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-40 bg-landvista-alt border-t border-landvista-grey/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[32px] md:text-[44px] font-black text-landvista-blue uppercase tracking-tighter mb-8">
            READY TO ACCESS <span className="font-thin text-landvista-grey">THE INTELLIGENCE LAYER?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-landvista-blue text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:-translate-y-1 transition-all shadow-xl shadow-landvista-blue/20">
              Request Full Access
            </button>
            <button className="border-2 border-landvista-blue text-landvista-blue px-10 py-5 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-landvista-blue hover:text-white transition-all">
              Explore Signal Preview
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
