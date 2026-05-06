import React, { useState } from "react";
import api from "../utils/api";
import { setAdminAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/admin-login", formData);
      setAdminAuth(response.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="p-6 bg-landvista-blue text-white rounded-[2rem] shadow-2xl shadow-landvista-blue/20 mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-landvista-blue uppercase tracking-tighter italic">Admin <span className="text-landvista-blue/40">Access</span></h1>
          <p className="text-landvista-grey text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Institutional Control Gateway</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Admin Email</label>
            <input 
              type="email" required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none focus:ring-4 focus:ring-landvista-blue/5 transition-all" 
              placeholder="admin@landvista.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Access Token</label>
            <div className="relative">
              <input 
                type="password" required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold text-landvista-blue outline-none focus:ring-4 focus:ring-landvista-blue/5 transition-all" 
                placeholder="••••••••"
              />
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border border-red-100">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 bg-landvista-blue text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Initialize Session <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <p className="text-center mt-12 text-[10px] font-black text-landvista-grey uppercase tracking-widest opacity-30">
          LandVista Institutional Architecture v1.0
        </p>
      </div>
    </div>
  );
}
