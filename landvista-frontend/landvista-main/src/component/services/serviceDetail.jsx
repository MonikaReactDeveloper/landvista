import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import Breadcrumbs from "../homePage/Breadcrumbs";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        // Fetch service by slug
        const response = await api.get(`/services?slug=${slug}`);
        const data = response.data.data || response.data;
        
        // Find the specific service if the API returns an array
        const found = Array.isArray(data) 
          ? data.find(s => s.slug === slug || s._id === slug) 
          : data;
          
        setService(found);
      } catch (error) {
        console.error("Failed to fetch service detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">Loading service details...</div>;
  }

  if (!service) {
    return (
      <div className="bg-landvista-bg min-h-screen">
        <Navbar />
        <div className="p-20 text-center">
          <h2 className="text-2xl font-bold text-landvista-blue">Service not found</h2>
          <p className="text-landvista-grey mt-2">The service you are looking for might have been moved or deleted.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-landvista-bg">
      <Navbar />
      <Breadcrumbs />
      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-[32px] md:text-[44px] font-semibold text-landvista-charcoal mb-6">
            {service.title}
          </h1>
          <p className="text-[16px] text-landvista-grey leading-relaxed">
            {service.description || service.content}
          </p>
          
          {service.detail && (
            <p className="text-[16px] text-landvista-grey mt-6 leading-relaxed">
              {service.detail}
            </p>
          )}
        </div>

        <div className="h-[300px] md:h-[420px] overflow-hidden rounded-xl shadow-lg bg-gray-100">
          <img
            src={service.image || "https://images.unsplash.com/photo-1497366216548-37526070297c"}
            alt={service.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c";
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}