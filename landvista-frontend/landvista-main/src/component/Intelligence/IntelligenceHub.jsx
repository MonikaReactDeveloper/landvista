import { useState, useEffect } from "react";
import api from "../../utils/api";
import FilterPanel from "./FilterPanel";
import IntelligenceCard from "./IntelligenceCard";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import { ShieldAlert } from "lucide-react";

export default function IntelligenceHub() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    zone: "all",
    risk: "all",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const user = auth?.user;
  const isNDAAccepted = user?.ndaStatus === "signed";


  useEffect(() => {
    const fetchIntelligence = async () => {
      try {
        setLoading(true);
        // Fetch only Published records
        const response = await api.get("/intelligence?status=Published");
        const intelligenceData = response.data.data || [];
        setData(Array.isArray(intelligenceData) ? intelligenceData : []);
      } catch (err) {
        console.error("Failed to fetch intelligence hub data", err);
        setError("Unable to load intelligence data. Please ensure you are logged in.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchIntelligence();
  }, []);

  const filtered = Array.isArray(data) ? data.filter((item) => {
    const zoneMatch = filters.zone === "all" || 
      (item.zone && item.zone.toLowerCase().trim() === filters.zone.toLowerCase().trim());
    
    const riskMatch = filters.risk === "all" || 
      (item.riskScore && item.riskScore.toString() === filters.risk);

    return zoneMatch && riskMatch;
  }) : [];

  return (
    <>
      <Navbar />
      <div className="p-8 md:p-12 bg-landvista-bg min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-landvista-blue mb-2">
              Intelligence Hub
            </h1>
            <p className="text-landvista-grey">Real-time market signals and strategic intelligence</p>
          </div>

          <FilterPanel filters={filters} setFilters={setFilters} data={data} />
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-landvista-blue"></div>
              <p className="mt-4 text-landvista-grey font-medium">Loading strategic intelligence...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl mt-8">
              <ShieldAlert className="w-6 h-6" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {!isNDAAccepted && !loading && !error && (
            <div className="bg-amber-50 border border-amber-100 text-amber-800 p-6 rounded-2xl mb-8 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-xl">🔒</div>
              <div>
                <p className="font-bold">NDA Verification Required</p>
                <p className="text-sm opacity-90 text-amber-700">Full narrative and high-confidence signals are locked. Please complete your NDA to access full intelligence.</p>
              </div>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-landvista-grey font-medium">No matching intelligence found.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filtered.map((item) => (
              <IntelligenceCard
                key={item._id}
                data={item}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}