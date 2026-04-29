import React from 'react'

export default function SignalBreakdown({ signals }) {
  return (
    <div className="mt-3 border-t pt-2 space-y-2">
      {signals.map((s, i) => (
        <div key={i} className="text-sm">
          <strong>{s.type}</strong> - {s.strength}
          <p className="text-xs text-gray-500">
            Source: {s.source}
          </p>
        </div>
      ))}
    </div>
  );
}