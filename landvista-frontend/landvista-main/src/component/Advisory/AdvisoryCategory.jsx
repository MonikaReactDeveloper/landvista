import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import { ArrowLeft, CheckCircle2, ChevronRight, Lock, PlayCircle, Layers } from "lucide-react";

export default function AdvisoryCategory() {
  const { slug, categorySlug } = useParams();
  const [category, setCategory] = useState(null);
  const [advisoryTitle, setAdvisoryTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await api.get("/advisory");
        const allData = response.data.data || response.data;
        const advisory = allData.find(a => a.slug === slug || a.title.toLowerCase().replace(/ /g, '-') === slug);
        
        if (advisory) {
            setAdvisoryTitle(advisory.title);
            const cat = advisory.categories.find(c => c.slug === categorySlug || c.title.toLowerCase().replace(/ /g, '-') === categorySlug);
            setCategory(cat);
        }
      } catch (error) {
        console.error("Failed to fetch category detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryDetail();
  }, [slug, categorySlug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Layer...</div>;
  if (!category) return <div className="min-h-screen flex items-center justify-center">Category Not Found</div>;

  return (
    <div className="bg-landvista-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-landvista-bg py-40 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <button 
              onClick={() => navigate(`/advisory/${slug}`)}
              className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-landvista-blue uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={12} /> {advisoryTitle}
            </button>
            <ChevronRight size={12} className="text-gray-200" />
            <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">{category.title}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-landvista-blue/5 text-landvista-blue rounded-xl">
                        <Layers size={20} />
                    </div>
                    <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">{category.subtitle || "Intelligence Layer"}</p>
                </div>
                <h1 className="text-[48px] md:text-[64px] font-black text-landvista-blue mb-10 tracking-tighter italic leading-tight uppercase">
                    {category.title}
                </h1>
                <div className="prose prose-lg text-landvista-grey font-medium leading-relaxed opacity-80">
                    {category.description || "Detailed expert analysis and institutional strategy formulation for this specific advisory branch."}
                </div>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        "Institutional Risk Mapping",
                        "Data-Led Decision Control",
                        "Portfolio Optimization",
                        "Strategic Alignment"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-50">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span className="text-xs font-bold text-landvista-blue uppercase tracking-tight">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:col-span-4">
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl sticky top-40">
                    <h3 className="text-xl font-black text-landvista-blue mb-6 uppercase italic tracking-tight">Access Control</h3>
                    <div className="space-y-6 mb-10">
                        <div className="flex items-center justify-between py-4 border-b border-gray-50">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Security Level</span>
                            <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">High Trust</span>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-gray-50">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Validation</span>
                            <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Required</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/request-access')}
                        className="w-full py-5 bg-landvista-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:-translate-y-1 transition-all shadow-xl shadow-landvista-blue/20"
                    >
                        Initialize Request <Lock size={14} />
                    </button>
                    <p className="mt-6 text-[9px] text-center text-gray-300 font-bold uppercase tracking-widest leading-loose">
                        Platform access is subject to institutional review and NDA signature.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
