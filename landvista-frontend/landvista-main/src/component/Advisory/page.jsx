import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Footer from "../homePage/footer";
import Newsletter from "../homePage/newsLetter";
import AdvisoryTrustStrip from "./AdvisoryTrustStrip";
import AdvisoryDetails from "./AdvisoryDetails";

export default function AdvisoryPage() {
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvisories = async () => {
      try {
        const response = await api.get("/advisory");
        setAdvisories(response.data.data || response.data);
      } catch (error) {
        console.error("Failed to fetch advisories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisories();
  }, []);

  if (loading) return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-gray-100 border-t-landvista-blue rounded-full animate-spin" />
      <div className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.5em] animate-pulse">Scanning Advisory Layer</div>
    </div>
  );

  return (
    <>

      {/* ── HERO ── */}
      <section className="relative w-full h-[70vh] min-h-[480px] overflow-hidden flex items-end">

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
          alt="Advisory background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pb-14 md:pb-20">

          {/* Label */}
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50 mb-5">
            TerraSignal — Advisory
          </p>

          {/* Headline */}
          <h1 className="text-[32px] md:text-[48px] lg:text-[58px] font-semibold text-white leading-tight max-w-3xl mb-6">
            Institutional Advisory for Land Decisions
          </h1>

          {/* Subtext */}
          <p className="text-[15px] md:text-[16px] text-white/60 max-w-xl leading-relaxed mb-10">
            TerraSignal provides structured advisory services derived from policy-aligned
            intelligence, verified data inputs, and disciplined decision frameworks.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              onClick={() => navigate("/request-access")}
              className="group inline-flex items-center gap-3 bg-white text-landvista-charcoal px-7 py-3.5 text-[13px] font-semibold hover:bg-landvista-blue hover:text-white transition-all"
            >
              Request Advisory Discussion
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[11px] text-white/35 uppercase tracking-[0.14em]">
              Engagement is initiated post qualification and review
            </p>
          </div>

        </div>
      </section>


      {/* Advisory Cards */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em] mb-12">
            Advisory Services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {advisories.map((adv, idx) => (
              <div
                key={adv._id}
                onClick={() => navigate(`/advisory/${adv.slug || adv.title.toLowerCase().replace(/ /g, '-')}`)}
                className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 bg-landvista-blue/5 rounded-3xl flex items-center justify-center text-landvista-blue group-hover:bg-landvista-blue group-hover:text-white transition-all shadow-sm">
                      {idx % 3 === 0 ? <Shield size={32} /> : idx % 3 === 1 ? <Zap size={32} /> : <Globe size={32} />}
                    </div>
                    <ArrowRight size={24} className="text-gray-200 group-hover:text-landvista-blue transition-all" />
                  </div>
                  <h3 className="text-3xl font-black text-landvista-blue mb-4 tracking-tighter uppercase italic">{adv.title}</h3>
                  <p className="text-landvista-grey text-sm font-medium leading-relaxed mb-8 opacity-60">
                    {adv.subtitle || adv.description?.substring(0, 100) + "..."}
                  </p>
                </div>
                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">
                    {adv.categories?.length || 0} Specializations
                  </span>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest group-hover:text-landvista-blue transition-colors">
                    Initialize Strategy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AdvisoryTrustStrip />
      <Newsletter />
      <AdvisoryDetails />

      <Footer />
    </>
  );
}