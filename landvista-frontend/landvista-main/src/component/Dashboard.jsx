import { useState, useEffect } from "react";
import {
  TrendingUp,
  ShieldAlert,
  Briefcase,
  FileText,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Zap,
  Globe,
  MoreVertical,
  Users
} from "lucide-react";
import api from "../utils/api";
import Navbar from "./homePage/navbar";
import Footer from "./homePage/footer";
import IntelligenceCard from "./Intelligence/IntelligenceCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    mandates: [],
    intelligence: [],
    alerts: [],
    documents: []
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all relevant data for the user
      const [mandatesRes, intelRes, docsRes] = await Promise.all([
        api.get("/mandates"), // Mandates mapped to user
        api.get("/intelligence?status=Published"),
        api.get("/documents")
      ]);

      setStats({
        mandates: mandatesRes.data || [],
        intelligence: (intelRes.data.data || []).slice(0, 3),
        alerts: (intelRes.data.data || []).filter(i => i.riskScore >= 4),
        documents: (docsRes.data || []).slice(0, 5)
      });
    } catch (error) {
      console.error("Dashboard data fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-landvista-bg min-h-screen">
      <Navbar />

      <div className="pt-28 md:pt-36 p-8 md:p-12 max-w-7xl mx-auto space-y-10">
        {/* User Profile / Status Bar (Top Right) */}
        <div className="flex justify-end mb-4">
           <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">
               {user?.email || user?.username || "Authenticated User"}
             </span>
             <div className="w-6 h-6 rounded-lg bg-landvista-blue/5 flex items-center justify-center text-landvista-blue">
               <Users size={12} />
             </div>
           </div>
        </div>

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-landvista-blue/10 text-landvista-blue text-[10px] font-black uppercase tracking-widest rounded-full">
                {user?.tier}
              </span>
              <span className="text-[10px] font-bold text-gray-300">SECURE SESSION ACTIVE</span>
            </div>
            <h1 className="text-4xl font-black text-landvista-blue tracking-tighter italic">
              Welcome Back, <span className="text-landvista-blue/40">{user?.fullName?.split(' ')[0]}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-landvista-grey uppercase">Last Institutional Login</p>
              <p className="text-sm font-bold text-landvista-blue">{user?.lastLoginAt ? new Date(user?.lastLoginAt).toLocaleString() : "First Session Today"}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-landvista-blue shadow-sm">
              <Zap size={20} />
            </div>
          </div>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Active Mandates */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Briefcase size={80} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-landvista-blue text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-landvista-blue/20">
                <Briefcase size={24} />
              </div>
              <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest mb-1">Assigned Mandates</p>
              <h3 className="text-4xl font-black text-landvista-blue tracking-tighter mb-4">{stats.mandates.length}</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-landvista-green">
                <ArrowUpRight size={14} /> Active Portfolios
              </div>
            </div>
          </div>

          {/* Intelligence Signals */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <TrendingUp size={80} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20">
                <TrendingUp size={24} />
              </div>
              <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest mb-1">Market Signals</p>
              <h3 className="text-4xl font-black text-landvista-blue tracking-tighter mb-4">{stats.intelligence.length}+</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600">
                <Zap size={14} /> Real-time Feed
              </div>
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <ShieldAlert size={80} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                <ShieldAlert size={24} />
              </div>
              <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest mb-1">Risk Indicators</p>
              <h3 className="text-4xl font-black text-landvista-blue tracking-tighter mb-4">{stats.alerts.length}</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <Clock size={14} /> Critical Attention
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence & Documents Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent Intelligence */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h4 className="text-sm font-black text-landvista-blue uppercase tracking-widest flex items-center gap-2">
                <Globe size={16} /> Priority Signals
              </h4>
              <button className="text-[10px] font-black text-landvista-blue hover:underline">VIEW ALL</button>
            </div>
            <div className="p-4 flex-1 space-y-4">
              {stats.intelligence.map((intel, i) => (
                <div key={i} className="p-6 rounded-3xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-black px-2 py-0.5 bg-blue-50 text-landvista-blue rounded uppercase tracking-widest">
                      {intel.zone}
                    </span>
                    <span className="text-[10px] font-bold text-gray-300">
                      {new Date(intel.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h5 className="font-black text-landvista-blue mb-2 group-hover:translate-x-1 transition-transform">{intel.title}</h5>
                  <p className="text-xs text-landvista-grey line-clamp-2 leading-relaxed">
                    {intel.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Document Vault */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h4 className="text-sm font-black text-landvista-blue uppercase tracking-widest flex items-center gap-2">
                <FileText size={16} /> Mandate Vault
              </h4>
              <button className="text-[10px] font-black text-landvista-blue hover:underline">ACCESS HUB</button>
            </div>
            <div className="p-4 flex-1 space-y-2">
              {stats.documents.length > 0 ? stats.documents.map((doc, i) => (
                <div
                  key={i}
                  onClick={() => doc.fileUrl && window.open(doc.fileUrl, '_blank')}
                  className="flex items-center justify-between p-5 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-landvista-blue group-hover:bg-landvista-blue group-hover:text-white transition-colors shadow-sm">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-landvista-blue uppercase tracking-tight">{doc.title}</p>
                      <p className="text-[10px] font-bold text-landvista-grey opacity-60 uppercase">{doc.category} • {doc.fileSize}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-landvista-blue transition-colors" />
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-40">
                  <FileText size={48} className="mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">No documents assigned to your current mandates</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Intelligence Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-landvista-blue rounded-full" />
              <h4 className="text-xl font-black text-landvista-blue uppercase tracking-tighter italic">Portfolio <span className="text-landvista-blue/30">Intelligence</span></h4>
            </div>
            <button
              onClick={() => window.location.href = '/intelligence-preview'}
              className="text-[10px] font-black text-landvista-blue hover:underline uppercase tracking-widest"
            >
              Intelligence Hub
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.intelligence.map((item) => (
              <IntelligenceCard
                key={item._id}
                data={item}
                user={user}
              />
            ))}
          </div>

          {stats.intelligence.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-100">
              <p className="text-landvista-grey font-bold italic uppercase tracking-widest opacity-30">No Intelligence Signals Mapped</p>
            </div>
          )}
        </div>

        {/* Active Mandates Deep View */}
        {stats.mandates.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-landvista-blue rounded-full" />
              <h4 className="text-xl font-black text-landvista-blue uppercase tracking-tighter italic">Active <span className="text-landvista-blue/30">Mandates</span></h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stats.mandates.map((mandate, i) => (
                <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h5 className="text-2xl font-black text-landvista-blue tracking-tighter mb-1 uppercase">{mandate.name}</h5>
                      <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.2em]">{mandate.organization || "Direct Investment"}</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${mandate.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {mandate.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Deal Velocity</p>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-landvista-blue">{mandate.dealScore}%</span>
                        <div className="flex-1 h-2 bg-white rounded-full mb-2 overflow-hidden p-0.5">
                          <div className="h-full bg-landvista-blue rounded-full" style={{ width: `${mandate.dealScore}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Current Phase</p>
                      <p className="text-lg font-black text-landvista-blue uppercase italic">{mandate.stage}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = '/documents'}
                    className="w-full py-4 bg-landvista-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:-translate-y-1 transition-all shadow-xl shadow-landvista-blue/20 flex items-center justify-center gap-3"
                  >
                    View Strategic Documents <ArrowUpRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}