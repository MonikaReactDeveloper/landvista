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
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
          alt="Real Estate Insights"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT: CONTENT */}
      <div className="max-w-[560px]">

        {/* SUBTITLE */}
        <p className="text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-landvista-muted mb-4">
          Land Intelligence Report 2026
        </p>

        {/* TITLE */}
        <h1 className="text-[28px] md:text-[36px] lg:text-[44px] leading-tight font-semibold text-landvista-charcoal mb-6">
          Land Intelligence for Institutional Decision-Making
        </h1>

        {/* DESCRIPTION */}
        <p className="text-[15px] md:text-[16px] text-landvista-grey leading-relaxed mb-8">
          TerraSignal provides structured, policy-aligned intelligence derived from verified data sources and ground-level signals to support informed land investment decisions.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4">

          {/* BUTTON 1 */}
          <button
            onClick={() => navigate("/request-access")}
            className="group flex items-center gap-2 bg-landvista-blue text-white px-6 py-3 text-[14px] font-medium hover:opacity-90 transition"
          >
            Request Access
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* BUTTON 2 */}
          <button className="group flex items-center gap-2 border border-landvista-blue text-landvista-blue px-6 py-3 text-[14px] font-medium hover:bg-landvista-blue hover:text-white transition">
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