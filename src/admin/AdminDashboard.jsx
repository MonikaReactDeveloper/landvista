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
  const stats = [
    {
      title: "Land Data",
      value: "3162",
      icon: GraduationCap,
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Investor data",
      value: "277",
      icon: Video,
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Blogs",
      value: "456",
      icon: DollarSign,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Insights",
      value: "61",
      icon: BookOpen,
      color: "from-orange-400 to-red-400",
    },
    {
      title: "Active user",
      value: "3",
      icon: Users,
      color: "from-rose-400 to-pink-400",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {stats.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
}

