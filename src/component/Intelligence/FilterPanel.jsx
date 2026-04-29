import React from 'react'

export default function FilterPanel({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-wrap gap-3">
      <select
        value={filters.zone}
        onChange={(e) =>
          setFilters({ ...filters, zone: e.target.value })
        }
        className="border p-2 rounded"
      >
        <option value="all">All Zones</option>
        <option value="Zone A">Zone A</option>
      </select>

      <select
        value={filters.risk}
        onChange={(e) =>
          setFilters({ ...filters, risk: e.target.value })
        }
        className="border p-2 rounded"
      >
        <option value="all">All Risk</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}