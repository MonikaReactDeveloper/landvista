import { useNavigate } from "react-router-dom";
import { Lock, Eye, AlertTriangle, CheckCircle, TrendingUp, ChevronRight } from "lucide-react";

export default function IntelligenceCard({ data, user }) {
  const navigate = useNavigate();
  const isLocked = user?.ndaStatus !== "signed" || 
                  (user?.tier === "Tier 0" || user?.tier === "Tier 1");

  const getRiskColor = (score) => {
    if (score >= 4) return "bg-landvista-maroon";
    if (score >= 3) return "bg-orange-500";
    return "bg-landvista-green";
  };

  return (
    <div 
      onClick={() => navigate(`/intelligence-preview/${data.slug}`)}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-landvista-blue/5 text-landvista-blue rounded-full uppercase tracking-widest border border-landvista-blue/10">
              {data.type}
            </span>
            {data.contradictionFlag && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-landvista-maroon text-white rounded-full uppercase tracking-widest">
                Contradiction
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${getRiskColor(data.riskScore)}`} />
            <span className="text-[10px] font-bold text-landvista-grey uppercase tracking-tighter">
              Risk Level {data.riskScore}/5
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-landvista-blue mb-2 group-hover:text-landvista-slate transition-colors leading-tight">
          {data.title}
        </h3>

        <p className="text-xs font-bold text-landvista-slate uppercase tracking-widest mb-4">
          {data.zone} • {data.sector}
        </p>

        <p className="text-sm text-landvista-charcoal mb-6 leading-relaxed line-clamp-3">
          {data.summary}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 mb-1 text-landvista-grey">
              <CheckCircle className="w-3 h-3 text-landvista-green" />
              <span className="text-[10px] font-bold uppercase">Confidence</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i < data.confidenceScore ? "bg-landvista-green" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 mb-1 text-landvista-grey">
              <TrendingUp className="w-3 h-3 text-landvista-slate" />
              <span className="text-[10px] font-bold uppercase">Trend</span>
            </div>
            <p className="text-xs font-bold text-landvista-blue">{data.trendDirection || "Stable"}</p>
          </div>
        </div>

        {isLocked ? (
          <div className="bg-gray-100/50 p-4 rounded-xl border border-dashed border-gray-200 flex flex-col items-center text-center">
            <Lock className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Narrative analysis locked</p>
            <p className="text-[10px] text-gray-400 mt-1">NDA required for full intelligence access</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-landvista-grey">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Preview Snippet</span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <p className="text-sm text-landvista-charcoal leading-relaxed line-clamp-2">
              {data.narrative}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-landvista-blue/10 flex items-center justify-center text-[10px] font-bold text-landvista-blue">
            {data.sourceName?.charAt(0) || "S"}
          </div>
          <span className="text-[10px] font-bold text-landvista-grey uppercase">{data.sourceName}</span>
        </div>
        <div className="text-[10px] font-black text-landvista-blue flex items-center gap-1 group-hover:gap-2 transition-all">
          EXPLORE INTELLIGENCE <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}