import React from 'react'


const commitments = [
  {
    title: "Zone-level intelligence",
    subtitle: "Who We Are",
    description:
      "We are a team of passionate real estate professionals dedicated to helping our clients succeed in a complex and dynamic market.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "Sector mapping aligned to planning frameworks",
    subtitle: "Our Impact",
    description:
      "We provide actionable insights, strategic advice and innovative solutions that drive value for our clients and communities.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
  },
  {
    title: "Policy overlays and development indicators",
    subtitle: "What Drives Us",
    description:
      "We are driven by a commitment to excellence, integrity and client success. We strive to be the trusted partner for real estate intelligence and advisory services.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  },
];

export default function OurCommitment() {
  return (
    <section className="w-full bg-landvista-bg py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-[28px] md:text-[36px] font-semibold text-landvista-charcoal">
            Policy & Zones
          </h2>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {commitments.map((item, i) => (
            <div
              key={i}
              className="relative group h-[320px] md:h-[380px] overflow-hidden cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition duration-300"></div>

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">

                {/* TOP TEXT */}
                <div>
                  <p className="text-[12px] uppercase tracking-[0.12em] text-gray-200 mb-2">
                    {item.subtitle}
                  </p>

                  <h3 className="text-[22px] md:text-[24px] font-semibold">
                    {item.title}
                  </h3>
                </div>

                {/* HOVER DESCRIPTION */}
                <div className="opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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