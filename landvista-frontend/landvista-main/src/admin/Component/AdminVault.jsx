import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  FileText, 
  Upload, 
  Search, 
  Shield, 
  Eye, 
  Download, 
  MoreVertical, 
  Filter,
  Plus,
  Archive,
  Lock,
  FileCode,
  FileBarChart,
  HardDrive,
  X,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Trash2
} from "lucide-react";

export default function AdminVault() {
  const [documents, setDocuments] = useState([]);
  const [mandates, setMandates] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    fileUrl: "",
    fileType: "application/pdf",
    category: "Legal",
    accessTier: "Tier 3",
    restrictedToMandate: "",
    allowedRoles: [],
    restrictedToUsers: []
  });

  useEffect(() => {
    fetchDocs();
    fetchMandates();
    fetchUsers();
  }, []);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/documents/all");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMandates = async () => {
    try {
      const response = await api.get("/mandates/all");
      setMandates(response.data);
    } catch (error) {
      console.error("Error fetching mandates:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/auth/me/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getFileIcon = (ext) => {
    if (ext?.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (ext?.includes('sheet') || ext?.includes('excel')) return <FileBarChart className="w-5 h-5 text-green-500" />;
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Strip metadata that MongoDB doesn't allow in update bodies
      const { _id, __v, createdAt, updatedAt, auditTrail, ...cleanData } = formData;
      
      const submissionData = {
        ...cleanData,
        fileName: formData.title + ".pdf",
        // Convert empty string to null for valid MongoDB ObjectId casting
        restrictedToMandate: formData.restrictedToMandate || null 
      };

      if (isEditing) {
        await api.put(`/documents/${formData._id}`, submissionData);
      } else {
        await api.post("/documents", submissionData);
      }
      setShowModal(false);
      fetchDocs();
      setFormData({ title: "", fileUrl: "", fileType: "application/pdf", category: "Legal", accessTier: "Tier 3", restrictedToMandate: "", allowedRoles: [], restrictedToUsers: [] });
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to save institutional asset: " + (error.response?.data?.message || "Check required fields"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this institutional asset?")) {
      try {
        await api.delete(`/documents/${id}`);
        fetchDocs();
      } catch (error) {
        console.error("Delete operation failed:", error);
        alert(error.response?.data?.message || "Operation failed. Please verify permissions.");
      }
    }
  };

  const handleEdit = (doc) => {
    setFormData(doc);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm gap-6">
        <div className="flex items-center gap-5">
          <div className="p-5 bg-landvista-blue text-white rounded-[1.5rem] shadow-xl shadow-landvista-blue/20">
            <HardDrive className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-landvista-blue tracking-tighter">Document Vault</h1>
            <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
              <Lock className="w-3 h-3 text-landvista-blue" /> Institutional Data Repository
            </p>
          </div>
        </div>
        <button 
          onClick={() => { setIsEditing(false); setFormData({ title: "", fileUrl: "", fileType: "application/pdf", category: "Legal", accessTier: "Tier 3", restrictedToMandate: "", allowedRoles: [], restrictedToUsers: [] }); setShowModal(true); }}
          className="bg-landvista-blue text-white px-10 py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-opacity-90 transition shadow-2xl shadow-landvista-blue/30 flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" /> UPLOAD ASSET
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center animate-pulse">
          <FileText className="w-12 h-12 text-gray-100 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Decentralizing document storage...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {documents.map(doc => (
            <div key={doc._id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-landvista-blue group-hover:text-white transition-colors">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex gap-1 transition-opacity">
                  <button 
                    onClick={() => handleEdit(doc)} 
                    className="p-2 bg-blue-50 hover:bg-landvista-blue hover:text-white rounded-lg text-landvista-blue transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc._id)} 
                    className="p-2 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest bg-blue-100 text-blue-600">
                    {doc.accessTier}
                  </span>
                  {doc.restrictedToMandate && (
                    <span className="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest bg-amber-100 text-amber-600">
                      MANDATE LOCK
                    </span>
                  )}
                  {doc.restrictedToUsers?.length > 0 && (
                    <span className="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest bg-purple-100 text-purple-600">
                      USER LOCK
                    </span>
                  )}
                  {doc.allowedRoles?.length > 0 && (
                    <span className="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest bg-teal-100 text-teal-600">
                      ROLE LOCK
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-landvista-blue line-clamp-1 mb-1 uppercase tracking-tight">{doc.title}</h3>
                <p className="text-[10px] font-bold text-landvista-grey uppercase opacity-50 tracking-tighter">{doc.category} • {doc.fileSize || '0 KB'}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-50">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-landvista-grey">
                  <span>Audit Trail</span>
                  <span className="text-landvista-blue">{doc.auditTrail?.length || 0} Events</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <a 
                  href={doc.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-50 hover:bg-landvista-blue hover:text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> VIEW
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-landvista-blue/40 backdrop-blur-sm">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-black text-landvista-blue uppercase tracking-tighter italic">
                {isEditing ? "Update" : "Upload"} <span className="text-landvista-blue/40">Institutional Asset</span>
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Asset Title</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue focus:ring-2 focus:ring-landvista-blue/10 outline-none" 
                    placeholder="e.g. Master Zoning Policy"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Upload PDF Asset</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.xlsx"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        
                        const uploadData = new FormData();
                        uploadData.append("vault", file);
                        
                        try {
                          const res = await api.post("/documents/upload", uploadData, {
                            headers: { "Content-Type": "multipart/form-data" }
                          });
                          setFormData({
                            ...formData, 
                            fileUrl: res.data.fileUrl,
                            fileType: res.data.fileType,
                            fileSize: res.data.fileSize
                          });
                        } catch (err) {
                          alert("Upload failed. Verify server is running on Port 5000.");
                        }
                      }}
                      className="hidden" 
                      id="file-upload"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-sm font-bold text-landvista-blue flex items-center justify-center gap-3 cursor-pointer hover:border-landvista-blue hover:bg-landvista-blue/5 transition-all"
                    >
                      <Upload className="w-5 h-5" />
                      {formData.fileUrl ? "FILE ATTACHED" : "CHOOSE DOCUMENT"}
                    </label>
                    {formData.fileUrl && (
                      <p className="text-[9px] font-black text-green-600 mt-2 flex items-center gap-1 uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" /> Successfully Staged for Repository
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Access Tier</label>
                  <select 
                    value={formData.accessTier}
                    onChange={(e) => setFormData({...formData, accessTier: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none"
                  >
                    <option>Tier 1</option>
                    <option>Tier 2</option>
                    <option>Tier 3</option>
                    <option>Tier 4</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none"
                  >
                    <option>Legal</option>
                    <option>Financial</option>
                    <option>Technical</option>
                    <option>Identity</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Restrict to Mandate</label>
                  <select 
                    value={formData.restrictedToMandate}
                    onChange={(e) => setFormData({...formData, restrictedToMandate: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none"
                  >
                    <option value="">Public (Within Tier)</option>
                    {mandates.map(m => (
                      <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Allowed Roles (Leave blank for all)</label>
                  <select 
                    multiple
                    value={formData.allowedRoles || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData({...formData, allowedRoles: selected});
                    }}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none h-32"
                  >
                    <option value="user">User</option>
                    <option value="investor">Investor</option>
                    <option value="founder">Founder</option>
                    <option value="analyst">Analyst</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Restrict to Specific Users</label>
                  <select 
                    multiple
                    value={formData.restrictedToUsers || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData({...formData, restrictedToUsers: selected});
                    }}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none h-32"
                  >
                    {users.map(u => (
                      <option key={u._id} value={u._id}>{u.fullName} ({u.email})</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-landvista-blue text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all"
              >
                {isEditing ? "Update Institutional Asset" : "Finalize Institutional Upload"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}