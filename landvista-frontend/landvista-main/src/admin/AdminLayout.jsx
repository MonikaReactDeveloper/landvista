import React, { useState } from "react";
import Sidebar from "./Component/Sidebar";
import Topbar from "./Component/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-[280px] min-w-0">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 md:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}