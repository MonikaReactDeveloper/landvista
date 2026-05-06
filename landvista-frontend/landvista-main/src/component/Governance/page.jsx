import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, Lock, Eye, FileCheck, Search, 
  Activity, Users, Zap, AlertCircle, 
  CheckCircle2, ArrowRight, ShieldCheck,
  Server, Fingerprint, Database, BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../homePage/footer";
import Navbar from "../homePage/navbar";

export default function GovernancePage() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-landvista-bg min-h-screen selection:bg-landvista-blue selection:text-white">
      <Navbar />

      {/* 1. HERO — CONTROL POSITIONING */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0052CC 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-landvista-blue" />
              <span className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">Institutional Governance</span>
            </div>
            <h1 className="text-[64px] lg:text-[84px] font-black text-landvista-blue leading-[0.9] tracking-tighter italic uppercase mb-8">
              Governance & Control — <span className="text-landvista-blue/20">System-Enforced.</span> Not Assumed.
            </h1>
            <p className="text-2xl font-medium text-landvista-grey max-w-2xl mb-10 leading-relaxed opacity-80">
              A governance-first system where every access, every signal, and every output is controlled, validated, and audit-traceable through enforced architecture.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => navigate('/request-access')}
                className="w-full sm:w-auto bg-landvista-blue text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Request Access <ArrowRight size={16} />
              </button>
              <button className="w-full sm:w-auto bg-gray-50 text-landvista-blue px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-gray-100 hover:bg-white transition-all">
                View Framework
              </button>
            </div>
            <p className="text-[10px] font-bold text-gray-400 mt-8 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className="text-landvista-blue" /> Trust is not declared. It is enforced.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. GOVERNANCE PHILOSOPHY */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="mb-20">
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-4">
              Four Principles That <span className="text-landvista-blue/20">Govern the System</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "No Data Without Validation", desc: "Every data point must pass multi-source validation before entering the intelligence layer", icon: Database },
              { title: "No Access Without Approval", desc: "Every user is qualified, approved, and tier-controlled before access is granted", icon: Lock },
              { title: "No Signal Without Verification", desc: "Signals are generated only after validation, scoring, and cross-layer consistency", icon: Zap },
              { title: "No Action Without Audit", desc: "Every system interaction is logged, traceable, and available for review", icon: Activity }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-gray-50 rounded-[3rem] border border-transparent hover:border-landvista-blue/10 hover:bg-white hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-landvista-blue shadow-sm mb-8 group-hover:bg-landvista-blue group-hover:text-white transition-all">
                  <p.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-landvista-blue uppercase italic mb-4 leading-tight">{p.title}</h3>
                <p className="text-sm text-landvista-grey font-medium leading-relaxed opacity-60">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ACCESS CONTROL SYSTEM (RBAC) */}
      <section className="py-32 px-6 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-8">
                Role-Based, <span className="text-landvista-blue/20">Tier-Controlled</span> Access
              </h2>
              <p className="text-lg text-landvista-grey font-medium leading-relaxed mb-10 opacity-70">
                Access is enforced through Role-Based Access Control (RBAC) combined with tier-based visibility. Users only see what their role, tier, and context allow.
              </p>
              <div className="p-8 bg-landvista-blue rounded-[2.5rem] text-white shadow-2xl shadow-landvista-blue/20">
                <Shield size={32} className="mb-4 opacity-50" />
                <p className="text-xl font-black italic uppercase">Access Statement</p>
                <p className="opacity-70 mt-2">Nothing beyond your authorized tier is rendered or accessible. Guaranteed.</p>
              </div>
            </motion.div>

            <div className="space-y-4">
              {[
                { name: "Public (Visitor Layer)", level: "Limited Preview", desc: "Limited preview of platform structure and zone-level summaries. No access to intelligence." },
                { name: "Intelligence Layer", level: "NDA-Gated", desc: "Access to validated intelligence, signals, and structured outputs. Visibility restricted by tier." },
                { name: "Mandate Layer", level: "Restricted", desc: "Access to mandate-specific intelligence, documents, and decision frameworks." },
                { name: "Admin Layer", level: "Governance Control", desc: "Full system access for governance control, approvals, and real-time monitoring." }
              ].map((role, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn} 
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-[2rem] border border-gray-100 flex gap-6 group hover:border-landvista-blue transition-all"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-landvista-blue font-black group-hover:bg-landvista-blue group-hover:text-white transition-all">0{i+1}</div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-black text-landvista-blue uppercase italic">{role.name}</h4>
                      <span className="text-[9px] font-black px-2 py-0.5 bg-gray-100 text-gray-400 rounded uppercase">{role.level}</span>
                    </div>
                    <p className="text-xs text-landvista-grey opacity-60 leading-relaxed">{role.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. NDA & 5. DOCUMENT SECURITY */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <motion.div {...fadeIn} className="p-12 bg-gray-900 rounded-[4rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Lock size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-8">NDA as a <span className="text-white/20">Technical Gate</span></h3>
              <ul className="space-y-6 mb-12">
                <li className="flex gap-4 text-sm opacity-80 leading-relaxed">
                  <CheckCircle2 className="text-landvista-blue shrink-0" size={20} />
                  NDA acceptance is mandatory before intelligence access
                </li>
                <li className="flex gap-4 text-sm opacity-80 leading-relaxed">
                  <CheckCircle2 className="text-landvista-blue shrink-0" size={20} />
                  NDA is version-controlled and enforced
                </li>
                <li className="flex gap-4 text-sm opacity-80 leading-relaxed">
                  <CheckCircle2 className="text-landvista-blue shrink-0" size={20} />
                  Every acceptance is timestamped and logged with IP and device
                </li>
              </ul>
              <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl border border-white/20">
                <Fingerprint className="text-landvista-blue" />
                <span className="text-xs font-black uppercase tracking-widest">Rule: No NDA → No Access</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeIn} className="p-12 bg-landvista-blue rounded-[4rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <FileCheck size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Controlled <span className="text-white/20">Document Access</span></h3>
              <ul className="space-y-6 mb-12">
                <li className="flex gap-4 text-sm opacity-80 leading-relaxed">
                  <ShieldCheck className="text-white shrink-0" size={20} />
                  No direct file access or public URLs
                </li>
                <li className="flex gap-4 text-sm opacity-80 leading-relaxed">
                  <ShieldCheck className="text-white shrink-0" size={20} />
                  Watermarking with user identity and timestamp
                </li>
                <li className="flex gap-4 text-sm opacity-80 leading-relaxed">
                  <ShieldCheck className="text-white shrink-0" size={20} />
                  Expiring access links generated server-side
                </li>
              </ul>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Security Statement: Documents are accessed, not distributed.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. DATA VALIDATION & 7. AUDIT */}
      <section className="py-32 px-6 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-10">
              Data Validation & <span className="text-landvista-blue/20">Audit System</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-landvista-blue shrink-0">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="font-black text-landvista-blue uppercase italic mb-2">Multi-Source Validation</h4>
                  <p className="text-xs text-landvista-grey opacity-60 leading-relaxed">No single-source data enters the intelligence layer. Validation spans policy, spatial, and market signal layers.</p>
                </div>
              </div>
              <div className="flex gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-landvista-blue shrink-0">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="font-black text-landvista-blue uppercase italic mb-2">Full Traceability</h4>
                  <p className="text-xs text-landvista-grey opacity-60 leading-relaxed">Every user action is logged. Access is tracked at the object level, and system changes are recorded with full history.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeIn} className="relative">
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl p-10 overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-amber-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Audit Stream | Live</span>
                </div>
                <div className="space-y-4 font-mono text-[10px]">
                    <p className="text-green-600">[2026-05-04 13:42:01] USER_AUTH_SUCCESS | ID: 842 | IP: 192.168.1.1</p>
                    <p className="text-blue-600">[2026-05-04 13:42:15] INTEL_ACCESS_VALIDATED | TIER_3 | ZONE: SEZ-A</p>
                    <p className="text-purple-600">[2026-05-04 13:43:05] DOC_RENDERED | ID: M-84 | USER_WATERMARK_INJECTED</p>
                    <p className="text-amber-600">[2026-05-04 13:44:12] SIGNAL_CROSS_VALIDATION_PASSED | CONF_4.5</p>
                    <p className="text-gray-400">[2026-05-04 13:45:00] SESSION_CONTROL_SYNC_COMPLETE</p>
                </div>
                <div className="mt-10 pt-10 border-t border-gray-50">
                    <p className="text-xs font-bold text-landvista-blue uppercase">Every action leaves a trace.</p>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. SIGNAL CONTROL & 9. SESSION SECURITY */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div {...fadeIn}>
             <h3 className="text-2xl font-black text-landvista-blue uppercase italic mb-8">Controlled Intelligence — <span className="text-landvista-blue/20">Not Automated Decisions</span></h3>
             <div className="grid grid-cols-2 gap-4">
                {[
                  "Validation & Scoring", "Confidence Scoring", "Risk Mapping", "Structured Outputs"
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <ShieldCheck size={18} className="text-landvista-blue" />
                    <span className="text-xs font-bold text-landvista-blue uppercase">{item}</span>
                  </div>
                ))}
             </div>
             <p className="mt-8 text-sm text-landvista-grey opacity-60 leading-relaxed italic border-l-2 border-landvista-blue/20 pl-6">
                "The system supports decisions. It does not make them. Control is maintained through human-in-the-loop validation."
             </p>
          </motion.div>

          <motion.div {...fadeIn}>
             <h3 className="text-2xl font-black text-landvista-blue uppercase italic mb-8">Session-Level <span className="text-landvista-blue/20">Enforcement</span></h3>
             <div className="space-y-4">
                {[
                  { title: "Session Timeouts", desc: "Enforced automatically for security" },
                  { title: "IP tracking", desc: "Device and location-aware sessions" },
                  { title: "Concurrent Limits", desc: "Single-session enforcement" },
                  { title: "Pattern Flagging", desc: "Suspicious access detection" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div>
                      <h5 className="text-sm font-black text-landvista-blue uppercase">{item.title}</h5>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.desc}</p>
                    </div>
                    <CheckCircle2 className="text-green-500" size={16} />
                  </div>
                ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* 10. ADMIN & 11. SYSTEM RULES */}
      <section className="py-32 px-6 bg-landvista-blue text-white rounded-[5rem] mx-4 mb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-10">Central <span className="text-white/20">Governance Authority</span></h2>
              <div className="grid gap-6">
                {[
                  "Manual user approvals", "Role assignment and tier control", "Access revocation capability", "Founder-level override"
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/20">
                    <Shield size={20} className="text-landvista-blue" />
                    <span className="text-sm font-black uppercase tracking-widest">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-10">Non-Negotiable <span className="text-white/20">System Rules</span></h2>
              <div className="space-y-4">
                {[
                  { rule: "No access", action: "Block" },
                  { rule: "No data", action: "Flag" },
                  { rule: "Wrong data", action: "Correct + Log" },
                  { rule: "Invalid state", action: "Reject" }
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center p-6 bg-white text-landvista-blue rounded-2xl font-black italic uppercase">
                    <span>{r.rule}</span>
                    <ArrowRight size={20} />
                    <span>{r.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. GOVERNANCE DIFFERENTIATION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-4xl font-black text-landvista-blue uppercase italic tracking-tighter mb-4">
              From Informal Platforms to <span className="text-landvista-blue/20">Controlled Systems</span>
            </h2>
          </motion.div>

          <div className="overflow-hidden rounded-[3rem] border border-gray-100 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Traditional Platforms</th>
                  <th className="p-10 text-[10px] font-black text-landvista-blue uppercase tracking-widest bg-blue-50/50">LandVista Governance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Open access", "Controlled access"],
                  ["Unverified data", "Multi-source validated"],
                  ["No audit logs", "Full audit tracking"],
                  ["Informal usage", "Governance-enforced"],
                  ["Visibility-based access", "Role + tier + context control"]
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                    <td className="p-10 text-sm font-medium text-landvista-grey opacity-60">{row[0]}</td>
                    <td className="p-10 text-sm font-black text-landvista-blue bg-blue-50/20">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 13. TRUST & 14. LIMITATIONS */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-2xl font-black text-landvista-blue uppercase italic mb-10 flex items-center gap-3">
              <ShieldCheck size={28} /> Trust Built Through Control
            </h3>
            <div className="space-y-4">
              {[
                "Every data point is validated", "Every signal is verified", "Every access is controlled", "Every action is logged"
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100">
                  <div className="w-2 h-2 bg-landvista-blue rounded-full" />
                  <span className="text-xs font-black text-landvista-blue uppercase tracking-widest">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-gray-400 uppercase italic mb-10 flex items-center gap-3">
              <AlertCircle size={28} /> Defined System Boundaries
            </h3>
            <ul className="space-y-6">
              {[
                { label: "Does not eliminate risk", desc: "Governance improves decision quality but does not remove market uncertainty." },
                { label: "Does not replace responsibility", desc: "Institutional users remain responsible for final capital allocation decisions." },
                { label: "Does not guarantee outcomes", desc: "The platform provides decision-support, not financial guarantees." }
              ].map((l, i) => (
                <li key={i}>
                  <h5 className="text-sm font-black text-landvista-grey uppercase mb-1">{l.label}</h5>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{l.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 15. FINAL CTA */}
      <section className="py-40 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-[56px] font-black text-landvista-blue leading-[0.9] tracking-tighter italic uppercase mb-8">
              Access a Governed <span className="text-landvista-blue/20">Intelligence Platform</span>
            </h2>
            <p className="text-xl text-landvista-grey font-medium mb-12 max-w-2xl mx-auto opacity-70">
              Engage with a system where every interaction is controlled, every output is validated, and every action is audit-traceable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/request-access')}
                className="w-full sm:w-auto bg-landvista-blue text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-landvista-blue/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                Request Access <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full sm:w-auto bg-gray-50 text-landvista-blue px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-gray-100 hover:bg-white transition-all"
              >
                Enter Platform
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}