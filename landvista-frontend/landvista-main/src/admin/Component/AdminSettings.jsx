import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Cpu, 
  Save, 
  RefreshCcw, 
  Lock,
  Mail,
  Zap,
  HardDrive
} from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState([]);
  const [backupStatus, setBackupStatus] = useState(null);
  const [notificationRules, setNotificationRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("GENERAL");

  const categories = [
    { id: "GENERAL", label: "General Config", icon: Globe },
    { id: "SECURITY", label: "Security & RBAC", icon: Shield },
    { id: "NOTIFICATION", label: "Communications", icon: Bell },
    { id: "INFRASTRUCTURE", label: "Infrastructure", icon: Cpu },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const [settingsRes, backupRes, rulesRes] = await Promise.all([
        api.get("/settings/all"),
        api.get("/settings/backup-status"),
        api.get("/settings/notification-rules")
      ]);
      setSettings(settingsRes.data);
      setBackupStatus(backupRes.data);
      setNotificationRules(rulesRes.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (key, value) => {
    try {
      await api.put(`/settings/${key}`, { value });
      fetchSettings();
    } catch (error) {
      alert("Failed to update setting");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="p-5 bg-landvista-blue text-white rounded-[1.5rem] shadow-xl shadow-landvista-blue/20">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-landvista-blue tracking-tighter">Core Configuration</h1>
            <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.3em] mt-1">System behavior & business rules</p>
          </div>
        </div>
        <button 
          onClick={fetchSettings}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-landvista-blue px-8 py-3 rounded-2xl font-black text-sm transition-all"
        >
          <RefreshCcw className="w-4 h-4" /> SYNC SETTINGS
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="md:col-span-1 space-y-2">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-4 p-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-landvista-blue text-white shadow-xl shadow-landvista-blue/20 translate-x-2' : 'bg-white text-landvista-grey hover:bg-gray-50'}`}
            >
              <cat.icon className="w-5 h-5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          {loading ? (
            <div className="bg-white p-20 rounded-[3rem] border border-gray-100 flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-landvista-blue mb-4"></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Decrypting configuration vault...</p>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-8 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-landvista-blue uppercase tracking-widest">{activeCategory} POLICIES</h3>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[9px] font-black tracking-widest uppercase">
                  <Zap className="w-3 h-3" /> System Optimized
                </div>
              </div>
              
              <div className="divide-y divide-gray-50">
                {activeCategory === "INFRASTRUCTURE" && backupStatus && (
                  <div className="p-10 space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "State Health", value: backupStatus.status, color: "text-green-500" },
                        { label: "Last Sync", value: new Date(backupStatus.lastBackup).toLocaleTimeString(), color: "text-landvista-blue" },
                        { label: "Volume Used", value: backupStatus.storageUsed, color: "text-landvista-blue" },
                        { label: "Availability", value: backupStatus.storageAvailable, color: "text-landvista-blue" },
                      ].map((stat, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className={`text-sm font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-landvista-blue/5 p-8 rounded-3xl border border-landvista-blue/10 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm">
                          <HardDrive className="w-6 h-6 text-landvista-blue" />
                        </div>
                        <div>
                          <h4 className="font-black text-landvista-blue">Atomic System Restore</h4>
                          <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Revert to last verified stable state</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert("Restoration requires Founder Key approval.")}
                        className="bg-red-500 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-105 transition-all"
                      >
                        Initiate Restore
                      </button>
                    </div>
                  </div>
                )}

                {activeCategory === "NOTIFICATION" && (
                  <div className="p-10 space-y-6">
                    {["SLA Breach", "NDA Execution", "Critical Access", "System Fault"].map((rule, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-xl shadow-sm">
                            <Bell className="w-5 h-5 text-landvista-blue" />
                          </div>
                          <div>
                            <h4 className="font-bold text-landvista-blue">{rule} Alerts</h4>
                            <p className="text-[10px] text-landvista-grey font-bold uppercase tracking-widest">Channel: Web + Email (Tier 4 Only)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-green-600 bg-green-100 px-2 py-1 rounded-md uppercase tracking-widest">Active</span>
                          <button className="p-2 hover:bg-white rounded-xl transition-all">
                            <Settings className="w-4 h-4 text-landvista-grey" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {["GENERAL", "SECURITY"].includes(activeCategory) && settings.filter(s => s.category === activeCategory).map(setting => (
                  <div key={setting.key} className="p-8 hover:bg-gray-50/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-md">
                      <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest mb-1">{setting.key.replace(/_/g, ' ')}</p>
                      <h4 className="text-lg font-bold text-landvista-blue mb-2">{setting.description || "System level directive governing core logic."}</h4>
                      <p className="text-xs text-landvista-grey font-medium leading-relaxed opacity-60">Last modified by {setting.updatedBy?.fullName || "System Admin"} • {new Date(setting.updatedAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="w-full md:w-auto flex items-center gap-4">
                      {typeof setting.value === 'boolean' ? (
                        <button 
                          onClick={() => handleUpdate(setting.key, !setting.value)}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${setting.value ? 'bg-landvista-blue' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${setting.value ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200 focus-within:border-landvista-blue transition-all">
                          <input 
                            defaultValue={setting.value}
                            onBlur={(e) => handleUpdate(setting.key, e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-bold text-landvista-blue px-4 py-1"
                          />
                          <button className="p-2 bg-white text-landvista-blue rounded-xl shadow-sm hover:bg-landvista-blue hover:text-white transition-all">
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {settings.filter(s => s.category === activeCategory).length === 0 && (
                  <div className="p-20 text-center">
                    <HardDrive className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                    <p className="text-gray-300 font-bold text-xs uppercase tracking-widest">No parameters found in this sector</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Security Alert */}
          <div className="p-8 bg-red-50 rounded-[3rem] border-2 border-red-100 flex items-center gap-6">
            <div className="p-4 bg-red-600 text-white rounded-3xl shadow-xl shadow-red-600/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-red-600 uppercase tracking-widest mb-1">Privileged Access Only</h4>
              <p className="text-xs text-red-700 font-medium opacity-80 leading-relaxed">
                Changes to these parameters directly affect system security, financial calculation models, and user access tiers. 
                All modifications are recorded in the <span className="underline font-bold">Audit Vault</span> for compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
