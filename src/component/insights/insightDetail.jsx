// import React from "react";
// import { useParams } from "react-router-dom";
// import { insights } from "../../data/insights";
// import Navbar from "../homePage/navbar";
// import Breadcrumbs from "../homePage/Breadcrumbs";

// export default function InsightDetail() {
//   const { slug } = useParams();

//   const insight = insights.find((item) => item.slug === slug);

//   // ✅ Prevent crash
//   if (!insight) {
//     return <div className="p-10">Insight not found</div>;
//   }

//   return (
//     <>
//       <Navbar />
// <Breadcrumbs/>
//       <section className="bg-landvista-bg py-16 md:py-24">
//         <div className="max-w-[1000px] mx-auto px-6">

//           {/* IMAGE */}
//           <div className="h-[300px] md:h-[420px] overflow-hidden mb-8">
//             <img
//               src={insight.image}
//               alt={insight.title}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* TITLE */}
//           <h1 className="text-[28px] md:text-[40px] font-semibold text-landvista-charcoal mb-6">
//             {insight.title}
//           </h1>

//           {/* DESCRIPTION */}
//           <p className="text-[16px] text-landvista-grey mb-6">
//             {insight.description}
//           </p>

//           {/* CONTENT */}
//           <p className="text-[16px] text-gray-700 leading-relaxed">
//             {insight.content}
//           </p>

//         </div>
//       </section>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../homePage/navbar";
import Breadcrumbs from "../homePage/Breadcrumbs";

export default function InsightDetail() {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("insights")) || [];

    const found = stored.find(
      (i) => i.slug === slug && i.status === "approved"
    );

    setInsight(found);
  }, [slug]);

  if (!insight) {
    return <div className="p-10">Insight not found</div>;
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6">

          {/* IMAGE */}
          <div className="h-[300px] md:h-[420px] overflow-hidden mb-8">
            <img
              src={insight.image || "/placeholder.jpg"}
              alt={insight.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-semibold mb-4">
            {insight.title}
          </h1>

          {/* DESC */}
          <p className="text-gray-600 mb-4">
            {insight.description}
          </p>

          {/* DETAIL */}
          <p className="text-gray-700 leading-relaxed">
            {insight.detail}
          </p>

          {/* BRIEF BLOCKS */}
          <div className="mt-6 space-y-3">
            {insight.brief?.map((b, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded">
                <h4 className="font-medium">{b.title}</h4>
                <p className="text-sm">{b.subtitle}</p>
                <p className="text-xs text-gray-500">{b.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}