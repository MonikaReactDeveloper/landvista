import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const filterData = {
  propertyType: [
    { label: "Office", count: 1523 },
    { label: "Industrial & Logistics", count: 1170 },
    { label: "Retail", count: 1090 },
    { label: "Residential", count: 573 },
    { label: "Hotel", count: 570 },
  ],
  region: ["Americas", "EMEA", "Asia Pacific"],
  country: ["United States", "UK", "India", "Germany"],
  market: ["New York", "London", "Mumbai", "Berlin"],
  topic: ["Investment", "Sustainability", "Technology"],
};

export default function FilterSidebar({ filters, setFilters }) {
  const [openSections, setOpenSections] = useState({
    propertyType: true,
    region: false,
    country: false,
    market: false,
    topic: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckbox = (category, value) => {
    setFilters((prev) => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });
  };

  return (
    <aside className="w-full lg:w-[260px] border-r border-gray-200 pr-6">

      {/* PROPERTY TYPE */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("propertyType")}
          className="flex justify-between items-center w-full text-sm font-medium text-gray-800 mb-4"
        >
          Property Type
          <ChevronDown
            size={16}
            className={`transition ${
              openSections.propertyType ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.propertyType && (
          <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2">
            {filterData.propertyType.map((item, i) => (
              <label
                key={i}
                className="flex items-center justify-between text-sm text-gray-700 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.propertyType.includes(item.label)}
                    onChange={() =>
                      handleCheckbox("propertyType", item.label)
                    }
                    className="accent-green-700"
                  />
                  {item.label}
                </div>
                <span className="text-xs text-gray-400">
                  ({item.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* GENERIC SECTION BUILDER */}
      {["region", "country", "market", "topic"].map((key) => (
        <div key={key} className="mb-6">
          <button
            onClick={() => toggleSection(key)}
            className="flex justify-between items-center w-full text-sm font-medium text-gray-800 mb-4 capitalize"
          >
            {key}
            <ChevronDown
              size={16}
              className={`transition ${
                openSections[key] ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections[key] && (
            <div className="space-y-3">
              {filterData[key].map((item, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters[key].includes(item)}
                    onChange={() => handleCheckbox(key, item)}
                    className="accent-green-700"
                  />
                  {item}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}