import React from "react";
import { TrendingUp, Activity, MapPin, Zap } from "lucide-react";

const signals = [
  { label: "Zone L", detail: "Participation ↑ 12%", type: "growth" },
  { label: "Dwarka", detail: "Infra Signal ↑ High", type: "infra" },
  { label: "Sector 03", detail: "Investor Activity ↑", type: "activity" },
  { label: "Zone A", detail: "Policy Aligned", type: "policy" },
  { label: "Gurgaon", detail: "Commercial Yield ↑ 8%", type: "growth" },
  { label: "Sector 14", detail: "Connectivity Signal ↑", type: "infra" }
];

export default function SignalStrip() {
  return (
    <div className="w-full bg-landvista-blue border-b border-white/5 py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...signals, ...signals].map((s, i) => (
          <div key={i} className="flex items-center gap-4 mx-8">
            <div className={`p-1 rounded ${
              s.type === 'growth' ? 'bg-landvista-green/20 text-landvista-green' : 
              s.type === 'infra' ? 'bg-landvista-slate/20 text-landvista-slate' : 
              'bg-landvista-grey/20 text-landvista-grey'
            }`}>
              <Zap size={10} className="fill-current" />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{s.label}</span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">{s.detail}</span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
