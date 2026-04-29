"use client";

export default function WhatWeOffer() {
  return (
    <section className="w-full bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24">

          {/* LEFT TITLE */}
          <div className="md:col-span-3">
            <h2 className="text-[40px] md:text-[48px] leading-tight font-serif text-landvista-charcoal">
              What
              <br />
              We Do
            </h2>
          </div>

          {/* SECTION 1 */}
          <div className="md:col-span-9 border-t border-gray-300 pt-10 grid md:grid-cols-12 gap-8">

            {/* VERTICAL LABEL */}
            <div className="hidden md:flex md:col-span-1 items-start justify-center">
              <span className="rotate-[-90deg] text-[12px] tracking-[0.2em] text-gray-500 whitespace-nowrap">
                Advisory
              </span>
            </div>

            {/* MAIN TEXT */}
            <div className="md:col-span-7">
              <h3 className="text-[24px] md:text-[30px] leading-tight font-serif text-landvista-charcoal">
               Strategic land intelligence and structuring support
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-4">
              <p className="text-[14px] text-landvista-secondary leading-relaxed mb-6">
              We provide strategic land intelligence and structuring support to help you invest, lease, optimize and transform your real estate portfolio.
              </p>

              <a className="inline-flex items-center gap-2 text-[#0F3B2E] text-sm font-medium group">
                <span className="border-b border-[#0F3B2E] pb-1">
                  Explore Advisory Services
                </span>
              </a>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="md:col-span-9 md:col-start-4 border-t border-gray-300 pt-10 grid md:grid-cols-12 gap-8">

            {/* VERTICAL LABEL */}
            <div className="hidden md:flex md:col-span-1 items-start justify-center">
              <span className="rotate-[-90deg] text-[12px] tracking-[0.2em] text-gray-500 whitespace-nowrap">
                Policy & Zones
              </span>
            </div>

            {/* MAIN TEXT */}
            <div className="md:col-span-7">
              <h3 className="text-[20px] md:text-[30px] leading-tight font-serif text-landvista-charcoal">
              Regulatory mapping and development frameworks
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-4">
              <p className="text-[14px] text-landvista-secondary mb-4">
              We provide regulatory mapping and development frameworks to help you navigate complex land use policies, zoning regulations and development incentives.
              </p>

             

              <a className="inline-flex items-center gap-2 text-[#0F3B2E] text-sm font-medium group">
                <span className="border-b border-[#0F3B2E] pb-1">
                  Explore Policy
                </span>
              </a>
            </div>
          </div>
<div className="md:col-span-9 md:col-start-4 border-t border-gray-300 pt-10 grid md:grid-cols-12 gap-8">

            {/* VERTICAL LABEL */}
            <div className="hidden md:flex md:col-span-1 items-start justify-center">
              <span className="rotate-[-90deg] text-[12px] tracking-[0.2em] text-gray-500 whitespace-nowrap">
                Intelligence
              </span>
            </div>

            {/* MAIN TEXT */}
            <div className="md:col-span-7">
              <h3 className="text-[24px] md:text-[30px] leading-tight font-serif text-landvista-charcoal">
              Signal-based insights with structured validation
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-4">
              <p className="text-[14px] text-landvista-secondary mb-4">
              We provide signal-based insights with structured validation to help you make informed land investment decisions based on verified data sources and ground-level signals.
              </p>

             

              <a className="inline-flex items-center gap-2 text-[#0F3B2E] text-sm font-medium group">
                <span className="border-b border-[#0F3B2E] pb-1">
                  Explore Intelligence
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}