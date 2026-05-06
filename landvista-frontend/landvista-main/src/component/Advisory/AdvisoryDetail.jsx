import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import { ArrowRight, ChevronRight, Layout, ShieldCheck, Target, Activity } from "lucide-react";

export default function AdvisoryDetail() {
  const { slug } = useParams();
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvisoryDetail = async () => {
      try {
        const response = await api.get("/advisory");
        const allData = response.data.data || response.data;
        const detail = allData.find(a => a.slug === slug || a.title.toLowerCase().replace(/ /g, '-') === slug);
        setAdvisory(detail);
      } catch (error) {
        console.error("Failed to fetch advisory detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisoryDetail();
  }, [slug]);

  if (loading) return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-gray-100 border-t-landvista-blue rounded-full animate-spin" />
    </div>
  );

  if (!advisory) return <div className="min-h-screen flex items-center justify-center">Advisory Not Found</div>;

  return (
    <div className="bg-landvista-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-white py-40 px-6 md:px-10 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <button 
                onClick={() => navigate('/advisory')}
                className="text-[10px] font-black text-gray-300 hover:text-landvista-blue uppercase tracking-widest transition-colors"
              >
                Advisory Hub
              </button>
              <ChevronRight size={12} className="text-gray-200" />
              <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">{advisory.title}</span>
            </div>
            <h1 className="text-[56px] font-black text-landvista-blue mb-8 tracking-tighter italic leading-tight uppercase">
              {advisory.title}
            </h1>
            <p className="text-landvista-grey text-lg font-medium leading-relaxed opacity-70">
              {advisory.description || "In-depth institutional guidance tailored for complex real estate acquisitions and strategic positioning."}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-[4rem] overflow-hidden border border-gray-100">
                <img 
                    src={advisory.bannerImageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"} 
                    alt={advisory.title}
                    className="w-full h-full object-cover grayscale opacity-80"
                />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-landvista-blue p-10 rounded-[3rem] text-white shadow-2xl">
                <Activity size={40} className="mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Strategy Level</p>
                <p className="text-2xl font-black italic uppercase">Institutional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-1.5 h-10 bg-landvista-blue rounded-full" />
            <h2 className="text-3xl font-black text-landvista-blue uppercase tracking-tighter italic">Expert <span className="text-landvista-blue/30">Specialisations</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisory.categories?.map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/advisory/${slug}/${cat.slug || cat.title.toLowerCase().replace(/ /g, '-')}`)}
                className="bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-gray-50 rounded-2xl text-landvista-blue group-hover:bg-landvista-blue group-hover:text-white transition-all">
                        {idx % 2 === 0 ? <ShieldCheck size={28} /> : <Target size={28} />}
                    </div>
                    <ArrowRight className="text-gray-200 group-hover:text-landvista-blue transition-colors" />
                </div>
                <h4 className="text-2xl font-black text-landvista-blue mb-4 uppercase italic tracking-tight">{cat.title}</h4>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">{cat.subtitle || "Institutional Specialisation"}</p>
                <p className="text-sm text-landvista-grey font-medium leading-relaxed opacity-60 line-clamp-3">
                  {cat.description || "Providing deep-domain expertise and risk-controlled analysis for this strategic advisory category."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
