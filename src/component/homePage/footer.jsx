import React from "react";
// import { Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-landvista-green text-white">

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mb-12">

          {/* COLUMN */}
          <div>
            <h3 className="text-[14px] font-semibold mb-4">About</h3>
            <ul className="space-y-3 text-[14px] text-gray-300">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Leadership</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold mb-4">Careers</h3>
            <ul className="space-y-3 text-[14px] text-gray-300">
              <li><a href="#">Open Roles</a></li>
              <li><a href="#">Culture</a></li>
              <li><a href="#">Diversity</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold mb-4">Investor</h3>
            <ul className="space-y-3 text-[14px] text-gray-300">
              <li><a href="#">Reports</a></li>
              <li><a href="#">Financials</a></li>
              <li><a href="#">Governance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold mb-4">Newsroom</h3>
            <ul className="space-y-3 text-[14px] text-gray-300">
              <li><a href="#">Latest News</a></li>
              <li><a href="#">Press Releases</a></li>
              <li><a href="#">Media Kit</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-[14px] text-gray-300">
              <li><a href="#">Advisory</a></li>
              <li><a href="#">Valuation</a></li>
              <li><a href="#">Property Management</a></li>
            </ul>
          </div>

        </div>

        {/* SOCIAL + DIVIDER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-white/20 pt-8 gap-6">

          {/* LOGO */}
          <div className="text-[22px] font-semibold tracking-tight">
            LANDVISTA
          </div>

          {/* SOCIAL */}
          {/* <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-70 transition">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:opacity-70 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:opacity-70 transition">
              <Facebook size={18} />
            </a>
          </div> */}
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-300">

          {/* COPYRIGHT */}
          <p>© {new Date().getFullYear()} Landvista. All rights reserved.</p>

          {/* LINKS */}
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>

        </div>
      </div>

    </footer>
  );
}