import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { getAdminAuth, getAuth } from "../../utils/auth";
import { 
  Briefcase, 
  ChevronRight, 
  MoreVertical, 
  Plus, 
  Search, 
  Target, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  Building2,
  DollarSign,
  User,
  CheckCircle2,
  X,
  Trash2,
  Shield,
  Activity,
  UserCheck,
  Zap
} from "lucide-react";

export default function AdminPipeline() {
  const [mandates, setMandates] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    expectedValue: 1000000,
    dealScore: 50,
    dealGrade: "C",
    stage: "Conversation",
    owner: "",
    founderOverride: false,
    dropOffReason: "",
    nextFollowUpDate: new Date().toISOString().split('T')[0]
  });

  const stages = ["Conversation", "Qualified", "Serious", "Mandate", "Closed", "Dropped"];

  useEffect(() => {
    fetchMandates();
    fetchAdmins();
  }, []);

  const fetchMandates = async () => {
    setLoading(true);
    try {
      const adminAuth = getAdminAuth();
      const userAuth = getAuth();
      const isAdmin = adminAuth?.role === "admin";
      const endpoint = isAdmin ? "/mandates/all" : "/mandates";
      
      const response = await api.get(endpoint);
      setMandates(response.data);
    } catch (error) {
      console.error("Error fetching mandates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await api.get("/auth/me/all");
      const adminUsers = response.data.filter(u => u.role === 'admin');
      setAdmins(adminUsers);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/mandates", formData);
      setShowModal(false);
      fetchMandates();
      resetForm();
    } catch (error) {
      alert("Failed to create mandate");
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", 
      organization: "", 
      expectedValue: 1000000, 
      dealScore: 50, 
      dealGrade: "C",
      stage: "Conversation", 
      owner: "",
      founderOverride: false,
      dropOffReason: "",
      nextFollowUpDate: new Date().toISOString().split('T')[0] 
    });
  };

  const handleDeleteMandate = async (id) => {
    if (window.confirm("Permanently archive this institutional mandate?")) {
      try {
        await api.delete(`/mandates/${String(id)}`);
        fetchMandates();
      } catch (error) {
        alert(error.response?.data?.message || "Deletion failed");
      }
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case "Closed": return "bg-green-100 text-green-700";
      case "Mandate": return "bg-blue-100 text-blue-700";
      case "Serious": return "bg-purple-100 text-purple-700";
      case "Qualified": return "bg-amber-100 text-amber-700";
      case "Dropped": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A": return "bg-green-500 text-white";
      case "B": return "bg-blue-500 text-white";
      case "C": return "bg-gray-400 text-white";
      default: return "bg-gray-200";
    }
  };

  const getSLAColor = (status) => {
    switch (status) {
      case "Breached": return "text-red-500 bg-red-50";
      case "Delayed": return "text-amber-500 bg-amber-50";
      default: return "text-green-500 bg-green-50";
    }
  };

  const filteredMandates = mandates.filter(m => m && (
    (m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (m.investor?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (m._id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) || false)
  ));


  return (
    <div className="space-y-8">
      {/* Search & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm gap-6">
        <div className="flex items-center gap-5">
          <div className="p-5 bg-landvista-blue text-white rounded-[1.5rem] shadow-xl shadow-landvista-blue/20">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-landvista-blue tracking-tighter uppercase italic">Control <span className="text-landvista-blue/40">Pipeline</span></h1>
            <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
              <Shield className="w-3 h-3 text-landvista-blue" /> Institutional War-Room Flow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
            <input 
              type="text"
              placeholder="Search intelligence, mandates, owners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-[1.5rem] p-5 pl-14 text-sm font-bold text-landvista-blue focus:ring-2 focus:ring-landvista-blue/10 outline-none transition-all"
            />
          </div>
          {getAdminAuth()?.role === "admin" && (
            <button 
              onClick={() => setShowModal(true)}
              className="bg-landvista-blue text-white p-5 rounded-[1.5rem] shadow-xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-landvista-blue text-white rounded-3xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Pipeline Value</p>
            <h3 className="text-2xl font-black text-landvista-blue">
              ${(mandates.reduce((acc, m) => acc + (m.expectedValue || 0), 0) / 1000000).toFixed(1)}M
            </h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-3xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">A-Grade Deals</p>
            <h3 className="text-2xl font-black text-landvista-blue">
              {mandates.filter(m => m.dealGrade === 'A').length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-amber-100 text-amber-600 rounded-3xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">SLA Breached</p>
            <h3 className="text-2xl font-black text-red-500">
              {mandates.filter(m => m.slaStatus === 'Breached').length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-red-100 text-red-600 rounded-3xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Dropped</p>
            <h3 className="text-2xl font-black text-landvista-blue">{mandates.filter(m => m.stage === 'Dropped').length}</h3>
          </div>
        </div>
      </div>

      {/* Kanban / Pipeline View */}
      <div className="flex gap-6 overflow-x-auto pb-8 min-h-[600px]">
        {stages.map(stage => (
          <div key={stage} className="min-w-[340px] max-w-[340px] space-y-4">
            <div className="flex justify-between items-center px-4 mb-6">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStageColor(stage).split(' ')[0]}`} />
                <h4 className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">{stage}</h4>
                <span className="text-[10px] font-bold text-gray-300">({filteredMandates.filter(m => m.stage === stage).length})</span>
              </div>
            </div>

            <div className="space-y-4">
              {filteredMandates.filter(m => m.stage === stage).map(mandate => (
                <div key={mandate._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer relative overflow-hidden">
                  {mandate.founderOverride && (
                    <div className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-bl-xl shadow-lg animate-pulse">
                      <Shield size={10} />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${getGradeColor(mandate.dealGrade)}`}>
                        Grade {mandate.dealGrade}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${getSLAColor(mandate.slaStatus)}`}>
                        {mandate.slaStatus}
                      </span>
                    </div>
                    {getAdminAuth()?.role === "admin" && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteMandate(mandate._id); }}
                        className="p-1.5 hover:bg-red-50 rounded text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  
                  <h5 className="font-black text-landvista-blue mb-1 line-clamp-1 group-hover:text-landvista-blue transition-colors uppercase text-sm tracking-tight">{mandate.name}</h5>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-landvista-grey opacity-60 mb-6">
                    <UserCheck className="w-3 h-3 text-landvista-blue" /> Owner: {mandate.owner?.fullName || "Unassigned"}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Expected Value</span>
                      <span className="text-xs font-black text-landvista-blue">${(mandate.expectedValue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full bg-landvista-blue rounded-full" style={{ width: `${mandate.dealScore}%` }} />
                    </div>
                  </div>

                  {mandate.dropOffReason && stage === "Dropped" && (
                    <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-[9px] font-bold text-red-600 uppercase tracking-tighter mb-1">Drop-off Reason</p>
                      <p className="text-[10px] text-red-800 leading-tight italic">"{mandate.dropOffReason}"</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-landvista-blue border-2 border-white flex items-center justify-center text-[8px] font-bold text-white uppercase">
                        {mandate.owner?.fullName?.split(' ').map(n => n[0]).join('') || "?"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-landvista-grey">
                      <Clock className="w-3 h-3" /> Next: {new Date(mandate.nextFollowUpDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {stage === "Conversation" && getAdminAuth()?.role === "admin" && (
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 border-2 border-dashed border-gray-100 rounded-[2rem] text-gray-300 font-bold text-[10px] uppercase tracking-[0.2em] hover:border-landvista-blue hover:text-landvista-blue transition-all flex items-center justify-center gap-2 group"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Mandate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-landvista-blue/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl my-8 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-black text-landvista-blue uppercase tracking-tighter italic">
                Control <span className="text-landvista-blue/40">Module Initialization</span>
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={12} /> Mandate Identity
                    </label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none" 
                      placeholder="e.g. Zone A Portfolio Acquisition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                      <DollarSign size={12} /> Expected Value ($)
                    </label>
                    <input 
                      type="number" required
                      value={formData.expectedValue}
                      onChange={(e) => setFormData({...formData, expectedValue: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                      <User size={12} /> Owner Assignment
                    </label>
                    <select 
                      value={formData.owner}
                      onChange={(e) => setFormData({...formData, owner: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none appearance-none"
                    >
                      <option value="">Select Administrative Owner</option>
                      {admins.map(admin => (
                        <option key={admin._id} value={admin._id}>{admin.fullName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                        <Target size={12} /> Score
                      </label>
                      <input 
                        type="number" required max="100"
                        value={formData.dealScore}
                        onChange={(e) => setFormData({...formData, dealScore: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp size={12} /> Grade
                      </label>
                      <select 
                        value={formData.dealGrade}
                        onChange={(e) => setFormData({...formData, dealGrade: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none"
                      >
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                        <option value="C">Grade C</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} /> SLA Target Date
                    </label>
                    <input 
                      type="date" required
                      value={formData.nextFollowUpDate}
                      onChange={(e) => setFormData({...formData, nextFollowUpDate: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none" 
                    />
                  </div>

                  <div className="pt-4">
                    <label className="flex items-center gap-3 cursor-pointer p-4 bg-red-50 rounded-2xl border border-red-100 group transition-all">
                      <input 
                        type="checkbox"
                        checked={formData.founderOverride}
                        onChange={(e) => setFormData({...formData, founderOverride: e.target.checked})}
                        className="w-5 h-5 accent-red-500"
                      />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                          Founder Override Active
                        </span>
                        <span className="text-[8px] font-bold text-red-400 uppercase tracking-tighter italic">Bypass standard governance protocol</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {formData.stage === "Dropped" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-[10px] font-black text-red-600 uppercase tracking-widest">Drop-off Reason Tracking</label>
                  <textarea 
                    value={formData.dropOffReason}
                    onChange={(e) => setFormData({...formData, dropOffReason: e.target.value})}
                    placeholder="Provide justification for deal drop-off..."
                    className="w-full bg-red-50/30 border border-red-100 rounded-2xl p-4 text-sm font-bold text-landvista-blue outline-none min-h-[100px]"
                  />
                </div>
              )}

              <button type="submit" className="w-full py-5 bg-landvista-blue text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3">
                <Zap size={16} /> Deploy Institutional Mandate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
