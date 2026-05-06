import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  FileText, 
  Upload, 
  History, 
  CheckCircle2, 
  Archive, 
  AlertTriangle,
  Plus,
  Users,
  Eye,
  Calendar,
  RotateCcw,
  X,
  ExternalLink
} from "lucide-react";

export default function AdminNDA() {
  const [ndas, setNdas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentNda, setCurrentNda] = useState(null);

  useEffect(() => {
    fetchNDAs();
  }, []);

  const fetchNDAs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/nda/all-versions");
      setNdas(response.data);
    } catch (error) {
      console.error("Error fetching NDAs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Ensure boolean is handled correctly for FormData
    formData.set("reAcceptanceRequired", e.target.reAcceptanceRequired.checked);

    try {
      await api.post("/nda/create-version", formData);
      setShowModal(false);
      fetchNDAs();
    } catch (error) {
      alert("Failed to create NDA version");
    }
  };


  const handleActivate = async (id) => {
    if (!window.confirm("Activating this version will archive the previous master NDA. Continue?")) return;
    try {
      await api.post(`/nda/activate/${id}`);
      fetchNDAs();
    } catch (error) {
      alert("Activation failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm gap-6">
        <div className="flex items-center gap-5">
          <div className="p-5 bg-landvista-blue text-white rounded-[1.5rem] shadow-xl shadow-landvista-blue/20">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-landvista-blue tracking-tighter">NDA Governance</h1>
            <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
              <History className="w-3 h-3" /> Institutional Version Control
            </p>
          </div>
        </div>
        <button 
          onClick={() => { setCurrentNda(null); setShowModal(true); }}
          className="bg-landvista-blue text-white px-10 py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-opacity-90 transition shadow-2xl shadow-landvista-blue/30 flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" /> NEW VERSION
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse">
          <FileText className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Authenticating legal framework...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ndas.map(nda => (
            <div key={nda._id} className={`bg-white rounded-[2.5rem] p-10 border-2 transition-all relative overflow-hidden group ${nda.status === 'Active' ? 'border-landvista-blue shadow-2xl shadow-landvista-blue/5' : 'border-gray-100 opacity-70 hover:opacity-100'}`}>
              {nda.status === 'Active' && (
                <div className="absolute top-0 right-0 p-6">
                  <span className="flex items-center gap-1 bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-green-500/30">
                    <CheckCircle2 className="w-3 h-3" /> CURRENT MASTER
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 text-[10px] font-black text-landvista-grey uppercase tracking-widest mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-lg">VER {nda.version}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> EF: {new Date(nda.effectiveDate).toLocaleDateString()}</span>
              </div>
              
              <h3 className="text-2xl font-black text-landvista-blue mb-4 uppercase tracking-tighter italic">{nda.title}</h3>
              <p className="text-sm text-landvista-grey mb-8 line-clamp-2 font-medium leading-relaxed">
                {nda.content || "Institutional Non-Disclosure Agreement governing proprietary data access."}
              </p>

              {nda.fileUrl && (
                <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500" />
                    <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Master PDF Attached</span>
                  </div>
                  <a href={nda.fileUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white rounded-lg transition-colors">
                    <ExternalLink size={14} className="text-landvista-blue" />
                  </a>
                </div>
              )}

              <div className="flex gap-4">
                <button className="flex-1 bg-white border-2 border-landvista-blue text-landvista-blue py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> PREVIEW
                </button>
                {nda.status !== 'Active' && (
                  <button 
                    onClick={() => handleActivate(nda._id)}
                    className="flex-1 bg-landvista-blue text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition shadow-lg shadow-landvista-blue/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> ACTIVATE
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NDA Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-landvista-blue/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 bg-landvista-blue text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-widest italic">Architect <span className="text-white/40">Legal</span></h2>
                <p className="text-[10px] font-bold opacity-60 tracking-widest uppercase mt-1">Deploy institutional framework</p>
              </div>
              <button onClick={() => setShowModal(false)} className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Title</label>
                  <input name="title" required className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none font-bold text-landvista-blue" placeholder="Master NDA 2024" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Version ID</label>
                  <input name="version" required className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none font-bold text-landvista-blue" placeholder="e.g. V2.1.4" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Upload Master NDA (PDF Only)</label>
                <div className="relative">
                  <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-landvista-blue" />
                  <input 
                    type="file"
                    name="nda" 
                    accept=".pdf"
                    required
                    className="w-full bg-gray-50 border-none p-4 pl-12 rounded-2xl outline-none font-bold text-landvista-blue file:hidden" 
                  />
                </div>
              </div>


              <div className="space-y-2">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Legal Narrative (Internal)</label>
                <textarea name="content" rows="4" className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none text-sm font-medium text-landvista-blue" placeholder="Summary of changes in this version..."></textarea>
              </div>

              <div className="flex items-center justify-between p-6 bg-amber-50 border-2 border-amber-100 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-amber-700 uppercase tracking-widest">Global Re-acceptance</p>
                    <p className="text-[10px] text-amber-600 font-bold opacity-70 mt-0.5">Require all institutional users to re-sign</p>
                  </div>
                </div>
                <input type="checkbox" name="reAcceptanceRequired" className="w-6 h-6 accent-amber-500 rounded-lg cursor-pointer" />
              </div>

              <button type="submit" className="w-full py-5 bg-landvista-blue text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all">
                Publish Legal Framework
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}