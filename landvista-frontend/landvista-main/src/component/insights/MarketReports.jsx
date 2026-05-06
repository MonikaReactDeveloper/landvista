import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const MarketReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await api.get('/insights');
        const data = response.data.data || response.data;
        // Filter for Market Reports only
        const filtered = Array.isArray(data) 
          ? data.filter(item => item.category === "Market Report") 
          : [];
        setReports(filtered);
      } catch (error) {
        console.error("Failed to fetch market reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading market reports...</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[28px] font-semibold text-landvista-charcoal mb-2">Market Reports</h2>
          <p className="text-landvista-grey max-w-[600px]">
            Comprehensive analysis and data-driven reports covering the latest trends in land and industrial real estate.
          </p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="py-10 bg-white border border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500">No market reports available for this region currently.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {reports.map((report) => (
            <div key={report.slug || report._id} className="group bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-lg">
              <div className="h-[200px] overflow-hidden">
                <img 
                  src={report.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"} 
                  alt={report.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-landvista-green font-bold bg-green-50 px-2 py-1 rounded">
                    {report.region}
                  </span>
                  <span className="text-[12px] text-gray-400">{report.date}</span>
                </div>
                <h3 className="text-[20px] font-semibold text-landvista-blue mb-3 group-hover:text-landvista-green transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-landvista-grey line-clamp-2 mb-6">
                  {report.description}
                </p>
                <Link 
                  to={`/insights/${report.slug || report._id}`}
                  className="text-sm font-medium text-landvista-blue flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Download Report <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MarketReports