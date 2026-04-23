"use client";

import React from "react";
import Footer from "../homePage/footer";
import Navbar from "../homePage/navbar";
import { motion } from "framer-motion";
import { ShieldCheck, Database, Layers } from "lucide-react";

export default function AboutPage() {
     const items = [
    {
      icon: <Database size={20} />,
      title: "Intelligence Platform",
      desc: "Structured intelligence system designed to support land decision-making, not brokerage activity.",
    },
    {
      icon: <Layers size={20} />,
      title: "Policy-Aligned System",
      desc: "Built on regulatory frameworks and policy structures to ensure clarity and compliance.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Controlled Infrastructure",
      desc: "Governed access and validated data ensure disciplined and reliable decision support.",
    },
  ];
  return (
    <div className="bg-landvista-bg text-landvista-charcoal">
<Navbar/>
      {/* ================= HERO ================= */}
          <section className="bg-landvista-green text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[560px]"
          >
            <h1 className="text-[32px] md:text-[48px] font-semibold mb-6 leading-tight">
              About TerraSignal
            </h1>

            <p className="text-white/80 text-[16px] md:text-[18px] mb-8 leading-relaxed">
              TerraSignal is an institutional land intelligence infrastructure designed to bring structure, clarity, and discipline to land decision-making
            </p>

            {/* CTA */}
            <a
              href="/request-access"
              className="inline-flex items-center gap-2 bg-white text-landvista-green px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Request Access
            </a>
          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[280px] md:h-[420px] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
              alt="TerraSignal Intelligence"
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-landvista-green/80 via-transparent to-transparent"></div>
          </motion.div>

        </div>
      </div>
    </section>

      {/* ================= PLATFORM DEFINITION ================= */}
       <section className="py-20 px-6 md:px-10 bg-landvista-bg">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-landvista-charcoal">
            Platform Definition
          </h2>

          <p className="text-landvista-muted mt-4 max-w-[700px] mx-auto text-[15px]">
            TerraSignal is not designed as a transaction platform. It is built as a controlled intelligence system.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* ICON */}
              <div className="mb-4 text-landvista-green">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-[18px] font-semibold text-landvista-charcoal mb-3">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[14px] text-landvista-grey leading-relaxed">
                {item.desc}
              </p>

              {/* HOVER LINE */}
              <div className="mt-6 h-[2px] w-0 bg-landvista-green transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}

        </div>

      </div>
    </section>

      {/* ================= WHY IT EXISTS ================= */}
      <section className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12">

          {/* LEFT */}
          <div>
            <h2 className="text-[26px] font-semibold mb-4">
              Why TerraSignal Exists
            </h2>

            <p className="text-landvista-grey mb-4">
              Land decisions operate in fragmented environments characterized by:
            </p>

            <ul className="space-y-2 text-landvista-grey">
              <li>• Unstructured data</li>
              <li>• Policy complexity</li>
              <li>• Limited access to verified intelligence</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex items-center">
            <p className="text-[16px] text-landvista-charcoal leading-relaxed">
              TerraSignal was created to structure these inputs into a governed, intelligence-driven decision system.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOUNDER NOTE ================= */}
     <section className="py-20 px-6 md:px-10 bg-landvista-bg">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* ================= IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full h-[320px] md:h-[420px] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
            alt="Founder"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </motion.div>

        {/* ================= CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[28px] md:text-[32px] font-semibold mb-6 text-landvista-charcoal">
            Founder Note
          </h2>

          {/* Highlight Quote */}
          <p className="text-[18px] md:text-[20px] font-medium text-landvista-charcoal mb-6 leading-relaxed border-l-4 border-landvista-green pl-4">
            Land decisions require structured intelligence, not fragmented inputs.
          </p>

          {/* BODY */}
          <div className="text-landvista-grey leading-relaxed space-y-4 text-[15px]">
            <p>
              The platform brings together policy frameworks, verified data, and ground-level signals into a disciplined system designed to support informed decision-making.
            </p>

            <p>
              TerraSignal does not operate as a brokerage or transaction platform. It functions as a controlled intelligence layer with governed access, validated signals, and structured outputs.
            </p>

            <p>
              The focus is not on activity, but on enabling clarity, control, and accountability in land decisions.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="/request-access"
              className="inline-flex items-center gap-2 text-landvista-green font-medium text-sm border-b border-landvista-green pb-1 hover:opacity-80 transition"
            >
              Request Access →
            </a>
          </div>
        </motion.div>

      </div>
    </section>

      {/* ================= SYSTEM ARCHITECTURE ================= */}
      <section className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[26px] font-semibold mb-10 text-center">
            System Architecture
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              "Policy & Zones",
              "Intelligence Engine",
              "Advisory Framework",
              "Governance System",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 p-6 bg-landvista-bg"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
<section className="bg-landvista-green text-white py-20 text-center px-6">
        <h2 className="text-[30px] font-semibold mb-4">
          Access TerraSignal
        </h2>

        <p className="text-white/70 mb-6">
          Access is granted through qualification and approval
        </p>

        <a
          href="/request-access"
          className="bg-white text-landvista-green px-6 py-3 text-sm font-medium"
        >
          Request Access
        </a>
      </section>
      {/* ================= DIFFERENTIATION ================= */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-[26px] font-semibold mb-4">
              What TerraSignal is NOT
            </h2>
            <ul className="space-y-2 text-landvista-grey">
              <li>• Brokerage platform</li>
              <li>• Public listing marketplace</li>
              <li>• Speculative pricing engine</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[26px] font-semibold mb-4">
              What TerraSignal IS
            </h2>
            <ul className="space-y-2 text-landvista-grey">
              <li>• Structured intelligence platform</li>
              <li>• Controlled access system</li>
              <li>• Decision-support infrastructure</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="/request-access"
            className="bg-landvista-green text-white px-6 py-3 text-sm font-medium"
          >
            Request Access
          </a>
        </div>
      </section>
   
      {/* ================= TARGET AUDIENCE ================= */}
  

      {/* ================= GOVERNANCE ================= */}
   

      {/* ================= FINAL CTA ================= */}
   

  <Footer/>

    </div>
  );
}