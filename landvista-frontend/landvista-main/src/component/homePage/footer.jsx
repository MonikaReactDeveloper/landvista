import React, { useState, useEffect } from "react";
import {
    Zap, ArrowRight, Shield, LayoutDashboard,
    FileText, Globe2, Mail, Globe, MapPin,
    CheckCircle2, Lock, Activity, Search,
    ChevronRight, ExternalLink
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { NAV_CONFIG } from "../../config/nav.config";

export default function Footer() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("currentUser");
        if (userData) setUser(JSON.parse(userData));
    }, []);

    const getSmartCTA = () => {
        if (!user) return {
            headline: "Access Institutional Land Intelligence",
            label: "Request Access",
            route: "/request-access",
            urgency: "Access is limited to qualified institutional participants."
        };
        if (user.status === 'pending') return {
            headline: "Application Under Review",
            label: "Check Status",
            route: "/request-access/status",
            urgency: "Our administration team is verifying your institutional profile."
        };
        if (user.role === 'admin' || user.role === 'Founder') return {
            headline: "Platform Control Center",
            label: "Go to Dashboard",
            route: "/dashboard",
            urgency: "Live system governance active."
        };
        return {
            headline: "Welcome Back to LandVista",
            label: "Go to Dashboard",
            route: "/dashboard",
            urgency: "Premium intelligence layer active."
        };
    };

    const smartCTA = getSmartCTA();

    const signals = [
        { zone: "Zone L", detail: "Participation ↑", trend: "up" },
        { zone: "Dwarka", detail: "Infra Momentum ↑", trend: "up" },
        { zone: "Sector X", detail: "Investor Activity ↑", trend: "up" },
        { zone: "Zone A", detail: "Policy Clarity +", trend: "stable" }
    ];

    return (
        <footer className="w-full bg-white border-t border-gray-100 relative overflow-hidden font-inter">

            {/* SECTION B — INTELLIGENCE SIGNAL STRIP */}
            <div className="w-full bg-landvista-blue py-3 overflow-hidden whitespace-nowrap border-b border-white/5">
                <div className="flex animate-marquee gap-12 items-center">
                    {[...signals, ...signals].map((s, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{s.zone}</span>
                            <span className="text-[10px] font-black text-white uppercase tracking-tighter">{s.detail}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${s.trend === 'up' ? 'bg-landvista-green' : 'bg-landvista-slate'}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-20 pb-8 relative z-10">

                {/* SECTION A — BRAND + POSITIONING */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    <div className="lg:col-span-5 space-y-8">
                        <div
                            onClick={() => navigate("/")}
                            className="flex items-center cursor-pointer group w-fit"
                        >
                            <img
                                src="/landvista-lockup-light.svg"
                                alt="LandVista Intelligence Infrastructure"
                                className="h-10 md:h-12 w-auto"
                            />
                        </div>
                        <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-[0.4em]">Intelligence Infrastructure</p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-landvista-charcoal uppercase tracking-widest flex items-center gap-2">
                                <Shield size={14} /> Institutional Land Intelligence Infrastructure
                            </h3>
                            <p className="text-sm font-medium text-landvista-grey leading-relaxed max-w-md">
                                Structured, policy-aligned land intelligence platform enabling institutional investors, developers, and family offices to make data-driven, risk-aware decisions.
                            </p>
                        </div>

                        {/* Core Trust Strip */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            {["Governance-first", "Intelligence-driven", "Non-brokerage", "Policy-aligned"].map((t, i) => (
                                <div key={i} className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                                    <CheckCircle2 size={12} className="text-landvista-charcoal" />
                                    <span className="text-[10px] font-black text-landvista-charcoal uppercase tracking-widest">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION G — CONVERSION STRIP (UPGRADED) */}
                    <div className="lg:col-span-7">
                        <div className="bg-landvista-blue/[0.02] rounded-[3rem] p-10 border border-landvista-blue/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Activity size={120} className="text-landvista-charcoal" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="space-y-2 text-center md:text-left">
                                    <h4 className="text-2xl font-black text-landvista-charcoal tracking-tighter uppercase">{smartCTA.headline}</h4>
                                    <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest">{smartCTA.urgency}</p>
                                </div>
                                <button
                                    onClick={() => navigate(smartCTA.route)}
                                    className="bg-landvista-blue hover:bg-landvista-blue-hover active:bg-landvista-blue-active text-white px-10 py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 whitespace-nowrap"
                                >
                                    {smartCTA.label} <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION C — NAVIGATION (4-COLUMN GRID) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-20 border-b border-gray-100">
                    {/* Col 1 — Platform */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all flex items-center gap-2 group italic uppercase">Home <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></Link></li>
                            <li><Link to="/advisory" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all flex items-center gap-2 group italic uppercase">Advisory <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></Link></li>
                            <li><Link to="/policy-zones" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all flex items-center gap-2 group italic uppercase">Policy & Zones <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></Link></li>
                            <li><Link to="/intelligence-preview" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all flex items-center gap-2 group italic uppercase">Intelligence Preview <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></Link></li>
                        </ul>
                    </div>

                    {/* Col 2 — Intelligence */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">Intelligence</h4>
                        <ul className="space-y-4">
                            <li><Link to="/policy-zones" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Zone Overview</Link></li>
                            <li><Link to="/dashboard" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Sector Intelligence</Link></li>
                            <li><Link to="/intelligence-preview" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Infrastructure Signals</Link></li>
                            <li><Link to="/dashboard" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Intelligence Framework</Link></li>
                            <li><Link to="/intelligence-preview/how-it-works" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">How It Works</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 — Company */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">About</Link></li>
                            <li><Link to="/governance" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Governance</Link></li>
                            <li><Link to="/about/founder-note" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Founder Note</Link></li>
                            <li><Link to="/contact" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Col 4 — Access */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">Access</h4>
                        <ul className="space-y-4">
                            <li><Link to="/request-access" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Request Access</Link></li>
                            <li><Link to="/contact" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Advisory Discussion</Link></li>
                            <li><Link to="/login" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">Login</Link></li>
                            <li><Link to="/governance/nda-data-security" className="text-sm font-bold text-landvista-charcoal/70 hover:text-landvista-charcoal transition-all uppercase">NDA & Data Security</Link></li>
                        </ul>
                    </div>
                </div>

                {/* SECTION D — CONTACT + SECTION H — TRANSPARENCY */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-20">
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-6">
                            <h4 className="text-[11px] font-black text-landvista-grey uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={14} /> Registered Headquarters
                            </h4>
                            <p className="text-sm font-black text-landvista-charcoal leading-relaxed uppercase italic">
                                LandVista Developers & Infrastructure Pvt. Ltd.<br />
                                7-A, Ground Floor, DLF Cyber City, Phase 2<br />
                                Sector 24, Gurugram – 122002, Haryana, India
                            </p>
                            <div className="flex flex-col gap-2">
                                <a href="mailto:contact@landvistaintel.com" className="text-sm font-black text-landvista-charcoal hover:underline underline-offset-4 decoration-2 flex items-center gap-2">
                                    <Mail size={14} /> contact@landvistaintel.com
                                </a>
                                <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest italic pt-2">
                                    * Access and engagement are subject to qualification and approval.
                                </p>
                            </div>
                        </div>

                        {/* System Search (Optional Bonus) */}
                        <div className="relative max-w-xs group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-landvista-charcoal transition-colors" />
                            <input
                                type="text"
                                placeholder="Search zones, sectors..."
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-landvista-blue/20 focus:bg-white pl-12 pr-4 py-4 rounded-2xl outline-none transition font-bold text-xs text-landvista-charcoal"
                            />
                        </div>
                    </div>

                    {/* SECTION E — LEGAL + GOVERNANCE */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="space-y-3">
                            <h5 className="text-[10px] font-black text-landvista-charcoal uppercase tracking-widest opacity-40">Primary Disclaimer</h5>
                            <p className="text-[11px] font-bold text-landvista-grey leading-relaxed uppercase">
                                LandVista operates as a non-brokerage land intelligence and advisory platform. No property transactions are executed through this platform.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h5 className="text-[10px] font-black text-landvista-charcoal uppercase tracking-widest opacity-40">Advisory Disclaimer</h5>
                            <p className="text-[11px] font-bold text-landvista-grey leading-relaxed uppercase">
                                All insights, signals, and outputs are interpretative and advisory in nature and should not be considered investment advice or solicitation.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h5 className="text-[10px] font-black text-landvista-charcoal uppercase tracking-widest opacity-40">Access Disclaimer</h5>
                            <p className="text-[11px] font-bold text-landvista-grey leading-relaxed uppercase">
                                Access to intelligence, documents, and mandates is restricted and NDA-controlled for institutional data integrity.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h5 className="text-[10px] font-black text-landvista-charcoal uppercase tracking-widest opacity-40">Platform Governance</h5>
                            <div className="grid grid-cols-1 gap-2">
                                {["RBAC Controlled Access", "NDA Enforced Security", "Audit-Tracked Activity"].map((g, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-landvista-blue rounded-full" />
                                        <span className="text-[10px] font-black text-landvista-charcoal uppercase tracking-[0.2em]">{g}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION F — POLICY LINKS + COPYRIGHT BAR */}
                <div className="pt-12 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
                        {NAV_CONFIG.legal.map((item, i) => (
                            <Link key={i} to={item.path} className="text-[10px] font-black text-landvista-grey uppercase tracking-widest hover:text-landvista-charcoal transition-colors flex items-center gap-2">
                                {item.name} <ExternalLink size={10} className="opacity-20" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-end text-center lg:text-right gap-2">
                        <p className="text-[11px] font-black text-landvista-charcoal uppercase tracking-tighter italic">
                            © 2026 LandVista Developers & Infrastructure Pvt. Ltd. <span className="text-gray-300 mx-2">|</span> All rights reserved.
                        </p>
                        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">
                            System Architecture: RBAC-04 // Institutional Layer Active
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}