// Topbar.jsx
import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="h-[70px] bg-gradient-to-r from-[#0f6d8c] to-[#1fa2c9] px-6 flex items-center justify-between text-white">

      <div className="flex items-center gap-4 w-full max-w-md bg-white/20 px-4 py-2 rounded">
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none w-full placeholder-white/70"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell />
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  );
}