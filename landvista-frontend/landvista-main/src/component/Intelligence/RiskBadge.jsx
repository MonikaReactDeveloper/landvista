import React from 'react'

export default function RiskBadge({ value }) {
  const color =
    value === "High"
      ? "bg-red-100 text-red-600"
      : value === "Medium"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";

  return (
    <span className={`text-xs px-2 py-1 rounded ${color}`}>
      Risk: {value}
    </span>
  );
}