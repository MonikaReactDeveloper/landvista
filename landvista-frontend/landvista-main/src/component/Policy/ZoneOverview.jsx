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

export default function ZoneOverview({ zone }) {
  const [active, setActive] = useState(null);

  const handleToggle = (id) => {
    setActive(active === id ? null : id);
  };

  // 🛡️ NO ZONE SELECTED YET
  if (!zone) {
    return (
      <section className="bg-landvista-bg py-16 px-6 md:px-10 text-center">
        <div className="max-w-4xl mx-auto py-12 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-landvista-grey text-lg">Please select an intelligence zone above to view details.</p>
        </div>
      </section>
    );
  }

  // Update items with dynamic data
  const dynamicItems = overviewItems.map(item => {
    if (item.id === "summary") {
      return { ...item, detail: zone.description, image: zone.imageUrl || item.image };
    }
    return { ...item, image: zone.imageUrl || item.image };
  });

  return (
    <section className="bg-landvista-bg py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-landvista-green/10 text-landvista-green text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
              {zone.type}
            </span>
            <span className="text-landvista-grey text-sm">{zone.location}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-landvista-blue">
            {zone.name} - Overview
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {dynamicItems.map((item) => {
            const isActive = active === item.id;

            return (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            onMouseEnter={() => setActive(item.id)}
            onMouseLeave={() => setActive(null)}
            className={`
              relative overflow-hidden p-5 cursor-pointer transition h-[200px] rounded-xl shadow-sm
              ${isActive ? "ring-2 ring-landvista-blue" : ""}
            `}
          >

            {/* Background Image */}
            <img
              src={`${item.image}`}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Dark Overlay */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-black/70' : 'bg-black/40'}`} />

            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col justify-end">

              {/* Title */}
              <h3 className="font-semibold text-white mb-1">
                {item.title}
              </h3>

              {!isActive && <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">View Details</p>}

              {/* Expandable Detail */}
              <div
                className={`
                  overflow-y-auto transition-all duration-300
                  ${isActive ? "max-h-[140px] mt-2 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <p className="text-xs text-gray-100 border-t border-white/20 pt-2 leading-relaxed">
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