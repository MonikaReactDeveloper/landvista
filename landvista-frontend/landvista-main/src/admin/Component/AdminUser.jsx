import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Eye, 
  Shield, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  ArrowRight,
  Target,
  Briefcase,
  Globe,
  MapPin,
  FileText,
  Trash2
} from "lucide-react";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mandates, setMandates] = useState([]);
  const [roleRequests, setRoleRequests] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchMandates();
    fetchRoleRequests();
  }, []);

  const fetchMandates = async () => {
    try {
      const res = await api.get("/mandates/all");
      setMandates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoleRequests = async () => {
    try {
      const res = await api.get("/rbac/requests");
      setRoleRequests(res.data.data);
    } catch (err) {
      console.error("Error fetching role requests", err);
    }
  };


  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/auth/me/all");
      const allUsers = response.data || [];
      setUsers(allUsers);
      setRequests(allUsers.filter(u => u.status === "pending"));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action, reason = "", tier = "") => {
    try {
      await api.post(`/auth/admin/user-action`, { userId, action, reason, tier });
      fetchUsers();
      if (selectedUser && selectedUser._id === userId) {
        // Refresh selected user if modal is open
        const updated = (await api.get("/auth/me/all")).data.find(u => u._id === userId);
        setSelectedUser(updated);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Action failed");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("CRITICAL: Permanently purge this institutional account? This action cannot be undone.")) {
      try {
        await api.delete(`/auth/admin/users/${id}`);
        setSelectedUser(null);
        fetchUsers();
      } catch (error) {
        console.error("User purge failed:", error);
        alert(error.response?.data?.message || "Purge failed. Please verify administrative privileges.");
      }
    }
  };

  const handleApproveRoleRequest = async (id) => {
    if (window.confirm("Approve this sensitive role escalation?")) {
      try {
        await api.post(`/rbac/requests/${id}/approve`);
        fetchRoleRequests();
        fetchUsers();
      } catch (error) {
        alert(error.response?.data?.message || "Approval failed");
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const name = user.fullName || "";
    const email = user.email || "";
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700 border-green-200";
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      case "suspended": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Network", value: users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pipeline Requests", value: requests.length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Active Partners", value: users.filter(u => u.status === 'approved').length, icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
          { label: "Compliance Risk", value: users.filter(u => u.status === 'suspended').length, icon: Shield, color: "text-red-600", bg: "bg-red-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-xl transition-all group">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-landvista-blue tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex gap-1 bg-gray-100 p-1.5 rounded-[1.5rem] w-full lg:w-fit overflow-x-auto">
            {["all", "pending", "approved", "suspended", "role_requests"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-none px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-landvista-blue shadow-md' : 'text-landvista-grey hover:text-landvista-blue'}`}
              >
                {tab === 'role_requests' ? `Role Requests (${roleRequests.length})` : tab}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-[32rem] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Identity or Credentials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-[2rem] border-none focus:ring-4 focus:ring-landvista-blue/5 transition-all text-sm font-bold text-landvista-blue"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === "role_requests" ? (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Target Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Requested Change</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Requested By</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {roleRequests.map(req => (
                  <tr key={req._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-10 py-8 font-black text-landvista-blue">{req.targetUser?.fullName} ({req.targetUser?.email})</td>
                    <td className="px-10 py-8 text-sm font-bold text-landvista-grey">
                      Role: {req.requestedRole} <br/> Tier: {req.requestedTier}
                    </td>
                    <td className="px-10 py-8 text-xs font-medium text-gray-500">{req.requestedBy?.fullName}</td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => handleApproveRoleRequest(req._id)}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow-sm"
                      >
                        Approve Escalation
                      </button>
                    </td>
                  </tr>
                ))}
                {roleRequests.length === 0 && (
                  <tr><td colSpan="4" className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">No pending role escalations</td></tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Master Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Institutional Role</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Access Tier</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">NDA Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Operational Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-landvista-grey uppercase tracking-widest text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-landvista-blue text-white flex items-center justify-center font-black italic shadow-lg shadow-landvista-blue/20 text-xl">
                          {user.fullName ? user.fullName[0] : "?"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-landvista-blue tracking-tight text-base mb-1">{user.fullName}</span>
                          <span className="text-xs text-landvista-grey font-bold flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 opacity-50" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black text-landvista-blue uppercase tracking-widest flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" /> {user.role}
                        </span>
                        <span className="text-[10px] font-bold text-landvista-grey opacity-60">
                          {user.organization || "No Organization"}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-[10px] font-black text-landvista-blue bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase tracking-widest">
                        {user.tier || "No Tier"}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.ndaStatus === 'signed' ? 'bg-green-500' : user.ndaStatus === 'pending' ? 'bg-amber-500' : 'bg-gray-300'}`} />
                        <span className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">{user.ndaStatus?.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-[0.15em] ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-3 bg-gray-50 hover:bg-landvista-blue hover:text-white rounded-2xl text-landvista-blue transition-all active:scale-95 shadow-sm"
                      >
                        <Eye className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Deep Review Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-landvista-blue/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3.5rem] w-full max-w-5xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-12 bg-landvista-blue text-white relative flex-shrink-0">
              <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-10 right-10 bg-white/10 hover:bg-white/20 p-4 rounded-3xl transition-all"
              >
                <XCircle className="w-8 h-8" />
              </button>
              
              <div className="flex items-center gap-10">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white text-landvista-blue flex items-center justify-center text-5xl font-black italic shadow-2xl">
                  {selectedUser.fullName ? selectedUser.fullName[0] : "?"}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{selectedUser.tier}</span>
                    <span className="w-2 h-2 bg-white/40 rounded-full" />
                    <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{selectedUser.role}</span>
                  </div>
                  <h2 className="text-5xl font-black tracking-tighter mb-2 italic">{selectedUser.fullName}</h2>
                  <p className="text-lg opacity-60 font-medium">{selectedUser.designation} at <span className="font-bold underline decoration-2">{selectedUser.organization}</span></p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Credentials & Contact */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-1.5 h-6 bg-landvista-blue rounded-full" />
                    <h4 className="text-sm font-black text-landvista-blue uppercase tracking-widest">Institutional Credentials</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: "Master Email", value: selectedUser.email, icon: Mail },
                      { label: "Secure Line", value: selectedUser.phone || "Not Verified", icon: Phone },
                      { label: "Strategic Zone", value: selectedUser.geography || "Regional", icon: MapPin },
                      { label: "Source Protocol", value: selectedUser.sourceChannel || "Organic", icon: Globe },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-landvista-blue/20 transition-all">
                        <div className="p-3 bg-white rounded-xl text-landvista-blue shadow-sm">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-base font-black text-landvista-blue">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qualification Profile */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-1.5 h-6 bg-landvista-blue rounded-full" />
                    <h4 className="text-sm font-black text-landvista-blue uppercase tracking-widest">Qualification Matrix</h4>
                  </div>
                  
                  <div className="bg-landvista-blue/5 p-10 rounded-[3rem] border border-landvista-blue/10 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-black text-landvista-slate uppercase opacity-50 tracking-widest mb-2">Investor Classification</p>
                        <p className="text-xl font-black text-landvista-blue">{selectedUser.investorType || "Undetermined"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-landvista-slate uppercase opacity-50 tracking-widest mb-2">Capital Threshold</p>
                        <p className="text-xl font-black text-landvista-blue">{selectedUser.capitalBand || "Unknown"}</p>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-landvista-blue/10">
                      <p className="text-[10px] font-black text-landvista-slate uppercase opacity-50 tracking-widest mb-4">Intent & Strategic Purpose</p>
                      <p className="text-sm font-medium text-landvista-blue leading-relaxed italic">
                        "{selectedUser.purpose || "The applicant has not specified a strategic purpose for platform access."}"
                      </p>
                    </div>

                    <div className="pt-8 border-t border-landvista-blue/10 grid grid-cols-2 gap-8">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[10px] font-black text-landvista-slate uppercase tracking-widest">Engagement Score</p>
                          <span className="text-[10px] font-black text-landvista-blue">{selectedUser.engagementScore || 0}%</span>
                        </div>
                        <div className="h-2 bg-white rounded-full overflow-hidden p-0.5">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all duration-1000" 
                            style={{ width: `${selectedUser.engagementScore || 0}%` }} 
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-landvista-slate uppercase tracking-widest mb-1">SLA Breaches</p>
                        <p className={`text-xl font-black ${selectedUser.slaBreaches > 0 ? 'text-red-500' : 'text-green-600'}`}>
                          {selectedUser.slaBreaches || 0} Critical
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-landvista-blue/10">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black text-landvista-slate uppercase tracking-widest">Platform Trust Score</p>
                        <span className="text-sm font-black text-landvista-blue">{selectedUser.intentScore || 0}%</span>
                      </div>
                      <div className="h-3 bg-white rounded-full overflow-hidden p-0.5">
                        <div 
                          className="h-full bg-landvista-blue rounded-full transition-all duration-1000 shadow-lg shadow-landvista-blue/20" 
                          style={{ width: `${selectedUser.intentScore || 0}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NDA Acceptance History */}
              <div className="mt-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-6 bg-landvista-blue rounded-full" />
                  <h4 className="text-sm font-black text-landvista-blue uppercase tracking-widest">Compliance Protocol (NDA)</h4>
                </div>
                <div className="p-8 bg-gray-50 rounded-[2.5rem] flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl ${selectedUser.ndaStatus === 'signed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-landvista-grey uppercase tracking-widest mb-1">Current Agreement Status</p>
                      <h5 className="text-xl font-black text-landvista-blue uppercase italic">
                        {selectedUser.ndaStatus === 'signed' ? 'Master Agreement Active' : 'Agreement Pending Signature'}
                      </h5>
                    </div>
                  </div>
                  {selectedUser.ndaStatus === 'signed' && (
                    <div className="text-right">
                      <p className="text-[10px] font-black text-landvista-grey uppercase">Accepted On</p>
                      <p className="font-bold text-landvista-blue">Institutional Ledger #LV-284</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-10 bg-white border-t border-gray-100 flex flex-col gap-6 flex-shrink-0">
              <div className="space-y-6">
                
                {/* 1. INITIAL QUALIFICATION (NDA) */}
                {selectedUser.status === "pending" && selectedUser.ndaStatus === "not_signed" && (
                  <button 
                    onClick={() => handleAction(selectedUser._id, "qualify_nda", "", "Tier 1")}
                    className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:-translate-y-1 transition-all shadow-2xl shadow-landvista-blue/30 flex items-center justify-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6" /> Qualify for NDA Protocol
                  </button>
                )}

                {/* 2. APPROVAL & TIER ESCALATION */}
                {(selectedUser.status === "approved" || (selectedUser.status === "pending" && selectedUser.ndaStatus === "signed")) && (
                  <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                    <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.2em]">
                      {selectedUser.status === "approved" ? "Escalate Access Tier:" : "Approve & Assign Tier:"}
                    </p>
                    <div className="flex flex-wrap gap-3 flex-1">
                      {["Tier 1", "Tier 2", "Tier 3", "Tier 4"].map(t => (
                        <button 
                          key={t}
                          onClick={() => handleAction(selectedUser._id, "approve", "", t)}
                          className={`flex-1 px-6 py-3 rounded-xl text-[10px] font-black transition-all shadow-sm ${selectedUser.tier === t ? 'bg-landvista-blue text-white scale-105' : 'bg-white border border-gray-100 text-landvista-grey hover:border-landvista-blue'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. PENDING MANAGEMENT (HOLD/REJECT) */}
                {selectedUser.status === "pending" && (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleAction(selectedUser._id, "hold", "Additional profile data requested")}
                      className="flex-1 bg-white border-2 border-amber-100 text-amber-600 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-50 transition-all flex items-center justify-center gap-3"
                    >
                      <Clock className="w-6 h-6" /> Put on Hold
                    </button>
                    <button 
                      onClick={() => handleAction(selectedUser._id, "reject", "Profile does not meet institutional standards")}
                      className="flex-1 bg-white border-2 border-red-100 text-red-600 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-50 transition-all flex items-center justify-center gap-3"
                    >
                      <XCircle className="w-6 h-6" /> Deny Access
                    </button>
                  </div>
                )}

                {/* 4. MANDATE MAPPING */}
                {selectedUser.status === "approved" && (
                  <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                    <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.2em]">Map to Mandate:</p>
                    <div className="flex flex-wrap gap-3 flex-1">
                      <select 
                        className="w-full bg-white border border-gray-100 text-landvista-blue px-4 py-3 rounded-xl text-[10px] font-black outline-none focus:ring-2 focus:ring-landvista-blue/10"
                        onChange={(e) => handleAction(selectedUser._id, "map_mandate", e.target.value)}
                      >
                        <option value="">Select Mandate Portfolio</option>
                        {mandates.map(m => (
                          <option key={m._id} value={m._id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* 5. ACCOUNT SUSPENSION & PURGE */}
                <div className="pt-6 border-t border-gray-100 flex gap-4">
                  <button 
                    onClick={() => handleAction(selectedUser._id, selectedUser.status === 'suspended' ? 'approve' : 'suspend')}
                    className={`flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${selectedUser.status === 'suspended' ? 'bg-green-600 text-white shadow-green-900/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {selectedUser.status === 'suspended' ? <UserCheck className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    {selectedUser.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(selectedUser._id)}
                    className="flex-1 py-5 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3"
                  >
                    <Trash2 className="w-6 h-6" /> Purge Account
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}