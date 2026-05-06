import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function ZoneSelector({ onSelect }) {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await api.get("/policy/zones");
        const data = response.data.data || response.data;
        setZones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch zones", error);
      } finally {
        setLoading(false);
      }
    };
    fetchZones();
  }, []);

  const navigate = useNavigate();

  const handleSelect = (zone) => {
    if (zone.status === "locked") return;
    navigate(`/policy-zones/${zone.slug}`);
  };

  return (
    <section className="bg-landvista-bg py-10 px-10 md:px-14">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-landvista-blue">
            Select Intelligence Zone
          </h2>
          <p className="text-landvista-grey mt-2 max-w-2xl">
            Choose a zone to explore structured intelligence, regulatory signals, and sector-level insights.
          </p>
        </div>

        {/* Grid */}
        {loading && <div className="text-center py-10">Loading intelligence zones...</div>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {zones.map((zone) => {
            const isActive = selectedZone === zone.id;
            const isLocked = zone.status === "locked";

            return (
              <div
                key={zone.id}
                onClick={() => handleSelect(zone)}
                className={`
                  relative border rounded-xl p-6 cursor-pointer transition
                  ${isActive ? "border-landvista-blue bg-landvista-blue/5" : ""}
                  ${isLocked ? "opacity-60 cursor-not-allowed" : "hover:border-landvista-blue"}
                `}
              >
                {/* Status Tag */}
                {isLocked && (
                  <span className="absolute top-4 right-4 text-xs bg-landvista-muted/20 text-landvista-grey px-2 py-1 rounded">
                    Restricted
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-landvista-charcoal mb-2">
                  {zone.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-landvista-grey">
                  {zone.description}
                </p>

                {/* Active Indicator */}
                {isActive && (
                  <div className="mt-4 text-sm text-landvista-blue font-medium">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}