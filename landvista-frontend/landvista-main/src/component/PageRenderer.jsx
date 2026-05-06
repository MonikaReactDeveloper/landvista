import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, Zap, Layout } from 'lucide-react';
import Navbar from './homePage/navbar';
import Footer from './homePage/footer';

export default function PageRenderer({ page }) {
  if (!page) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-2xl font-black text-landvista-blue uppercase italic tracking-tighter mb-4">Intelligence Missing</h1>
        <p className="text-landvista-grey text-sm font-medium mb-8">The requested intelligence layer could not be located in the current repository.</p>
        <button onClick={() => window.history.back()} className="text-[10px] font-black text-landvista-blue uppercase tracking-widest border-b-2 border-landvista-blue pb-1">Return to Safety</button>
      </div>
    </div>
  );

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-landvista-bg min-h-screen selection:bg-landvista-blue selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -mr-96 -mt-96 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-landvista-blue" />
              <span className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.4em]">{page.title || "Intelligence Detail"}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-landvista-blue leading-[0.9] tracking-tighter italic uppercase mb-8">
              {page.hero.heading.split(' — ')[0]} <br />
              <span className="text-landvista-blue/20">{page.hero.heading.split(' — ')[1] || ""}</span>
            </h1>
            <p className="text-xl font-medium text-landvista-grey max-w-2xl leading-relaxed opacity-80">
              {page.hero.subtext}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
        {page.sections.map((section, i) => {
          switch (section.type) {
            case "text":
              return (
                <motion.div key={i} {...fadeIn} className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-2 rounded-full bg-landvista-blue" />
                    <h2 className="text-2xl font-black text-landvista-blue uppercase italic tracking-tighter">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-lg text-landvista-grey font-medium leading-relaxed opacity-70">
                    {section.content}
                  </p>
                </motion.div>
              );

            case "grid":
              return (
                <motion.div key={i} {...fadeIn}>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-2 h-2 rounded-full bg-landvista-blue" />
                    <h2 className="text-2xl font-black text-landvista-blue uppercase italic tracking-tighter">
                      {section.title}
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                      >
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-landvista-blue mb-8 group-hover:bg-landvista-blue group-hover:text-white transition-all">
                          {idx % 2 === 0 ? <ShieldCheck size={24} /> : <Zap size={24} />}
                        </div>
                        <p className="text-sm font-black text-landvista-blue uppercase italic leading-tight mb-4">
                          {item.split(': ')[0]}
                        </p>
                        <p className="text-xs text-landvista-grey font-medium leading-relaxed opacity-60 uppercase tracking-widest">
                          {item.split(': ')[1] || ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );

            default:
              return null;
          }
        })}
      </div>

      <Footer />
    </div>
  );
}