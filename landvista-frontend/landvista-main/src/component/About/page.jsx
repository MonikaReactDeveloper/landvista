"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Database, Layers, Zap, 
  ArrowRight, CheckCircle2, AlertCircle, 
  Target, Globe, BarChart3, Lock, 
  FileText, Activity, Users, Quote
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../homePage/footer";
import Navbar from "../homePage/navbar";

export default function AboutPage() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-landvista-bg min-h-screen selection:bg-landvista-blue selection:text-white">
      <Navbar />

      {/* 1. HERO — IDENTITY BLOCK */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0052CC 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-landvista-blue" />
              <span className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Institutional Infrastructure</span>
            </div>
            <h1 className="text-[64px] lg:text-[84px] font-black text-landvista-blue leading-[0.9] tracking-tighter italic uppercase mb-8">
              Institutional <span className="text-landvista-blue/20">Land Intelligence</span> Infrastructure
            </h1>
            <p className="text-2xl font-medium text-landvista-grey max-w-2xl mb-10 leading-relaxed opacity-80">
              A governance-first, intelligence-driven platform enabling policy-aligned decision making through structured, validated, and system-governed intelligence.
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-10">
              <ShieldCheck size={14} className="text-landvista-blue" /> Not a service. Not a marketplace. A decision infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => navigate('/request-access')}
                  className="w-full sm:w-auto bg-landvista-blue text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  Request Access <ArrowRight size={16} />
                </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY DEFINITION & 3. WHY IT EXISTS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-8">
              A New Category in <span className="text-landvista-blue/20">Land Decision Systems</span>
            </h2>
            <div className="space-y-6">
               <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">It is NOT:</h4>
                  <ul className="grid grid-cols-2 gap-4">
                    {["A brokerage platform", "A listing marketplace", "A transaction-led firm"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-bold text-landvista-grey opacity-60">
                        <AlertCircle size={14} className="text-red-400" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="p-8 bg-landvista-blue rounded-[2.5rem] text-white shadow-xl shadow-landvista-blue/20">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">It IS:</h4>
                  <ul className="space-y-4">
                    {["Institutional Intelligence Infrastructure", "Convergence of policy, data, and advisory", "Structured decision-support system"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-black italic uppercase">
                        <CheckCircle2 size={18} className="text-white" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-8">
              Solving the <span className="text-landvista-blue/20">Structural Gap</span>
            </h2>
            <p className="text-lg text-landvista-grey font-medium leading-relaxed mb-8 opacity-70">
              Institutional capital requires structured intelligence, not fragmented inputs. LandVista replaces fragmentation with governance-controlled architecture.
            </p>
            <div className="grid grid-cols-1 gap-4">
               {[
                 { from: "Fragmentation", to: "Structured intelligence" },
                 { from: "Informality", to: "Governance-controlled access" },
                 { from: "Unverified inputs", to: "Multi-source validation" },
                 { from: "Opaque decisions", to: "Documented frameworks" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.from}</span>
                    <ArrowRight size={14} className="text-landvista-blue mx-4" />
                    <span className="text-sm font-black text-landvista-blue uppercase italic">{item.to}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CORE PHILOSOPHY */}
      <section className="py-32 px-6 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-4">Core <span className="text-landvista-blue/20">Philosophy</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Control Before Scale", desc: "System governance precedes expansion" },
              { title: "Accuracy Before Speed", desc: "Validated intelligence is prioritized" },
              { title: "System Over Dependency", desc: "Supported by systems, not individuals" },
              { title: "Intelligence Over Opinion", desc: "Every output is structured and traceable" },
              { title: "Decisions Over Transactions", desc: "Value defined by decision quality" }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-landvista-blue mb-6 group-hover:bg-landvista-blue group-hover:text-white transition-all">
                  <Target size={20} />
                </div>
                <h3 className="text-sm font-black text-landvista-blue uppercase italic mb-3 leading-tight">{p.title}</h3>
                <p className="text-[10px] text-landvista-grey font-bold uppercase tracking-widest opacity-60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAPABILITY BLOCK */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="mb-20">
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-4">Capability <span className="text-landvista-blue/20">Block</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Policy Intelligence", desc: "Decodes statutory frameworks into structured intelligence.", output: "Policy-aligned intelligence", icon: FileText },
              { title: "Zone & Sector Mapping", desc: "Structures spatial data into decision-ready units.", output: "Comparable spatial intelligence", icon: Globe },
              { title: "Signal Engine", desc: "Generates insights from multi-source validated inputs.", output: "Signal-based decision frameworks", icon: Zap },
              { title: "Advisory Integration", desc: "Converts intelligence into pursue or reject frameworks.", output: "Decision-ready institutional outputs", icon: Activity }
            ].map((c, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-gray-50 rounded-[3rem] border border-transparent hover:border-landvista-blue/10 hover:bg-white transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-landvista-blue shadow-sm mb-8">
                  <c.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-landvista-blue uppercase italic mb-4 leading-tight">{c.title}</h3>
                <p className="text-sm text-landvista-grey font-medium leading-relaxed opacity-60 mb-6">{c.desc}</p>
                <div className="pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Output</p>
                    <p className="text-xs font-bold text-landvista-blue uppercase">{c.output}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTELLIGENCE ARCHITECTURE */}
      <section className="py-32 px-6 bg-landvista-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
          <Layers size={400} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Five-Layer <span className="text-white/20">Intelligence System</span></h2>
            <p className="text-white/40 font-mono text-sm tracking-widest uppercase">DATA → SIGNAL → CONFIDENCE → RISK → TIME → DECISION</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
             {[
               { name: "Data Layer", desc: "Statutory records and validated inputs" },
               { name: "Processing", desc: "Normalization and cross-validation" },
               { name: "Intelligence", desc: "Signal generation and pattern recognition" },
               { name: "Decision", desc: "Confidence scoring and risk mapping" },
               { name: "Output", desc: "Decision-ready institutional signals" }
             ].map((l, i) => (
               <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-all">
                  <div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 block">Layer 0{i+1}</span>
                    <h4 className="text-lg font-black uppercase italic mb-2 leading-tight">{l.name}</h4>
                  </div>
                  <p className="text-xs opacity-50 font-medium leading-relaxed">{l.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 7. GOVERNANCE & 8. ACCESS MODEL */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-8">
              Governance as <span className="text-landvista-blue/20">System Foundation</span>
            </h2>
            <div className="grid gap-4">
               {[
                 "No data without validation", "No access without NDA", "No signal without verification", "No action without audit"
               ].map((rule, i) => (
                 <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <ShieldCheck size={20} className="text-landvista-blue" />
                    <span className="text-sm font-black text-landvista-blue uppercase tracking-widest">{rule}</span>
                 </div>
               ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
               {["RBAC System", "NDA Enforcement", "Audit Logs", "Controlled Access"].map((c, i) => (
                 <div key={i} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 p-3 rounded-xl text-center">
                    {c}
                 </div>
               ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-8">
              Access Is <span className="text-landvista-blue/20">Earned, Not Open</span>
            </h2>
            <div className="space-y-4">
               {[
                 { name: "Public Layer", desc: "High-level visibility into platform structure" },
                 { name: "Intelligence Layer", desc: "NDA-gated access to signals and structured intelligence" },
                 { name: "Mandate Layer", desc: "Restricted access to curated opportunities" }
               ].map((layer, i) => (
                 <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-landvista-blue transition-all text-left">
                    <div>
                        <h4 className="text-sm font-black text-landvista-blue uppercase italic mb-1">{layer.name}</h4>
                        <p className="text-xs text-landvista-grey opacity-60 leading-relaxed">{layer.desc}</p>
                    </div>
                    <Lock size={16} className="text-gray-200 group-hover:text-landvista-blue" />
                 </div>
               ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {["Institutional Investors", "Developers", "Family Offices"].map((a, i) => (
                    <span key={i} className="px-4 py-1.5 bg-gray-50 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        {a}
                    </span>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. DIFFERENTIATION */}
      <section className="py-32 px-6 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-4">
              From Advisory Model to <span className="text-landvista-blue/20">Decision Infrastructure</span>
            </h2>
          </motion.div>
          <div className="overflow-hidden rounded-[3rem] border border-gray-100 shadow-2xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Dimension</th>
                  <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Traditional Advisory</th>
                  <th className="p-8 text-[10px] font-black text-landvista-blue uppercase tracking-widest bg-blue-50/50">LandVista</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {[
                  ["Structure", "Advisory-led", "System-led"],
                  ["Output", "Opinion", "Intelligence"],
                  ["Data", "Fragmented", "Structured"],
                  ["Validation", "Limited", "Multi-source validated"],
                  ["Incentive", "Deal-driven", "Intelligence-driven"],
                  ["Format", "Recommendation", "Decision framework"]
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                    <td className="p-8 font-black text-landvista-blue uppercase">{row[0]}</td>
                    <td className="p-8 font-medium text-landvista-grey opacity-60">{row[1]}</td>
                    <td className="p-8 font-black text-landvista-blue bg-blue-50/10 italic">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. LIMITATIONS & 11. TRUST */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-2xl font-black text-gray-300 uppercase italic mb-8 flex items-center gap-3">
              <AlertCircle size={24} /> What the System Does NOT Do
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {["Predict outcomes", "Eliminate risk", "Replace due diligence"].map((item, i) => (
                <li key={i} className="p-4 bg-red-50/50 text-red-600 rounded-2xl border border-red-100 text-xs font-black uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-landvista-grey font-medium leading-relaxed opacity-60 italic">
                Intelligence supports decisions. It does not guarantee outcomes. Investors remain responsible for capital allocation.
            </p>
          </div>

          <div className="bg-landvista-blue p-12 rounded-[4rem] text-white shadow-2xl shadow-landvista-blue/20 flex flex-col justify-between">
            <div>
              <ShieldCheck size={40} className="mb-8 opacity-40" />
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6">Trust & Control <span className="text-white/20">Statement</span></h3>
              <div className="space-y-4">
                {[
                  "Every output is validated", "Every action is logged", "Every access is controlled"
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-black uppercase italic tracking-widest">
                    <CheckCircle2 size={18} /> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOUNDER NOTE */}
      <section className="py-32 px-6 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-20 items-center">
          <div className="lg:col-span-2">
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
               <img 
                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                 alt="Akash Bathla" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-landvista-blue to-transparent text-white">
                  <h4 className="text-2xl font-black uppercase italic mb-1">Akash Bathla</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Founder & Managing Director</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Quote size={48} className="text-landvista-blue/10 mb-8" />
            <div className="space-y-6 text-xl font-medium text-landvista-grey leading-relaxed italic opacity-80">
              <p>"Land decisions have historically depended on fragmented inputs, informal networks, and transaction-driven advisory systems."</p>
              <p>"This platform was built to replace that dependency with a structured intelligence system — governed, validated, and designed for institutional decision-making."</p>
              <p>"The objective is not to improve advisory. The objective is to replace dependency with system-driven intelligence."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. LEGAL POSITIONING */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center border border-gray-100 p-12 rounded-[3rem]">
          <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mb-10">Legal Positioning</h4>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              { label: "Non-Brokerage", desc: "Does not operate as a broker or intermediary" },
              { label: "No Transaction Execution", desc: "Does not facilitate or execute transactions" },
              { label: "Advisory-Only", desc: "All outputs are decision-support intelligence" },
              { label: "Investor Responsibility", desc: "All decisions remain with the investor" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-landvista-blue rounded-full mt-1.5 shrink-0" />
                <div>
                  <h5 className="text-sm font-black text-landvista-blue uppercase mb-1">{item.label}</h5>
                  <p className="text-xs text-landvista-grey opacity-60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Intelligence is provided. Decisions remain investor-owned.
          </p>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="py-40 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-[56px] font-black text-landvista-blue leading-[0.9] tracking-tighter italic uppercase mb-8">
              Access Institutional <span className="text-landvista-blue/20">Land Intelligence</span>
            </h2>
            <p className="text-xl text-landvista-grey font-medium mb-12 max-w-2xl mx-auto opacity-70">
              Move from fragmented inputs to structured, validated, decision-ready intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/request-access')}
                className="w-full sm:w-auto bg-landvista-blue text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                Request Platform Access <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full sm:w-auto bg-gray-50 text-landvista-blue px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-gray-100 hover:bg-white transition-all"
              >
                Enter Platform
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}