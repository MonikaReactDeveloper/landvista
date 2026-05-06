import React, { useEffect, useState } from 'react';
import api from "../../utils/api";

export default function FilterPanel({ filters, setFilters, data }) {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    // 1. Get unique zones from the actual intelligence data
    const dataZones = data ? [...new Set(data.map(item => item.zone))].filter(Boolean) : [];
    
    // 2. Fetch master zones
    const fetchMasterZones = async () => {
      try {
        const res = await api.get("/policy/zones");
        const mZones = res.data.data || res.data;
        const masterNames = Array.isArray(mZones) ? mZones.map(z => z.name) : [];
        
        // Combine and unique
        const combined = [...new Set([...dataZones, ...masterNames])].sort();
        setZones(combined);
      } catch (err) {
        setZones(dataZones.sort());
      }
    };
    fetchMasterZones();
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap gap-4 mb-8">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Zone Focus</label>
        <select
          value={filters.zone}
          onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
          className="border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-landvista-blue bg-white text-sm font-bold text-landvista-blue min-w-[180px]"
        >
          <option value="all">All Zones</option>
          {zones.map(zName => (
            <option key={zName} value={zName}>{zName}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Risk Profile</label>
        <select
          value={filters.risk}
          onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
          className="border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-landvista-blue bg-white text-sm font-bold text-landvista-blue min-w-[180px]"
        >
          <option value="all">All Risk</option>
          <option value="1">Level 1 (Safe)</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3 (Neutral)</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5 (Critical)</option>
        </select>
      </div>
    </div>
  );
}