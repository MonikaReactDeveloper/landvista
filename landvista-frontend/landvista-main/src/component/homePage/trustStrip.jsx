import React from "react";
import { ShieldCheck, Database, CheckCircle, FileText } from "lucide-react";

const trustItems = [
  {
    title: "Non-Brokerage Platform",
    icon: ShieldCheck,
  },
  {
    title: "Policy-Aligned Intelligence",
    icon: FileText,
  },
  {
    title: "Verified Multi-Source Data",
    icon: Database,
  },
  {
    title: "Governance-Led Framework",
    icon: CheckCircle,
  },
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-4 group"
              >
                {/* ICON */}
                <div className="w-10 h-10 flex items-center justify-center border border-gray-200">
                  <Icon
                    size={18}
                    className="text-landvista-green group-hover:scale-110 transition"
                  />
                </div>

                {/* TEXT */}
                <p className="text-[14px] md:text-[15px] text-landvista-charcoal font-medium leading-snug">
                  {item.title}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}