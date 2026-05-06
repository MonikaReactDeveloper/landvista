import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  Database,
  Map,
  Folder,
  Briefcase,
  Bell,
  BarChart,
  ClipboardList,
  Settings,
  Menu,
  X,
  Target,
  Zap,
  HardDrive,
  Activity,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { adminLogout } from "../../utils/auth";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();


  const menu = [
    { section: "OVERVIEW" },
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart },
    
    { section: "CORE ASSETS" },
    { name: "Intelligence Hub", path: "/admin/intelligence", icon: Database },
    { name: "Document Vault", path: "/admin/vault", icon: HardDrive },
    { name: "Geography", path: "/admin/zones", icon: Map },
    { name: "Market Signals", path: "/admin/signals", icon: Zap },
    
    { section: "OPERATIONS" },
    { name: "Deal Pipeline", path: "/admin/pipeline", icon: Briefcase },
    { name: "Alert Center", path: "/admin/alerts", icon: Bell },
    { name: "Advisory", path: "/admin/advisory", icon: Users },
    
    { section: "GOVERNANCE" },
    { name: "User Management", path: "/admin/users", icon: Users },
    { name: "RBAC Matrix", path: "/admin/rbac", icon: Shield },
    { name: "Legal / NDA", path: "/admin/nda", icon: FileText },
    { name: "Audit Trail", path: "/admin/audit", icon: ClipboardList },
    
    { section: "SYSTEM" },
    { name: "Configuration", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate("/admin-login");
  };

  const SidebarContent = () => (
    <div className="w-[280px] h-screen bg-landvista-blue text-white flex flex-col shadow-2xl overflow-hidden">
      {/* Brand */}
      <div className="p-8 mb-4">
        <img 
          src="/landvista-wordmark-dark.svg" 
          alt="LandVista" 
          className="h-6 w-auto"
        />
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-3">Admin OS v2.0</p>
      </div>

      {/* Nav Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-1">
        {menu.map((item, i) => {
          if (item.section) {
            return (
              <p key={i} className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-4 pt-6 pb-2">
                {item.section}
              </p>
            );
          }

          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div
              key={i}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`group flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 relative
                ${isActive 
                  ? "bg-white text-landvista-blue shadow-lg shadow-white/5" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"}`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={`${isActive ? "text-landvista-blue" : "text-white/40 group-hover:text-white"} transition-colors`} />
                <span className="text-[11px] font-black uppercase tracking-widest">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-landvista-blue/40" />}
            </div>
          );
        })}
      </div>

      {/* Footer / Profile */}
      <div className="p-6 bg-black/10 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all group"
        >
          <div className="flex items-center gap-3">
            <LogOut size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block h-screen fixed left-0 top-0 z-50">
        <SidebarContent />
      </div>

      {/* Mobile Drawer Logic */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="flex-1 bg-landvista-blue/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="w-[280px] h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}