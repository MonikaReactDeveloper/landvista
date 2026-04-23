import React from "react";

export default function Newsletter() {
  return (
    <section className="w-full bg-landvista-bg py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT: IMAGE */}
          <div className="w-full h-[260px] md:h-[360px] lg:h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
              alt="Newsletter"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT: CONTENT */}
          <div className="max-w-[520px]">

            {/* SUBTITLE */}
            <p className="text-[12px] uppercase tracking-[0.12em] text-landvista-muted mb-4">
              Stay Updated
            </p>

            {/* TITLE */}
            <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-semibold text-landvista-charcoal leading-tight mb-6">
              Subscribe to Our Newsletter
            </h2>

            {/* DESCRIPTION */}
            <p className="text-[15px] md:text-[16px] text-landvista-grey leading-relaxed mb-8">
              Get the latest insights, market trends and strategic updates
              delivered straight to your inbox.
            </p>

            {/* FORM */}
          

              {/* INPUT */}
             

              {/* BUTTON */}
              <button
              
                className="bg-landvista-green text-white px-6 py-3 text-[14px] font-medium hover:bg-[#255e50] transition"
              >
                Subscribe
              </button>

          

          </div>
        </div>

      </div>
    </section>
  );
}