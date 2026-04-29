import React, { useState } from "react";

const overviewItems = [
  {
    id: "summary",
    title: "Zone Summary",
    short: "Macro-level overview of the selected zone",
    detail:
      "This zone represents a strategically positioned region with defined land use patterns, infrastructure access, and regulatory alignment supporting long-term development.",
  image:"https://images.unsplash.com/photo-1497366216548-37526070297c"
    },
  {
    id: "status",
    title: "Development Status",
    short: "Current stage of development",
    detail:
      "The zone is in an active development phase with ongoing infrastructure expansion, policy backing, and increasing institutional interest.",
  image:"https://images.unsplash.com/photo-1497366216548-37526070297c"
    },
  {
    id: "policy",
    title: "Policy Relevance",
    short: "Government and regulatory alignment",
    detail:
      "Aligned with regional and national policy frameworks, including zoning regulations, industrial corridors, and sector-specific incentives.",
  image:"https://images.unsplash.com/photo-1497366216548-37526070297c"
    },
  {
    id: "signals",
    title: "High-Level Signals",
    short: "Key intelligence indicators",
    detail:
      "Signals include land aggregation trends, infrastructure investments, sector movement, and regulatory shifts influencing long-term value.",
  image:"https://images.unsplash.com/photo-1497366216548-37526070297c"
    },
];

export default function ZoneOverview() {
  const [active, setActive] = useState(null);

  const handleToggle = (id) => {
    setActive(active === id ? null : id);
  };

  return (
    <section className="bg-landvista-bg py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-landvista-blue">
            Zone Overview
          </h2>
          <p className="text-landvista-grey mt-2 max-w-2xl">
            Understand the macro-level structure, development stage, and policy alignment before exploring deeper intelligence layers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {overviewItems.map((item) => {
            const isActive = active === item.id;

            return (
          <div
  key={item.id}
  onClick={() => handleToggle(item.id)}
  onMouseEnter={() => setActive(item.id)}
  onMouseLeave={() => setActive(null)}
  className={`
    relative overflow-hidden p-5 cursor-pointer transition
    ${isActive ? "ring-2 ring-landvista-blue" : ""}
  `}
>

  {/* Background Image */}
  <img
    src={`${item.image}`} // 👈 dynamic per card
    alt={item.title}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Content Layer */}
  <div className="relative z-10">

    {/* Title */}
    <h3 className="font-semibold text-white mb-2">
      {item.title}
    </h3>

    {/* Short Info */}
    <p className="text-sm text-gray-200">
      {item.short}
    </p>

    {/* Expandable Detail */}
    <div
      className={`
        overflow-hidden transition-all duration-300
        ${isActive ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <p className="text-sm text-gray-100 border-t border-white/20 pt-3">
        {item.detail}
      </p>
    </div>

  </div>
</div>
            );
          })}
        </div>

      </div>
    </section>
  );
}