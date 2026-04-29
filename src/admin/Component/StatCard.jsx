import React from 'react'

// StatCard.jsx
export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div
      className={`bg-gradient-to-r ${
        color || "from-gray-400 to-gray-500"
      } text-white p-5 rounded-xl shadow-md flex justify-between items-center`}
    >
      <div>
        <h2 className="text-2xl font-bold">{value}</h2>
        <p className="text-sm opacity-90">{title}</p>
      </div>

      <div className="bg-white/20 p-3 rounded-full">
        {Icon ? <Icon size={22} /> : <span>—</span>}
      </div>
    </div>
  );
}