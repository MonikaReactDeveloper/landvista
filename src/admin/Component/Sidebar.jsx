import { LayoutDashboard, Book, Users, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { name: "Insights", icon: Book, path: "/admin-insights" },
    { name: "Services", icon: Briefcase, path: "/admin-services" },
    { name: "Users", icon: Users, path: "/admin-users" },
  ];

  return (
    <div className="w-[240px] bg-[#0f6d8c] text-white p-5 hidden md:block">
      <h2 className="text-2xl font-semibold mb-8">Admin</h2>

      <div className="space-y-4">
        {menu.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer"
            >
              <Icon size={18} />
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
    
  );
}