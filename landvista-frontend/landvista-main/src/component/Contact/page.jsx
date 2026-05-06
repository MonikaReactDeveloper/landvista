import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/api";
import {
  ShieldCheck,
  Users,
  Zap,
  FileText,
  CheckCircle2,
  ChevronRight,
  Mail,
  MapPin,
  Lock,
  AlertCircle,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
  Shield,
  Loader
} from "lucide-react";
import Footer from "../homePage/footer";
import Navbar from "../homePage/navbar";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    fullName: "",
    organization: "",
    role: "",
    investorType: "",
    ticketSize: "",
    interestArea: [],
    purpose: "",
    timeline: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 📡 Live Backend Integration
      const response = await api.post("/engagement/submit", formState);

      if (response.data.success) {
        setSubmitted(true);
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Engagement Submission Error:", err);
      setError(err.response?.data?.message || "System validation failed. Please ensure all institutional fields are complete.");
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (area) => {
    setFormState(prev => ({
      ...prev,
      interestArea: prev.interestArea.includes(area)
        ? prev.interestArea.filter(a => a !== area)
        : [...prev.interestArea, area]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (

    <div className="bg-[#F9FAFB] min-h-screen font-inter pt-20">

      <Navbar />
      {/* 1. HERO — ENGAGEMENT POSITIONING */}
      <section className="relative py-24 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -mr-96 -mt-96 opacity-50" />
        <div className="mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
              <Shield className="text-landvista-blue" size={14} />
              <span className="text-[10px] font-black text-landvista-blue uppercase tracking-widest italic">Governed Gateway</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-landvista-blue tracking-tighter italic leading-[0.9]">
              Structured Engagement — <br />
              <span className="text-landvista-blue/30">Controlled Access.</span>
            </h1>
            <p className="text-xl md:text-2xl text-landvista-grey font-medium leading-relaxed max-w-2xl">
              A qualification-based engagement gateway designed to onboard institutional participants into a governance-first intelligence system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-landvista-blue text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all">
                Request Access <ArrowRight size={18} />
              </button>
              <button className="bg-white border-2 border-gray-100 text-landvista-blue px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
                Apply for Engagement
              </button>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-4">
              Trust is not assumed. It is provisioned through structured onboarding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT THIS PAGE IS */}
      <section className="py-24 bg-white">
        <div className="mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic uppercase">
                A Governed Entry — <br />
                <span className="text-landvista-blue/30">Not a Contact Form</span>
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Not a general enquiry form", color: "red" },
                  { label: "Not a lead collection interface", color: "red" },
                  { label: "Not an open communication channel", color: "red" },
                  { label: "A qualification-based entry system", color: "green" },
                  { label: "A controlled onboarding process", color: "green" },
                  { label: "A governance-led interaction layer", color: "green" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' : 'bg-red-400'}`} />
                    <span className={`text-sm font-bold uppercase tracking-widest ${item.color === 'green' ? 'text-landvista-blue' : 'text-gray-400'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-1 rounded-[3rem] bg-gradient-to-br from-gray-50 to-gray-200">
              <div className="bg-white rounded-[2.8rem] p-12 shadow-inner">
                <div className="w-16 h-16 bg-landvista-blue rounded-2xl flex items-center justify-center text-white mb-8">
                  <Layers size={32} />
                </div>
                <p className="text-lg font-medium text-landvista-grey leading-relaxed italic">
                  "LandVista does not operate through open channels. Every interaction is a structured step toward institutional alignment."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO SHOULD APPLY */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto px-4 md:px-8 max-w-7xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic uppercase uppercase">Designed for Institutional <span className="text-landvista-blue/30">Participants Only</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Institutional Investors",
                desc: "Capital allocators with defined land investment mandates requiring structured intelligence for decision-making",
                icon: <Building2 />
              },
              {
                title: "Developers",
                desc: "Organizations with active acquisition pipelines requiring policy-aligned opportunity evaluation and execution clarity",
                icon: <Briefcase />
              },
              {
                title: "Family Offices",
                desc: "Private capital entities seeking structured, risk-aware land intelligence for long-term allocation strategies",
                icon: <Users />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-landvista-blue">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-landvista-blue tracking-tight italic uppercase">{item.title}</h3>
                <p className="text-sm font-medium text-landvista-grey leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ENGAGEMENT PATHWAYS */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="mx-auto px-4 md:px-8 max-w-7xl space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-landvista-blue tracking-tighter italic uppercase uppercase">Defined Engagement <span className="text-landvista-blue/30">Pathways</span></h2>
              <p className="text-sm font-bold text-landvista-grey uppercase tracking-widest">Select the channel aligned with your institutional requirement</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-gray-100 border border-gray-100 rounded-[3rem] overflow-hidden">
            {[
              {
                title: "Advisory Access",
                desc: "Structured engagement for mandate definition, decision frameworks, and advisory alignment",
                apply: "When evaluating or structuring a capital deployment strategy",
                icon: <FileText />
              },
              {
                title: "Intelligence Access",
                desc: "Access to signal-based insights, zone intelligence, and risk frameworks",
                apply: "When requiring validated intelligence to support evaluation",
                icon: <Zap />
              },
              {
                title: "Mandate Participation",
                desc: "Access to curated, NDA-gated opportunities aligned with defined investment criteria",
                apply: "When actively participating in structured mandate-level opportunities",
                icon: <ShieldCheck />
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 space-y-8 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 text-landvista-blue group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-landvista-blue uppercase tracking-tight italic">{item.title}</h3>
                  <p className="text-sm text-landvista-grey font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-6 border-t border-gray-100 space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">When to Apply</p>
                  <p className="text-xs font-bold text-landvista-blue italic">{item.apply}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACCESS & QUALIFICATION PROCESS */}
      <section className="py-24 bg-landvista-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        </div>
        <div className="mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="space-y-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black tracking-tighter italic uppercase uppercase">Four-Step Institutional <br /><span className="opacity-30">Onboarding Flow</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { step: "01", title: "Application Submission", desc: "Submit structured profile with required qualification inputs" },
                { step: "02", title: "Eligibility Review", desc: "Profile evaluated against institutional criteria and mandate relevance" },
                { step: "03", title: "NDA Execution", desc: "Approved profiles proceed to NDA acceptance as a system-level access gate" },
                { step: "04", title: "Access Provisioning", desc: "Access granted at appropriate tier based on qualification outcome" }
              ].map((item, i) => (
                <div key={i} className="space-y-6 relative group">
                  <div className="text-5xl font-black opacity-10 group-hover:opacity-30 transition-opacity italic">{item.step}</div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm font-medium opacity-60 leading-relaxed">{item.desc}</p>
                  </div>
                  {i < 3 && <div className="hidden lg:block absolute top-6 -right-6 text-white/20"><ChevronRight size={40} /></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. & 7. APPLICATION FORM & LOGIC */}
      <section className="py-32 bg-white relative">
        <div className="mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-landvista-blue p-12 text-white space-y-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black italic uppercase leading-none tracking-tight">Structured <br /><span className="opacity-30">Submission</span></h2>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-[0.2em] leading-relaxed">Only complete, structured submissions enter the qualification system.</p>
                </div>

                <div className="space-y-8">
                  {[
                    { title: "Institutional Validation", icon: <ShieldCheck size={20} /> },
                    { title: "Governance Compliant", icon: <Lock size={20} /> },
                    { title: "Mandate Aligned", icon: <Layers size={20} /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.title}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-12 border-t border-white/10">
                  <div className="p-6 bg-white/5 rounded-2xl space-y-3">
                    <AlertCircle size={18} className="text-blue-300" />
                    <p className="text-[10px] font-bold opacity-80 leading-relaxed uppercase tracking-widest">Initial review: 48–72 hours. Qualification decision within 5–7 business days.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-12">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Institutional Profile</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/10 focus:bg-white p-4 rounded-xl outline-none font-bold text-landvista-blue transition-all"
                          required
                          value={formState.fullName}
                          onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Organization"
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/10 focus:bg-white p-4 rounded-xl outline-none font-bold text-landvista-blue transition-all"
                          required
                          value={formState.organization}
                          onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Role / Designation"
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/10 focus:bg-white p-4 rounded-xl outline-none font-bold text-landvista-blue transition-all"
                        required
                        value={formState.role}
                        onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                      />
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Qualification Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/10 focus:bg-white p-4 rounded-xl outline-none font-bold text-landvista-blue transition-all appearance-none"
                          required
                          value={formState.investorType}
                          onChange={(e) => setFormState({ ...formState, investorType: e.target.value })}
                        >
                          <option value="">Investor Type</option>
                          <option>Institutional Investor</option>
                          <option>Developer</option>
                          <option>Family Office</option>
                        </select>
                        <select
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/10 focus:bg-white p-4 rounded-xl outline-none font-bold text-landvista-blue transition-all appearance-none"
                          required
                          value={formState.ticketSize}
                          onChange={(e) => setFormState({ ...formState, ticketSize: e.target.value })}
                        >
                          <option value="">Ticket Size Range</option>
                          <option>₹50Cr–₹200Cr</option>
                          <option>₹200Cr–₹500Cr</option>
                          <option>₹500Cr+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Interest Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Zones", "Signals", "Mandates"].map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleInterest(area)}
                            className={`px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${formState.interestArea.includes(area)
                                ? "bg-landvista-blue text-white shadow-lg shadow-landvista-blue/20"
                                : "bg-gray-50 text-landvista-grey hover:bg-gray-100"
                              }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Intent & Timeline</h3>
                      <textarea
                        placeholder="Purpose of Engagement"
                        rows={3}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/10 focus:bg-white p-4 rounded-xl outline-none font-bold text-landvista-blue transition-all resize-none"
                        required
                        value={formState.purpose}
                        onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                      />
                      <select
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/10 focus:bg-white p-4 rounded-xl outline-none font-bold text-landvista-blue transition-all appearance-none"
                        required
                        value={formState.timeline}
                        onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                      >
                        <option value="">Decision Timeline</option>
                        <option>Immediate (1-3 Months)</option>
                        <option>Short Term (3-6 Months)</option>
                        <option>Strategic (6+ Months)</option>
                      </select>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                        <AlertCircle size={14} /> {error}
                      </div>
                    )}

                    <button
                      disabled={loading}
                      className="w-full bg-landvista-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {loading ? <Loader className="animate-spin" size={18} /> : "Submit Engagement Profile"}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-landvista-blue italic uppercase">Profile Submitted</h3>
                      <p className="text-sm font-medium text-landvista-grey max-w-xs mx-auto">Your institutional engagement profile is now in the eligibility review queue. Expect a response within 48-72 hours.</p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[10px] font-black text-landvista-blue uppercase tracking-widest border-b-2 border-landvista-blue"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. & 11. GOVERNANCE & TRUST */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Confidentiality", desc: "All data submitted is encrypted and strictly used for qualification evaluation.", icon: <Lock /> },
              { title: "No Third-Party Sharing", desc: "Engagement profiles are never shared with commercial entities or brokers.", icon: <ShieldCheck /> },
              { title: "Audit Traceable", desc: "Every engagement request is logged and traceable through the governance layer.", icon: <CheckCircle2 /> },
              { title: "Selective Access", desc: "Engagement is based on mandate relevance and institutional alignment.", icon: <Zap /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <div className="text-landvista-blue">{item.icon}</div>
                <h4 className="text-xs font-black uppercase tracking-widest text-landvista-blue">{item.title}</h4>
                <p className="text-[11px] font-medium text-landvista-grey leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ALTERNATIVE CONTACT (LIMITED) */}
      <section className="py-24 bg-white">
        <div className="mx-auto px-4 md:px-8 max-w-7xl">
          <div className="p-12 md:p-20 bg-gray-50 rounded-[4rem] border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl font-black text-landvista-blue tracking-tighter italic uppercase uppercase">Direct <br /><span className="text-landvista-blue/30">Communication</span></h2>
              <p className="text-xs font-bold text-landvista-grey uppercase tracking-widest">Direct contact does not replace the structured process.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-landvista-blue border border-gray-100">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Official Email</p>
                  <p className="text-sm font-bold text-landvista-blue">contact@landvistaintelligence.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-landvista-blue border border-gray-100">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Office</p>
                  <p className="text-sm font-bold text-landvista-blue">Gurugram, Haryana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. & 13. FINAL CTA & LIMITATIONS */}
      {/* <section className="py-32 relative overflow-hidden bg-landvista-blue text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="mx-auto px-4 md:px-8 max-w-7xl text-center relative z-10 space-y-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase uppercase leading-[0.9]">
              Enter a Governed <br />
              <span className="opacity-30">Intelligence System</span>
            </h2>
            <p className="text-lg md:text-xl opacity-60 font-medium max-w-2xl mx-auto">
              Apply for structured access to institutional land intelligence — validated, controlled, and designed for decision-making environments.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-white text-landvista-blue px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:-translate-y-1 transition-all">
              Apply for Access
            </button>
            <button className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all">
              Request Engagement
            </button>
          </div>

          <div className="pt-16 border-t border-white/10 flex flex-wrap justify-center gap-8 opacity-40">
             {["Institutional", "Validated", "Controlled", "Audit-Ready"].map(tag => (
               <span key={tag} className="text-[10px] font-black uppercase tracking-[0.3em] italic uppercase">{tag}</span>
             ))}
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
}
