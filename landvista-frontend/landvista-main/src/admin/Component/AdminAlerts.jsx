import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Bell, 
  Send, 
  Pause, 
  Play, 
  Trash2, 
  Plus, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  X,
  Megaphone,
  Zap,
  Activity,
  Shield,
  Eye,
  Check
} from "lucide-react";

export default function AdminAlerts() {
  const [activeTab, setActiveTab] = useState("sla"); // 'broadcast', 'system', 'sla'
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [slas, setSlas] = useState([]);
  const [slaStats, setSlaStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "System",
    priority: "High",
    audience: "All Investors",
    channel: ["Web"]
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "broadcast") {
        const response = await api.get("/alerts/all");
        setAlerts(response.data);
      } else if (activeTab === "system") {
        const response = await api.get("/alerts/logs");
        setLogs(response.data);
      } else if (activeTab === "sla") {
        const response = await api.get("/sla");
        setSlas(response.data.slas);
        setSlaStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching alerts/logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (id) => {
    try {
      await api.put(`/alerts/logs/${id}/acknowledge`);
      fetchData();
    } catch (error) {
      alert("Failed to acknowledge alert");
    }
  };

  const handleResolveSla = async (id) => {
    const reason = window.prompt("Enter Mandatory Breach Resolution Reason:");
    if (!reason) return;
    try {
      await api.post(`/sla/${id}/resolve`, { reason, action: "Admin Override" });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resolve SLA");
    }
  };

  const handleSubmit = async (e, status = "Active") => {
    e.preventDefault();
    try {
      await api.post("/alerts", { ...formData, status });
      setShowModal(false);
      fetchData();
      setFormData({
        title: "",
        message: "",
        type: "System",
        priority: "High",
        audience: "All Investors",
        channel: ["Web"]
      });
    } catch (error) {
      alert("Failed to broadcast campaign");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this communication campaign?")) {
      try {
        await api.delete(`/alerts/${id}`);
        fetchData();
      } catch (error) {
        alert("Deletion failed");
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "bg-red-500 text-white shadow-red-500/20";
      case "High": return "bg-orange-500 text-white shadow-orange-500/20";
      case "Medium": return "bg-blue-500 text-white shadow-blue-500/20";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "text-red-600 bg-red-50 border-red-100";
      case "Warning": return "text-amber-600 bg-amber-50 border-amber-100";
      default: return "text-blue-600 bg-blue-50 border-blue-100";
    }
  };

  const toggleChannel = (ch) => {
    const current = [...formData.channel];
    if (current.includes(ch)) {
      setFormData({...formData, channel: current.filter(c => c !== ch)});
    } else {
      setFormData({...formData, channel: [...current, ch]});
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Tabs */}
      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="p-5 bg-landvista-blue text-white rounded-[1.5rem] shadow-xl shadow-landvista-blue/20">
              <Bell className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-landvista-blue tracking-tighter uppercase italic">Institutional <span className="text-landvista-blue/40">Alerts</span></h1>
              <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.3em] mt-1">Strategic Communication & Governance Intelligence</p>
            </div>
          </div>
          <div className="flex bg-gray-50 p-2 rounded-[2rem] border border-gray-100 w-full md:w-auto overflow-x-auto">
            <button 
              onClick={() => setActiveTab("sla")}
              className={`flex-none px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'sla' ? 'bg-white text-landvista-blue shadow-sm border border-gray-100' : 'text-gray-400'}`}
            >
              SLA War Room
            </button>
            <button 
              onClick={() => setActiveTab("system")}
              className={`flex-none px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'system' ? 'bg-white text-landvista-blue shadow-sm border border-gray-100' : 'text-gray-400'}`}
            >
              System Intelligence
            </button>
            <button 
              onClick={() => setActiveTab("broadcast")}
              className={`flex-none px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'broadcast' ? 'bg-white text-landvista-blue shadow-sm border border-gray-100' : 'text-gray-400'}`}
            >
              Broadcast Center
            </button>
          </div>
        </div>

        {activeTab === 'broadcast' && (
          <div className="flex justify-end">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-landvista-blue text-white px-10 py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-opacity-90 transition shadow-2xl shadow-landvista-blue/30 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> CREATE CAMPAIGN
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse">
          <Bell className="w-12 h-12 text-gray-100 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Synchronizing {activeTab === 'system' ? 'intelligence logs' : 'broadcast channels'}...</p>
        </div>
      ) : (
        <>
          {activeTab === "sla" ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl"><Activity className="w-6 h-6" /></div>
                  <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active SLAs</p><p className="text-2xl font-black text-landvista-blue">{slaStats.total_active || 0}</p></div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl"><AlertTriangle className="w-6 h-6" /></div>
                  <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">At Risk (Warning)</p><p className="text-2xl font-black text-orange-500">{slaStats.total_warning || 0}</p></div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-4 bg-red-50 text-red-500 rounded-2xl"><Shield className="w-6 h-6" /></div>
                  <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Breaches</p><p className="text-2xl font-black text-red-500">{slaStats.total_breached || 0}</p></div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-4 bg-green-50 text-green-500 rounded-2xl"><CheckCircle2 className="w-6 h-6" /></div>
                  <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resolved</p><p className="text-2xl font-black text-green-500">{slaStats.total_resolved || 0}</p></div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-landvista-grey uppercase tracking-widest">
                      <th className="p-6">Entity</th>
                      <th className="p-6">Owner</th>
                      <th className="p-6">Status</th>
                      <th className="p-6">Deadline</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slas.map(sla => (
                      <tr key={sla._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 font-bold text-sm text-landvista-blue uppercase">{sla.entity_type}</td>
                        <td className="p-6 text-sm font-medium text-gray-600">{sla.owner_id?.fullName || 'Unassigned'}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                            sla.sla_status === 'breached' ? 'bg-red-100 text-red-600' :
                            sla.sla_status === 'warning' || sla.sla_status === 'critical_warning' ? 'bg-orange-100 text-orange-600' :
                            sla.sla_status === 'closed' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {sla.sla_status}
                          </span>
                        </td>
                        <td className="p-6 text-xs font-bold text-gray-500">{new Date(sla.sla_deadline).toLocaleString()}</td>
                        <td className="p-6 text-right">
                          {sla.sla_status === 'breached' && (
                            <button 
                              onClick={() => handleResolveSla(sla._id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
                            >
                              Resolve Breach
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {slas.length === 0 && (
                  <div className="py-20 text-center">
                    <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-300 font-bold text-xs uppercase tracking-[0.3em]">No SLAs Tracked</p>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === "system" ? (
            <div className="space-y-4">
              {logs.map(log => (
                <div key={log._id} className={`bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all ${log.status === 'Acknowledged' ? 'opacity-60' : ''}`}>
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`p-4 rounded-2xl border ${getSeverityColor(log.severity)}`}>
                      {log.category === 'SLA' && <Clock className="w-6 h-6" />}
                      {log.category === 'NDA' && <Shield className="w-6 h-6" />}
                      {log.category === 'Access' && <Users className="w-6 h-6" />}
                      {log.category === 'System' && <Activity className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-landvista-blue uppercase tracking-tight italic">{log.title}</h3>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </div>
                      <p className="text-sm text-landvista-grey font-medium leading-relaxed">{log.message}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-[10px] font-bold text-gray-300 uppercase flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(log.createdAt).toLocaleString()}
                        </p>
                        {log.status === 'Acknowledged' && (
                          <p className="text-[10px] font-bold text-green-500 uppercase flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Acknowledged
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {log.status === 'Active' && (
                    <button 
                      onClick={() => handleAcknowledge(log._id)}
                      className="px-6 py-3 bg-gray-50 hover:bg-green-50 text-landvista-blue hover:text-green-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-gray-100 hover:border-green-100 transition-all flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Acknowledge
                    </button>
                  )}
                </div>
              ))}
              
              {logs.length === 0 && (
                <div className="py-20 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                  <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-300 font-bold text-xs uppercase tracking-[0.3em]">System intelligence queue clear</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {alerts.map(alert => (
                <div key={alert._id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative group overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg ${getPriorityColor(alert.priority)}`}>
                      {alert.priority}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleDelete(alert._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-landvista-blue mb-2 line-clamp-1 uppercase tracking-tight italic">{alert.title}</h3>
                  <p className="text-sm text-landvista-grey font-medium leading-relaxed mb-6 line-clamp-3">{alert.message}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {alert.channel?.map(ch => (
                      <div key={ch} className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg">
                        {ch === 'Web' && <Globe className="w-3 h-3 text-blue-500" />}
                        {ch === 'Email' && <Mail className="w-3 h-3 text-red-400" />}
                        {ch === 'SMS' && <Smartphone className="w-3 h-3 text-green-500" />}
                        <span className="text-[10px] font-black text-landvista-slate uppercase tracking-widest">{ch}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-landvista-grey" />
                      <span className="text-xs font-black text-landvista-blue uppercase tracking-tighter">{alert.audience}</span>
                    </div>
                    <div className="text-[10px] font-bold text-landvista-grey flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> {alert.sentCount || 0} SENT
                    </div>
                  </div>
                </div>
              ))}
              
              {alerts.length === 0 && (activeTab === 'broadcast') && (
                <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                  <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-300 font-bold text-xs uppercase tracking-[0.3em]">No active communication campaigns</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-landvista-blue/40 backdrop-blur-sm">
          <div className="bg-white rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-10 bg-landvista-blue text-white flex justify-between items-center relative overflow-hidden">
              <Zap className="absolute right-0 top-0 w-32 h-32 text-white/5 -mr-10 -mt-10" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">Broadcast <span className="text-white/40">Campaign</span></h2>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.4em] mt-1">Multi-channel communication dispatch</p>
              </div>
              <button onClick={() => setShowModal(false)} className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition relative z-10">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Campaign Title</label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none" 
                  placeholder="e.g. Q4 Policy Update - Zone L"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest">Message Content</label>
                  <div className="flex gap-2">
                    {['fullName', 'organization', 'tier'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setFormData({...formData, message: formData.message + ` {{${tag}}}`})}
                        className="text-[8px] font-black text-landvista-blue bg-blue-50 px-2 py-1 rounded-md border border-blue-100 hover:bg-blue-100 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea 
                  required rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-medium text-landvista-blue outline-none" 
                  placeholder="Dispatch your message here... Use {{fullName}} for personalization."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Campaign Type</label>
                  <select 
                    value={formData.type || "System"}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none"
                  >
                    <option value="System">System Update</option>
                    <option value="Policy">Policy Change</option>
                    <option value="Signal">Market Signal</option>
                    <option value="Security">Security Alert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Priority Level</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none"
                  >
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Target Audience</label>
                <select 
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none"
                >
                  <option>All Investors</option>
                  <option>Institutional (Tier 3+)</option>
                  <option>Pipeline Only</option>
                  <option>Admins Only</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Dispatch Channels</label>
                <div className="flex gap-4">
                  {[
                    { id: 'Web', icon: Globe, color: 'text-blue-500' },
                    { id: 'Email', icon: Mail, color: 'text-red-400' },
                    { id: 'SMS', icon: Smartphone, color: 'text-green-500' }
                  ].map(ch => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => toggleChannel(ch.id)}
                      className={`flex-1 p-5 rounded-[1.5rem] border-2 transition-all flex flex-col items-center gap-3 ${
                        formData.channel.includes(ch.id) 
                        ? 'border-landvista-blue bg-landvista-blue/5' 
                        : 'border-gray-50 bg-gray-50/50'
                      }`}
                    >
                      <ch.icon className={`w-6 h-6 ${formData.channel.includes(ch.id) ? ch.color : 'text-gray-300'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${formData.channel.includes(ch.id) ? 'text-landvista-blue' : 'text-gray-300'}`}>
                        {ch.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="button" 
                onClick={(e) => handleSubmit(e, "Active")}
                className="w-full py-6 bg-landvista-blue text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <Megaphone className="w-5 h-5" /> Execute Dynamic Broadcast
              </button>
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, "Draft")}
                className="w-full py-4 bg-gray-50 text-landvista-blue rounded-2xl font-bold text-[10px] uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all"
              >
                Save as Draft
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
