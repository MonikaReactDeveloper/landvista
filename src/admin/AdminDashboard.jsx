import React from 'react'
import Sidebar from './Component/Sidebar'
// Dashboard.jsx
import StatCard from "./Component/StatCard";
import {
  GraduationCap,
  Video,
  DollarSign,
  BookOpen,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      {/* TOP STATS */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Pending Approvals"
          value="12"
          icon={Users}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Active Users"
          value="342"
          icon={Users}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="NDA Pending"
          value="8"
          icon={BookOpen}
          color="from-orange-500 to-red-500"
        />
        <StatCard
          title="Critical Alerts"
          value="3"
          icon={DollarSign}
          color="from-red-500 to-pink-500"
        />
      </div>

      {/* ALERTS */}
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold mb-3">Critical Alerts</h3>
        <p className="text-sm text-gray-600">
          SLA breach in Pipeline • NDA expired users • Unauthorized attempts
        </p>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>User approved</li>
          <li>NDA accepted</li>
          <li>Document accessed</li>
        </ul>
      </div>

    </div>
  );
}

