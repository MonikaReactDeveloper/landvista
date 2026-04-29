import React, { useState } from "react";

/* ---------------- DATA ---------------- */
const sectors = [
  {
    id: "01",
    name: "Sector 01",
    classification: "Industrial",
    stage: "Active",
    risk: "Low",
    signal: "High",
    detail: "Strong infrastructure backing with high logistics movement.",
  },
  {
    id: "02",
    name: "Sector 02",
    classification: "Mixed Use",
    stage: "Emerging",
    risk: "Medium",
    signal: "Medium",
    detail: "Early-stage development with moderate policy alignment.",
  },
  {
    id: "03",
    name: "Sector 03",
    classification: "Residential",
    stage: "Planned",
    risk: "High",
    signal: "Low",
    detail: "Long-term potential but dependent on regulatory approvals.",
  },
];

/* ---------------- COMPONENT ---------------- */
export default function SectorMapping() {
  const [filters, setFilters] = useState({
    stage: "All",
    risk: "All",
    signal: "All",
  });

  const [activeSector, setActiveSector] = useState(null);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredSectors = sectors.filter((sector) => {
    return (
      (filters.stage === "All" || sector.stage === filters.stage) &&
      (filters.risk === "All" || sector.risk === filters.risk) &&
      (filters.signal === "All" || sector.signal === filters.signal)
    );
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- UI ---------------- */
  return (
    <section className="bg-landvista-bg py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-landvista-blue">
            Sector Mapping
          </h2>
          <p className="text-landvista-grey mt-2 max-w-2xl">
            Transition from macro zone intelligence to sector-level insights with structured classification, development signals, and risk indicators.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-8">

          <Select
            label="Development Stage"
            options={["All", "Active", "Emerging", "Planned"]}
            value={filters.stage}
            onChange={(v) => handleFilterChange("stage", v)}
          />

          <Select
            label="Risk Level"
            options={["All", "Low", "Medium", "High"]}
            value={filters.risk}
            onChange={(v) => handleFilterChange("risk", v)}
          />

          <Select
            label="Signal Strength"
            options={["All", "Low", "Medium", "High"]}
            value={filters.signal}
            onChange={(v) => handleFilterChange("signal", v)}
          />
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredSectors.map((sector) => {
            const isActive = activeSector === sector.id;

            return (
              <div
                key={sector.id}
                onClick={() =>
                  setActiveSector(isActive ? null : sector.id)
                }
                className={`
                  border rounded-xl p-5 bg-white cursor-pointer transition
                  ${isActive ? "border-landvista-blue shadow-sm" : "hover:border-landvista-blue"}
                `}
              >
                {/* Sector ID */}
                <div className="text-xs text-landvista-muted mb-2">
                  {sector.id}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-landvista-charcoal mb-2">
                  {sector.name}
                </h3>

                {/* Meta */}
                <div className="text-sm text-landvista-grey space-y-1">
                  <p>Type: {sector.classification}</p>
                  <p>Status: {sector.stage}</p>
                  <p>Risk: {sector.risk}</p>
                  <p>Signal: {sector.signal}</p>
                </div>

                {/* Expandable Detail */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isActive ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-sm text-landvista-slate border-t pt-3">
                    {sector.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredSectors.length === 0 && (
          <p className="text-landvista-grey mt-6">
            No sectors match selected filters.
          </p>
        )}

      </div>
    </section>
  );
}

/* ---------------- REUSABLE SELECT ---------------- */

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="text-xs text-landvista-grey block mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm bg-white"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}