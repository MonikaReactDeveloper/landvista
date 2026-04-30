// import React from "react";
// import { Link } from "react-router-dom";
// import { insights } from "../../data/insights";

// export default function InsightList() {
//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       {insights.map((item) => (
//         <Link
//           key={item.slug}
//           to={`/insights/${item.slug}`}
//           className="group block bg-white overflow-hidden shadow-sm hover:shadow-md transition"
//         >
//           {/* IMAGE */}
//           <div className="h-[200px] overflow-hidden">
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//             />
//           </div>

//           {/* CONTENT */}
//           <div className="p-5">
//             <h3 className="text-[18px] font-semibold text-landvista-charcoal mb-2 group-hover:text-landvista-green">
//               {item.title}
//             </h3>

//             <p className="text-[14px] text-landvista-grey">
//               {item.description}
//             </p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InsightList() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("insights")) || [];

    // ✅ ONLY APPROVED INSIGHTS
    const approved = stored.filter(i => i.status === "approved");

    setInsights(approved);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {insights.map((item) => (
        <Link
          key={item.slug}
          to={`/insights/${item.slug}`}
          className="group block bg-white overflow-hidden shadow-sm hover:shadow-md transition"
        >
          {/* IMAGE */}
          <div className="h-[200px] overflow-hidden">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <h3 className="text-[18px] font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}