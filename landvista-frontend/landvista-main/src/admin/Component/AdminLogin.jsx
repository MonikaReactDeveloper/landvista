import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminAuth, getAdminAuth } from "../../utils/auth";
import api from "../../utils/api";
import { 
  Shield, 
  Lock, 
  Mail, 
  Key, 
  Loader, 
  AlertCircle,
  ChevronRight
} from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  // 🛡️ Administrative Auto-Login Check
  useEffect(() => {
    const auth = getAdminAuth();
    if (auth && auth.token && auth.role === 'admin') {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const [view, setView] = useState("login"); // login, forgot, reset
  const [form, setForm] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [otp, setOtp] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLoginStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/admin-login", form);
      if (response.data.requires2FA) {
        setRequires2FA(true);
      } else {
        handleAuthSuccess(response.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid administrative credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const response = await api.post("/auth/forgot-password", { email: form.email });
      setSuccessMsg(response.data.message);
      setView("reset");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/reset-password", {
        email: form.email,
        otp,
        newPassword: form.newPassword
      });
      setSuccessMsg(response.data.message);
      setView("login");
      setOtp("");
      setForm({ ...form, password: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/verify-login-otp", {
        email: form.email,
        otp
      });
      handleAuthSuccess(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid administrative verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (data) => {
    const { token, user } = data;
    if (user.role !== "admin") {
      setError("Unauthorized. This portal is restricted to administrative identities.");
      return;
    }

    setAdminAuth({
      token,
      role: user.role,
      user: user.fullName || user.email,
    });

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
            <div className="w-16 h-16 bg-landvista-blue rounded-2xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-landvista-blue/20 mb-6">
                <Shield size={32} />
            </div>
            <h2 className="text-3xl font-black text-landvista-blue tracking-tighter italic uppercase">
                Admin <span className="text-landvista-blue/40">{view === "forgot" ? "Recovery" : "Console"}</span>
            </h2>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.3em] mt-2">
                {view === "forgot" ? "Password Recovery System" : (requires2FA ? "Security Checkpoint Active" : "Authorized Personnel Only")}
            </p>
        </div>

        {(error || successMsg) && (
            <div className={`p-4 border rounded-2xl flex items-center gap-3 text-xs font-bold animate-shake ${
              error ? "bg-red-50 border-red-100 text-red-600" : "bg-green-50 border-green-100 text-green-600"
            }`}>
                <AlertCircle size={16} />
                {error || successMsg}
            </div>
        )}

        {view === "login" && !requires2FA && (
            <form onSubmit={handleLoginStep1} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                        <input
                            type="email"
                            placeholder="Admin Email"
                            className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                        <input
                            type="password"
                            placeholder="Secure Password"
                            className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    <div className="text-right">
                        <button 
                            type="button"
                            onClick={() => setView("forgot")}
                            className="text-[10px] font-black text-landvista-blue uppercase tracking-widest hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>

                <button
                    disabled={loading || !form.email || !form.password}
                    className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-gray-200 flex items-center justify-center gap-3"
                >
                    {loading ? <Loader className="animate-spin" /> : (
                        <>
                            Access Control Panel <ChevronRight size={18} />
                        </>
                    )}
                </button>
            </form>
        )}

        {view === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 text-center space-y-4">
                    <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest leading-relaxed">
                        Enter your administrative email to receive a recovery security code.
                    </p>
                </div>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                    <input
                        type="email"
                        placeholder="Admin Email"
                        className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <button
                    disabled={loading || !form.email}
                    className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all disabled:bg-gray-200"
                >
                    {loading ? <Loader className="animate-spin mx-auto" /> : "Send Recovery Code"}
                </button>
                <button 
                    type="button"
                    onClick={() => setView("login")}
                    className="w-full text-[10px] font-black text-landvista-grey uppercase tracking-widest hover:text-landvista-blue"
                >
                    Back to Login
                </button>
            </form>
        )}

        {view === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative group">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="6-Digit Code"
                            maxLength={6}
                            className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-black text-xl tracking-[0.2em] text-landvista-blue shadow-sm"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                        <input
                            type="password"
                            placeholder="New Admin Password"
                            className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                            required
                            value={form.newPassword}
                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-4 pl-12 rounded-2xl outline-none transition font-bold text-landvista-blue shadow-sm"
                            required
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />
                    </div>
                </div>
                <button
                    disabled={loading || otp.length !== 6 || !form.newPassword}
                    className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all disabled:bg-gray-200"
                >
                    {loading ? <Loader className="animate-spin mx-auto" /> : "Verify & Reset Admin Password"}
                </button>
            </form>
        )}

        {view === "login" && requires2FA && (
            <form onSubmit={handleLoginStep2} className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 text-center space-y-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Key className="text-landvista-blue" size={24} />
                    </div>
                    <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Administrative verification required. A 6-digit code has been sent to your email.</p>
                </div>

                <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                    <input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        className="w-full bg-white border-2 border-transparent focus:border-landvista-blue/20 p-6 pl-12 rounded-2xl outline-none transition font-black text-2xl tracking-[0.5em] text-center text-landvista-blue shadow-sm"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    />
                </div>

                <button
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-gray-200 flex items-center justify-center gap-3"
                >
                    {loading ? <Loader className="animate-spin" /> : "Verify Identity & Enter Console"}
                </button>

                <button 
                    type="button"
                    onClick={() => setRequires2FA(false)}
                    className="w-full text-[10px] font-black text-landvista-grey uppercase tracking-widest hover:text-landvista-blue transition-colors"
                >
                    Back to Password
                </button>
            </form>
        )}

        <div className="text-center pt-8">
            <p className="text-xs font-bold text-landvista-grey uppercase tracking-widest">
                System Registration Required?{" "}
                <button onClick={() => navigate("/admin-signup")} className="text-landvista-blue hover:underline decoration-2">
                    Sign Up
                </button>
            </p>
        </div>
      </div>
    </div>
  );
}