import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

export default function InsightList() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/insights');
        const data = response.data.data || response.data;
        setInsights(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (err) {
        console.error("Failed to fetch insight list", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <div className="py-10 text-center text-gray-400">Loading research items...</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {insights.map((item) => (
        <Link
          key={item.slug || item._id}
          to={`/insights/${item.slug || item._id}`}
          className="group block bg-white overflow-hidden shadow-sm hover:shadow-md transition rounded-lg border border-gray-100"
        >
          {/* IMAGE */}
          <div className="h-[200px] overflow-hidden bg-gray-100">
            <img
              src={item.image || "https://images.unsplash.com/photo-1454165833762-02ad50c797e4"}
              alt={item.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1454165833762-02ad50c797e4";
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <div className="text-[10px] uppercase font-bold text-landvista-green mb-2">{item.category}</div>
            <h3 className="text-[18px] font-semibold text-landvista-charcoal mb-2 group-hover:text-landvista-green line-clamp-2">
              {item.title}
            </h3>

            <p className="text-[14px] text-landvista-grey line-clamp-2">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}