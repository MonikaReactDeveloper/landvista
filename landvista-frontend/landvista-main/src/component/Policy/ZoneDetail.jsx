import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import { ArrowRight, ChevronRight, Map, Shield, Activity, MapPin } from "lucide-react";

export default function ZoneDetail() {
  const { zoneSlug } = useParams();
  const [zone, setZone] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchZoneDetail = async () => {
      try {
        // Fetch all zones to find the right one by slug
        const zoneRes = await api.get("/policy/zones");
        const allZones = zoneRes.data.data || zoneRes.data;
        const currentZone = allZones.find(z => z.slug === zoneSlug);
        
        if (currentZone) {
          setZone(currentZone);
          
          // Fetch sectors for this zone
          const sectorRes = await api.get("/policy/sectors");
          const allSectors = sectorRes.data.data || sectorRes.data;
          const zoneSectors = allSectors.filter(s => 
            s.zone && (s.zone._id === currentZone._id || s.zone === currentZone._id)
          );
          setSectors(zoneSectors);
        }
      } catch (error) {
        console.error("Failed to fetch zone detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchZoneDetail();
  }, [zoneSlug]);

  if (loading) return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-gray-100 border-t-landvista-blue rounded-full animate-spin" />
    </div>
  );

  if (!zone) return <div className="min-h-screen flex items-center justify-center">Zone Not Found</div>;

  return (
    <div className="bg-landvista-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-white py-40 px-6 md:px-10 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <button 
                onClick={() => navigate('/policy-zones')}
                className="text-[10px] font-black text-gray-300 hover:text-landvista-blue uppercase tracking-widest transition-colors"
              >
                Intelligence Zones
              </button>
              <ChevronRight size={12} className="text-gray-200" />
              <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">{zone.name}</span>
            </div>
            <h1 className="text-[56px] font-black text-landvista-blue mb-8 tracking-tighter italic leading-tight uppercase">
              {zone.name}
            </h1>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <MapPin size={14} className="text-landvista-blue" />
                <span className="text-xs font-bold text-landvista-grey uppercase tracking-wider">{zone.location || "Regional Focus"}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <Map size={14} className="text-landvista-blue" />
                <span className="text-xs font-bold text-landvista-grey uppercase tracking-wider">{zone.area || "Strategic Coverage"}</span>
              </div>
            </div>
            <p className="text-landvista-grey text-lg font-medium leading-relaxed opacity-70">
              {zone.description || "Detailed intelligence zone focused on regional policy frameworks and infrastructure developments."}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-[4rem] overflow-hidden border border-gray-100">
                <img 
                    src={zone.imageUrl || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop"} 
                    alt={zone.name}
                    className="w-full h-full object-cover grayscale opacity-80"
                />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-landvista-blue p-10 rounded-[3rem] text-white shadow-2xl">
                <Shield size={40} className="mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Policy Layer</p>
                <p className="text-2xl font-black italic uppercase">Validated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-1.5 h-10 bg-landvista-blue rounded-full" />
            <h2 className="text-3xl font-black text-landvista-blue uppercase tracking-tighter italic">Operational <span className="text-landvista-blue/30">Sectors</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, idx) => (
              <div 
                key={sector._id}
                onClick={() => navigate(`/policy-zones/${zoneSlug}/${sector.slug}`)}
                className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group cursor-pointer"
              >
                {sector.mapImageUrl && (
                  <div className="w-full h-40 mb-6 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={sector.mapImageUrl} alt={sector.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex justify-between items-start mb-6">
                    <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-black text-landvista-blue uppercase tracking-widest">
                        {sector.code}
                    </div>
                    <ArrowRight className="text-gray-200 group-hover:text-landvista-blue transition-colors" />
                </div>
                <h4 className="text-xl font-black text-landvista-blue mb-4 uppercase italic tracking-tight">{sector.name}</h4>
                <div className="flex gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                  <span>Risk: {sector.riskLevel}/5</span>
                  <span>•</span>
                  <span>Confidence: {sector.confidenceLevel}/5</span>
                </div>
                <p className="text-sm text-landvista-grey font-medium leading-relaxed opacity-60 line-clamp-3">
                  {sector.description || "In-depth sector intelligence mapping regional development signals and regulatory alignment."}
                </p>
              </div>
            ))}
            
            {sectors.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
                <p className="text-landvista-grey font-bold italic uppercase tracking-widest opacity-30">No Operational Sectors Indexed</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
