"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceHero() {
  return (
    <section className="w-full bg-landvista-green overflow-hidden mb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-14 md:py-24">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[280px] md:h-[420px] lg:h-[500px] overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
              alt="Real Estate"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="max-w-[560px]">

            {/* SUBTITLE */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[12px] md:text-[13px] uppercase tracking-[0.14em] text-white/70 mb-4"
            >
              2026 Investor Services
            </motion.p>

            {/* TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[30px] md:text-[40px] lg:text-[48px] leading-tight font-semibold text-white mb-6"
            >
              Unlock the value in every dimension of your real estate
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[15px] md:text-[17px] text-white/80 leading-relaxed mb-8"
            >
              Using deep insights and global expertise, we create real estate
              strategies that drive superior business outcomes.
            </motion.p>

            {/* BUTTON */}
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group inline-flex items-center gap-2 text-white font-medium text-[15px] border-b border-white pb-1 hover:gap-3 transition-all duration-300"
            >
              Read More

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>

          </div>
        </div>

      </div>
    </section>
  );
}