import React from 'react'

import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-landvista-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT: IMAGE */}
          <div className="w-full h-[280px] md:h-[420px] lg:h-[480px] overflow-hidden">
            <img
              src="/assets/images/hero-main.jpg"
              alt="Real Estate Insights"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT: CONTENT */}
          <div className="max-w-[560px]">

            {/* SUBTITLE */}
            <p className="text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-bold text-landvista-grey mb-4">
              Institutional Intelligence · Access Gated
            </p>

            {/* TITLE */}
            <h1 className="text-[32px] md:text-[44px] lg:text-[56px] leading-[1.1] font-black text-landvista-charcoal tracking-tighter uppercase mb-6">
              Land Intelligence for Institutional <span className="font-thin">Decision-Making</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-[16px] md:text-[18px] text-landvista-grey leading-relaxed mb-10 max-w-lg">
              LandVista provides structured, policy-aligned intelligence derived from verified data sources and ground-level signals to support informed land investment decisions.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">

              {/* BUTTON 1 */}
              <button
                onClick={() => navigate("/request-access")}
                className="group flex items-center gap-3 bg-landvista-blue hover:bg-landvista-blue-hover active:bg-landvista-blue-active text-white px-10 py-4 text-[12px] font-black uppercase tracking-widest transition-all rounded-xl"
              >
                Request Access
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              {/* BUTTON 2 */}
              <button
                onClick={() => navigate("/dashboard")} 
                className="group flex items-center gap-3 border-2 border-landvista-slate text-landvista-slate hover:bg-landvista-slate hover:text-white px-10 py-4 text-[12px] font-black uppercase tracking-widest transition-all rounded-xl">
                Explore Intelligence
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}