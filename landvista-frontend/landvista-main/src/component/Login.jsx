import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { setAuth, getAuth } from "../utils/auth";
import { 
  Mail, 
  Lock, 
  ChevronRight, 
  Shield, 
  AlertCircle,
  Key,
  Loader,
  ShieldCheck
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  // 🛡️ Institutional Auto-Login Check (Facebook Style)
  useEffect(() => {
    const auth = getAuth();
    if (auth && auth.token && auth.user) {
      // User is already authenticated, bypass login screen
      if (auth.role === 'admin') {
          navigate("/dashboard");
      } else if (auth.user.ndaStatus === 'signed') {
          navigate("/dashboard");
      } else {
          navigate("/nda");
      }
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
      const response = await api.post("/auth/login", form);
      if (response.data.requires2FA) {
        setRequires2FA(true);
      } else {
        handleAuthSuccess(response.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
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
      setError(error.response?.data?.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (data) => {
    const { token, refreshToken, user } = data;
    
    setAuth({
      token,
      refreshToken,
      role: user.role,
      user: user,
    });

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === 'admin') {
        navigate("/dashboard");
    } else if (user.ndaStatus !== "signed") {
      navigate("/nda");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">
          {view === "forgot" ? "Reset " : view === "reset" ? "Verify " : (requires2FA ? "Security " : "Secure ")} 
          <span className="text-landvista-blue/40">
            {view === "forgot" ? "Password" : view === "reset" ? "Identity" : (requires2FA ? "Checkpoint" : "Portal")}
          </span>
        </h2>
        <p className="text-landvista-grey text-xs font-bold uppercase tracking-[0.2em] mt-2">
          {view === "forgot" ? "Recover Your Institutional Account" : 
           view === "reset" ? "Enter Code & New Password" :
           requires2FA ? "Enter 2-Step Verification Code" : "Access Institutional Intelligence"}
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
                placeholder="Corporate Email"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue"
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
                className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue"
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
                Secure Access Request <ChevronRight size={18} />
              </>
            )}
          </button>
        </form>
      )}

      {view === "forgot" && (
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50 space-y-4">
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest leading-relaxed">
              Enter your corporate email. We will send a security code to verify your identity and reset your password.
            </p>
          </div>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
            <input
              type="email"
              placeholder="Corporate Email"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <button
            disabled={loading || !form.email}
            className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all disabled:bg-gray-200"
          >
            {loading ? <Loader className="animate-spin mx-auto" /> : "Send Reset Code"}
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
                className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-black text-xl tracking-[0.2em] text-landvista-blue"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue"
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
                className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue"
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
            {loading ? <Loader className="animate-spin mx-auto" /> : "Reset & Login"}
          </button>
        </form>
      )}

      {view === "login" && requires2FA && (
        <form onSubmit={handleLoginStep2} className="space-y-6">
          <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50 text-center space-y-4">
            <div className="w-16 h-16 bg-landvista-blue rounded-2xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-landvista-blue/20 mb-6">
                <Shield size={32} />
            </div>
            <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">A 6-digit verification code has been sent to your email.</p>
          </div>

          <div className="relative group">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-6 rounded-2xl outline-none transition font-black text-2xl tracking-[0.5em] text-center text-landvista-blue"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <button
            disabled={loading || otp.length !== 6}
            className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-gray-200 flex items-center justify-center gap-3"
          >
            {loading ? <Loader className="animate-spin" /> : "Verify & Complete Login"}
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

      <div className="text-center pt-4 space-y-4">
        <div className="relative flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Or Secure Entry</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <button
          type="button"
          onClick={() => window.location.href = `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:3000'}/api/auth/google`}
          className="w-full bg-white border-2 border-gray-100 text-landvista-blue py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
          Continue with Google
        </button>

        <p className="text-xs font-bold text-landvista-grey uppercase tracking-widest pt-4">
          New to the platform?{" "}
          <Link to="/request-access" className="text-landvista-blue hover:underline decoration-2">
            Request Access
          </Link>
        </p>
        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
          <ShieldCheck size={12} /> Encrypted Session
        </div>
      </div>
    </div>
  );
}