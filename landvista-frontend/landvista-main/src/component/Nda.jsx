import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { setAuth, getAuth } from "../utils/auth";
import { 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  AlertCircle, 
  ExternalLink,
  Lock,
  CheckCircle2
} from "lucide-react";

export default function Nda() {
  const [currentNda, setCurrentNda] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentNda();
  }, []);

  const fetchCurrentNda = async () => {
    try {
      const response = await api.get("/nda/current");
      setCurrentNda(response.data);
    } catch (error) {
      console.error("Failed to fetch current NDA:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!accepted) return;
    
    setSubmitting(true);
    try {
      await api.post("/nda/accept");
      
      // 🛡️ Sync with Consolidated Auth Utility
      const auth = getAuth();
      if (auth && auth.user) {
        // Update both nested user and legacy key for full compatibility
        auth.user.ndaStatus = "signed";
        setAuth(auth);
        
        // Also update legacy key
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
          user.ndaStatus = "signed";
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
      }

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to sign NDA. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-landvista-blue mb-4"></div>
        <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest italic">Authenticating legal framework...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-landvista-blue/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-landvista-blue/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="max-w-3xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl border border-gray-100 flex items-center justify-center mx-auto text-landvista-blue">
            <ShieldCheck size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-landvista-blue uppercase tracking-tighter italic">Institutional <span className="text-landvista-blue/40">Compliance</span></h1>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.4em]">Non-Disclosure Agreement</p>
          </div>
        </div>

        {/* NDA Content Card */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
          <div className="p-10 space-y-8">
            <div className="flex justify-between items-start border-b border-gray-50 pb-8">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-landvista-blue uppercase tracking-tight">{currentNda?.title || "Master Agreement"}</h2>
                <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-green-500" /> Version: {currentNda?.version || "Institutional Master"}
                </p>
              </div>
              {currentNda?.fileUrl && (
                <a 
                  href={currentNda.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 hover:bg-landvista-blue hover:text-white p-4 rounded-2xl transition-all flex items-center gap-3 text-landvista-blue"
                >
                  <FileText size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">View Full PDF</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            <div className="prose prose-sm max-w-none">
              <div className="h-64 overflow-y-auto pr-6 space-y-6 custom-scrollbar text-sm font-medium text-landvista-grey leading-relaxed">
                {currentNda?.content ? (
                  <p className="whitespace-pre-line">{currentNda.content}</p>
                ) : (
                  <div className="space-y-6">
                    <p>This platform provides access to highly confidential institutional land intelligence, policy signals, and infrastructure data. By proceeding, you (the "Participant") agree to the following terms:</p>
                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 space-y-4">
                      <div className="flex gap-4">
                        <Lock className="w-5 h-5 text-landvista-blue shrink-0" />
                        <p className="text-xs text-landvista-blue font-bold uppercase tracking-wide">Strict Confidentiality</p>
                      </div>
                      <p className="text-xs leading-relaxed">The Participant shall not disclose, reproduce, or distribute any data obtained from the LandVista platform to any third party without express written consent from the Platform Administrators.</p>
                    </div>
                    <p>Your access is logged and watermarked. Any breach of this agreement will result in immediate termination of access and potential legal action under the governing laws of the jurisdiction.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50">
              <label className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="w-6 h-6 rounded-lg border-2 border-gray-200 checked:bg-landvista-blue checked:border-landvista-blue transition-all appearance-none cursor-pointer"
                  />
                  {accepted && <CheckCircle2 className="absolute inset-0 m-auto text-white w-4 h-4" />}
                </div>
                <span className="text-xs font-bold text-landvista-blue uppercase tracking-widest group-hover:opacity-70 transition-opacity">
                  I accept the institutional terms and conditions of access
                </span>
              </label>
            </div>
          </div>

          <div className="p-8 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3 text-landvista-grey opacity-50">
              <AlertCircle size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Legally Binding Signature Required</span>
            </div>
            <button
              disabled={!accepted || submitting}
              onClick={handleAccept}
              className={`
                px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3
                ${accepted 
                  ? "bg-landvista-blue text-white shadow-xl shadow-landvista-blue/20 hover:-translate-y-1" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              `}
            >
              {submitting ? "Processing..." : (
                <>Sign and Continue <ChevronRight size={18} /></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
          Secured by LandVista Institutional Guard
        </p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #003366;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}