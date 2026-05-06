import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const signal = {
  type: "Infrastructure Signal",
  zone: "Zone L",
  indicator: "Connectivity expansion",
  confidence: "High",
  risk: "Medium",
  source: "Multi-source validated",
  narrative:
    "Improved infrastructure connectivity indicates enhanced development viability over the medium term.",
};

const fields = [
  { label: "Signal Type", value: signal.type },
  { label: "Zone", value: signal.zone },
  { label: "Indicator", value: signal.indicator },
  { label: "Confidence", value: signal.confidence },
  { label: "Risk Level", value: signal.risk },
  { label: "Source", value: signal.source },
];

const confidenceColor = {
  High: "text-white bg-landvista-green",
  Medium: "text-landvista-green bg-landvista-green/10",
  Low: "text-landvista-maroon bg-landvista-maroon/10",
};

const riskColor = {
  High: "text-white bg-landvista-maroon",
  Medium: "text-landvista-maroon bg-landvista-maroon/10",
  Low: "text-landvista-green bg-landvista-green/10",
};

export default function IntelligencePreview() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="w-full bg-white py-20 md:py-32 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <div className="mb-16 md:mb-24">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-landvista-grey mb-4">
            Intelligence Layer Preview
          </p>
          <h2 className="text-[32px] md:text-[48px] font-black text-landvista-charcoal uppercase tracking-tighter leading-tight max-w-2xl">
            Structured Output <span className="font-thin text-landvista-grey">— NOT SPECULATION</span>
          </h2>
        </div>

        {/* SIGNAL CARD */}
        <div className="border-2 border-landvista-blue/10 rounded-2xl overflow-hidden shadow-2xl shadow-landvista-blue/5">

          {/* CARD HEADER */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100 border-b border-gray-100">
            {fields.map((f) => (
              <div key={f.label} className="p-6">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-landvista-grey mb-2">
                  {f.label}
                </p>
                <p
                  className={`text-[11px] font-black uppercase tracking-widest inline-block px-3 py-1 rounded-sm ${
                    f.label === "Confidence"
                      ? confidenceColor[f.value] || "text-landvista-charcoal"
                      : f.label === "Risk Level"
                      ? riskColor[f.value] || "text-landvista-charcoal"
                      : "text-landvista-charcoal bg-gray-50"
                  }`}
                >
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          {/* NARRATIVE */}
          <div className="p-10 bg-landvista-alt flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-landvista-grey mb-3">
                Intelligence Narrative
              </p>
              <p
                className={`text-[16px] md:text-[18px] font-medium text-landvista-charcoal leading-relaxed max-w-3xl transition-all duration-700 ${
                  revealed ? "opacity-100 blur-none" : "opacity-20 blur-md select-none"
                }`}
              >
                {signal.narrative}
              </p>
            </div>
            <button
              onClick={() => setRevealed((r) => !r)}
              className="shrink-0 flex items-center gap-3 bg-landvista-blue hover:bg-landvista-blue-hover active:bg-landvista-blue-active text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl shadow-xl shadow-landvista-blue/20"
            >
              {revealed ? "CONCEAL INTELLIGENCE" : "REVEAL INTELLIGENCE"}
              <ChevronDown
                size={16}
                className={`transition-transform duration-500 ${revealed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <p className="mt-6 text-[12px] text-landvista-muted italic">
          * Sample preview. Full intelligence access requires qualification and NDA acceptance.
        </p>

      </div>
    </section>
  );
}
