import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { services } from "../../data/services";
import ServiceHero from "./serviceHero";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";

export default function ServicesPage() 
{
    const navigate = useNavigate();
  return (<>
  <Navbar/>
    <section className="bg-landvista-bg mb-10">
       
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

<ServiceHero/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

         {services.map((service) => (
  <div
    key={service.slug}
    className="bg-white p-6 border border-gray-200 hover:shadow-md transition flex flex-col justify-between"
  >
    <div>
      <h3 className="text-[20px] font-semibold mb-3">
        {service.title}
      </h3>

      <p className="text-[14px] text-landvista-grey">
        {service.description}
      </p>
    </div>

    <button
      onClick={() => navigate(`/services/${service.slug}`)}
      className="mt-6 text-landvista-green font-medium text-sm align-left hover:underline"
    >
      Explore Service →
    </button>
  </div>
))}

        </div>
      </div>
    </section>
    <Footer/>
  </>);
}