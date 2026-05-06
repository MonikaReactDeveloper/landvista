import { Activity, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import { ArrowLeft, ChevronRight, Info, AlertTriangle, CheckCircle2, TrendingUp, BarChart3 } from "lucide-react";

export default function SectorDetail() {
  const { zoneSlug, sectorSlug } = useParams();
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSectorDetail = async () => {
      try {
        const response = await api.get("/policy/sectors");
        const allData = response.data.data || response.data;
        const detail = allData.find(s => s.slug === sectorSlug);
        setSector(detail);
      } catch (error) {
        console.error("Failed to fetch sector detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSectorDetail();
  }, [sectorSlug]);

  if (loading) return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-gray-100 border-t-landvista-blue rounded-full animate-spin" />
    </div>
  );

  if (!sector) return <div className="min-h-screen flex items-center justify-center">Sector Not Found</div>;

  return (
    <div className="bg-landvista-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-40 pb-20 px-6 md:px-10 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => navigate('/policy-zones')}
              className="text-[10px] font-black text-gray-300 hover:text-landvista-blue uppercase tracking-widest transition-colors"
            >
              Policy Zones
            </button>
            <ChevronRight size={12} className="text-gray-200" />
            <button 
              onClick={() => navigate(`/policy-zones/${zoneSlug}`)}
              className="text-[10px] font-black text-gray-300 hover:text-landvista-blue uppercase tracking-widest transition-colors"
            >
              {zoneSlug.replace(/-/g, ' ')}
            </button>
            <ChevronRight size={12} className="text-gray-200" />
            <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">{sector.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-landvista-blue/5 text-landvista-blue rounded-full mb-6">
                <BarChart3 size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{sector.code}</span>
              </div>
              <h1 className="text-[64px] font-black text-landvista-blue mb-8 tracking-tighter italic leading-none uppercase">
                {sector.name}
              </h1>
              <p className="text-landvista-grey text-xl font-medium leading-relaxed opacity-80 max-w-xl">
                {sector.description || "Micro-level intelligence for this strategic sector, providing technical validation and risk-controlled operational data."}
              </p>
            </div>
            {sector.mapImageUrl && (
              <div className="relative group">
                <div className="aspect-video bg-gray-50 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                  <img src={sector.mapImageUrl} alt={sector.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-landvista-blue rounded-full flex items-center justify-center text-white shadow-xl animate-pulse">
                  <TrendingUp size={32} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Intelligence Stats */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm">
            <AlertTriangle className="text-amber-500 mb-6" size={32} />
            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Risk Vector</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-landvista-blue italic uppercase">{sector.riskLevel}/5</span>
              <span className="text-xs font-bold text-landvista-grey mb-1 uppercase">{sector.riskLevel >= 4 ? "Critical" : "Standard"}</span>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm">
            <CheckCircle2 className="text-green-500 mb-6" size={32} />
            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Confidence Score</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-landvista-blue italic uppercase">{sector.confidenceLevel}/5</span>
              <span className="text-xs font-bold text-landvista-grey mb-1 uppercase">Validated</span>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm">
            <Activity className="text-landvista-blue mb-6" size={32} />
            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Development Status</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-landvista-blue italic uppercase">{sector.activationStatus || "Active"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Content */}
      <section className="pb-32 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto bg-white rounded-[4rem] border border-gray-50 shadow-sm p-16">
          <div className="flex items-center gap-4 mb-12">
            <Info className="text-landvista-blue" size={24} />
            <h2 className="text-2xl font-black text-landvista-blue uppercase italic tracking-tight">Intelligence <span className="text-landvista-blue/30">Analysis</span></h2>
          </div>
          <div className="prose prose-lg max-w-none text-landvista-grey font-medium leading-loose opacity-70">
            <p>
              This sector has been identified as a strategic high-priority area within the {zoneSlug.replace(/-/g, ' ')} Intelligence Zone. 
              Our spatial mapping indicates high alignment with regional infrastructure projects and regulatory frameworks.
            </p>
            <p className="mt-6">
              The assigned code <strong>{sector.code}</strong> tracks specific land-use signals and development milestones. 
              Institutional investors should note the confidence score of {sector.confidenceLevel}/5, which reflects high data fidelity and source validation.
            </p>
          </div>
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => navigate('/request-access')}
              className="bg-landvista-blue text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:scale-105 transition-all flex items-center gap-4"
            >
              Request Deep-Dive Intelligence <ArrowLeft className="rotate-180" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
