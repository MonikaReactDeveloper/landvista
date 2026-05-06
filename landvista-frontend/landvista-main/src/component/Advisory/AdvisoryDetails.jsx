import React from "react";
import { ArrowRight, CheckCircle, Shield, Users, Target, FileCheck, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdvisoryDetails() {
  const navigate = useNavigate();

  return (
    <div className="bg-landvista-bg">
      {/* 4.6 USE CASE / SAMPLE INSIGHT (PROOF LAYER) */}
      <section className="py-24 px-6 md:px-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <div className="inline-block px-3 py-1 bg-landvista-blue/5 border border-landvista-blue/10 rounded-full mb-6">
                <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.3em]">01 — Proof Layer</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter leading-none mb-8 italic uppercase">
                Sample <br /><span className="text-gray-300">Institutional</span> <br />Insight
              </h2>
              <p className="text-landvista-grey text-sm font-medium leading-relaxed opacity-70 max-w-sm">
                Demonstrating real advisory thinking through structured outputs and verified signals. We convert abstract intelligence into visible proof.
              </p>
            </div>
            
            <div className="lg:w-2/3 w-full">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-gray-100 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-landvista-blue/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 border-b border-gray-50 pb-10">
                  <div>
                    <p className="text-[10px] font-black text-landvista-muted uppercase tracking-widest mb-2">Zone</p>
                    <p className="text-xl font-black text-landvista-blue italic uppercase">Zone L</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-landvista-muted uppercase tracking-widest mb-2">Signal</p>
                    <p className="text-xl font-black text-landvista-blue italic uppercase">Infra expansion</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-landvista-muted uppercase tracking-widest mb-2">Confidence</p>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle size={14} />
                      <p className="text-xs font-black uppercase tracking-widest">High</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-landvista-muted uppercase tracking-widest mb-2">Risk Level</p>
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <Info size={14} />
                      <p className="text-xs font-black uppercase tracking-widest">Medium</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-black text-landvista-muted uppercase tracking-widest mb-6">Insight Narrative</p>
                  <p className="text-2xl md:text-4xl font-black text-landvista-blue tracking-tighter italic leading-[1.1] mb-8">
                    "Improved connectivity indicates increased development viability over the medium term."
                  </p>
                  <div className="flex items-center gap-3 py-4 border-t border-gray-50">
                    <div className="w-8 h-8 rounded-full bg-landvista-blue/5 flex items-center justify-center text-landvista-blue">
                      <FileCheck size={16} />
                    </div>
                    <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Source: Multi-source validated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.7 TARGET AUDIENCE FILTER */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 bg-landvista-blue/5 border border-landvista-blue/10 rounded-full mb-6">
                <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.3em]">02 — Audience Filter</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter leading-none mb-10 italic uppercase">
                Advisory For <br /><span className="text-gray-300">Institutional</span> <br />Scale
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { title: "Institutional investors", icon: Shield },
                  { title: "Developers", icon: Target },
                  { title: "Family offices", icon: Users },
                  { title: "Capital allocators", icon: CheckCircle }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-landvista-blue/20 hover:bg-white hover:shadow-lg transition-all group cursor-default">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-landvista-blue shadow-sm group-hover:bg-landvista-blue group-hover:text-white transition-colors">
                      <item.icon size={20} />
                    </div>
                    <span className="text-[12px] font-black text-landvista-blue uppercase tracking-tight italic">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full p-10 md:p-16 bg-red-50 rounded-[3.5rem] border border-red-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-red-100 group-hover:text-red-200 transition-colors">
                <Shield size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-red-900 mb-6 italic uppercase tracking-tighter flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-red-900"></span>
                  Exclusion Statement
                </h3>
                <p className="text-red-800 text-xl md:text-2xl font-bold leading-snug italic opacity-90 mb-8">
                  "Not intended for retail or speculative participation. Our advisory is structured exclusively for professional capital deployment."
                </p>
                <p className="text-[10px] font-black text-red-900/40 uppercase tracking-widest">Platform Integrity Protocol</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.8 ENGAGEMENT MODEL & 4.9 GOVERNANCE */}
      <section className="py-24 px-6 md:px-10 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Engagement Model */}
            <div>
              <div className="inline-block px-3 py-1 bg-landvista-blue/5 border border-landvista-blue/10 rounded-full mb-6">
                <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.3em]">03 — Engagement Model</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter leading-none mb-12 italic uppercase">
                Clarity <span className="text-gray-300">In Engagement</span>
              </h2>
              <div className="space-y-8 mb-12">
                {[
                  "Advisory-led engagement (not brokerage)",
                  "Initiated through structured discussion",
                  "Defined scope and deliverables"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="mt-1.5 w-6 h-6 rounded-lg bg-landvista-blue flex items-center justify-center shrink-0 shadow-lg shadow-landvista-blue/20">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <p className="text-xl font-bold text-landvista-blue tracking-tight italic leading-none">{text}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-200 border-dashed hover:border-red-200 transition-colors">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Strict Positioning
                  </p>
                  <p className="text-xs font-black text-landvista-blue uppercase italic">No transaction intermediation</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-200 border-dashed hover:border-red-200 transition-colors">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Strict Positioning
                  </p>
                  <p className="text-xs font-black text-landvista-blue uppercase italic">No commission-based execution</p>
                </div>
              </div>
            </div>

            {/* Governance Alignment */}
            <div>
              <div className="inline-block px-3 py-1 bg-landvista-blue/5 border border-landvista-blue/10 rounded-full mb-6">
                <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.3em]">04 — Governance Alignment</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter leading-none mb-12 italic uppercase">
                Rigor <span className="text-gray-300">By Design</span>
              </h2>
              <div className="grid grid-cols-1 gap-5">
                {[
                  { title: "Structured intelligence", sub: "Advisory backed by proven insights" },
                  { title: "No ROI projections", sub: "No speculative pricing or projections" },
                  { title: "Verified data", sub: "Multiple verified data inputs" },
                  { title: "Audit-ready", sub: "Fully documented and audit-ready processes" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="w-14 h-14 bg-landvista-blue/5 rounded-2xl flex items-center justify-center text-landvista-blue shrink-0 group-hover:bg-landvista-blue group-hover:text-white transition-all">
                      <FileCheck size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-landvista-blue uppercase italic leading-none mb-1.5">{item.title}</h4>
                      <p className="text-xs text-landvista-grey font-medium opacity-60 uppercase tracking-widest">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-between">
                <p className="text-[10px] font-black text-landvista-blue/40 uppercase tracking-[0.2em]">Institutional Compliance Layer</p>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Protocol Aligned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.10 CONVERSION CTA (FINAL) */}
      <section className="py-32 px-6 md:px-10 bg-landvista-blue relative overflow-hidden group">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -mr-64 -mt-64 blur-[100px] group-hover:bg-white/10 transition-colors duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-landvista-slate/20 rounded-full -ml-64 -mb-64 blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-1 h-12 bg-white/20 mx-auto mb-10"></div>
          <p className="text-[11px] font-black text-white/50 uppercase tracking-[0.8em] mb-12">Engagement Initiation</p>
          <h2 className="text-[44px] md:text-[80px] font-black text-white mb-14 tracking-tighter italic leading-[0.9] uppercase">
            Initiate <br /><span className="text-white/40">An Advisory</span> <br />Discussion
          </h2>
          
          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => navigate("/request-access")}
              className="group bg-white text-landvista-blue px-14 py-7 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all duration-500 flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-emerald-500/20"
            >
              Request Advisory Access
              <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
            </button>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">
                Engagement is subject to qualification and review
              </p>
              <div className="w-32 h-[1px] bg-white/10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
