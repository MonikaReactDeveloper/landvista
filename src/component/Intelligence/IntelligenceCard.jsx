import { useState } from "react";
import SignalBreakdown from "./SignalBreakdown";
import RiskBadge from "./RiskBadge";
import ConfidenceBadge from "./ConfidenceBadge";
import LockedOverlay from "./LockedOverlay";

export default function IntelligenceCard({ data, user }) {
  const [open, setOpen] = useState(false);

  // 🔥 SINGLE SOURCE OF TRUTH
  const isLocked = user?.nda_status !== "verified";

  return (
    <div className="relative bg-white p-4 rounded shadow hover:shadow-lg transition">

      {/* 🔒 LOCK OVERLAY */}
      {isLocked && <LockedOverlay />}

      <h3 className="font-semibold text-landvista-charcoal">
        {data.title}
      </h3>

      <p className="text-sm text-landvista-grey">
        {data.zone} • {data.sector}
      </p>

      <div className="flex gap-2 mt-2">
        <ConfidenceBadge value={data.confidence} />
        <RiskBadge value={data.risk} />
      </div>

      <p className="text-sm mt-3 text-gray-600">
        {isLocked
          ? "🔒 NDA required to unlock full intelligence"
          : data.narrative}
      </p>

      {!isLocked && (
        <button
          onClick={() => setOpen(!open)}
          className="text-blue-600 text-sm mt-2"
        >
          {open ? "Hide Signals" : "View Signals"}
        </button>
      )}

      {open && !isLocked && (
        <SignalBreakdown signals={data.signals} />
      )}
    </div>
  );
}