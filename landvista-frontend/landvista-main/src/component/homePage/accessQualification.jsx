import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const profiles = [
  { label: "Institutional Investors", icon: "🏛" },
  { label: "Developers", icon: "🏗" },
  { label: "Capital Allocators", icon: "📊" },
];

const requirements = [
  "Qualification review",
  "NDA acceptance",
];

export default function AccessQualification() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* LEFT */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] text-landvista-muted mb-4">
              Access &amp; Qualification
            </p>
            <h2 className="text-[28px] md:text-[36px] font-semibold text-landvista-charcoal leading-snug mb-6">
              Access is limited to qualified participants
            </h2>
            <p className="text-[14px] text-landvista-muted mb-10">
              Applications are reviewed prior to approval
            </p>

            {/* PROFILES */}
            <div className="space-y-3 mb-10">
              {profiles.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-4 border border-gray-100 rounded-lg px-5 py-4 hover:border-landvista-blue transition"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-[14px] font-medium text-landvista-charcoal">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/request-access")}
              className="group inline-flex items-center gap-2 bg-landvista-blue text-white px-6 py-3 text-[14px] font-medium hover:opacity-90 transition"
            >
              Request Access
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* RIGHT */}
          <div className="pt-0 md:pt-16">
            <p className="text-[12px] uppercase tracking-[0.14em] text-landvista-muted mb-6">
              Mandatory Requirements
            </p>
            <div className="space-y-4">
              {requirements.map((r, i) => (
                <div
                  key={r}
                  className="flex items-start gap-5 border-t border-gray-100 pt-5"
                >
                  <span className="text-[12px] text-landvista-muted mt-0.5 w-5 shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-[15px] text-landvista-charcoal font-medium">
                    {r}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gray-50 border border-gray-100 rounded-lg">
              <p className="text-[13px] text-landvista-grey leading-relaxed italic">
                "Access is filtered to protect platform integrity and deliver meaningful intelligence only to qualified participants."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
