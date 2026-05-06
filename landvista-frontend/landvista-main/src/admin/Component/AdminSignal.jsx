import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Zap, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Globe,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  Radio,
  Gauge,
  Target
} from "lucide-react";

export default function AdminSignal() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Signal",
    zone: "",
    sector: "",
    summary: "",
    sourceName: "",
    riskScore: 1,
    confidenceScore: 3,
    signalType: "Market Shift",
    status: "Published",
    contradictionFlag: false
  });

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    setLoading(true);
    try {
      const response = await api.get("/intelligence");
      // Filter for type 'Signal' if necessary, but here we'll show all and allow filtering
      setSignals(response.data.data || []);
    } catch (error) {
      console.error("Error fetching signals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/intelligence/${editingId}`, formData);
      } else {
        await api.post("/intelligence", formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchSignals();
      resetForm();
    } catch (error) {
      alert("Failed to save signal intelligence");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently purge this intelligence signal?")) {
      try {
        await api.delete(`/intelligence/${id}`);
        fetchSignals();
      } catch (error) {
        alert("Deletion failed");
      }
    }
  };

  const handleEdit = (signal) => {
    setFormData({
      title: signal.title,
      type: signal.type,
      zone: signal.zone,
      sector: signal.sector,
      summary: signal.summary,
      sourceName: signal.sourceName,
      riskScore: signal.riskScore,
      confidenceScore: signal.confidenceScore,
      signalType: signal.signalType,
      status: signal.status,
      contradictionFlag: signal.contradictionFlag
    });
    setEditingId(signal._id);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "Signal",
      zone: "",
      sector: "",
      summary: "",
      sourceName: "",
      riskScore: 1,
      confidenceScore: 3,
      signalType: "Market Shift",
      status: "Published",
      contradictionFlag: false
    });
  };

  const filteredSignals = signals.filter(s => s && (
    (s.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (s.zone?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (s.summary?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  ));

  return (
    <div className="space-y-8 p-2">
      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm gap-6">
        <div className="flex items-center gap-5 w-full lg:w-auto">
          <div className="p-5 bg-landvista-blue text-white rounded-[1.5rem] shadow-xl shadow-landvista-blue/20">
            <Radio className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-landvista-blue tracking-tighter uppercase italic">Signal <span className="text-landvista-blue/40">Intelligence</span></h1>
            <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.3em] mt-1">Real-time market signal validation</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-landvista-blue transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search Intelligence Signals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-landvista-blue outline-none ring-2 ring-transparent focus:ring-landvista-blue/10 transition-all"
            />
          </div>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="bg-landvista-blue text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-opacity-90 transition shadow-2xl shadow-landvista-blue/30 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> NEW SIGNAL
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-40 text-center animate-pulse">
           <Radio className="w-16 h-16 text-gray-100 mx-auto mb-6" />
           <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs italic">Syncing Intelligence Streams...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredSignals.map(signal => (
            <div key={signal._id} className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all relative group overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-landvista-blue/5 text-landvista-blue rounded-full text-[10px] font-black tracking-widest uppercase italic">
                    {signal.zone}
                  </span>
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-black tracking-widest uppercase">
                    {signal.signalType}
                  </span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => handleEdit(signal)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><Edit3 size={16} /></button>
                  <button onClick={() => handleDelete(signal._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>

              <h3 className="text-xl font-black text-landvista-blue mb-3 uppercase tracking-tight italic leading-tight">{signal.title}</h3>
              <p className="text-sm text-landvista-grey font-medium leading-relaxed mb-8 line-clamp-3">{signal.summary}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`w-3 h-3 ${signal.riskScore > 3 ? 'text-red-500' : 'text-orange-400'}`} />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Risk Score</span>
                  </div>
                  <p className="text-lg font-black text-landvista-blue">{signal.riskScore}/5</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-3 h-3 text-green-500" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Confidence</span>
                  </div>
                  <p className="text-lg font-black text-landvista-blue">{signal.confidenceScore}/5</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-landvista-grey" />
                  <span className="text-[10px] font-black text-landvista-blue uppercase tracking-tighter">{signal.sourceName}</span>
                </div>
                <div className={`text-[10px] font-black flex items-center gap-1.5 ${signal.status === 'Published' ? 'text-green-500' : 'text-orange-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${signal.status === 'Published' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
                  {signal.status}
                </div>
              </div>
            </div>
          ))}

          {filteredSignals.length === 0 && (
            <div className="col-span-full py-32 text-center bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-200">
               <Radio className="w-16 h-16 text-gray-200 mx-auto mb-6 opacity-20" />
               <p className="text-gray-300 font-bold uppercase tracking-[0.5em] text-xs">No Signal Intelligence Detected</p>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-landvista-blue/40 backdrop-blur-md">
          <div className="bg-white rounded-[4rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="p-10 bg-landvista-blue text-white flex justify-between items-center relative overflow-hidden flex-shrink-0">
              <Zap className="absolute right-0 top-0 w-40 h-40 text-white/5 -mr-10 -mt-10" />
              <div className="relative z-10">
                <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">{editingId ? 'Edit' : 'New'} <span className="text-white/40 italic">Intelligence</span></h2>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.4em] mt-2">Validated signal ingestion protocol</p>
              </div>
              <button onClick={() => setShowModal(false)} className="bg-white/10 hover:bg-white/20 p-5 rounded-3xl transition relative z-10">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-10 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Signal Title</label>
                    <input 
                      type="text" required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none placeholder:text-gray-300" 
                      placeholder="e.g. Zone L Policy Shift - Infrastructure Phase 2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Zone ID</label>
                      <input 
                        type="text" required
                        value={formData.zone}
                        onChange={(e) => setFormData({...formData, zone: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                        placeholder="Zone L"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Sector ID</label>
                      <input 
                        type="text" required
                        value={formData.sector}
                        onChange={(e) => setFormData({...formData, sector: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                        placeholder="Sector 03"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Signal Narrative (Summary)</label>
                    <textarea 
                      required rows="5"
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-medium text-landvista-blue outline-none leading-relaxed" 
                      placeholder="Detailed intelligence summary..."
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Risk Score (1-5)</label>
                      <input 
                        type="number" min="1" max="5"
                        value={formData.riskScore}
                        onChange={(e) => setFormData({...formData, riskScore: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Confidence Score (1-5)</label>
                      <input 
                        type="number" min="1" max="5"
                        value={formData.confidenceScore}
                        onChange={(e) => setFormData({...formData, confidenceScore: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Source Intelligence Reference</label>
                    <input 
                      type="text" required
                      value={formData.sourceName}
                      onChange={(e) => setFormData({...formData, sourceName: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                      placeholder="e.g. Regulatory Bulletin #224"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Signal Categorization</label>
                    <select 
                      value={formData.signalType}
                      onChange={(e) => setFormData({...formData, signalType: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none appearance-none"
                    >
                      <option>Market Shift</option>
                      <option>Policy Update</option>
                      <option>Infrastructure Signal</option>
                      <option>Early Warning</option>
                    </select>
                  </div>

                  <div className="pt-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all ${formData.contradictionFlag ? 'bg-red-500 border-red-500' : 'border-gray-200'}`}>
                        {formData.contradictionFlag && <X size={16} className="text-white" />}
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={formData.contradictionFlag}
                          onChange={(e) => setFormData({...formData, contradictionFlag: e.target.checked})}
                        />
                      </div>
                      <span className="text-xs font-black text-landvista-blue uppercase tracking-widest">Contradictory Signal Warning</span>
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-8 bg-landvista-blue text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-4">
                <ShieldCheck size={24} /> {editingId ? 'Validate & Update Signal' : 'Execute Signal Intelligence Capture'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}