// import React from "react";
// import { services } from "../../data/services";
// import { useParams } from "react-router-dom";
// import Navbar from "../homePage/navbar";
// import Footer from "../homePage/footer";
// import Breadcrumbs from "../homePage/Breadcrumbs";


// export default function ServiceDetail() {
//   const { slug } = useParams(); // ✅ THIS is the fix

//   const service = services.find((s) => s.slug === slug);

//   if (!service) {
//     return <div className="p-10">Service not found</div>;
//   }


//   return (
//     <div className="bg-landvista-bg">
// <Navbar/>
// <Breadcrumbs/>
//       {/* HERO */}
//       <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">

//         <div>
//           <h1 className="text-[32px] md:text-[44px] font-semibold text-landvista-charcoal mb-6">
//             {service.title}
//           </h1>

//           <p className="text-[16px] text-landvista-grey leading-relaxed">
//             {service.content}
//           </p>
//         </div>

//         <div className="h-[300px] md:h-[420px] overflow-hidden">
//           <img
//             src={service.image}
//             alt={service.title}
//             className="w-full h-full object-cover"
//           />
//         </div>

//       </section>
// <Footer/>
//     </div>
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import Breadcrumbs from "../homePage/Breadcrumbs";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const services =
    JSON.parse(localStorage.getItem("services")) || [];

  const service = services.find(
    (s) => s.slug === slug && s.status === "approved"
  );

  if (!service) return <div className="p-10">Service not found</div>;

  return (
    <div className="bg-landvista-bg">
      <Navbar />
<Breadcrumbs/>
      {/* HERO */}
 {/* HERO */}
<section className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

  {/* LEFT */}
  <div>
    <h1 className="text-3xl font-semibold mb-4">
      {service.title}
    </h1>

    <p className="text-gray-600">
      {service.detail}
    </p>
  </div>

  {/* RIGHT IMAGE */}
  {service.image && (
    <div className="h-[300px] md:h-[400px] overflow-hidden rounded">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
      />
    </div>
  )}
</section>

      {/* CAPABILITIES (LIKE CBRE) */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Capabilities
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {service.capabilities.map((cap, i) => (
            <div
              key={i}
              className="bg-white p-6 border hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {cap.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {cap.subtitle}
                </p>
              </div>

      <button
  onClick={() => {
    if (!cap.slug) {
      alert("Slug missing. Please re-save service.");
      return;
    }

    navigate(`/services/${service.slug}/${cap.slug}`);
  }}
  className="mt-4 text-green-700 text-sm font-medium"
>
  Explore Service →
</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}