import React from "react";

const signals = [
  {
    title: "Policy Signals",
    description:
      "Regulatory movements, zoning updates, and government-backed frameworks influencing land positioning.",
    cta: "View Policy Signals",
  },
  {
    title: "Infrastructure Signals",
    description:
      "Transport corridors, logistics upgrades, and connectivity developments shaping long-term accessibility.",
    cta: "Explore Infrastructure",
  },
  {
    title: "Development Signals",
    description:
      "Ongoing and planned developments, institutional activity, and construction momentum across sectors.",
    cta: "Analyze Development",
  },
  {
    title: "Risk Signals",
    description:
      "Regulatory uncertainty, land disputes, environmental constraints, and execution risks.",
    cta: "View Risk Layer",
  },
];

export default function SignalEngine({ zone }) {
  if (!zone) return null;

  return (
    <section className="bg-landvista-bg py-20 px-6 md:px-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-landvista-green mb-12">
          Signal Intelligence Engine
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">

          {signals.map((signal, index) => (
            <div key={index} className="space-y-4">

              {/* Top Divider Line */}
              <div className="w-full h-[1px] bg-gray-300 mb-4" />

              {/* Title */}
              <h3 className="text-xl font-medium text-landvista-green">
                {signal.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-landvista-grey leading-relaxed max-w-sm">
                {signal.description}
              </p>

              {/* CTA */}
              <button className="flex items-center gap-2 text-sm text-landvista-green font-medium group">
                <span className="w-6 h-[2px] bg-landvista-green transition-all group-hover:w-10" />
                {signal.cta}
              </button>

            </div>
          ))}
        </div>

   
      </div>
    </section>
  );
}