import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Shield, Zap, Globe, Layout,
  Database, FileCheck, CheckCircle, AlertCircle,
  BarChart3, Layers, Map, Search, Lock, Info
} from "lucide-react";
import api from "../../utils/api";
import Footer from "../homePage/footer";

export default function PolicyIntelligence() {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await api.get("/policy/zones");
        const data = response.data.data || response.data;
        setZones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch zones", error);
      } finally {
        setLoading(false);
      }
    };
    fetchZones();
  }, []);

  return (
    <div className="bg-landvista-bg min-h-screen">

      {/* 1. HERO — POLICY INTELLIGENCE POSITIONING */}
      <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
          alt="Policy background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-6 font-black">
            TerraSignal — Intelligence Layer
          </p>
          <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-black text-white leading-[0.9] max-w-4xl mb-8 tracking-tighter italic uppercase">
            Policy & Zone <span className="text-white/40">Intelligence</span> for Institutional Decisions
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/70 max-w-2xl leading-relaxed mb-10 font-medium">
            Structured policy interpretation, zone mapping, and sector-level intelligence designed to convert statutory frameworks into decision-ready insights for institutional capital.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              onClick={() => document.getElementById('zone-selector').scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 bg-white text-landvista-blue px-8 py-4 text-[13px] font-black uppercase tracking-widest hover:bg-landvista-blue hover:text-white transition-all shadow-2xl"
            >
              Explore Zones
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
            </button>
            <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] italic font-bold">
              From policy → mapped intelligence → signal-based decision frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* 2. POLICY INTELLIGENCE DEFINITION */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-6">Definition</p>
              <h2 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter leading-none mb-8 italic uppercase">
                Policy as Intelligence <br />— <span className="text-gray-300">Not Just Regulation</span>
              </h2>
              <p className="text-landvista-grey text-lg font-bold leading-relaxed mb-6 italic">
                "Policy is not only a regulatory document. It defines development direction, land-use transformation, infrastructure priority, and opportunity timing."
              </p>
              <p className="text-landvista-grey text-base leading-relaxed opacity-70">
                LandVista converts policy into structured intelligence by interpreting statutory frameworks through planning layers, spatial context, signal validation, and risk-aware decision frameworks.
              </p>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Development Direction", icon: Zap },
                { title: "Land-use Transformation", icon: Layers },
                { title: "Infrastructure Priority", icon: Map },
                { title: "Opportunity Timing", icon: BarChart3 }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-landvista-blue/20 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-landvista-blue shadow-sm mb-6 group-hover:bg-landvista-blue group-hover:text-white transition-colors">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-sm font-black text-landvista-blue uppercase tracking-tight italic">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. POLICY FRAMEWORK — STRUCTURED INTERPRETATION */}
      <section className="py-24 px-6 md:px-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">Framework</p>
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
              Structured <span className="text-gray-300">Interpretation</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Land Use Classification", desc: "Identifies permitted, restricted, and evolving land-use categories across zones and sectors.", icon: Layers },
              { title: "Development Norms", desc: "Interprets applicable planning rules, density controls, sector allocation, and development conditions.", icon: FileCheck },
              { title: "Infrastructure Alignment", desc: "Maps policy intent against physical and planned infrastructure corridors.", icon: Map },
              { title: "Regulatory Signals", desc: "Tracks planning notifications, revisions, approvals, and policy movements that influence decision timing.", icon: Zap }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-6">
                <div className="w-10 h-10 bg-landvista-blue/5 rounded-xl flex items-center justify-center text-landvista-blue">
                  <item.icon size={20} />
                </div>
                <h4 className="text-lg font-black text-landvista-blue uppercase italic leading-tight">{item.title}</h4>
                <p className="text-sm text-landvista-grey leading-relaxed opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ZONE INTELLIGENCE OVERVIEW & 5. ZONE CLASSIFICATION */}
      <section id="zone-selector" className="py-24 px-6 md:px-10 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 mb-24">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-6">Zone Intelligence</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none mb-8 italic uppercase">
                Zones as Policy Clusters <br />& <span className="text-gray-300">Investment Frameworks</span>
              </h2>
              <p className="text-landvista-grey text-lg font-bold leading-relaxed mb-6 italic opacity-80">
                "Zones are not geography alone. They are policy clusters, development ecosystems, and structured investment frameworks."
              </p>
              <p className="text-landvista-grey text-base leading-relaxed opacity-60">
                Each zone is evaluated through policy status, sector structure, infrastructure alignment, development maturity, and signal strength.
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 gap-6">
              {[
                { title: "Emerging Zones", def: "Zones where policy frameworks are active or developing, but execution signals are still forming.", impl: "Monitor and evaluate early positioning.", color: "text-blue-600 bg-blue-50" },
                { title: "Growth Zones", def: "Zones showing stronger infrastructure alignment, development movement, and signal convergence.", impl: "Evaluate for structured entry.", color: "text-emerald-600 bg-emerald-50" },
                { title: "Mature Zones", def: "Zones with established development indicators and reduced policy uncertainty.", impl: "Assess for stability, liquidity, and risk-adjusted positioning.", color: "text-amber-600 bg-amber-50" },
                { title: "Restricted / Risk Zones", def: "Zones with regulatory limitations, execution uncertainty, or weak validation signals.", impl: "Wait, monitor, or avoid until risk conditions improve.", color: "text-red-600 bg-red-50" }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-base font-black text-landvista-blue uppercase italic">{item.title}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${item.color}`}>Classification</span>
                  </div>
                  <p className="text-xs text-landvista-grey font-medium leading-relaxed mb-4 opacity-70">{item.def}</p>
                  <p className="text-xs font-black text-landvista-blue uppercase tracking-tight">
                    <span className="opacity-40">Implication: </span>{item.impl}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC ZONE CARDS */}
          <div className="mb-12">
            <h3 className="text-2xl font-black text-landvista-blue uppercase italic tracking-tighter mb-4">Active Intelligence Zones</h3>
            <p className="text-sm text-landvista-grey opacity-60 mb-10">Select a zone to explore specific intelligence layers and statutory frameworks.</p>
          </div>

          {loading ? (
            <div className="py-20 text-center animate-pulse text-landvista-muted font-black uppercase tracking-widest text-xs">Synchronizing Zone Data...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {zones.map((zone) => (
                <div
                  key={zone._id}
                  onClick={() => zone.status !== 'locked' && navigate(`/policy-zones/${zone.slug}`)}
                  className={`group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${zone.status === 'locked' ? 'opacity-60 grayscale' : ''}`}
                >
                  <img src={zone.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={zone.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
                        {zone.status === 'locked' ? 'Restricted' : 'Active Zone'}
                      </div>
                      {zone.status === 'locked' && <Lock size={16} className="text-white/60" />}
                    </div>

                    <div>
                      <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">{zone.name}</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {zone.description?.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-[0.2em]">
                        Explore Intelligence <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. ZONE & SECTOR MAPPING SYSTEM */}
      <section className="py-24 px-6 md:px-10 bg-landvista-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full -mr-96 -mt-96 blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-6">Mapping System</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-8 italic uppercase">
                Zone → Sector <br />→ <span className="text-white/20">Parcel Intelligence</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10">
                LandVista structures spatial intelligence through a layered mapping system that connects policy intent to executable land evaluation.
              </p>
              <div className="space-y-4">
                {[
                  "Zone-level policy framework",
                  "Sector boundaries and statutory classification",
                  "Parcel-level context where applicable",
                  "Infrastructure overlays",
                  "Development and risk indicators"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-landvista-muted/50"></div>
                    <span className="text-sm font-bold tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-white/5 backdrop-blur-xl rounded-[3.5rem] border border-white/10 p-12">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">System Output</p>
              <div className="flex gap-6 items-start mb-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Map size={32} />
                </div>
                <p className="text-2xl font-black text-white tracking-tighter italic leading-tight uppercase">
                  Structured spatial intelligence connecting policy to evaluation.
                </p>
              </div>
              <div className="p-6 bg-white rounded-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <Shield size={20} className="text-landvista-blue" />
                  <span className="text-xs font-black text-landvista-blue uppercase tracking-widest">Validation Proof</span>
                </div>
                <p className="text-[11px] text-landvista-grey leading-relaxed font-medium">
                  Mapping logic is derived directly from statutory plans and multi-source spatial verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. POLICY → SIGNAL CONVERSION */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">Signal Engine</p>
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
              How Policy Becomes <span className="text-gray-300">Signal-Based Intelligence</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10"></div>

            {[
              { title: "Policy Input", desc: "Statutory plans, notifications, maps, and updates are captured.", icon: Database },
              { title: "Data Processing", desc: "Documents are structured into comparable intelligence fields.", icon: Layers },
              { title: "Validation", desc: "Inputs are cross-checked against verified sources.", icon: Shield },
              { title: "Signal Generation", desc: "Converted into classified infrastructure and policy signals.", icon: Zap },
              { title: "Insight Output", desc: "Translated into insights with confidence and risk context.", icon: Layout }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-landvista-blue shadow-sm mb-6 group-hover:bg-landvista-blue group-hover:text-white transition-all duration-500">
                  <step.icon size={24} />
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 group-hover:bg-white group-hover:shadow-xl transition-all h-full">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 block">Step 0{i + 1}</span>
                  <h4 className="text-sm font-black text-landvista-blue uppercase italic mb-3">{step.title}</h4>
                  <p className="text-[11px] text-landvista-grey leading-relaxed font-medium opacity-60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTELLIGENCE LAYERS */}
      <section className="py-24 px-6 md:px-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-6">Core System</p>
              <h2 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter leading-none mb-10 italic uppercase">
                Intelligence <span className="text-gray-300">Layers</span>
              </h2>
              <div className="space-y-4">
                {[
                  { title: "1. Policy Layer", sub: "Statutory frameworks, master plans, and zoning rules." },
                  { title: "2. Spatial Layer", sub: "Zone boundaries, sector layouts, and infrastructure corridors." },
                  { title: "3. Data Layer", sub: "Validated documents, maps, and infrastructure indicators." },
                  { title: "4. Signal Layer", sub: "Policy, infrastructure, and market movement signals." },
                  { title: "5. Decision Layer", sub: "Confidence scoring, risk, and timing assessment." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h4 className="text-base font-black text-landvista-blue uppercase italic leading-none mb-1">{item.title}</h4>
                    <p className="text-xs text-landvista-grey font-medium opacity-60 uppercase tracking-widest">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. WHAT USER GETS — OUTPUT BLOCK */}
            <div className="bg-gray-50 rounded-[3.5rem] p-12 md:p-16 border border-gray-100">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-10">Output Block</p>
              <div className="space-y-10">
                {[
                  { title: "Zone Intelligence", desc: "Structured view of each zone’s policy status and decision relevance." },
                  { title: "Sector Mapping", desc: "Sector-level breakdown with boundaries and execution context." },
                  { title: "Policy Interpretation", desc: "Clear translation of statutory frameworks into decision implications." },
                  { title: "Development Signals", desc: "Infrastructure and market indicators converted into signal-based insights." },
                  { title: "Risk Classification", desc: "Risk-aware assessment across policy and infrastructure layers." }
                ].map((out, i) => (
                  <div key={i} className="flex gap-6 items-start border-l-2 border-gray-200 pl-8 relative">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-landvista-blue"></div>
                    <div>
                      <h4 className="text-lg font-black text-landvista-blue uppercase italic leading-none mb-2">{out.title}</h4>
                      <p className="text-xs text-landvista-grey font-medium leading-relaxed opacity-60 uppercase tracking-widest">{out.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SIGNAL ENGINE INTEGRATION & 11. GOVERNANCE */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-6">Engine Integration</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none mb-10 italic uppercase">
                Policy Data Connected <br />to <span className="text-gray-300">Signal Engine</span>
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {["Policy data captured", "Multi-source validation", "Risk scoring applied", "Confidence mapping"].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <CheckCircle size={14} className="text-landvista-blue" />
                    <span className="text-[10px] font-black text-landvista-blue uppercase tracking-tight italic">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-landvista-blue/5 rounded-[2.5rem] border border-landvista-blue/10">
                <p className="text-lg font-bold text-landvista-blue tracking-tight italic leading-relaxed">
                  "Policy intelligence becomes useful only when it is validated, scored, and converted into a decision framework."
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[3.5rem] p-12 md:p-16 text-white relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-landvista-blue rounded-full -mr-48 -mt-48 blur-3xl"></div>
              </div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">Governance Layer</p>
              <h2 className="text-3xl font-black text-white tracking-tighter leading-tight mb-12 italic uppercase">
                Verified Sources. <br />Controlled Mapping. <br />Audit-Ready Outputs.
              </h2>
              <div className="space-y-6 mb-12">
                {["Verified policy sources", "Multi-source validation", "No unverified mapping", "Audit tracking on outputs", "NDA-controlled access"].map((std, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Shield size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-bold text-white/80 tracking-tight italic">{std}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-black text-emerald-400 uppercase tracking-widest leading-relaxed border-t border-white/10 pt-8">
                No policy input becomes intelligence without validation. No mapped output is published without traceability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. USE CASES */}
      <section className="py-24 px-6 md:px-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">Practical Application</p>
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
              Use <span className="text-gray-300">Cases</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Land Identification", desc: "Identify zones and sectors aligned with policy frameworks and development signals." },
              { title: "Zone Comparison", desc: "Compare zones through consistent confidence, risk, and development-readiness criteria." },
              { title: "Sector Prioritization", desc: "Prioritize sectors based on infrastructure alignment and execution readiness." },
              { title: "Investment Decision", desc: "Support institutional decisions with structured, traceable, risk-aware intelligence." }
            ].map((use, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 bg-landvista-blue/5 rounded-2xl flex items-center justify-center text-landvista-blue mb-8 group-hover:bg-landvista-blue group-hover:text-white transition-all">
                    <Search size={24} />
                  </div>
                  <h4 className="text-lg font-black text-landvista-blue uppercase italic mb-4 leading-tight">{use.title}</h4>
                  <p className="text-xs text-landvista-grey leading-relaxed font-medium opacity-60 uppercase tracking-widest">{use.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. DIFFERENTIATION BLOCK */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-4">Differentiation</p>
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter leading-none italic uppercase">
              From Static Viewing <br />to <span className="text-gray-300">Structured Intelligence</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-8 text-left text-[10px] font-black text-landvista-blue uppercase tracking-[0.3em] w-1/2">Traditional Policy Viewing</th>
                  <th className="py-8 text-left text-[10px] font-black text-landvista-blue uppercase tracking-[0.3em] w-1/2 px-10">LandVista Policy Intelligence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Static documents", "Dynamic intelligence layers"],
                  ["Raw policy data", "Structured land intelligence"],
                  ["Informational reading", "Decision-ready interpretation"],
                  ["Manual comparison", "Standardized zone comparison"],
                  ["Unverified mapping", "Multi-source validated mapping"],
                  ["General planning context", "Risk-aware decision framework"]
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-6 text-[13px] font-medium text-landvista-grey uppercase tracking-widest opacity-60">{row[0]}</td>
                    <td className="py-6 px-10 text-[13px] font-black text-landvista-blue uppercase tracking-widest italic flex items-center gap-3">
                      <CheckCircle size={14} className="text-emerald-500" />
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. LIMITATIONS — TRUST BLOCK */}
      <section className="py-24 px-6 md:px-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6">
              <AlertCircle size={24} />
            </div>
            <h2 className="text-3xl font-black text-landvista-blue tracking-tighter italic uppercase mb-6">Defined Role of Policy Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">What it does NOT do</p>
              {["Replace statutory documents", "Guarantee approvals", "Eliminate risk", "Replace legal/planning due diligence"].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-[13px] font-bold text-landvista-grey uppercase tracking-widest opacity-50">
                  <XIcon /> {item}
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">What it DOES do</p>
              {["Structure understanding", "Improve clarity", "Enable decision-making", "Support risk-aware evaluation"].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-[13px] font-black text-landvista-blue uppercase tracking-widest italic">
                  <CheckCircle size={16} className="text-emerald-500" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] text-center shadow-sm">
            <p className="text-xs font-black text-landvista-muted uppercase tracking-[0.3em] mb-4 italic leading-relaxed">
              "Policy intelligence supports decisions. Statutory authority remains with the competent government bodies."
            </p>
          </div>
        </div>
      </section>

      {/* 15. FINAL CTA */}
      <section className="py-32 px-6 md:px-10 bg-landvista-charcoal relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.6em] mb-12">Final Engagement</p>
          <h2 className="text-[40px] md:text-[64px] font-black text-white mb-10 tracking-tighter italic leading-none uppercase">
            Access Structured <br /><span className="text-white/40">Policy & Zone</span> Intelligence
          </h2>
          <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-14 max-w-2xl mx-auto">
            Move from policy documents and maps to signal-based, risk-aware decision frameworks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => document.getElementById('zone-selector').scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white text-landvista-blue px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-landvista-blue hover:text-white transition-all flex items-center gap-4"
            >
              Explore Zones
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/request-access")}
              className="px-10 py-5 rounded-full border border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Request Access
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
