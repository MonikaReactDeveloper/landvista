// AdminLayout.jsx
import React from "react";
import Sidebar from "./Component/Sidebar";
import Topbar from "./Component/Topbar";
import AdminDashboard from "./AdminDashboard";


export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 overflow-y-auto">
          <AdminDashboard />
        </div>
      </div>

    </div>
  );
}