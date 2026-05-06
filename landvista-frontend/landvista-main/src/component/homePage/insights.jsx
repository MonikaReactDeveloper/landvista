import React from "react";

const insights = [
  {
    category: "Research",
    title: "Global Office Trends 2026",
    subtitle: "Workplace Evolution",
    description:
      "Discover how hybrid work and ESG priorities are reshaping office demand globally.",
    image: "/assets/images/insight-office.jpg",
  },
  {
    category: "Investment",
    title: "Capital Markets Outlook",
    subtitle: "Investor Strategy",
    description:
      "Explore where investors are allocating capital and which sectors are leading growth.",
    image: "/assets/images/hero-main.jpg",
  },
  {
    category: "Sustainability",
    title: "Green Buildings Rising",
    subtitle: "ESG Impact",
    description:
      "Sustainable assets are outperforming — here’s why investors are prioritizing them.",
    image: "/assets/images/insight-sustainability.jpg",
  },
];

export default function InsightsSection() {
  return (
    <section className="w-full bg-landvista-bg py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-[28px] md:text-[36px] font-semibold text-landvista-charcoal">
            Latest Insights
          </h2>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {insights.map((item, i) => (
            <div
              key={i}
              className="relative group h-[320px] md:h-[380px] overflow-hidden rounded-sm cursor-pointer"
            >
              {/* BACKGROUND IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">

                {/* TOP */}
                <div>
                  <p className="text-[12px] uppercase tracking-[0.12em] text-gray-200 mb-2">
                    {item.category}
                  </p>

                  <h3 className="text-[20px] md:text-[22px] font-semibold leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[14px] text-gray-300 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* HOVER DESCRIPTION */}
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-[14px] text-gray-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}