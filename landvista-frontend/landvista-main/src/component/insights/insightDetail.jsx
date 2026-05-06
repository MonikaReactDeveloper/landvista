import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";
import Breadcrumbs from "../homePage/Breadcrumbs";
import Footer from "../homePage/footer";

export default function InsightDetail() {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/insights`);
        const data = response.data.data || response.data;
        const found = Array.isArray(data) 
          ? data.find(item => item.slug === slug || item._id === slug) 
          : data;
        setInsight(found);
      } catch (error) {
        console.error("Failed to fetch insight details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">Loading insight details...</div>;
  }

  if (!insight) {
    return (
      <div className="bg-landvista-bg min-h-screen">
        <Navbar />
        <div className="p-20 text-center">
          <h2 className="text-2xl font-bold text-landvista-blue">Insight not found</h2>
          <p className="text-landvista-grey mt-2">The insight you are looking for might have been moved or archived.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <section className="bg-landvista-bg py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-6">
          {/* IMAGE */}
          <div className="h-[300px] md:h-[420px] overflow-hidden mb-8 rounded-xl shadow-lg bg-gray-100">
            <img
              src={insight.image || "https://images.unsplash.com/photo-1454165833762-02ad50c797e4"}
              alt={insight.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1454165833762-02ad50c797e4";
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-[28px] md:text-[40px] font-semibold text-landvista-charcoal mb-6">
            {insight.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-[16px] text-landvista-grey mb-6 font-medium">
            {insight.description}
          </p>

          {/* CONTENT */}
          <div className="text-[16px] text-gray-700 leading-relaxed space-y-4">
            {insight.content ? (
              insight.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))
            ) : (
              <p>No detailed content available for this insight.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}