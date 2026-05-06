import React from 'react'

export default function ConfidenceBadge({ value }) {
  return (
    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600">
      Confidence: {value}
    </span>
  );
}