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
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Services", path: "/admin/services ", icon: Settings },
      { name: "Insights", path: "/admin/insights", icon: Folder },
       { name: "Advisory", path: "/admin/advisory", icon: Users },
    { name: "Users & Access", path: "/admin/users", icon: Users },
    { name: "RBAC", path: "/admin/rbac", icon: Shield },
    { name: "NDA Management", path: "/admin/nda", icon: FileText },
    { name: "Intelligence CMS", path: "/admin/intelligence", icon: Database },
    { name: "Zones & Sectors", path: "/admin/zones", icon: Map },
     { name: "Signals", path: "/admin/signals", icon: Folder },
    { name: "Document Vault", path: "/admin/vault", icon: Folder },
    { name: "Pipeline", path: "/admin/pipeline", icon: Briefcase },
    { name: "Alerts", path: "/admin/alerts", icon: Bell },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart },
    { name: "Audit Logs", path: "/admin/audit", icon: ClipboardList },
    { name: "Settings", path: "/admin/settings", icon: Settings },
   
  ];

  const SidebarContent = () => (
    <div className="w-[240px] h-[1000px] bg-landvista-blue text-white p-5">
      <h2 className="text-2xl font-semibold mb-8">Admin</h2>

      <div className="space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div
              key={i}
              onClick={() => {
                navigate(item.path);
                setOpen(false); // close on mobile
              }}
              className={`flex items-center gap-3 p-3 rounded cursor-pointer transition
                ${
                  isActive
                    ? "bg-white text-[#0f6d8c]"
                    : "hover:bg-white/10"
                }`}
            >
              {Icon && <Icon size={18} />}
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0f6d8c] text-white">
        <h2 className="text-lg font-semibold">Admin</h2>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block h-screen">
        <SidebarContent />
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* OVERLAY */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* SIDEBAR */}
          <div className="w-[240px] h-full">
            <div className="flex justify-end p-3 bg-[#0f6d8c] text-white">
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}