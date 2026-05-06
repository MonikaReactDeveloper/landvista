import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { ArrowRight, BookOpen, BarChart2, Globe } from 'lucide-react';

const Overview = () => {
  const [latestInsights, setLatestInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await api.get('/insights');
        const data = response.data.data || response.data;
        // Take the latest 3
        setLatestInsights(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (err) {
        console.error("Failed to fetch overview data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-landvista-charcoal mb-4">Market Intelligence Overview</h2>
        <p className="text-landvista-grey max-w-[800px] text-lg leading-relaxed">
          Access institutional-grade research and data-driven insights to navigate the complex landscape of industrial and land real estate in India.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <BookOpen className="text-landvista-green" />, label: "Research Reports", value: "1,200+", desc: "Proprietary database" },
          { icon: <BarChart2 className="text-landvista-green" />, label: "Data Points", value: "50k+", desc: "Updated monthly" },
          { icon: <Globe className="text-landvista-green" />, label: "Markets Covered", value: "24", desc: "Across India" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="mb-4">{stat.icon}</div>
            <div className="text-[28px] font-bold text-landvista-blue">{stat.value}</div>
            <div className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-xs text-landvista-grey">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* FEATURED INSIGHTS */}
      <div className="mb-8 flex justify-between items-end">
        <h3 className="text-[24px] font-semibold text-landvista-charcoal">Latest Research Highlights</h3>
        <Link to="#insights" className="text-landvista-green font-medium flex items-center gap-2 hover:underline">
          View all insights <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-400">Loading intelligence dashboard...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {latestInsights.map((item) => (
            <Link 
              key={item.slug || item._id} 
              to={`/insights/${item.slug || item._id}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={item.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase font-bold text-landvista-green mb-2">{item.category}</div>
                <h4 className="text-[18px] font-semibold text-landvista-blue mb-3 group-hover:text-landvista-green transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <div className="text-xs text-landvista-grey">{item.date}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Overview