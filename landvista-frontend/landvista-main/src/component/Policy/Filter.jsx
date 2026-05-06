import React, { useState } from "react";

const filterData = {
  zone: ["Zone L", "Zone N"],
  sector: ["01", "02", "03"],
  signal: ["Policy", "Infrastructure", "Development", "Risk"],
  risk: ["Low", "Medium", "High"],
};

const dummyResults = [
  {
    title: "Highway Expansion Signal",
    desc: "Infrastructure upgrade impacting logistics flow...",
    zone: "Zone L",
    sector: "01",
    signal: "Infrastructure",
    risk: "Low",
    date: "2026-03-10",
  },
  {
    title: "Zoning Policy Update",
    desc: "New industrial zoning classification released...",
    zone: "Zone N",
    sector: "02",
    signal: "Policy",
    risk: "Medium",
    date: "2026-03-08",
  },
];
export default function IntelligenceFilters({ zone }) {
  const [selected, setSelected] = useState({
    zone: [],
    sector: [],
    signal: [],
    risk: [],
    search: "",
  });

  if (!zone) return null;

  const handleCheckbox = (category, value) => {
    setSelected((prev) => {
      const exists = prev[category].includes(value);
      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });
  };
const filteredResults = dummyResults.filter((item) => {
  const matchZone =
    selected.zone.length === 0 || selected.zone.includes(item.zone);

  const matchSector =
    selected.sector.length === 0 || selected.sector.includes(item.sector);

  const matchSignal =
    selected.signal.length === 0 || selected.signal.includes(item.signal);

  const matchRisk =
    selected.risk.length === 0 || selected.risk.includes(item.risk);

  const matchSearch =
    selected.search === "" ||
    item.title.toLowerCase().includes(selected.search.toLowerCase()) ||
    item.desc.toLowerCase().includes(selected.search.toLowerCase());

  return (
    matchZone &&
    matchSector &&
    matchSignal &&
    matchRisk &&
    matchSearch
  );
});
  return (
    <section className="bg-landvista-bg py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* LEFT FILTER PANEL */}
        <div className="space-y-8">

          {/* SEARCH */}
          <div>
            <input
              type="text"
              placeholder="Search intelligence..."
              className="w-full border-b pb-2 bg-transparent outline-none text-sm"
              onChange={(e) =>
                setSelected({ ...selected, search: e.target.value })
              }
            />
          </div>

          {/* FILTER GROUP */}
          <FilterGroup
            title="Zone"
            items={filterData.zone}
            selected={selected.zone}
            onChange={(v) => handleCheckbox("zone", v)}
          />

          <FilterGroup
            title="Sector"
            items={filterData.sector}
            selected={selected.sector}
            onChange={(v) => handleCheckbox("sector", v)}
          />

          <FilterGroup
            title="Signal Type"
            items={filterData.signal}
            selected={selected.signal}
            onChange={(v) => handleCheckbox("signal", v)}
          />

          <FilterGroup
            title="Risk Level"
            items={filterData.risk}
            selected={selected.risk}
            onChange={(v) => handleCheckbox("risk", v)}
          />

        </div>

        {/* RIGHT RESULTS PANEL */}
        <div className="md:col-span-3">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-landvista-grey">
              {dummyResults.length} Results
            </p>

            <select className="border px-3 py-1 text-sm">
              <option>Relevancy</option>
              <option>Latest</option>
            </select>
          </div>

          {/* RESULTS */}
          <div className="divide-y">

            {filteredResults.map((item, i) => (
              <div key={i} className="py-6 flex justify-between gap-6">

                {/* TEXT */}
                <div>
                  <h3 className="text-lg font-medium text-landvista-green">
                    {item.title}
                  </h3>

                  <p className="text-sm text-landvista-grey mt-1">
                    {item.desc}
                  </p>

                  <p className="text-xs text-landvista-muted mt-2">
                    {item.meta}
                  </p>
                </div>

                {/* IMAGE */}
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src="/images/sample.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

/* ---------------- FILTER GROUP ---------------- */

function FilterGroup({ title, items, selected, onChange }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-landvista-charcoal mb-3">
        {title}
      </h4>

      <div className="space-y-2 border-b pb-4">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm text-landvista-grey">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => onChange(item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}