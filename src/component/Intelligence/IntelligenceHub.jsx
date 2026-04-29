
import { useState, useEffect } from "react";
import FilterPanel from "./FilterPanel";
import IntelligenceCard from "./IntelligenceCard";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";


export default function IntelligenceHub() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    zone: "all",
    risk: "all",
  });

  const user = JSON.parse(localStorage.getItem("currentUser"));
const isNDAAccepted = user?.nda_status === "verified";

  useEffect(() => {
    // 🔥 MOCK DATA (replace with API later)
    const mock = [
      {
        id: 1,
        title: "Infrastructure Expansion Signal",
        zone: "Zone A",
        sector: "Industrial",
        confidence: "High",
        risk: "Medium",
        narrative:
          "Infrastructure growth indicates strong medium-term viability.",
        signals: [
          { type: "Policy", strength: "High", source: "Gov Update" },
          { type: "Infra", strength: "Medium", source: "Field Data" },
        ],
      },
    ];

    setData(mock);
  }, []);

  const filtered = data.filter((item) => {
    return (
      (filters.zone === "all" || item.zone === filters.zone) &&
      (filters.risk === "all" || item.risk === filters.risk)
    );
  });

  return (
    <>
    <Navbar/>
    <div className="p-4 md:p-6 bg-landvista-bg min-h-screen">
      <h1 className="text-xl font-semibold mb-4 text-landvista-blue">
        Intelligence Hub
      </h1>

      <FilterPanel filters={filters} setFilters={setFilters} />
{!isNDAAccepted && (
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
    NDA not accepted. Limited preview only.
  </div>
)}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
  {filtered.map((item) => (
    <IntelligenceCard
      key={item.id}
      data={item}
      user={user}
      restricted={!isNDAAccepted}
    />
  ))}
</div>
    </div>
    <Footer/>
 </> );
}