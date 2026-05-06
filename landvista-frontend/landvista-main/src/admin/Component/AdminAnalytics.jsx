import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Map as MapIcon, 
  FileText, 
  Clock,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await api.get("/analytics");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!stats) return;
    const csvRows = [];
    csvRows.push("Metric,Value");
    csvRows.push(`Total Users,${stats.totalUsers}`);
    csvRows.push(`Active Mandates,${stats.activeMandates}`);
    csvRows.push(`Conversion Rate,${stats.conversionRate}%`);
    csvRows.push(`Engagement Score,${stats.engagementScore}`);
    csvRows.push("");
    csvRows.push("Zone Name,Views");
    stats.mostViewedZones.forEach(z => {
      csvRows.push(`${z.name},${z.views}`);
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `LandVista_Analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading || !stats) return (
    <div className="py-20 text-center flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-landvista-blue mb-4"></div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
        {loading ? "Aggregating real-time data metrics..." : "Failed to load analytics data. Please check connection."}
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Platform Users", value: stats?.totalUsers || 0, growth: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Mandates", value: stats?.totalMandates || 0, growth: "+5%", icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Conversion Rate", value: `${stats?.conversionRate || 0}%`, growth: "+2.4%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Growth Forecast", value: `+${stats?.recentMandates || 0}`, growth: "Institutional", icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
            <div className={`p-4 rounded-2xl ${kpi.bg} ${kpi.color} w-fit mb-6`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">{kpi.label}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black text-landvista-blue">{kpi.value}</h3>
                <span className="text-[10px] font-bold text-green-500 flex items-center mb-1">
                  <ArrowUpRight className="w-3 h-3" /> {kpi.growth}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Indices Card */}
        <div className="lg:col-span-1 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-landvista-blue uppercase tracking-widest mb-8 flex items-center gap-2">
            <PieChart className="w-5 h-5" /> Performance Indices
          </h3>
          <div className="space-y-10">
            {[
              { label: "PQI (Profile Quality Index)", value: stats?.pqi || 0, max: 5, color: "bg-blue-500" },
              { label: "EDI (Engagement Discipline Index)", value: stats?.edi || 0, max: 5, color: "bg-purple-500" },
              { label: "PI (Pipeline Intensity)", value: stats?.pi || 0, max: 5, color: "bg-green-500" },
            ].map((idx, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center font-black uppercase tracking-widest">
                  <span className="text-[10px] text-landvista-grey">{idx.label}</span>
                  <span className="text-sm text-landvista-blue">{idx.value} / {idx.max}</span>
                </div>
                <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full ${idx.color} rounded-full`} style={{ width: `${(idx.value/idx.max)*100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Zones */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-landvista-blue uppercase tracking-widest mb-8 flex items-center gap-2">
            <MapIcon className="w-5 h-5" /> Strategic Engagement by Zone
          </h3>
          <div className="space-y-6">
            {(stats?.mostViewedZones || []).map((zone, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-landvista-blue transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-landvista-blue shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="font-black text-landvista-blue group-hover:text-white transition-all">{zone.name}</h4>
                    <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest group-hover:text-white/60 transition-all">Total Interactions Recorded</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-landvista-blue group-hover:text-white transition-all">{zone.views}</p>
                  <p className="text-[10px] font-bold text-green-500 flex items-center justify-end gap-1 group-hover:text-white/80 transition-all">
                    <ArrowUpRight className="w-3 h-3" /> Trending
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="bg-landvista-blue p-10 rounded-[3.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-black flex items-center gap-3 italic">
            <TrendingUp className="w-8 h-8" /> Intelligence Insights
          </h3>
          <p className="opacity-70 text-sm max-w-lg leading-relaxed">
            AI-driven analysis indicates a <span className="font-bold">14% surge</span> in mandate inquiries for Sector 4 following the recent policy update. Recommend prioritizing technical document updates for this region.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            className="bg-white text-landvista-blue px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10"
          >
            Export Report
          </button>
          <button className="bg-white/10 text-white border-2 border-white/20 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
            Schedule Alert
          </button>
        </div>
      </div>
    </div>
  );
}
