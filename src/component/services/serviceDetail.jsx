import React from "react";
import { services } from "../../data/services";
import { useParams } from "react-router-dom";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import Breadcrumbs from "../homePage/Breadcrumbs";


export default function ServiceDetail() {
  const { slug } = useParams(); // ✅ THIS is the fix

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <div className="p-10">Service not found</div>;
  }


  return (
    <div className="bg-landvista-bg">
<Navbar/>
<Breadcrumbs/>
      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-[32px] md:text-[44px] font-semibold text-landvista-charcoal mb-6">
            {service.title}
          </h1>

          <p className="text-[16px] text-landvista-grey leading-relaxed">
            {service.content}
          </p>
        </div>

        <div className="h-[300px] md:h-[420px] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>

      </section>
<Footer/>
    </div>
  );
}