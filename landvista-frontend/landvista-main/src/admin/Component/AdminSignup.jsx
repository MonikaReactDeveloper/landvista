import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { 
  ShieldAlert, 
  User, 
  Mail, 
  Lock, 
  Key, 
  ChevronRight, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

export default function AdminSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Institutional passwords must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/admin-register", {
        name: form.name,
        email: form.email,
        password: form.password,
        adminSecret: form.secret,
      });

      alert("Administrative Identity Created. Redirecting to Login...");
      navigate("/admin-login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Verify Access Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
            <div className="w-16 h-16 bg-landvista-blue rounded-2xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-landvista-blue/20 mb-6">
                <ShieldAlert size={32} />
            </div>
            <h2 className="text-3xl font-black text-landvista-blue tracking-tighter italic uppercase">
                Admin <span className="text-landvista-blue/40">Registration</span>
            </h2>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.3em] mt-2">
                Establish Administrative Identity
            </p>
        </div>

        {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-shake">
                <AlertCircle size={16} />
                {error}
            </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                    <input
                        type="text"
                        placeholder="Full Legal Name"
                        className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                        required
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                    <input
                        type="email"
                        placeholder="Corporate Email"
                        className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                        required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                    <input
                        type="password"
                        placeholder="Create Secure Password"
                        className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                        required
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>
                <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                    <input
                        type="password"
                        placeholder="Admin Access Key"
                        className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                        required
                        onChange={(e) => setForm({ ...form, secret: e.target.value })}
                    />
                </div>
            </div>

            <button
                disabled={loading}
                className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-gray-200 flex items-center justify-center gap-3"
            >
                {loading ? <Loader2 className="animate-spin" /> : (
                    <>
                        Establish Admin Account <ChevronRight size={18} />
                    </>
                )}
            </button>

            <button 
                type="button"
                onClick={() => navigate("/admin-login")}
                className="w-full text-[10px] font-black text-landvista-grey uppercase tracking-widest hover:text-landvista-blue transition-colors text-center"
            >
                Back to Login
            </button>
        </form>
      </div>
    </div>
  );
}