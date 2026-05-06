import { Search, Bell, LogOut, Menu } from "lucide-react";
import { adminLogout, getAdminAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin-login");
  };

  const adminAuth = getAdminAuth();
  const user = adminAuth?.user || { fullName: "Admin" };

  return (
    <div className="h-[80px] bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-50 rounded-xl text-landvista-blue md:hidden"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden sm:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 focus-within:border-landvista-blue transition-all w-64 lg:w-96">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search Intelligence..."
            className="bg-transparent outline-none w-full text-sm font-medium text-landvista-blue"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button className="p-3 hover:bg-gray-50 rounded-2xl text-landvista-grey relative transition-all">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        <div className="flex items-center gap-3 pl-2 md:pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest opacity-40">Master Admin</p>
            <p className="text-xs font-bold text-landvista-grey uppercase tracking-tight">{user.fullName}</p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user.fullName}&background=0F2A44&color=fff`}
            className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm"
            alt="Admin"
          />
        </div>
      </div>
    </div>
  );
}