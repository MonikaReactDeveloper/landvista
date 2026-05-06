import React from 'react'

export default function LockedOverlay() {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded">
      <p className="text-sm text-landvista-blue font-medium">
        NDA Required
      </p>
    </div>
  );
}