import React, { useState, useEffect } from "react";
import api from "../../utils/api";

/* ---------------- DATA ---------------- */
export default function SectorMapping({ zone }) {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    stage: "All",
    risk: "All",
    signal: "All",
  });

  const [activeSector, setActiveSector] = useState(null);

  useEffect(() => {
    if (zone) {
      fetchSectors();
    }
  }, [zone]);

  const fetchSectors = async () => {
    setLoading(true);
    try {
      // Find sectors linked to this zone
      const res = await api.get("/policy/sectors");
      const data = res.data.data || res.data;
      
      // Filter sectors that belong to this zone
      // Note: in our new model, zone is an ID. In old it was a string name.
      // We handle both for safety during transition.
      const zoneSectors = data.filter(s => 
        (s.zone && (s.zone._id === zone.id || s.zone === zone.id || s.zone === zone.name))
      );
      
      setSectors(zoneSectors);
    } catch (error) {
      console.error("Failed to fetch sectors", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredSectors = sectors.filter((sector) => {
    // Map new model fields to old UI labels
    const stage = sector.activationStatus || "Planned";
    const risk = sector.riskLevel >= 4 ? "High" : sector.riskLevel >= 3 ? "Medium" : "Low";
    
    return (
      (filters.stage === "All" || stage === filters.stage) &&
      (filters.risk === "All" || risk === filters.risk)
    );
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- UI ---------------- */
  if (!zone) return null; // Hide if no zone selected

  return (
    <section className="bg-landvista-bg py-16 px-6 md:px-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-landvista-blue">
            Sector Mapping for {zone.name}
          </h2>
          <p className="text-landvista-grey mt-2 max-w-2xl">
            Transition from macro zone intelligence to sector-level insights with structured classification, development signals, and risk indicators.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-8">

          <Select
            label="Development Stage"
            options={["All", "Active", "Inactive", "Planned"]}
            value={filters.stage}
            onChange={(v) => handleFilterChange("stage", v)}
          />

          <Select
            label="Risk Level"
            options={["All", "Low", "Medium", "High"]}
            value={filters.risk}
            onChange={(v) => handleFilterChange("risk", v)}
          />
        </div>

        {/* GRID */}
        {loading ? (
          <div className="text-center py-20">Loading operational sectors...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSectors.map((sector) => {
              const isActive = activeSector === sector.id;
              const riskLabel = sector.riskLevel >= 4 ? "High" : sector.riskLevel >= 3 ? "Medium" : "Low";

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
                  {/* Map Image Thumbnail */}
                  {sector.mapImageUrl && (
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                      <img src={sector.mapImageUrl} alt="Map" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Sector ID */}
                  <div className="text-xs text-landvista-muted mb-2">
                    {sector.code}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-landvista-charcoal mb-2">
                    {sector.name}
                  </h3>

                  {/* Meta */}
                  <div className="text-sm text-landvista-grey space-y-1">
                    <p>Status: {sector.activationStatus || 'Planned'}</p>
                    <p>Risk: {riskLabel}</p>
                    <p>Confidence: {sector.confidenceLevel}/5</p>
                  </div>

                  {/* Expandable Detail */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300
                      ${isActive ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <p className="text-sm text-landvista-slate border-t pt-3">
                      {sector.description || "No additional details available for this sector."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredSectors.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
             <p className="text-landvista-grey">
              No operational sectors found for this intelligence zone.
            </p>
          </div>
        )}

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