import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Shield, 
  Plus, 
  Edit3, 
  Trash2, 
  Lock, 
  Settings, 
  CheckSquare,
  Globe,
  Database,
  Users,
  Layout
} from "lucide-react";

export default function AdminRBAC() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const modules = ["Geography", "Users", "Intelligence", "NDA", "Vault", "Pipeline", "Alerts", "Analytics", "Settings"];
  const actions = ["CREATE", "READ", "UPDATE", "DELETE", "APPROVE", "ARCHIVE"];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await api.get("/rbac/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleModule = (module) => {
    const prevModules = currentRole?.allowedModules || [];
    const newModules = prevModules.includes(module) 
      ? prevModules.filter(m => m !== module)
      : [...prevModules, module];
    setCurrentRole({...currentRole, allowedModules: newModules});
  };

  const handleToggleAction = (action) => {
    const prevActions = currentRole?.allowedActions || [];
    const newActions = prevActions.includes(action) 
      ? prevActions.filter(a => a !== action)
      : [...prevActions, action];
    setCurrentRole({...currentRole, allowedActions: newActions});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentRole?._id) {
        await api.put(`/rbac/roles/${currentRole._id}`, currentRole);
      } else {
        await api.post("/rbac/roles", currentRole);
      }
      setShowModal(false);
      fetchRoles();
    } catch (error) {
      alert("Failed to save role");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-landvista-blue text-white rounded-3xl shadow-lg shadow-landvista-blue/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-landvista-blue tracking-tight">Access Matrix</h1>
            <p className="text-landvista-grey text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Role-Based Access Control Configuration</p>
          </div>
        </div>
        <button 
          onClick={() => { setCurrentRole({ name: "", description: "", tier: "Tier 1", allowedModules: [], allowedActions: [] }); setShowModal(true); }}
          className="bg-landvista-blue text-white px-8 py-3 rounded-2xl font-black text-sm tracking-widest hover:bg-opacity-90 transition shadow-xl shadow-landvista-blue/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> CREATE NEW ROLE
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse">
          <Shield className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Syncing RBAC policies...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map(role => (
            <div key={role._id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${role.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                  {role.isActive ? 'System Active' : 'Disabled'}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-[10px] font-black text-landvista-blue bg-landvista-blue/5 px-3 py-1 rounded-lg w-fit mb-4 tracking-widest uppercase">
                  {role.tier} Tier
                </div>
                <h3 className="text-2xl font-black text-landvista-blue mb-2">{role.name}</h3>
                <p className="text-sm text-landvista-grey leading-relaxed">{role.description || "No description provided."}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Modules Allowed
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {role.allowedModules?.map(m => (
                      <span key={m} className="px-2 py-0.5 bg-gray-50 text-landvista-slate text-[9px] font-bold rounded border border-gray-100">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <CheckSquare className="w-3 h-3" /> Actions Authorized
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {role.allowedActions?.map(a => (
                      <span key={a} className="px-2 py-0.5 bg-landvista-blue/5 text-landvista-blue text-[9px] font-black rounded">{a}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-50">
                <button 
                  onClick={() => { setCurrentRole(role); setShowModal(true); }}
                  className="flex-1 bg-gray-50 hover:bg-landvista-blue hover:text-white text-landvista-blue py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Edit Policy
                </button>
                <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-landvista-blue/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-8 bg-landvista-blue text-white flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-widest">{currentRole?._id ? 'Modify Role' : 'Architect Role'}</h2>
              <button onClick={() => setShowModal(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Role Name</label>
                  <input 
                    required 
                    value={currentRole?.name}
                    onChange={(e) => setCurrentRole({...currentRole, name: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue p-4 rounded-2xl outline-none transition font-bold text-landvista-blue" 
                    placeholder="e.g. Regional Analyst"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Access Tier</label>
                  <select 
                    value={currentRole?.tier || "Tier 1"}
                    onChange={(e) => setCurrentRole({...currentRole, tier: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue p-4 rounded-2xl outline-none transition font-bold text-landvista-blue appearance-none"
                  >
                    <option value="Tier 0">Tier 0 (Public)</option>
                    <option value="Tier 1">Tier 1 (Applicant)</option>
                    <option value="Tier 2">Tier 2 (Investor)</option>
                    <option value="Tier 3">Tier 3 (Mandate)</option>
                    <option value="Tier 4">Tier 4 (Analyst/Internal)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  rows="2"
                  value={currentRole?.description}
                  onChange={(e) => setCurrentRole({...currentRole, description: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue p-4 rounded-2xl outline-none transition text-sm font-medium"
                  placeholder="Define role scope and responsibilities..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Authorized Modules</label>
                <div className="grid grid-cols-3 gap-2">
                  {modules.map(m => (
                    <button 
                      key={m}
                      type="button"
                      onClick={() => handleToggleModule(m)}
                      className={`p-3 rounded-xl text-[10px] font-bold border-2 transition-all ${currentRole?.allowedModules?.includes(m) ? 'bg-landvista-blue border-landvista-blue text-white shadow-lg shadow-landvista-blue/20' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Authorized Actions</label>
                <div className="flex flex-wrap gap-2">
                  {actions.map(a => (
                    <button 
                      key={a}
                      type="button"
                      onClick={() => handleToggleAction(a)}
                      className={`px-6 py-2 rounded-xl text-[10px] font-black border-2 transition-all ${currentRole?.allowedActions?.includes(a) ? 'bg-landvista-blue border-landvista-blue text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 rounded-2xl transition">Cancel</button>
                <button type="submit" className="flex-1 bg-landvista-blue text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all">
                  Commit Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}