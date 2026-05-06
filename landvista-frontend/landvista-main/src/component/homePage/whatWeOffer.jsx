"use client";

export default function WhatWeOffer() {
  return (
    <section className="w-full bg-landvista-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-32">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24">

          {/* LEFT TITLE */}
          <div className="md:col-span-3">
            <h2 className="text-[48px] md:text-[64px] leading-none font-black text-landvista-charcoal tracking-tighter uppercase">
              WHAT
              <br />
              <span className="font-thin">WE DO</span>
            </h2>
          </div>

          {/* SECTION 1 */}
          <div className="md:col-span-9 border-t border-landvista-grey/20 pt-12 grid md:grid-cols-12 gap-8">

            {/* VERTICAL LABEL */}
            <div className="hidden md:flex md:col-span-1 items-start justify-center">
              <span className="rotate-[-90deg] text-[10px] font-black tracking-[0.3em] text-landvista-grey uppercase whitespace-nowrap">
                Advisory
              </span>
            </div>

            {/* MAIN TEXT */}
            <div className="md:col-span-7">
              <h3 className="text-[28px] md:text-[34px] leading-tight font-black text-landvista-charcoal uppercase tracking-tight">
                Strategic land intelligence and structuring support
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-4">
              <p className="text-[15px] text-landvista-grey leading-relaxed mb-6">
                We provide strategic land intelligence and structuring support to help you invest, lease, optimize and transform your real estate portfolio.
              </p>

              <a className="inline-flex items-center gap-2 text-landvista-charcoal text-xs font-black uppercase tracking-widest group"
                href="/advisory">
                <span className="border-b-2 border-landvista-slate pb-1 group-hover:border-landvista-blue transition-all">
                  Explore Advisory Services
                </span>
              </a>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="md:col-span-9 md:col-start-4 border-t border-landvista-grey/20 pt-12 grid md:grid-cols-12 gap-8">

            {/* VERTICAL LABEL */}
            <div className="hidden md:flex md:col-span-1 items-start justify-center">
              <span className="rotate-[-90deg] text-[10px] font-black tracking-[0.3em] text-landvista-grey uppercase whitespace-nowrap">
                Policy
              </span>
            </div>

            {/* MAIN TEXT */}
            <div className="md:col-span-7">
              <h3 className="text-[28px] md:text-[34px] leading-tight font-black text-landvista-charcoal uppercase tracking-tight">
                Regulatory mapping and development frameworks
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-4">
              <p className="text-[15px] text-landvista-grey leading-relaxed mb-6">
                We provide regulatory mapping and development frameworks to help you navigate complex land use policies, zoning regulations and development incentives.
              </p>

              <a className="inline-flex items-center gap-2 text-landvista-charcoal text-xs font-black uppercase tracking-widest group"
                href="/policy-zones">
                <span className="border-b-2 border-landvista-slate pb-1 group-hover:border-landvista-blue transition-all">
                  Explore Policy
                </span>
              </a>
            </div>
          </div>

          {/* SECTION 3 */}
          <div className="md:col-span-9 md:col-start-4 border-t border-landvista-grey/20 pt-12 grid md:grid-cols-12 gap-8">

            {/* VERTICAL LABEL */}
            <div className="hidden md:flex md:col-span-1 items-start justify-center">
              <span className="rotate-[-90deg] text-[10px] font-black tracking-[0.3em] text-landvista-grey uppercase whitespace-nowrap">
                Intelligence
              </span>
            </div>

            {/* MAIN TEXT */}
            <div className="md:col-span-7">
              <h3 className="text-[28px] md:text-[34px] leading-tight font-black text-landvista-charcoal uppercase tracking-tight">
                Signal-based insights with structured validation
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-4">
              <p className="text-[15px] text-landvista-grey leading-relaxed mb-6">
                We provide signal-based insights with structured validation to help you make informed land investment decisions based on verified data sources and ground-level signals.
              </p>

              <a className="inline-flex items-center gap-2 text-landvista-charcoal text-xs font-black uppercase tracking-widest group"
                href="/dashboard">
                <span className="border-b-2 border-landvista-slate pb-1 group-hover:border-landvista-blue transition-all">
                  Explore Intelligence
                </span>
              </a>
            </div>
          </div>

          {/* SECTION 4 */}
          <div className="md:col-span-9 md:col-start-4 border-t border-landvista-grey/20 pt-12 grid md:grid-cols-12 gap-8 border-b pb-12">

            {/* VERTICAL LABEL */}
            <div className="hidden md:flex md:col-span-1 items-start justify-center">
              <span className="rotate-[-90deg] text-[10px] font-black tracking-[0.3em] text-landvista-grey uppercase whitespace-nowrap">
                Mandates
              </span>
            </div>

            {/* MAIN TEXT */}
            <div className="md:col-span-7">
              <h3 className="text-[28px] md:text-[34px] leading-tight font-black text-landvista-charcoal uppercase tracking-tight">
                Access-controlled opportunities for qualified users
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-4">
              <p className="text-[15px] text-landvista-grey leading-relaxed mb-6">
                Access to curated opportunities that match your investment profile and risk appetite.
              </p>

              <a className="inline-flex items-center gap-2 text-landvista-charcoal text-xs font-black uppercase tracking-widest group"
                href="/documents">
                <span className="border-b-2 border-landvista-slate pb-1 group-hover:border-landvista-blue transition-all">
                  Explore Mandates
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}