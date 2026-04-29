import React, { useState } from "react";
import { insights } from "../../data/insight";
import FilterSidebar from "./filterSidebar";

function FilterSection({ title, options, onChange }) {
  const [filters, setFilters] = useState({
  propertyType: [],
  region: [],
  country: [],
  market: [],
  topic: [],
});
  return (
    <div className="mb-6 border-b pb-4">
      <h4 className="text-sm font-semibold mb-3">{title}</h4>

      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
function handleFilter(type, value, filters, setFilters) {
  setFilters((prev) => {
    const exists = prev[type].includes(value);

    return {
      ...prev,
      [type]: exists
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    };
  });
}

export default function InsightsListPage() {
  const [filters, setFilters] = useState({
    property: [],
    region: [],
    market: [],
    topic: [],
  });

  const [sort, setSort] = useState("relevancy");
  const [showFilters, setShowFilters] = useState(false);

  // ================= FILTER LOGIC =================
  const filteredData = insights.filter((item) => {
    return (
      (filters.property.length === 0 ||
        filters.property.includes(item.category)) &&
      (filters.region.length === 0 ||
        filters.region.includes(item.region)) &&
      (filters.market.length === 0 ||
        filters.market.includes(item.market)) &&
      (filters.topic.length === 0 ||
        filters.topic.includes(item.topic))
    );
  });

  // ================= SORT LOGIC =================
  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "za") return b.title.localeCompare(a.title);
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    return 0;
  });

  return (
    <div className="bg-landvista">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">

        {/* ================= LEFT FILTER ================= */}
        <div className="col-span-12 md:col-span-3">

          <FilterSection
            title="Property Type"
            options={["Office", "Retail", "Industrial"]}
            onChange={(value) =>
              handleFilter("property", value, filters, setFilters)
            }
          />

          <FilterSection
            title="Region"
            options={["India", "Europe"]}
            onChange={(value) =>
              handleFilter("region", value, filters, setFilters)
            }
          />

          <FilterSection
            title="Market"
            options={["Mumbai", "Delhi", "Bangalore" ,"Hyderabad", "Pune", "Chennai"]}
            onChange={(value) =>
              handleFilter("market", value, filters, setFilters)
            }
          />

          <FilterSection
            title="Topic"
            options={["Investment", "Sustainability"]}
            onChange={(value) =>
              handleFilter("topic", value, filters, setFilters)
            }
          />
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="col-span-12 md:col-span-9">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">

            <p className="text-sm text-gray-600">
              {sortedData.length} Results
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border text-sm px-3 py-2"
            >
              <option value="relevancy">Relevancy</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

          </div>
<button
  className="md:hidden mb-4"
  onClick={() => setShowFilters(!showFilters)}
>
  Filters
</button>

{showFilters && <FilterSidebar />}
          {/* RESULTS LIST */}
          <div className="space-y-8">
            {sortedData.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col md:flex-row justify-between border-b pb-6 gap-6"
              >
                {/* TEXT */}
                <div className="max-w-[700px]">
                  <h3 className="text-[20px] font-semibold text-landvista-green mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    {item.description}
                  </p>

                  <div className="text-xs text-gray-500 flex gap-4">
                    <span>{item.topic}</span>
                    <span>{item.date}</span>
                    <span>{item.region}</span>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="w-[120px] h-[100px]">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
