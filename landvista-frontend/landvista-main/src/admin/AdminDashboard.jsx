import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { getAdminAuth } from '../utils/auth';
import { 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  Zap, 
  Activity, 
  Clock, 
  ArrowUpRight,
  Target,
  FileText,
  AlertCircle,
  CheckCircle2,
  HardDrive
} from "lucide-react";

export default function AdminDashboard() {
  const adminName = getAdminAuth()?.user?.fullName || "Admin";
  const [stats, setStats] = useState({
    users: 0,
    mandates: 0,
    documents: 0,
    pending: 0,
    health: "Connecting..."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await api.get("/platform-stats");
      setStats(response.data);
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const kpis = [
    { label: "Pending Approvals", value: stats.pending, icon: Users, color: "text-amber-600", bg: "bg-amber-50", trend: "Requires Action" },
    { label: "Active Investors", value: stats.users, icon: Target, color: "text-blue-600", bg: "bg-blue-50", trend: "Total Registry" },
    { label: "Vault Assets", value: stats.documents, icon: HardDrive, color: "text-green-600", bg: "bg-green-50", trend: "Encrypted" },
    { label: "System Health", value: stats.health, icon: Activity, color: "text-purple-600", bg: "bg-purple-50", trend: "Live Stream" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Command <span className="text-landvista-blue/40">Center</span></h1>
          <p className="text-landvista-grey text-sm font-bold uppercase tracking-[0.2em] mt-1">Platform Status & Operational Overview</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-landvista-blue text-white flex items-center justify-center font-black italic">LV</div>
          <div className="pr-4">
            <p className="text-[10px] font-black text-landvista-grey uppercase">Operational Mode</p>
            <p className="text-xs font-black text-landvista-blue uppercase tracking-widest">{adminName}</p>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-landvista-blue mb-4 tracking-tighter">
              {loading ? "..." : stat.value}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-landvista-blue/40 uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" /> {stat.trend}
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts & Critical Tasks */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black text-landvista-blue uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" /> Critical Actions
              </h3>
              <span className={`bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${stats.pending > 0 ? 'animate-pulse' : ''}`}>
                {stats.pending} PENDING
              </span>
            </div>
            
            <div className="space-y-4">
              {stats.pending > 0 ? (
                <div className="p-5 bg-red-50 rounded-2xl border border-red-100 hover:bg-red-100 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-red-600 text-sm">New Access Requests</p>
                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-red-600 text-white">Critical</span>
                  </div>
                  <p className="text-[10px] font-bold text-red-600/60 flex items-center gap-1 uppercase tracking-widest">
                    <Users className="w-3 h-3" /> {stats.pending} Users Awaiting Approval
                  </p>
                </div>
              ) : (
                <div className="p-10 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                  <CheckCircle2 className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">All queues clear</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Activity Stream */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black text-landvista-blue uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" /> Operational Stream
              </h3>
              <button onClick={fetchStats} className="text-[10px] font-black text-landvista-blue uppercase tracking-widest hover:underline flex items-center gap-2">
                <Zap className="w-3 h-3" /> Refresh Feed
              </button>
            </div>

            <div className="relative border-l-2 border-gray-50 ml-4 pl-10 space-y-12">
              {[
                { action: "Registry Connection Active", user: "Institutional Server", details: "Handshake verified with MongoDB", time: "Now", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
                { action: "Vault Synchronization", user: "Data Repository", details: `${stats.documents} assets currently live`, time: "Continuous", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
              ].map((activity, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[54px] p-3 rounded-2xl ${activity.bg} ${activity.color} border-4 border-white shadow-sm`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-landvista-blue uppercase tracking-tight mb-1">{activity.action}</p>
                    <h4 className="text-sm font-bold text-landvista-grey mb-2">{activity.user} — <span className="opacity-60">{activity.details}</span></h4>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Insight Footer */}
      <div className="p-10 bg-white rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 group">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-landvista-blue flex items-center justify-center text-white shadow-2xl shadow-landvista-blue/20 group-hover:rotate-6 transition-transform">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-landvista-blue italic tracking-tighter">Master <span className="text-landvista-blue/30">Intelligence</span></h3>
            <p className="text-sm text-landvista-grey font-medium max-w-md">Real-time data stream is active. All system parameters are within institutional thresholds.</p>
          </div>
        </div>
        <button className="bg-landvista-blue text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:-translate-y-1 transition-all shadow-xl shadow-landvista-blue/20 flex items-center gap-3">
          Initialize Sync <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}



// Simple Helper Component replacement if needed
