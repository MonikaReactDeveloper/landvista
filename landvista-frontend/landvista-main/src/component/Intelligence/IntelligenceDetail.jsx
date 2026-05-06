import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import { 
  ArrowLeft, ChevronRight, ShieldAlert, 
  CheckCircle2, TrendingUp, BarChart3, 
  FileText, Zap, Lock, Globe 
} from "lucide-react";

export default function IntelligenceDetail() {
  const { slug } = useParams();
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const authData = localStorage.getItem("currentUser");
  const user = authData ? JSON.parse(authData) : null;
  const isNDAAccepted = user?.ndaStatus === "signed";

  useEffect(() => {
    const fetchIntelDetail = async () => {
      try {
        const response = await api.get("/intelligence");
        const allData = response.data.data || response.data;
        const detail = allData.find(i => i.slug === slug);
        setIntel(detail);
      } catch (error) {
        console.error("Failed to fetch intelligence detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIntelDetail();
  }, [slug]);

  if (loading) return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-gray-100 border-t-landvista-blue rounded-full animate-spin" />
    </div>
  );

  if (!intel) return <div className="min-h-screen flex items-center justify-center">Intelligence Not Found</div>;

  return (
    <div className="bg-landvista-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-40 pb-20 px-6 md:px-10 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => navigate('/intelligence-preview')}
              className="text-[10px] font-black text-gray-300 hover:text-landvista-blue uppercase tracking-widest transition-colors"
            >
              Intelligence Preview
            </button>
            <ChevronRight size={12} className="text-gray-200" />
            <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">{intel.title}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-red-100">
                    {intel.type}
                 </span>
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    {intel.zone} • {intel.sector}
                 </span>
              </div>
              <h1 className="text-[56px] font-black text-landvista-blue tracking-tighter italic leading-none uppercase">
                {intel.title}
              </h1>
            </div>
            
            <div className="flex gap-4">
                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-center min-w-[140px]">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Risk Level</p>
                    <p className="text-3xl font-black text-landvista-blue italic">{intel.riskScore}/5</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-center min-w-[140px]">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Confidence</p>
                    <p className="text-3xl font-black text-landvista-blue italic">{intel.confidenceScore}/5</p>
                </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
                <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm space-y-8">
                    <div>
                        <h3 className="text-lg font-black text-landvista-blue uppercase tracking-tight italic mb-4">Executive Summary</h3>
                        <p className="text-landvista-grey text-lg font-medium leading-loose opacity-80 italic">
                            "{intel.summary}"
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-black text-landvista-blue uppercase tracking-tight italic mb-6">Strategic Narrative</h3>
                        {isNDAAccepted ? (
                            <div className="prose prose-lg text-landvista-grey font-medium leading-relaxed opacity-70">
                                {intel.narrative || "Full detailed intelligence narrative is available for this published record."}
                            </div>
                        ) : (
                            <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-10">
                                    <Lock size={40} className="text-amber-600 mb-4 animate-bounce" />
                                    <h4 className="text-xl font-black text-amber-900 uppercase italic tracking-tight mb-2">Intelligence Locked</h4>
                                    <p className="text-sm font-medium text-amber-700 max-w-sm">Full narrative analysis and proprietary insights require a signed Non-Disclosure Agreement (NDA).</p>
                                    <button 
                                        onClick={() => navigate('/nda')}
                                        className="mt-6 bg-amber-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-600/20 hover:scale-105 transition-all"
                                    >
                                        Execute NDA to Unlock
                                    </button>
                                </div>
                                <div className="blur-lg select-none opacity-20 pointer-events-none">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <p className="mt-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <div className="bg-landvista-blue p-10 rounded-[3rem] text-white shadow-xl shadow-landvista-blue/20">
                    <Zap size={32} className="mb-6" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Market Signal</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-xs opacity-60">Direction</span>
                            <span className="text-sm font-black italic uppercase">{intel.trendDirection || "Stable"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-xs opacity-60">Signal Strength</span>
                            <span className="text-sm font-black italic uppercase">High</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-xs opacity-60">Source Validity</span>
                            <span className="text-sm font-black italic uppercase">Verified</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                    <Globe size={24} className="text-landvista-blue mb-6" />
                    <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Origin Data</h3>
                    <div className="space-y-2">
                        <p className="text-sm font-black text-landvista-blue uppercase">{intel.sourceName}</p>
                        <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest leading-relaxed">
                            Primary signal captured from institutional regulatory filings and spatial analysis.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
