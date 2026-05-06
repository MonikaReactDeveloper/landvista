import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Lock,
  ShieldCheck,
  ArrowUpRight,
  HardDrive,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import api from "../../utils/api";
import DocumentViewer from "./DocumentViewer";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";

export default function DocumentVault() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/documents");
      setDocs(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "Policy", "Maps", "Reports", "Technical", "Legal"];

  const filteredDocs = docs.filter((doc) => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || doc.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-inter mt-40">
      <Navbar />
      {/* BACKGROUND DECOR */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] -z-10" />

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3 text-landvista-blue mb-2">
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
                <HardDrive size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Data Room</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-landvista-blue tracking-tighter italic">
              DOCUMENT<span className="text-blue-600">VAULT</span>
            </h1>
            <p className="text-landvista-grey text-sm font-medium max-w-xl opacity-70">
              Access secure, watermarked institutional intelligence and policy frameworks protected by Tier-based encryption.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                placeholder="Search intelligence..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-semibold"
              />
            </div>
            <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-landvista-blue text-white shadow-lg' : 'text-gray-400 hover:text-landvista-blue'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex items-center gap-3 mt-10 overflow-x-auto pb-4 no-scrollbar">
          <Filter size={16} className="text-gray-400 mr-2 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all whitespace-nowrap border ${category === cat ? 'bg-landvista-blue text-white border-landvista-blue shadow-xl shadow-landvista-blue/10' : 'bg-white text-landvista-grey border-gray-100 hover:border-blue-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic animate-pulse">Synchronizing with Secure Server...</p>
          </div>
        ) : filteredDocs.length > 0 ? (
          <motion.div
            layout
            className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}
          >
            <AnimatePresence>
              {filteredDocs.map((doc, index) => (
                <motion.div
                  key={doc._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden ${viewMode === 'list' ? 'flex items-center p-4' : ''}`}
                >
                  {/* CARD TOP / LEFT */}
                  <div className={`p-6 ${viewMode === 'list' ? 'bg-blue-50 rounded-2xl mr-6' : 'bg-gray-50/50'} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="p-4 bg-white rounded-2xl shadow-sm w-fit relative z-10 group-hover:rotate-6 transition-transform">
                      <FileText size={24} className="text-blue-600" />
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 p-0 flex items-center justify-between' : ''}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[8px] font-black uppercase tracking-widest">{doc.category}</span>
                        <span className="flex items-center gap-1 text-[8px] font-bold text-gray-400 uppercase">
                          <Clock size={10} /> {new Date(doc.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-landvista-blue leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                    </div>

                    <div className={`flex items-center gap-4 ${viewMode === 'list' ? '' : 'mt-6'}`}>
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-landvista-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-landvista-blue/10"
                      >
                        <Eye size={14} /> Open Vault
                      </button>
                      <button className="p-3 border border-gray-100 hover:border-blue-600 text-gray-400 hover:text-blue-600 rounded-xl transition-all">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-40 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-black text-landvista-blue mb-2 italic">Null Results Found</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto font-medium">Your current search parameters did not return any encrypted data from the vault.</p>
          </div>
        )}
      </div>

      {/* FOOTER INFO */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
        <div className="flex items-center gap-4">
          <ShieldCheck size={24} className="text-green-600" />
          <p className="text-[10px] font-black uppercase tracking-widest text-landvista-blue">End-to-End Encrypted Data Gating v4.0</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <p className="text-[10px] font-black uppercase tracking-widest text-landvista-blue">Secure Server Connection: Optimal</p>
        </div>
      </div>

      {/* MODAL / VIEWER */}
      <AnimatePresence>
        {selectedDoc && (
          <DocumentViewer
            doc={selectedDoc}
            onClose={() => setSelectedDoc(null)}
          />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}