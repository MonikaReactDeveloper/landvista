import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Shield, Zap, Globe, Layout,
  Database, FileCheck, CheckCircle, AlertCircle,
  BarChart3, Layers, Map, Search, Lock, Info,
  Filter, ChevronRight, Activity, TrendingUp,
  ShieldCheck, FileSearch, RefreshCcw,
  ShieldAlert
} from "lucide-react";
import api from "../../utils/api";
import IntelligenceCard from "./IntelligenceCard";
import Footer from "../homePage/footer";

export default function IntelligencePreviewPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchIntelligence = async () => {
      try {
        setLoading(true);
        // Fetch published intelligence
        const response = await api.get("/intelligence?status=Published");
        const intelligenceData = response.data.data || response.data;
        setData(Array.isArray(intelligenceData) ? intelligenceData.slice(0, 3) : []);
      } catch (err) {
        console.error("Failed to fetch intelligence preview data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIntelligence();
  }, []);

  return (
    <div className="bg-landvista-bg min-h-screen">

      {/* 1. HERO — INTELLIGENCE POSITIONING */}
      <section className="relative w-full h-[85vh] min-h-[650px] overflow-hidden flex items-center">
        <img
          src="https://images.unsplash.com/photo-1551288049-bbbda536ad37?auto=format&fit=crop&w=1600&q=80"
          alt="Intelligence background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-landvista-blue/90 via-landvista-blue/50 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-6 font-black">
            TerraSignal — Intelligence Preview
          </p>
          <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-black text-white leading-[0.9] max-w-4xl mb-8 tracking-tighter italic uppercase">
            From Data to <span className="text-white/40">Decision</span> — Experience Institutional Intelligence
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/70 max-w-2xl leading-relaxed mb-10 font-medium">
            A controlled Intelligence Preview showcasing how policy, zoning, and infrastructure data is transformed into structured, signal-based, multi-source validated intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              onClick={() => navigate("/request-access")}
              className="group inline-flex items-center gap-3 bg-white text-landvista-blue px-8 py-4 text-[13px] font-black uppercase tracking-widest hover:bg-landvista-blue hover:text-white transition-all shadow-2xl"
            >
              Request Full Access
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
            </button>
            <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] italic font-bold">
              This is a preview layer — designed to demonstrate intelligence quality.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT THIS PAGE REPRESENTS */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-6">Introduction</p>
              <h2 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter leading-none mb-8 italic uppercase">
                A Controlled <span className="text-gray-300">Preview</span> <br />— Not Full System Access
              </h2>
              <p className="text-landvista-grey text-lg font-bold leading-relaxed mb-10 italic opacity-80">
                This page presents a structured preview of the LandVista Intelligence System.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  "Intelligence is shown in controlled format",
                  "Full intelligence depth is restricted",
                  "Outputs are structured insights — not raw data",
                  "Decision-enabling layers are NDA-gated"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-landvista-blue" />
                    <span className="text-xs font-black text-landvista-blue uppercase tracking-tight italic">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-black text-landvista-muted uppercase tracking-widest leading-relaxed p-6 bg-gray-50 rounded-2xl border border-gray-100">
                What you see here demonstrates the intelligence standard. Full access provides the intelligence depth required for institutional decision-making.
              </p>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Dashboard Preview" className="w-full h-auto" />
                <div className="absolute inset-0 bg-landvista-blue/20 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl text-center max-w-xs border border-white/20 shadow-2xl">
                    <Lock size={32} className="mx-auto text-landvista-blue mb-4" />
                    <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.2em] mb-2">Restricted Depth</p>
                    <p className="text-[11px] text-landvista-grey font-medium leading-relaxed">Full narrative and high-confidence signals are available in the Private Hub.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTELLIGENCE TYPES — PREVIEW GRID */}
      <section className="py-24 px-6 md:px-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">Core Pillars</p>
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
              Intelligence <span className="text-gray-300">Types</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Policy Intelligence", desc: "Interpretation of statutory frameworks, planning structures, and zoning regulations.", preview: "High-level policy context without full regulatory depth.", icon: FileCheck },
              { title: "Zone Intelligence", desc: "Zone-level classification, development stage, and macro indicators.", preview: "Zone summaries without sector-level analysis.", icon: Map },
              { title: "Signal Intelligence", desc: "Validated signals derived from policy, infrastructure, and development indicators.", preview: "Sample signals with limited detail.", icon: Zap },
              { title: "Risk Intelligence", desc: "Structured classification of risk across decision layers.", preview: "Simplified risk indicators without full risk models.", icon: ShieldAlert }
            ].map((type, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 bg-landvista-blue/5 rounded-2xl flex items-center justify-center text-landvista-blue mb-8 group-hover:bg-landvista-blue group-hover:text-white transition-all">
                    <type.icon size={24} />
                  </div>
                  <h4 className="text-lg font-black text-landvista-blue uppercase italic mb-4 leading-tight">{type.title}</h4>
                  <p className="text-xs text-landvista-grey leading-relaxed font-medium opacity-60 uppercase tracking-widest mb-6">{type.desc}</p>
                </div>
                <div className="pt-6 border-t border-gray-50">
                  <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest mb-2 opacity-40 italic">Preview Shows:</p>
                  <p className="text-[10px] font-black text-landvista-blue uppercase tracking-tight italic">{type.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SAMPLE INTELLIGENCE BLOCK (DYNAMIC) */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">Sample Insights</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
                Structured <span className="text-gray-300">Signal Preview</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-black text-landvista-muted uppercase tracking-[0.2em] italic bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
              <Activity size={14} className="text-landvista-blue animate-pulse" /> Live Signal Feed Data
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center animate-pulse text-landvista-muted font-black uppercase tracking-widest text-xs">Synchronizing Signal Layer...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item) => (
                <div key={item._id} className="relative group">
                  <IntelligenceCard data={item} user={user} />
                  <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-landvista-blue/20 rounded-[2.5rem] transition-colors"></div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 p-10 bg-landvista-blue/5 rounded-[3.5rem] border border-landvista-blue/10 flex flex-col md:flex-row items-center gap-10">
            <div className="bg-white p-6 rounded-3xl shadow-xl lg:w-1/3">
              <div className="flex items-center gap-4 mb-4">
                <Lock size={20} className="text-amber-500" />
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Locked Insight Layer</span>
              </div>
              <p className="text-xs font-black text-landvista-blue uppercase tracking-tight mb-4">Detailed sector-level insights, source chains, and decision frameworks are available only through controlled access.</p>
              <button onClick={() => navigate("/request-access")} className="w-full py-3 bg-landvista-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-landvista-blue/90 transition-all">Request Full Access</button>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h5 className="text-sm font-black text-landvista-blue uppercase italic mb-3">Example 1 — Infrastructure Signal</h5>
                <p className="text-[11px] text-landvista-grey font-bold uppercase mb-4 opacity-40">Context: Zone-Level Infrastructure Expansion</p>
                <p className="text-[11px] text-landvista-grey leading-relaxed font-medium mb-4 italic">"Emerging connectivity developments indicate improving alignment between infrastructure planning and development potential."</p>
                <div className="flex gap-4">
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">Risk: Medium</span>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Confidence: High</span>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-black text-landvista-blue uppercase italic mb-3">Example 2 — Policy Signal</h5>
                <p className="text-[11px] text-landvista-grey font-bold uppercase mb-4 opacity-40">Context: Participation Progression</p>
                <p className="text-[11px] text-landvista-grey leading-relaxed font-medium mb-4 italic">"Policy participation trends suggest increasing alignment toward development thresholds, indicating potential shift in feasibility."</p>
                <div className="flex gap-4">
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">Risk: Medium</span>
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Confidence: Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIGNAL ENGINE PREVIEW */}
      <section className="py-24 px-6 md:px-10 bg-landvista-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full -ml-96 -mt-96 blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-6">Internal Logic</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-8 italic uppercase">
                Signal-Based <span className="text-white/20">Intelligence</span> <br />— Structured, Not Assumed
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-12">
                Intelligence is generated through a structured system where data is converted into signals, and signals are translated into actionable insights.
              </p>

              <div className="flex items-center gap-4 mb-16">
                {["Data", "Validation", "Signal", "Insight"].map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white font-black text-xs border border-white/10">{step[0]}</div>
                      <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{step}</span>
                    </div>
                    {i < 3 && <ArrowRight size={14} className="text-white/20" />}
                  </React.Fragment>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  { title: "Multi-source validation", desc: "Every input is cross-checked before signal creation." },
                  { title: "Confidence scoring", desc: "Scoring based on validation depth and data freshness." },
                  { title: "Risk mapping", desc: "Risk identified across multiple planning and market dimensions." },
                  { title: "Signal prioritization", desc: "Signals prioritized based on relevance and strength." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-black text-white uppercase italic">{item.title}</h4>
                      <p className="text-[11px] text-white/40 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-white/5 backdrop-blur-xl rounded-[3.5rem] border border-white/10 p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Activity size={100} className="text-white" />
              </div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-10">Process Overview</p>
              <p className="text-3xl font-black text-white tracking-tighter italic leading-none uppercase mb-10">
                Signals are processed outputs of validated data — <span className="text-white/20">not assumptions.</span>
              </p>
              <div className="p-8 bg-white/10 rounded-3xl border border-white/10">
                <p className="text-xs font-black text-white uppercase tracking-widest italic leading-relaxed">
                  "The engine converts raw statutory and spatial inputs into classified, risk-aware intelligence signals designed for evaluate-and-decide workflows."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW INTELLIGENCE IS BUILT */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">The System</p>
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
              How Intelligence <br /><span className="text-gray-300">is Built</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-[40px] left-0 w-full h-[1px] bg-gray-100 -z-10"></div>
            {[
              { title: "Aggregation", desc: "Collection of policy, spatial, infrastructure, and development data.", icon: Database },
              { title: "Validation", desc: "Cross-verification across independent data sources.", icon: ShieldCheck },
              { title: "Processing", desc: "Structuring and normalization into comparable formats.", icon: RefreshCcw },
              { title: "Generation", desc: "Conversion of validated data into structured signals.", icon: Zap },
              { title: "Structuring", desc: "Formatting into decision-support intelligence outputs.", icon: Layout }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-center text-landvista-blue shadow-sm mb-8 group-hover:bg-landvista-blue group-hover:text-white transition-all duration-500">
                  <step.icon size={28} />
                </div>
                <h4 className="text-sm font-black text-landvista-blue uppercase italic mb-3">{i + 1}. {step.title}</h4>
                <p className="text-[10px] text-landvista-grey leading-relaxed font-medium opacity-60 uppercase tracking-widest">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHAT MAKES THIS DIFFERENT */}
      <section className="py-24 px-6 md:px-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">Differentiation</p>
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
              From Research to <span className="text-gray-300">Structured Intelligence</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="py-8 text-left text-[10px] font-black text-landvista-grey uppercase tracking-[0.3em] w-1/3 px-10">Generic Research</th>
                  <th className="py-8 text-left text-[10px] font-black text-landvista-blue uppercase tracking-[0.3em] w-1/3 px-10 bg-white rounded-t-[2rem] border-x border-t border-gray-100">LandVista Intelligence</th>
                  <th className="w-1/3"></th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {[
                  ["Static reports", "Dynamic intelligence system"],
                  ["Opinion-driven", "Signal-based insights"],
                  ["Single-source", "Multi-source validation"],
                  ["Informational", "Decision-support structured outputs"],
                  ["Periodic updates", "Continuous signal updates"]
                ].map((row, i) => (
                  <tr key={i} className="group">
                    <td className="py-6 px-10 text-[13px] font-medium text-landvista-grey uppercase tracking-widest opacity-60 italic">{row[0]}</td>
                    <td className="py-6 px-10 text-[13px] font-black text-landvista-blue uppercase tracking-widest italic bg-white border-x border-gray-100 flex items-center gap-3">
                      <CheckCircle size={14} className="text-emerald-500" />
                      {row[1]}
                    </td>
                    <td className="bg-white/50 rounded-r-[2rem]"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. ACCESS CONTROL & 9. USE CASES */}
      <section className="py-24 px-6 md:px-10 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="bg-landvista-charcoal rounded-[3.5rem] p-12 md:p-16 text-white relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full -ml-48 -mb-48 blur-3xl"></div>
              </div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">Security Architecture</p>
              <h2 className="text-3xl font-black text-white tracking-tighter leading-tight mb-12 italic uppercase">
                Controlled Access <br />— <span className="text-white/20">Intelligence Is Not Public</span>
              </h2>
              <div className="space-y-6 mb-12">
                {[
                  "Full intelligence is not publicly available",
                  "NDA acceptance required for deeper access",
                  "Tier-based access controls visibility",
                  "Sensitive intelligence is restricted by design"
                ].map((std, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Lock size={16} className="text-landvista-muted shrink-0" />
                    <span className="text-sm font-bold text-white/80 tracking-tight italic uppercase">{std}</span>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-xs font-black text-landvista-muted uppercase tracking-widest leading-relaxed italic">
                  "Preview is limited intentionally. Full intelligence requires qualification and governed access."
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-6">Practical Application</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none mb-12 italic uppercase">
                Use <span className="text-gray-300">Cases</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Opportunity Identification", desc: "Identify zones and signals indicating emerging development potential.", icon: Search },
                  { title: "Zone Comparison", desc: "Compare zones using structured intelligence frameworks.", icon: BarChart3 },
                  { title: "Risk Understanding", desc: "Understand risk indicators across policy, execution, and timing layers.", icon: ShieldAlert },
                  { title: "Decision Support", desc: "Use structured insights to support institutional evaluation processes.", icon: Layout }
                ].map((use, i) => (
                  <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all h-full group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-landvista-blue mb-6 group-hover:bg-landvista-blue group-hover:text-white transition-all shadow-sm">
                      <use.icon size={20} />
                    </div>
                    <h4 className="text-sm font-black text-landvista-blue uppercase italic mb-3 leading-tight">{use.title}</h4>
                    <p className="text-[10px] text-landvista-grey leading-relaxed font-medium opacity-60 uppercase tracking-widest">{use.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GOVERNANCE & VALIDATION */}
      <section className="py-24 px-6 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-6">Quality Control</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase mb-10">
                Governed <span className="text-gray-300">Intelligence</span> <br />— Validated Before Exposure
              </h2>
              <div className="space-y-4">
                {[
                  "No unverified data enters the system",
                  "Signals are validated before visibility",
                  "Outputs are controlled and access-restricted",
                  "Intelligence follows governance-first architecture"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-xs font-black text-landvista-blue uppercase tracking-widest italic">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-landvista-blue p-16 rounded-[4rem] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <FileSearch size={120} className="text-white" />
                </div>
                <p className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight relative z-10">
                  Every signal is a product of multi-source verification and institutional-grade validation logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. LIMITATIONS — TRUST BLOCK */}
      <section className="py-24 px-6 md:px-10 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-8 border border-amber-100">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic uppercase mb-8">Defined Scope of <span className="text-gray-300">the Preview</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {["Preview shows partial intelligence only", "Does not include full data layers", "Does not provide decision-ready depth"].map((limit, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-[11px] font-black text-landvista-blue uppercase tracking-widest italic">{limit}</p>
              </div>
            ))}
          </div>
          <p className="text-xs font-black text-landvista-muted uppercase tracking-[0.3em] leading-relaxed italic border-t border-gray-100 pt-10 max-w-2xl mx-auto">
            "This preview demonstrates intelligence capability. It does not replace full system access for decision-making."
          </p>
        </div>
      </section>

      {/* 12. FINAL CTA — CONVERSION BLOCK */}
      <Footer />

    </div>
  );
}
