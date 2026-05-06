import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Search, Shield,
  ArrowRight, LayoutDashboard, LogOut,
  Lock, Zap, Globe, FileText, Settings,
  Users, BarChart3, Globe2,
  ChevronRight
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import SignalStrip from "./SignalStrip";
import { NAV_CONFIG } from "../../config/nav.config";
import { getAuth, logout } from "../../utils/auth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [user, setUser] = useState(null);
  const [navItems, setNavItems] = useState(NAV_CONFIG.public);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [allSearchable, setAllSearchable] = useState([]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Check user state using consolidated utility
    const auth = getAuth();
    if (auth && auth.user) {
      setUser(auth.user);
    } else {
      // Fallback for legacy
      const userData = localStorage.getItem("currentUser");
      if (userData) setUser(JSON.parse(userData));
    }

    // Fetch Searchable Data (Zones & Sectors)
    const fetchSearchable = async () => {
      try {
        const [zonesRes, sectorsRes] = await Promise.all([
          api.get("/policy/zones"),
          api.get("/policy/sectors")
        ]);

        const zones = (zonesRes.data.data || zonesRes.data || []).map(z => ({
          ...z,
          type: "Zone",
          path: `/policy-zones/${z.slug}`
        }));

        const sectors = (sectorsRes.data.data || sectorsRes.data || []).map(s => ({
          ...s,
          type: "Sector",
          path: `/policy-zones/${s.zone?.slug}/${s.slug}`
        }));

        setAllSearchable([...zones, ...sectors]);
      } catch (err) {
        console.error("Search Data Fetch Failed", err);
      }
    };

    // Fetch Dynamic Advisory Links
    const fetchAdvisoryLinks = async () => {
      try {
        const res = await api.get("/advisory");
        const data = res.data.data || res.data;
        if (Array.isArray(data)) {
          const links = data.map(adv => ({
            name: adv.title,
            path: `/advisory/${adv.slug}`
          }));

          setNavItems(prev => prev.map(item => {
            if (item.name === "Advisory") {
              return { ...item, subItems: links };
            }
            return item;
          }));
        }
      } catch (err) {
        console.error("Nav Advisory Fetch Failed", err);
      }
    };

    // Fetch Dynamic Zone Links
    const fetchZoneLinks = async () => {
      try {
        const res = await api.get("/policy/zones");
        const data = res.data.data || res.data;
        if (Array.isArray(data)) {
          const links = data.map(zone => ({
            name: zone.name,
            path: `/policy-zones/${zone.slug}`
          }));


          setNavItems(prev => prev.map(item => {
            if (item.name === "Policy & Zones") {
              return { ...item, subItems: links };
            }
            return item;
          }));
        }
      } catch (err) {
        console.error("Nav Zones Fetch Failed", err);
      }
    };

    fetchAdvisoryLinks();
    fetchZoneLinks();
    fetchSearchable();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = allSearchable.filter(item =>
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.code?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setSearchResults(filtered);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const getSmartCTA = () => {
    if (!user) return { label: "Request Access", route: "/request", icon: <ArrowRight size={14} /> };
    if (user.role === 'admin' || user.role === 'Founder') return { label: "War Room", route: "/admin/dashboard", icon: <Shield size={14} /> };
    if (user.status === 'Pending') return { label: "Check Application", route: "/request-access", icon: <Zap size={14} /> };
    if (user.ndaStatus !== 'signed') return { label: "Sign NDA", route: "/nda", icon: <FileText size={14} /> };
    return { label: "Institutional Dashboard", route: "/dashboard", icon: <LayoutDashboard size={14} /> };
  };

  const smartCTA = getSmartCTA();

  return (
    <nav className="fixed top-0 z-[200] w-full" onMouseLeave={() => setShowSearch(false)}>
      <SignalStrip />

      <div className={`w-full transition-all duration-500 border-b ${scrolled
        ? "bg-white/90 backdrop-blur-xl py-2 border-gray-100 shadow-xl"
        : "bg-white/50 backdrop-blur-md py-4 border-transparent"
        }`}>
        <div className="mx-auto px-4 md:px-8 flex justify-between items-center gap-3">

          {/* LOGO */}
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="/landvista-wordmark-light.svg" 
              alt="LandVista" 
              className="h-7 md:h-8 w-auto min-w-[120px]"
            />
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.filter(item => item.path !== "/").map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setActiveMenu(i)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors ${activeMenu === i ? "text-landvista-charcoal bg-gray-50" : "text-landvista-grey hover:text-landvista-charcoal"
                    }`}>

                  {item.name}
                  {item.subItems && <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === i ? "rotate-180" : ""}`} />}
                </button>

                {/* MEGA MENU */}
                {/* <AnimatePresence>
                  {activeMenu === i && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[400px]"
                    >
                      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden p-8">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-4">Available Intelligence</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {item.subItems.map((sub, j) => (
                              <button 
                                key={j}
                                onClick={() => { navigate(sub.path); setActiveMenu(null); }}
                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all text-left group"
                              >
                                <span className="text-[13px] font-black text-landvista-charcoal opacity-80 group-hover:opacity-100 transition-all">{sub.name}</span>
                                <ArrowRight size={14} className="text-landvista-charcoal opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence> */}
                {/* MEGA MENU - FULL WIDTH (CBRE STYLE) */}
                <AnimatePresence>
                  {activeMenu === i && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute left-0 top-full w-screen bg-white shadow-2xl border-t z-[150]"
                    >
                      <div className="max-w-[1440px] mx-auto px-10 py-10 grid grid-cols-4 gap-10">

                        {/* 🔹 LEFT PANEL (DYNAMIC CONTENT) */}
                        <div className="col-span-1 space-y-4 border-r pr-6">
                          <h2 className="text-2xl font-semibold text-landvista-charcoal">
                            {item.name}
                          </h2>

                          <p className="text-sm text-gray-500 leading-relaxed">
                            Unlock the value in every dimension of your real estate with
                            integrated, data-led services that support your strategy.
                          </p>

                          <button
                            onClick={() => {
                              navigate(item.path);
                              setActiveMenu(null);
                            }}
                            className="mt-3 bg-landvista-blue text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2"
                          >
                            Explore <ArrowRight size={14} />
                          </button>
                        </div>

                        {/* 🔹 RIGHT PANEL (3 COLUMNS) */}
                        {/* 🔹 RIGHT PANEL (TRENDING TOPICS - COLUMN FIRST) */}
                        <div className="col-span-3 text-sm">
                          <h4 className="font-semibold text-gray-400 mb-6 uppercase text-[10px] tracking-widest">
                            Trending Topics
                          </h4>

                          {/* FLEX CONTAINER FOR COLUMNS */}
                          <div className="flex flex-wrap gap-x-16 gap-y-10">
                            {Array.from({ length: Math.ceil(item.subItems.length / 5) }).map((_, colIdx) => (
                              <div key={colIdx} className="flex flex-col gap-1 min-w-[200px]">
                                {item.subItems.slice(colIdx * 5, (colIdx + 1) * 5).map((sub, j) => (
                                  <button
                                    key={j}
                                    onClick={() => {
                                      navigate(sub.path);
                                      setActiveMenu(null);
                                    }}
                                    className="flex justify-between items-center w-full py-2 border-b border-gray-50 hover:text-landvista-charcoal hover:border-landvista-blue/30 transition-all group text-left"
                                  >
                                    <span className="truncate pr-4">{sub.name}</span>
                                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all shrink-0 -translate-x-1 group-hover:translate-x-0" />
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>


                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* SEARCH */}
            <div className="relative hidden 2xl:block">
              <div className="flex items-center bg-gray-100/50 rounded-2xl px-4 py-2 border border-transparent focus-within:border-landvista-blue/20 transition-all">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search zones, sectors..."
                  className="bg-transparent border-none outline-none px-3 text-[12px] font-bold text-landvista-charcoal w-40 focus:w-60 transition-all"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => searchQuery.length > 1 && setShowSearch(true)}
                />
              </div>

              {/* SEARCH RESULTS DROPDOWN */}
              <AnimatePresence>
                {showSearch && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden z-[250]"
                  >
                    <div className="p-2 space-y-1">
                      {searchResults.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            navigate(item.path);
                            setShowSearch(false);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group"
                        >
                          <div className="flex flex-col items-start">
                            <span className="text-[11px] font-black text-landvista-charcoal uppercase tracking-tight">{item.name}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.type} {item.code ? `• ${item.code}` : ""}</span>
                          </div>
                          <ChevronRight size={14} className="text-gray-300 group-hover:text-landvista-charcoal transition-all" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* USER STATE / LOGIN */}
            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="hidden md:block px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-landvista-charcoal hover:bg-landvista-bg rounded-xl transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate(smartCTA.route)}
                  className="bg-landvista-blue hover:bg-landvista-blue-hover active:bg-landvista-blue-active text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  {smartCTA.label} {smartCTA.icon}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(smartCTA.route)}
                  className="bg-landvista-blue hover:bg-landvista-blue-hover active:bg-landvista-blue-active text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  {smartCTA.label} {smartCTA.icon}
                </button>
                <button
                  onClick={handleLogout}
                  className="p-3 bg-landvista-bg text-landvista-grey rounded-xl hover:bg-landvista-maroon hover:text-white transition-colors"
                  title="Secure Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-3 bg-gray-50 text-landvista-charcoal rounded-2xl"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[300] bg-white lg:hidden overflow-y-auto"
          >
            <div className="p-8 space-y-10">
              <div className="flex justify-between items-center">
                <div className="flex items-baseline">
                  <img 
                    src="/landvista-wordmark-light.svg" 
                    alt="LandVista" 
                    className="h-8 w-auto"
                  />
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-3 bg-landvista-bg rounded-xl">
                  <X size={24} className="text-landvista-charcoal" />
                </button>
              </div>

              <div className="space-y-8">
                {navItems.map((item, i) => (
                  <div key={i} className="space-y-4">
                    <button
                      onClick={() => { navigate(item.path); !item.subItems && setMobileOpen(false); }}
                      className="text-2xl font-black text-landvista-charcoal uppercase tracking-tighter italic"
                    >
                      {item.name}
                    </button>
                    {item.subItems && (
                      <div className="grid grid-cols-1 gap-4 pl-4 border-l-2 border-gray-50">
                        {item.subItems.map((sub, j) => (
                          <button
                            key={j}
                            onClick={() => { navigate(sub.path); setMobileOpen(false); }}
                            className="text-sm font-bold text-landvista-grey text-left uppercase tracking-widest"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-gray-50 space-y-4">
                <button
                  onClick={() => { navigate(smartCTA.route); setMobileOpen(false); }}
                  className="w-full bg-landvista-blue text-white py-5 rounded-3xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-landvista-blue/20"
                >
                  {smartCTA.label} {smartCTA.icon}
                </button>
                {!user && (
                  <button
                    onClick={() => { navigate("/login"); setMobileOpen(false); }}
                    className="w-full py-5 text-sm font-black text-landvista-charcoal uppercase tracking-widest bg-gray-50 rounded-3xl"
                  >
                    Login to Portal
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}