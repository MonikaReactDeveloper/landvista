import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Briefcase, 
  Globe, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Loader2,
  AlertCircle,
  Users,
  Layers,
  ArrowRight,
  ClipboardCheck,
  Lock,
  Clock,
  Info,
  ExternalLink,
  Target,
  FileCheck
} from "lucide-react";

export default function RequestAccess() {
  const [formData, setFormData] = useState({
    // Section A - Basic Details
    name: "",
    organization: "",
    designation: "",
    phone: "",
    email: "",
    password: "",

    // Section B - Qualification
    investorType: "",
    ticketSize: "",
    geography: "",
    interestArea: "",

    // Section C - Intent
    purpose: "",
    expectedTimeline: "",
    engagementType: "",

    role: "investor"
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Content/Form, 2: OTP, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", formData);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Institutional email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/verify-otp", {
        email: formData.email,
        otp
      });
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate("/login"), 8000);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-landvista-blue italic tracking-tighter">Application Received</h2>
            <p className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.4em]">Identity Verified & Queued</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
            <p className="text-sm font-medium text-landvista-grey leading-relaxed">
              Your institutional profile has been successfully submitted and verified. Our qualification team will now review your application against our governance criteria.
            </p>
            <div className="flex items-center gap-3 justify-center text-landvista-blue">
              <Clock size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Review window: 24–72 Hours</span>
            </div>
          </div>
          <div className="pt-4">
            <Link to="/login" className="inline-flex items-center gap-3 bg-landvista-blue text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:-translate-y-1 transition-all shadow-xl shadow-landvista-blue/20">
              Go to Login <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-landvista-blue selection:text-white">
      {/* 1. HERO — CONTROLLED ACCESS POSITIONING */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.03]">
          <div className="absolute top-20 right-0 w-96 h-96 bg-landvista-blue rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-landvista-blue rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-landvista-blue/5 rounded-full border border-landvista-blue/10">
            <ShieldCheck size={14} className="text-landvista-blue" />
            <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Governance-Led Access Control</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-landvista-blue tracking-tighter italic leading-[0.9]">
            Request Access to <span className="text-landvista-blue/30">Institutional</span> Land Intelligence
          </h1>
          
          <p className="text-lg md:text-xl font-medium text-landvista-grey max-w-2xl mx-auto leading-relaxed">
            Qualification-based entry into a governance-led, NDA-controlled intelligence platform designed for institutional capital.
          </p>
          
          <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#application-form" className="group bg-landvista-blue text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 transition-all flex items-center gap-3">
              Apply for Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="text-[10px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
              <Info size={14} />
              Access is reviewed, validated, and approved — not granted automatically.
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-20">
          {/* 2. ACCESS PHILOSOPHY */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Philosophy</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Controlled Entry. <br/>Governed Participation.</h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg font-medium text-landvista-grey leading-relaxed">
                Access to the platform is not open. We maintain a curated intelligence ecosystem to ensure data integrity and strategic alignment.
              </p>
              <ul className="space-y-4">
                {[
                  "Entry is evaluated against institutional criteria",
                  "Participation is limited to qualified users",
                  "Intelligence is distributed through a controlled system"
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-landvista-blue rounded-full shrink-0" />
                    <span className="text-sm font-bold text-landvista-blue">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { label: "Qualification-Based", icon: ClipboardCheck },
                  { label: "Governance-Led", icon: ShieldCheck },
                  { label: "NDA-Controlled", icon: Lock }
                ].map((tag, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3">
                    <tag.icon size={20} className="text-landvista-blue" />
                    <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. WHO CAN APPLY */}
          <div className="space-y-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Eligible Profiles</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Eligible Institutional Profiles</h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "Institutional Investors",
                  desc: "Capital allocators operating with defined mandates and governance frameworks.",
                  expectation: "Documented capital deployment capability and structured decision requirement"
                },
                {
                  title: "Developers",
                  desc: "Organizations with active land acquisition and development pipelines.",
                  expectation: "Institutional-scale execution capability and policy-aligned evaluation needs"
                },
                {
                  title: "Family Offices",
                  desc: "Private capital entities managing structured land allocations.",
                  expectation: "Defined investment strategy and governance-aligned decision processes"
                }
              ].map((profile, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-landvista-blue/10 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-landvista-blue group-hover:bg-landvista-blue group-hover:text-white transition-colors">
                      <Users size={24} />
                    </div>
                    <h3 className="text-xl font-black text-landvista-blue uppercase tracking-tight">{profile.title}</h3>
                  </div>
                  <p className="text-sm font-medium text-landvista-grey mb-6 leading-relaxed">{profile.desc}</p>
                  <div className="pt-6 border-t border-gray-50 flex items-start gap-3">
                    <Target size={14} className="text-landvista-blue mt-0.5" />
                    <p className="text-[10px] font-black text-landvista-blue uppercase tracking-widest leading-relaxed">Expectation: {profile.expectation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. ACCESS TIERS */}
          <div className="space-y-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Hierarchy</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Tier-Based Access Architecture</h2>
            </div>
            <div className="grid gap-6">
              {[
                { tier: "Preview Access", get: "Limited visibility into zones and platform capabilities", cond: "Open access (no qualification required)" },
                { tier: "Intelligence Access", get: "Signal-based insights, zone intelligence, and risk frameworks", cond: "Qualification approval + NDA acceptance" },
                { tier: "Mandate Access", get: "Deal-level intelligence, structured mandate opportunities, and advisory integration", cond: "Advanced qualification + mandate alignment" }
              ].map((t, i) => (
                <div key={i} className="p-8 bg-landvista-blue rounded-[2.5rem] text-white space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black uppercase italic tracking-tight">{t.tier}</h3>
                    <Layers size={20} className="opacity-40" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">What You Get:</p>
                      <p className="text-sm font-bold leading-relaxed">{t.get}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                      <FileCheck size={14} className="opacity-60" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Condition: {t.cond}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. PROCESS FLOW */}
          <div className="space-y-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Onboarding</p>
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic">Four-Step Institutional Onboarding</h2>
            </div>
            <div className="relative space-y-8 pl-8">
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-100" />
              {[
                { t: "Application Submission", d: "Structured profile submitted for qualification" },
                { t: "Eligibility Screening", d: "Profile evaluated against institutional criteria" },
                { t: "NDA Execution", d: "Mandatory digital NDA acceptance" },
                { t: "Access Provisioning", d: "Tier-based access granted based on approval" }
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 bg-white border-2 border-landvista-blue rounded-full z-10" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-landvista-blue uppercase tracking-tight">{i + 1}. {step.t}</h4>
                    <p className="text-sm font-medium text-landvista-grey">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="application-form" className="sticky top-20">
          <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
            <div className="p-10 bg-landvista-blue text-white">
              <h2 className="text-3xl font-black italic tracking-tighter mb-2">Structured Access Request</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Submission Control Framework</p>
            </div>

            <div className="p-10">
              {error && (
                <div className="mb-10 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-red-600">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest">Submission Error</p>
                    <p className="text-sm font-medium leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleRegister} className="space-y-10">
                  {/* Section A — Basic Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                      <div className="w-10 h-10 bg-landvista-blue text-white rounded-xl flex items-center justify-center font-black text-sm italic shadow-lg">A</div>
                      <h3 className="text-sm font-black text-landvista-blue uppercase tracking-widest">Basic Details</h3>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            placeholder="e.g. John Doe"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Organization</label>
                        <div className="relative group">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            placeholder="Organization Name"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Designation</label>
                        <div className="relative group">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            placeholder="Role / Designation"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Contact Number</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            placeholder="Contact Number"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Institutional Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            type="email"
                            placeholder="name@organization.com"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Security Password</label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            type="password"
                            placeholder="Create Password"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section B — Qualification */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                      <div className="w-10 h-10 bg-landvista-blue text-white rounded-xl flex items-center justify-center font-black text-sm italic shadow-lg">B</div>
                      <h3 className="text-sm font-black text-landvista-blue uppercase tracking-widest">Qualification</h3>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Investor Profile</label>
                        <div className="relative">
                          <select 
                            required
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white px-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm appearance-none cursor-pointer"
                            onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                          >
                            <option value="">Select Investor Type</option>
                            <option value="Institutional Fund">Institutional Fund</option>
                            <option value="Developer">Developer</option>
                            <option value="Family Office">Family Office</option>
                            <option value="HNI">HNI / Private Investor</option>
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Investment Band</label>
                        <div className="relative">
                          <select 
                            required
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white px-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm appearance-none cursor-pointer"
                            onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
                          >
                            <option value="">Select Ticket Size</option>
                            <option value="Under 5Cr">Under 5 Cr</option>
                            <option value="5-25Cr">5 – 25 Cr</option>
                            <option value="25-100Cr">25 – 100 Cr</option>
                            <option value="Above 100Cr">Above 100 Cr</option>
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Geography of Interest</label>
                        <div className="relative group">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            placeholder="Geography of Interest"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, geography: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Sector Interest</label>
                        <div className="relative group">
                          <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-blue transition-colors" />
                          <input
                            placeholder="Zone / Sector Interest"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm"
                            onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section C — Intent */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                      <div className="w-10 h-10 bg-landvista-blue text-white rounded-xl flex items-center justify-center font-black text-sm italic shadow-lg">C</div>
                      <h3 className="text-sm font-black text-landvista-blue uppercase tracking-widest">Intent</h3>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Purpose of Access</label>
                        <textarea 
                          required
                          placeholder="Purpose of Access (Detailed input required)"
                          rows={4}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white px-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm resize-none"
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Expected Timeline</label>
                        <div className="relative">
                          <select 
                            required
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white px-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm appearance-none cursor-pointer"
                            onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                          >
                            <option value="">Select Timeline</option>
                            <option value="Immediate">Immediate (0-3 Months)</option>
                            <option value="Short Term">Short Term (3-6 Months)</option>
                            <option value="Strategic">Strategic (6-12 Months)</option>
                            <option value="Ongoing">Ongoing Intelligence</option>
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-landvista-grey uppercase tracking-widest ml-1">Engagement Model</label>
                        <div className="relative">
                          <select 
                            required
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white px-4 py-4 rounded-2xl outline-none transition font-bold text-landvista-blue text-sm appearance-none cursor-pointer"
                            onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                          >
                            <option value="">Select Engagement</option>
                            <option value="Advisory">Advisory</option>
                            <option value="Intelligence">Intelligence</option>
                            <option value="Mandate">Mandate Participation</option>
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-landvista-blue text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/30 hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-gray-200 flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : (
                      <>Submit Application for Review <ArrowRight size={18} /></>
                    )}
                  </button>

                  <p className="text-center text-[10px] font-black text-landvista-grey uppercase tracking-widest leading-relaxed">
                    By submitting, you agree to our qualification criteria and institutional data handling policies.
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-8 py-10 text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-20 h-20 bg-blue-50 text-landvista-blue rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <KeyRound size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-landvista-blue italic tracking-tighter">Verify Identity</h3>
                    <p className="text-sm font-medium text-landvista-grey max-w-[200px] mx-auto">A 6-digit code has been sent to your institutional email.</p>
                  </div>

                  <input
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white px-4 py-6 rounded-2xl outline-none transition font-black text-3xl tracking-[0.5em] text-center text-landvista-blue"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  />

                  <button
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all disabled:bg-gray-200"
                  >
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify & Submit Application"}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[10px] font-black text-landvista-grey uppercase tracking-widest hover:text-landvista-blue"
                  >
                    Back to Application Form
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 10. DATA PRIVACY & 11. RESPONSE TIMELINE */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
              <div className="flex items-center gap-3 text-landvista-blue">
                <Lock size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Confidentiality</span>
              </div>
              <p className="text-[10px] font-bold text-landvista-grey leading-relaxed">Data used strictly for evaluation. No third-party sharing or commercial use.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
              <div className="flex items-center gap-3 text-landvista-blue">
                <Clock size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">SLA Timeline</span>
              </div>
              <p className="text-[10px] font-bold text-landvista-grey leading-relaxed">Initial review: 24–72 hours. Qualification decision within 5 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 14. FINAL CTA */}
      <section className="bg-landvista-blue py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[200px] -mr-96 -mt-96" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">Enter a Governed Intelligence System</h2>
            <p className="text-white/60 font-medium max-w-xl mx-auto">
              Apply for qualification-based access to institutional land intelligence — validated, controlled, and decision-ready.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#application-form" className="bg-white text-landvista-blue px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:-translate-y-1 transition-all">
              Apply for Access
            </a>
            <a href="#application-form" className="text-white font-black text-xs uppercase tracking-[0.2em] border-b-2 border-white/20 pb-1 hover:border-white transition-all">
              Submit Application
            </a>
          </div>
        </div>
      </section>

      {/* 12. TRUST & 13. LIMITATIONS Footer */}
      <footer className="py-20 px-6 border-t border-gray-50 bg-gray-50/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20">
          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Governance Enforcement</h5>
            <ul className="space-y-3">
              {["Every application reviewed", "Every access controlled", "Every interaction logged"].map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-landvista-grey">
                  <CheckCircle2 size={14} className="text-landvista-blue" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-landvista-blue uppercase tracking-widest">Access Boundaries</h5>
            <ul className="space-y-3">
              {["Not all applicants are approved", "Access may be restricted or revoked", "Platform participation is selective"].map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-landvista-grey">
                  <Info size={14} className="opacity-40" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 text-right md:text-right">
             <div className="text-4xl font-black text-landvista-blue tracking-tighter italic opacity-10">LANDVISTA</div>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Institutional Gating v2.4</p>
          </div>
        </div>
      </footer>
    </div>
  );
}