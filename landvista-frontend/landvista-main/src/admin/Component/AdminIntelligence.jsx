import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Plus, Search, Edit2, Trash2, CheckCircle, Send, 
  Archive, Eye, FileText, AlertTriangle, TrendingUp,
  ExternalLink, User, Clock, ShieldCheck
} from "lucide-react";

export default function AdminIntelligence() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const initialForm = {
    title: "",
    type: "Signal", // Signal, Trend, Report
    zone: "",
    sector: "",
    summary: "",
    sourceName: "",
    sourceUrl: "",
    riskScore: 1,
    confidenceScore: 1,
    signalType: "",
    trendDirection: "Stable",
    narrative: "",
    decisionFlag: "Monitor",
    status: "Draft",
    reviewer: "",
    internalNotes: "",
    contradictionFlag: false
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchIntelligence();
  }, []);

  const fetchIntelligence = async () => {
    setLoading(true);
    try {
      const res = await api.get("/intelligence");
      if (res.data.success) {
        setList(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching intelligence:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.sourceName) {
      return alert("Title and Source Name are mandatory.");
    }

    try {
      if (editingId) {
        await api.put(`/intelligence/${editingId}`, form);
      } else {
        await api.post("/intelligence", form);
      }
      resetForm();
      fetchIntelligence();
    } catch (error) {
      console.error("Error saving intelligence:", error);
      alert(error.response?.data?.message || "Failed to save record");
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await api.delete(`/intelligence/${id}`);
      fetchIntelligence();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/intelligence/${id}/status`, { status });
      fetchIntelligence();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const filteredList = list.filter(item => {
    const title = item.title || "";
    const zone = item.zone || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           zone.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <div className="p-8 bg-landvista-bg min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-landvista-blue flex items-center gap-3">
            <ShieldCheck className="text-landvista-slate" /> INTELLIGENCE CMS
          </h1>
          <p className="text-landvista-grey mt-1">Institutional Intelligence Management System</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-landvista-blue focus:border-transparent outline-none w-64 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* ================= FORM SECTION ================= */}
        <div className="xl:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-landvista-blue px-6 py-4">
              <h2 className="text-white font-semibold flex items-center gap-2 text-lg">
                {editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {editingId ? "Edit Intelligence Record" : "Create New Intelligence"}
              </h2>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
              {/* PRIMARY INFO */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-landvista-blue outline-none transition-all" placeholder="Enter intelligence title" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-landvista-blue outline-none">
                      <option>Signal</option>
                      <option>Trend</option>
                      <option>Report</option>
                      <option>Policy Shift</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Signal Type</label>
                    <input name="signalType" value={form.signalType} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" placeholder="Early Warning, etc." />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Zone</label>
                    <input name="zone" value={form.zone} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" placeholder="e.g. Noida Extension" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Sector</label>
                    <input name="sector" value={form.sector} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" placeholder="e.g. Residential" required />
                  </div>
                </div>
              </div>

              {/* SUMMARY & NARRATIVE */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Summary *</label>
                  <textarea name="summary" value={form.summary} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg h-20 resize-none outline-none" placeholder="Brief summary of the intelligence..." required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Full Narrative</label>
                  <textarea name="narrative" value={form.narrative} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg h-32 resize-none outline-none" placeholder="Detailed analysis and evidence..." />
                </div>
              </div>

              {/* SCORES & TRENDS */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-landvista-maroon" /> Risk</label>
                  <input type="number" min="1" max="5" name="riskScore" value={form.riskScore} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider flex items-center gap-1"><CheckCircle className="w-3 h-3 text-landvista-green" /> Confidence</label>
                  <input type="number" min="1" max="5" name="confidenceScore" value={form.confidenceScore} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider flex items-center gap-1"><TrendingUp className="w-3 h-3 text-landvista-slate" /> Trend</label>
                  <select name="trendDirection" value={form.trendDirection} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                    <option>Upward</option>
                    <option>Stable</option>
                    <option>Declining</option>
                  </select>
                </div>
              </div>

              {/* SOURCE VALIDATION */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-landvista-grey uppercase tracking-widest">Source Validation</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input name="sourceName" value={form.sourceName} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" placeholder="Source Organization/Person Name *" required />
                  <input name="sourceUrl" value={form.sourceUrl} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" placeholder="Source URL / Link" />
                </div>
              </div>

              {/* GOVERNANCE */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Decision Flag</label>
                  <select name="decisionFlag" value={form.decisionFlag} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                    <option>Monitor</option>
                    <option>Action Required</option>
                    <option>Strategic Shift</option>
                    <option>Critical Alert</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Reviewer</label>
                  <input name="reviewer" value={form.reviewer} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" placeholder="Assign reviewer" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" name="contradictionFlag" checked={form.contradictionFlag} onChange={handleChange} id="contradiction" className="w-4 h-4 accent-landvista-maroon" />
                <label htmlFor="contradiction" className="text-sm text-landvista-maroon font-medium">Flag as Contradictory Evidence</label>
              </div>

              <div className="space-y-1 pt-4">
                <label className="text-xs font-bold text-landvista-charcoal uppercase tracking-wider">Internal Notes (Governance Only)</label>
                <textarea name="internalNotes" value={form.internalNotes} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg h-20 resize-none outline-none" placeholder="Notes for the review team..." />
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4">
              <button type="submit" className="flex-1 bg-landvista-blue hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/10 active:scale-95">
                {editingId ? "UPDATE RECORD" : "CREATE INTEL"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3 border border-gray-300 text-landvista-grey font-bold rounded-xl hover:bg-white transition-all">
                CANCEL
              </button>
            </div>
          </form>
        </div>

        {/* ================= LIST SECTION ================= */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-landvista-blue flex items-center gap-2 uppercase tracking-wider text-sm">
                <FileText className="w-4 h-4" /> Intelligence Repository ({filteredList.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="p-12 text-center text-landvista-grey animate-pulse">Loading intelligence...</div>
              ) : filteredList.length === 0 ? (
                <div className="p-12 text-center text-landvista-grey">No records found matching your criteria.</div>
              ) : (
                filteredList.map((item) => (
                  <div key={item._id} className="p-6 hover:bg-gray-50 transition-all group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter
                            ${item.status === "Published" ? "bg-landvista-green/10 text-landvista-green border border-landvista-green/20" : 
                              item.status === "Review" ? "bg-landvista-slate/10 text-landvista-slate border border-landvista-slate/20" : 
                              "bg-gray-100 text-gray-500"}`}>
                            {item.status}
                          </span>
                          <span className="text-[10px] font-bold text-landvista-grey bg-gray-100 px-2 py-0.5 rounded-full uppercase">{item.type}</span>
                          {item.contradictionFlag && <span className="text-[10px] font-bold text-white bg-landvista-maroon px-2 py-0.5 rounded-full uppercase">Contradiction</span>}
                        </div>
                        <h3 className="text-lg font-bold text-landvista-blue leading-tight group-hover:text-landvista-slate transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-6 text-xs text-landvista-grey">
                          <span className="flex items-center gap-1 font-medium"><User className="w-3 h-3" /> {item.createdBy}</span>
                          <span className="flex items-center gap-1 font-medium"><Clock className="w-3 h-3" /> {new Date(item.updatedAt).toLocaleDateString()}</span>
                          <span className="text-landvista-slate font-bold uppercase tracking-widest">{item.zone} / {item.sector}</span>
                        </div>
                        <p className="text-sm text-landvista-charcoal line-clamp-2 mt-2 leading-relaxed">{item.summary}</p>
                        
                        <div className="flex gap-4 pt-3 mt-1">
                          <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-landvista-grey uppercase">Risk</span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1.5 h-3 rounded-sm ${i < item.riskScore ? "bg-landvista-maroon" : "bg-gray-200"}`} />
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-landvista-grey uppercase">Confidence</span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1.5 h-3 rounded-sm ${i < item.confidenceScore ? "bg-landvista-green" : "bg-gray-200"}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setViewItem(item)} className="p-2 text-landvista-slate hover:bg-landvista-slate/10 rounded-lg transition-all" title="View Details">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleEdit(item)} className="p-2 text-landvista-blue hover:bg-landvista-blue/10 rounded-lg transition-all" title="Edit Record">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-landvista-maroon hover:bg-landvista-maroon/10 rounded-lg transition-all" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t border-dashed border-gray-100">
                      {item.status === "Draft" && (
                        <button onClick={() => handleStatusUpdate(item._id, "Review")} className="text-[10px] font-bold flex items-center gap-1.5 px-3 py-1.5 bg-landvista-slate text-white rounded-lg hover:brightness-110">
                          <Send className="w-3 h-3" /> SEND FOR REVIEW
                        </button>
                      )}
                      {item.status === "Review" && (
                        <>
                          <button onClick={() => handleStatusUpdate(item._id, "Published")} className="text-[10px] font-bold flex items-center gap-1.5 px-3 py-1.5 bg-landvista-green text-white rounded-lg hover:brightness-110">
                            <CheckCircle className="w-3 h-3" /> PUBLISH
                          </button>
                          <button onClick={() => handleStatusUpdate(item._id, "Draft")} className="text-[10px] font-bold flex items-center gap-1.5 px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:brightness-110">
                            <Edit2 className="w-3 h-3" /> REJECT TO DRAFT
                          </button>
                        </>
                      )}
                      {item.status === "Published" && (
                        <button onClick={() => handleStatusUpdate(item._id, "Archived")} className="text-[10px] font-bold flex items-center gap-1.5 px-3 py-1.5 bg-landvista-charcoal text-white rounded-lg hover:brightness-110">
                          <Archive className="w-3 h-3" /> ARCHIVE
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="bg-landvista-blue p-8 text-white flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="bg-white/20 px-2 py-1 rounded tracking-widest">{viewItem.status}</span>
                  <span className="bg-white/20 px-2 py-1 rounded tracking-widest">{viewItem.type}</span>
                </div>
                <h2 className="text-3xl font-bold">{viewItem.title}</h2>
                <p className="opacity-80 text-sm font-medium">{viewItem.zone} • {viewItem.sector}</p>
              </div>
              <button onClick={() => setViewItem(null)} className="text-white/60 hover:text-white transition-colors">
                <Plus className="w-8 h-8 rotate-45" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[60vh] space-y-8">
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-landvista-grey uppercase tracking-widest mb-2">Summary</h4>
                    <p className="text-landvista-charcoal leading-relaxed">{viewItem.summary}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-landvista-grey uppercase tracking-widest mb-2">Narrative Analysis</h4>
                    <p className="text-landvista-charcoal leading-relaxed whitespace-pre-wrap">{viewItem.narrative || "No detailed narrative provided."}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-landvista-grey uppercase">Risk Score</span>
                      <span className="text-landvista-maroon font-bold text-xl">{viewItem.riskScore}/5</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                      <span className="text-xs font-bold text-landvista-grey uppercase">Confidence</span>
                      <span className="text-landvista-green font-bold text-xl">{viewItem.confidenceScore}/5</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                      <span className="text-xs font-bold text-landvista-grey uppercase">Trend</span>
                      <span className="text-landvista-slate font-bold">{viewItem.trendDirection}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-landvista-grey uppercase tracking-widest mb-2">Source Information</h4>
                    <div className="bg-landvista-bg p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-landvista-blue">{viewItem.sourceName}</p>
                        {viewItem.sourceUrl && (
                          <a href={viewItem.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-landvista-slate flex items-center gap-1 mt-1 hover:underline">
                            Visit Source <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <FileText className="text-landvista-grey w-8 h-8 opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
              {viewItem.internalNotes && (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-yellow-800 uppercase tracking-widest mb-1">Internal Notes</h4>
                  <p className="text-sm text-yellow-900">{viewItem.internalNotes}</p>
                </div>
              )}
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewItem(null)} className="px-8 py-3 bg-landvista-blue text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-blue-900/10">
                CLOSE PREVIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}