import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Shield, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  CheckCircle2, 
  FileText, 
  Briefcase,
  Layers,
  Search,
  MoreVertical,
  Activity
} from "lucide-react";

export default function AdminAdvisory() {
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    detail: "",
    categories: [{ title: "", subtitle: "", description: "" }]
  });

  useEffect(() => {
    fetchAdvisories();
  }, []);

  const fetchAdvisories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/advisory");
      const data = response.data.data || response.data;
      setAdvisories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching advisories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (index, e) => {
    const updated = [...formData.categories];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, categories: updated });
  };

  const addCategory = () => {
    setFormData({
      ...formData,
      categories: [...formData.categories, { title: "", subtitle: "", description: "" }]
    });
  };

  const deleteCategory = (index) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/advisory/${formData._id}`, formData);
      } else {
        await api.post("/advisory", formData);
      }
      setShowModal(false);
      fetchAdvisories();
      resetForm();
    } catch (error) {
      alert("Failed to save advisory profile");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently purge this advisory module? This will affect investor-facing expertise cards.")) {
      try {
        await api.delete(`/advisory/${id}`);
        fetchAdvisories();
      } catch (error) {
        console.error("Delete operation failed:", error);
        alert(error.response?.data?.message || "Operation failed. Please verify permissions.");
      }
    }
  };

  const handleEdit = (advisory) => {
    setFormData(advisory);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      detail: "",
      categories: [{ title: "", subtitle: "", description: "" }]
    });
    setIsEditing(false);
  };

  const filteredAdvisories = advisories.filter(a => 
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm gap-8">
        <div className="flex items-center gap-6">
          <div className="p-6 bg-landvista-blue text-white rounded-[2rem] shadow-2xl shadow-landvista-blue/20">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-landvista-blue tracking-tighter uppercase italic">Institutional <span className="text-landvista-blue/40">Advisory</span></h1>
            <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.4em] mt-1 flex items-center gap-2">
              <Activity className="w-3 h-3 text-landvista-blue" /> Expert Capability Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
            <input 
              type="text"
              placeholder="Search capabilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-[1.5rem] p-5 pl-16 text-sm font-bold text-landvista-blue focus:ring-4 focus:ring-landvista-blue/5 outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="bg-landvista-blue text-white p-5 rounded-[1.5rem] shadow-xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* List Grid */}
      {loading ? (
        <div className="py-32 text-center flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-landvista-blue/10 border-t-landvista-blue rounded-full animate-spin mb-6" />
          <p className="text-landvista-grey font-black uppercase tracking-widest text-xs italic">Syncing expertise modules...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredAdvisories.map(advisory => (
            <div key={advisory._id} className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 flex gap-2">
                <button 
                  onClick={() => handleEdit(advisory)}
                  className="p-3 bg-gray-50 hover:bg-landvista-blue hover:text-white rounded-2xl text-landvista-blue transition-all"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(advisory._id)}
                  className="p-3 bg-red-50 hover:bg-red-500 hover:text-white rounded-2xl text-red-500 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-start gap-8 mb-10">
                <div className="w-20 h-20 bg-landvista-blue/5 rounded-[2rem] flex items-center justify-center text-landvista-blue">
                  <Briefcase className="w-10 h-10" />
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-black text-landvista-blue uppercase tracking-tighter italic mb-1">{advisory.title}</h3>
                  <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.2em] opacity-60">{advisory.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-landvista-grey font-medium leading-relaxed mb-10 line-clamp-3">
                {advisory.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 border-t border-gray-50">
                {advisory.categories?.slice(0, 4).map((cat, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-landvista-blue/10 transition-all">
                    <div className="w-2 h-2 rounded-full bg-landvista-blue/40" />
                    <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest truncate">{cat.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-landvista-blue/40 backdrop-blur-md">
          <div className="bg-white rounded-[3.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
            <div className="p-10 bg-landvista-blue text-white flex justify-between items-center relative overflow-hidden">
              <Layers className="absolute right-0 top-0 w-40 h-40 text-white/5 -mr-10 -mt-10" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">
                  {isEditing ? "Update" : "Initialize"} <span className="text-white/40">Advisory Module</span>
                </h2>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.4em] mt-1">Institutional Capability Framework</p>
              </div>
              <button onClick={() => setShowModal(false)} className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition relative z-10">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Module Title</label>
                  <input 
                    type="text" required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                    placeholder="e.g. Strategic Land Acquisition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Expert Subtitle</label>
                  <input 
                    type="text" required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                    placeholder="e.g. End-to-end site intelligence"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Executive Summary</label>
                <textarea 
                  required rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-medium text-landvista-blue outline-none" 
                  placeholder="Provide a high-level overview of this advisory capability..."
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black text-landvista-blue uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-5 h-5" /> Capability Breakdown
                  </h4>
                  <button 
                    type="button" onClick={addCategory}
                    className="text-[10px] font-black text-landvista-blue uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl hover:bg-landvista-blue hover:text-white transition-all"
                  >
                    + Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {formData.categories.map((cat, index) => (
                    <div key={index} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group/cat">
                      <button 
                        type="button" onClick={() => deleteCategory(index)}
                        className="absolute top-6 right-6 p-2 bg-white text-red-500 rounded-lg opacity-0 group-hover/cat:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <input 
                          name="title" placeholder="Category Title"
                          value={cat.title} onChange={(e) => handleCategoryChange(index, e)}
                          className="bg-white border-none rounded-xl p-4 text-xs font-bold text-landvista-blue outline-none"
                        />
                        <input 
                          name="subtitle" placeholder="Short Label"
                          value={cat.subtitle} onChange={(e) => handleCategoryChange(index, e)}
                          className="bg-white border-none rounded-xl p-4 text-xs font-bold text-landvista-blue outline-none"
                        />
                      </div>
                      <textarea 
                        name="description" placeholder="Technical detail..."
                        value={cat.description} onChange={(e) => handleCategoryChange(index, e)}
                        className="w-full bg-white border-none rounded-xl p-4 text-xs font-medium text-landvista-blue outline-none"
                        rows="2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full py-6 bg-landvista-blue text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6" /> {isEditing ? "Update Advisory Framework" : "Finalize Advisory Module"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}