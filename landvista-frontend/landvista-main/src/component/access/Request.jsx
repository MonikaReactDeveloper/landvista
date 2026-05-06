import React from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  ArrowRight, 
  Info, 
  ClipboardCheck, 
  Lock, 
  Users, 
  Target, 
  Layers, 
  FileCheck,
  CheckCircle2
} from "lucide-react";

// --- Sub-Components for the Content-Only Request Page ---

const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.03]">
      <div className="absolute top-20 right-0 w-96 h-96 bg-landvista-blue rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-landvista-blue rounded-full blur-[100px]" />
    </div>
    
    <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-landvista-blue/5 rounded-full border border-landvista-blue/10">
        <ShieldCheck size={14} className="text-landvista-blue" />
        <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Governance-Led Access Control</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-landvista-blue tracking-tighter italic leading-[0.9]">
        Request Access to <span className="text-landvista-blue/30">Institutional</span> Land Intelligence
      </h1>
      
      <p className="text-lg md:text-xl font-medium text-landvista-grey max-w-2xl mx-auto leading-relaxed">
        Qualification-based entry into a governance-led, NDA-controlled intelligence platform designed for institutional capital.
      </p>
      
      <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-6">
        <Link to="/request-access" className="group bg-landvista-blue text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all flex items-center gap-3">
          Begin Qualification <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <div className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
          <Info size={14} />
          Access is reviewed, validated, and approved.
        </div>
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <div className="space-y-8">
    <div className="space-y-2">
      <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Philosophy</p>
      <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Controlled Entry. <br/>Governed Participation.</h2>
    </div>
    <div className="space-y-6">
      <p className="text-lg font-medium text-landvista-grey leading-relaxed">
        Access to the platform is not open. We maintain a curated intelligence ecosystem to ensure data integrity and strategic alignment.
      </p>
      <ul className="space-y-4">
        {[
          "Entry is evaluated against institutional criteria",
          "Participation is limited to qualified users",
          "Intelligence is distributed through a controlled system"
        ].map((point, i) => (
          <li key={i} className="flex items-start gap-4">
            <div className="mt-1.5 w-1.5 h-1.5 bg-landvista-blue rounded-full shrink-0" />
            <span className="text-sm font-bold text-landvista-blue">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const EligibleProfiles = () => (
  <div className="space-y-10">
    <div className="space-y-2">
      <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Eligible Profiles</p>
      <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Eligible Institutional Profiles</h2>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          title: "Institutional Investors",
          desc: "Capital allocators operating with defined mandates and governance frameworks.",
          expectation: "Documented capital deployment capability"
        },
        {
          title: "Developers",
          desc: "Organizations with active land acquisition and development pipelines.",
          expectation: "Institutional-scale execution capability"
        },
        {
          title: "Family Offices",
          desc: "Private capital entities managing structured land allocations.",
          expectation: "Defined investment strategy"
        }
      ].map((profile, i) => (
        <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-landvista-blue/10 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-landvista-blue group-hover:bg-landvista-blue group-hover:text-white transition-colors">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-black text-landvista-blue uppercase tracking-tight">{profile.title}</h3>
          </div>
          <p className="text-xs font-medium text-landvista-grey mb-6 leading-relaxed">{profile.desc}</p>
          <div className="pt-6 border-t border-gray-50 flex items-start gap-3">
            <Target size={14} className="text-landvista-blue mt-0.5" />
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest leading-relaxed">{profile.expectation}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OnboardingFlow = () => (
  <div className="space-y-10 py-20 border-t border-gray-50">
    <div className="text-center space-y-2">
      <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">The Path to Access</p>
      <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Institutional Onboarding Process</h2>
    </div>
    <div className="grid md:grid-cols-4 gap-8">
      {[
        { t: "Submission", d: "Structured profile submitted for review" },
        { t: "Screening", d: "Eligibility check against criteria" },
        { t: "NDA Execution", d: "Mandatory confidentiality agreement" },
        { t: "Provisioning", d: "Tier-based access granted" }
      ].map((step, i) => (
        <div key={i} className="text-center space-y-4">
          <div className="w-12 h-12 bg-landvista-blue text-white rounded-2xl flex items-center justify-center mx-auto font-black italic shadow-lg shadow-landvista-blue/20">
            {i + 1}
          </div>
          <h4 className="text-sm font-black text-landvista-blue uppercase tracking-tight">{step.t}</h4>
          <p className="text-xs font-medium text-landvista-grey px-4">{step.d}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Request() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <Philosophy />
          <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 flex flex-col justify-center gap-8">
            <h3 className="text-2xl font-black text-landvista-blue italic tracking-tighter leading-tight">
              "We maintain a governed ecosystem to protect institutional intelligence and ensure strategic data integrity."
            </h3>
            <div className="flex gap-4">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Governance Body</span>
                 <span className="text-xs font-bold text-landvista-grey italic">LandVista Strategic Oversight</span>
               </div>
            </div>
          </div>
        </div>

        <EligibleProfiles />
        <OnboardingFlow />

        <div className="bg-landvista-blue rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden text-center space-y-10">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] -mr-48 -mt-48" />
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">Ready to Apply?</h2>
            <p className="text-white/60 font-medium">
              Join a controlled network of institutional investors and developers gaining access to verified land intelligence.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/request-access" className="bg-white text-landvista-blue px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all">
                Apply for Access
             </Link>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                SLA: 24–72 Hour Review Window
             </span>
          </div>
        </div>
      </div>
      
      <footer className="py-20 px-6 bg-gray-50 border-t border-gray-100">
         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            <div className="space-y-4">
               <div className="text-3xl font-black text-landvista-blue italic tracking-tighter">LANDVISTA</div>
               <p className="text-xs font-medium text-landvista-grey leading-relaxed">
                  The definitive intelligence platform for institutional land capital. Governed, selective, and data-driven.
               </p>
            </div>
            <div className="space-y-6">
               <h5 className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Compliance</h5>
               <ul className="space-y-3 text-xs font-bold text-landvista-grey">
                  <li>NDA-Controlled Access</li>
                  <li>Governance Review Protocol</li>
                  <li>Data Protection Framework</li>
               </ul>
            </div>
            <div className="space-y-6">
               <h5 className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Contact</h5>
               <div className="space-y-1">
                  <p className="text-xs font-bold text-landvista-blue">qualification@landvista.io</p>
                  <p className="text-[10px] font-black text-landvista-grey uppercase">Institutional Relations</p>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
