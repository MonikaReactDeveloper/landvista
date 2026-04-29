
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../homePage/navbar";
import Overview from "./Overview";
import InsightList from "./InsightList";
import MarketReports from "./MarketReports";
import ResearchTeam from "./ResearchTeam";
import InsightsSection from "../homePage/insights";
import Footer from "../homePage/footer";
import Newsletter from "../homePage/newsLetter";
import InsightsListPage from "./insightListPage";
import Breadcrumbs from "../homePage/Breadcrumbs";

const tabs = [
  { name: "Overview", id: "overview" },
  { name: "Insights", id: "insights" },
  { name: "Market Reports", id: "market-reports" },
  { name: "Research Team", id: "research-team" },
];

export default function InsightsPage() {
 const [activeTab, setActiveTab] = useState("overview");

// On first load
useEffect(() => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    setActiveTab(hash);
  }
}, []);
  // Update URL on click
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.replace("#", "");
    setActiveTab(hash || "overview");
  };

  window.addEventListener("hashchange", handleHashChange);

  return () => window.removeEventListener("hashchange", handleHashChange);
}, []);
const handleTabClick = (id) => {
  window.location.hash = id; // ✅ URL changes
};
const renderContent = () => {
  switch (activeTab) {
    case "overview":
      return <Overview />;
    case "insights":
      return <InsightsListPage />;
    case "market-reports":
      return <MarketReports />;
    case "research-team":
      return <ResearchTeam />;
    default:
      return <Overview />;
  }
};
  return (<>
    <Navbar/>
    <Breadcrumbs/>
    <div className="w-full">

      {/* ================= HERO ================= */}
      <section className="bg-landvista-bg">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10">

          {/* TOP ROW */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* TITLE */}
            <h1 className="text-[32px] md:text-[44px] font-semibold">
              Insights & Research
            </h1>

            {/* SEARCH */}
           
          </div>

          {/* SOCIAL (optional) */}
          <div className="flex gap-4 mt-4 text-sm opacity-80">
            <span>f</span>
            <span>x</span>
            <span>in</span>
            <span>✉</span>
          </div>

        </div>

        {/* HERO IMAGE */}
        <div className="w-full h-[220px] md:h-[320px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Insights"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TABS */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex gap-6 border-b border-white/20">

           {tabs.map((tab) => (
  <button
    key={tab.id}
    onClick={() => handleTabClick(tab.id)}
    className={`pb-3 text-sm ${
      activeTab === tab.id
        ? "text-landvista-blue text-bold border-b-2 border-green-400"
        : "text-landvista-muted hover:text-landvista-blue transition"
    }`}
  >
    {tab.name}
  </button>
))}

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
<section className="bg-landvista-bg py-16 md:py-24">
  <div className="max-w-6xl mx-auto px-6 md:px-10">

    {window.location.hash ? (
      renderContent()
    ) : (
      <div>
        {/* DEFAULT /insights PAGE */}
        <h2 className="text-2xl font-semibold mb-4">
          Insights 
        </h2>
        <p className="text-landvista-grey mb-6">
         Make informed business decisions based on actionable insights from the most sophisticated research and thought leadership platform in commercial real estate.
        </p>
<InsightsSection/>
<Newsletter/>
 <h2 className="text-2xl font-semibold mb-4">
          Explore More Insights
        </h2>
        <InsightList/>
        {/* Example cards */}
        <div className="grid md:grid-cols-3 gap-6 py-4">
          {[1,2,3].map((item) => (
            <div key={item} className="bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Featured Insight</h3>
              <p className="text-sm text-gray-600">
                Summary of featured content.
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

  </div>
</section>
 
    </div>
    <Footer/>
  </>);
}