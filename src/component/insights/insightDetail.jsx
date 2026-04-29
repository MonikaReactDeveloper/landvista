import React from "react";
import { useParams } from "react-router-dom";
import { insights } from "../../data/insights";
import Navbar from "../homePage/navbar";
import Breadcrumbs from "../homePage/Breadcrumbs";

export default function InsightDetail() {
  const { slug } = useParams();

  const insight = insights.find((item) => item.slug === slug);

  // ✅ Prevent crash
  if (!insight) {
    return <div className="p-10">Insight not found</div>;
  }

  return (
    <>
      <Navbar />
<Breadcrumbs/>
      <section className="bg-landvista-bg py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-6">

          {/* IMAGE */}
          <div className="h-[300px] md:h-[420px] overflow-hidden mb-8">
            <img
              src={insight.image}
              alt={insight.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-[28px] md:text-[40px] font-semibold text-landvista-charcoal mb-6">
            {insight.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-[16px] text-landvista-grey mb-6">
            {insight.description}
          </p>

          {/* CONTENT */}
          <p className="text-[16px] text-gray-700 leading-relaxed">
            {insight.content}
          </p>

        </div>
      </section>
    </>
  );
}