import React from "react";
import { TrendingUp, Shield, Zap, Activity } from "lucide-react";

export default function WarRoom() {
  return (
    <div className="min-h-screen bg-landvista-bg p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-landvista-blue tracking-tighter uppercase italic">Founder <span className="text-landvista-blue/40">War-Room</span></h1>
          <p className="text-landvista-grey text-xs font-black uppercase tracking-[0.4em] mt-1 flex items-center gap-2">
            <Shield className="w-4 h-4 text-landvista-blue" /> Restricted Access Command Center
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4">
            <Activity className="text-green-500 w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest text-landvista-blue">Platform Pulse: 98.4%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Pipeline Velocity", value: "$420M", trend: "+12.4%", icon: TrendingUp },
          { title: "High-Intent Signal", value: "84", trend: "Critical", icon: Zap },
          { title: "Platform SLA", value: "24m", trend: "Optimal", icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-landvista-blue/5">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <stat.icon className="w-6 h-6 text-landvista-blue" />
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.2em]">{stat.title}</p>
            <h3 className="text-4xl font-black text-landvista-blue mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="mt-12 py-20 text-center bg-white/50 border-2 border-dashed border-gray-200 rounded-[4rem]">
        <h2 className="text-xl font-black text-gray-300 uppercase tracking-widest">Select Control Module from Navigation</h2>
      </div>
    </div>
  );
}
