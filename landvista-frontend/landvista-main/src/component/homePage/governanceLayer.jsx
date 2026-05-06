import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    id: "01",
    title: "Independent, non-brokerage positioning",
    detail:
      "No commissions, no transactional incentives. Pure advisory alignment with institutional outcomes.",
  },
  {
    id: "02",
    title: "No speculative pricing or return projections",
    detail:
      "All outputs are grounded in verified data. We do not generate forecasts without structured evidential basis.",
  },
  {
    id: "03",
    title: "Structured and verified data inputs",
    detail:
      "Every signal is cross-referenced against multiple regulatory, infrastructure, and geographic sources.",
  },
  {
    id: "04",
    title: "Full audit and access control framework",
    detail:
      "Every interaction is tracked, logged, and governed. Role-based access ensures data integrity.",
  },
];

export default function GovernanceLayer() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-landvista-bg py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] text-landvista-muted mb-3">
              Governance Layer
            </p>
            <h2 className="text-[28px] md:text-[36px] font-semibold text-landvista-charcoal max-w-xl leading-snug">
              Built on trust, transparency, and institutional rigor
            </h2>
          </div>
          <p className="text-[13px] text-landvista-muted max-w-xs shrink-0">
            Every interaction is tracked and governed
          </p>
        </div>

        {/* PILLARS */}
        <div className="grid sm:grid-cols-2 gap-0 border-t border-l border-gray-200">
          {pillars.map((p) => (
            <div
              key={p.id}
              className="border-b border-r border-gray-200 p-8 group hover:bg-white transition-colors duration-200"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-landvista-muted mb-4">
                {p.id}
              </p>
              <h3 className="text-[17px] font-semibold text-landvista-charcoal mb-3 leading-snug group-hover:text-landvista-charcoal transition-colors">
                {p.title}
              </h3>
              <p className="text-[14px] text-landvista-grey leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-gray-200 pt-10">
          <p className="text-[14px] text-landvista-grey max-w-lg">
            Our governance architecture ensures that every data point, user action, and intelligence output is verifiable and accountable.
          </p>
          <button
            onClick={() => navigate("/governance/framework")}
            className="group inline-flex items-center gap-2 border border-landvista-blue text-landvista-charcoal px-6 py-3 text-[13px] font-medium hover:bg-landvista-blue hover:text-white transition whitespace-nowrap"
          >
            View Governance Framework
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
