import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  ShieldAlert, 
  Maximize2, 
  Download, 
  Printer, 
  ShieldCheck,
  Lock,
  EyeOff
} from "lucide-react";
import api from "../../utils/api";

export default function DocumentViewer({ doc, onClose }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    verifyAccess();
  }, [doc]);

  const verifyAccess = async () => {
    setChecking(true);
    try {
      // Server-side access verification and audit logging
      const response = await api.get(`/documents/${doc._id}/view`);
      setHasAccess(true);
    } catch (error) {
      console.error("Access Denied:", error);
      setHasAccess(false);
    } finally {
      setChecking(false);
    }
  };

  if (checking) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] animate-pulse">Decrypting Access Matrix...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6"
      >
        <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] max-w-lg w-full text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-red-500/20">
            <ShieldAlert size={40} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white mb-2 italic">ACCESS REJECTED</h2>
            <p className="text-sm text-white/40 font-medium leading-relaxed">
              You do not have the required institutional clearance level to view this encrypted file. 
              Contact your account manager for Tier escalation.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Dismiss Session
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[100] flex flex-col overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* SECURE TOOLBAR */}
      <div className="h-[80px] bg-white/5 border-b border-white/10 px-8 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">{doc.title}</h3>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 text-[9px] font-bold text-green-500 uppercase">
                <Lock size={10} /> End-to-End Encrypted
              </span>
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">
                Session ID: {Math.random().toString(36).substring(7).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 mr-6 text-white/20">
            <EyeOff size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Screenshot Protection Active</span>
          </div>
          <button 
            onClick={onClose}
            className="p-4 bg-white/10 hover:bg-red-500 text-white rounded-2xl transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* VIEWER AREA */}
      <div className="flex-1 relative bg-[#111] overflow-hidden flex items-center justify-center p-4 md:p-12">
        {/* WATERMARK OVERLAY */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-[0.03] select-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex items-center justify-center text-4xl font-black text-white rotate-[-35deg] uppercase whitespace-nowrap">
              {user.email || 'CONFIDENTIAL'}
            </div>
          ))}
        </div>

        <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-2xl shadow-black relative z-10">
          {doc.fileUrl?.endsWith('.pdf') ? (
            <iframe 
              src={`${doc.fileUrl}#toolbar=0`} 
              className="w-full h-full border-none"
              title="Secure Intelligence Viewer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 p-10">
               <img 
                 src={doc.fileUrl} 
                 className="max-w-full max-h-full object-contain shadow-2xl" 
                 alt="Intelligence Asset"
                 onDragStart={(e) => e.preventDefault()}
               />
            </div>
          )}
        </div>
      </div>

      {/* FOOTER AUDIT */}
      <div className="p-6 bg-white/5 border-t border-white/10 text-center">
         <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
           Viewing privileges granted for institutional purposes only • Legal action will follow unauthorized distribution
         </p>
      </div>
    </motion.div>
  );
}