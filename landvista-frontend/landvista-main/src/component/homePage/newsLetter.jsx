import React from "react";
import { useNavigate } from "react-router-dom";

export default function Newsletter() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-landvista-bg py-16 md:py-24">

      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT: IMAGE */}
          <div className="w-full h-[260px] md:h-[360px] lg:h-[420px] overflow-hidden">
            <img
              src="/assets/images/newsletter.jpg"
              alt="Newsletter"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT: CONTENT */}
          <div className="max-w-[520px]">
            <h1 className="text-[24px] md:text-[30px] lg:text-[36px] leading-tight font-semibold text-landvista-charcoal mb-6">Challenges</h1>
            {/* SUBTITLE */}
            <p className="text-[12px] uppercase tracking-[0.12em] text-landvista-muted mb-4">
              Stay Updated
            </p>

            {/* TITLE */}
            <p className="text-[20x] md:text-[18px] lg:text-[20px] font-semibold text-landvista-charcoal leading-tight mb-6">
              Land decisions operate in fragmented, opaque, and policy-heavy environments with limited access to structured intelligence
            </p>

            {/* DESCRIPTION */}
            <p className="text-[15px] md:text-[16px] text-landvista-grey leading-relaxed mb-8">
              TerraSignal structures fragmented inputs into a governed intelligence framework to support disciplined decision-making
            </p>

            {/* FORM */}


            {/* INPUT */}


            {/* BUTTON */}
            <button

              className="bg-landvista-blue text-white px-6 py-3 text-[14px] font-medium hover:bg-[#255e50] transition"
              onClick={() => navigate("/request-access")}>
              Subscribe
            </button>



          </div>
        </div>

      </div>
    </section>
  );
}