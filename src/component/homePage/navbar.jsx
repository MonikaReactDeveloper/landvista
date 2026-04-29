"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  let timeout;

  const menu = [
    {
      name: "Services",
      description:
        "Unlock the value in every dimension of your real estate with integrated, data-led services that support your overall business strategy.",
      cta: "See Overview",
        slug: "services",
      viewAll: "View All Services",
      sections: [
        {
  title: "Needs",
  links: [
    { name: "Invest, Sell & Finances", slug: "invest-sell-and-finance" },
    { name: "Plan, Lease & Occupy", slug: "plan-lease-occupy" },
    { name: "Design & Build", slug: "design-build" },
    { name: "Manage Properties & Portfolios", slug: "manage-properties" },
    { name: "Transform Business Outcomes", slug: "transform-outcomes" },
  ],
},
        
        {
          title: "Property Types",
          links: [
            { name: "Office", slug: "office" },
            { name: "Retail", slug: "retail" },
            { name: "Industrial", slug: "industrial" },
            { name: "Multifamily", slug: "multifamily" },
            { name: "Hotels", slug: "hotels" }
          ],
        },
        {
          title: "Industries",
          links: [
            { name: "Data Center", slug: "data-center" },
            { name: "Life Sciences", slug: "life-sciences" },
            { name: "Banking & Financial Services", slug: "banking-financial-services" },
          
            { name: "Healthcare", slug: "healthcare" }
          ],
        },
      ],
    },
    { name: "Insights & Research",
          description:
        "Our unmatched research and thought leadership platform delivers actionable insights to help our clients make informed business decisions.",
      cta: "Explore Insights & Research",
       slug: "insights",
        sections: [
       {
  title: "Latest Research",
  links: [
    { name: "Market Reports", slug: "market-reports" }
  ]
},
        
        {
          title: "Trending Topics",
          links: [
    { name: "Intelligent Investments", slug: "intelligent-investments" },
    { name: "Future Cities", slug: "future-cities" },
    { name: "Adaptive Spaces", slug: "adaptive-spaces" },
    { name: "Evolving Workspaces", slug: "evolving-workspaces" },
    { name: "Creating Resillience", slug: "creating-resillience" },
  ],
        },
        {
          title: "Featured Insights",
          links: [{ name: "The Weekly Take Podcast", slug: "the-weekly-take-podcast" },
          { name: "Our Take Newsletter", slug: "our-take-newsletter" },
          { name: "Sustainability", slug: "sustainability" },
            { name: "Intelligent Investments", slug: "intelligent-investments" },
            { name: "Future Cities", slug: "future-cities" },
            { name: "Adaptive Spaces", slug: "adaptive-spaces" },
            { name: "Evolving Workspaces", slug: "evolving-workspaces" },
            { name: "Creating Resillience", slug: "creating-resillience" },
          ],
        },
      ],
     },
     {
      name: "Governance",
      description:"TerraSignal operates under structured governance systems designed to ensure transparency, data integrity, and disciplined decision-making",
      cta: "View Governance Framework",
        slug: "governance",
      viewAll: "View All Services",
      sections: [
        {
          title: "Principles",
          links: [{ name: "Non-Brokerage Model", slug: "non-brokerage-model" },
          { name: "Policy-Aligned Intelligence", slug: "policy-aligned-intelligence" },
          { name: "No Speculative Outputs", slug: "no-speculative-outputs" },
            { name: "Controlled Access Only", slug: "controlled-access-only" },
          
          ],
        },
        
        {
          title: "Property Types",
          links: [
            { name: "Office", slug: "office" },
            { name: "Retail", slug: "retail" },
            { name: "Industrial", slug: "industrial" },
            { name: "Multifamily", slug: "multifamily" },
            { name: "Hotels", slug: "hotels" }
          ],
        },
   
      ],
    },
     {
      name: "Policy & Zones",
      description:"Explore zones, sectors, and regulatory frameworks through structured intelligence and verified data layers",
      cta: "View Policy & Zones",
        slug: "policy-zones",
      viewAll: "View Policy",
      sections: [
        {
          title: "Zones",
          links: [{ name: "Zone A", slug: "zone-a" },
          { name: "Zone B", slug: "zone-b" },
          { name: "Zone C", slug: "zone-c" },
            { name: "Zone L", slug: "zone-l" },
            { name: "Zone N", slug: "zone-n" },
            { name: "Future Zones", slug: "future-zones" },
  
         
          ],
        },
        
        {
          title: "Property Types",
          links: [
            { name: "Office", slug: "office" },
            { name: "Retail", slug: "retail" },
            { name: "Industrial", slug: "industrial" },
            { name: "Multifamily", slug: "multifamily" },
            { name: "Hotels", slug: "hotels" }
          ],
        },
   
      ],
    },
   
  
    { name: "Careers" },
     { name: "Advisory",
      description:"TerraSignal provides structured advisory services derived from policy-aligned intelligence, verified data inputs, and disciplined decision frameworks."
      ,
    cta:"Explore advisory",
    slug:"advisory",
    sections:[
      {
        title:"Land Strategy Advisory",
        links:[
          { name: "Intelligent Investments", slug: "intelligent-investments" },
          { name: "Future Cities", slug: "future-cities" }
        ]
      },
        {
        title:"Opportunity Structuring",
        links:[
          { name: "Align Land", slug: "align-land" },
          { name: "Capital", slug: "capital" },
          { name: "Development Strategy", slug: "development-strategy" }
        ]
      },
      {
        title:"Risk Assessment",
        links:[
          { name: "Identify Risk", slug: "identify-risk" },
          { name: "Mitigate Risk", slug: "mitigate-risk" },
          { name: "Quantify Risk", slug: "quantify-risk" }
        ]
      }
    ]},
     { name: "About Us",
          description:
        "TerraSignal is an institutional land intelligence infrastructure designed to bring structure, clarity, and discipline to land decision-making",
      cta: "Explore",
       slug: "about-us",
        sections: [
        {
          title: "Policy & Zones",
          links: [
            { name: "Our Policy", slug: "our-policy" },
           
          ],
        },
        
        {
          title: "Intelligence Engine",
          links: [
            { name: "The Weekly Take Podcast", slug: "the-weekly-take-podcast" },
            { name: "Our Take Newsletter", slug: "our-take-newsletter" },
            { name: "Sustainability", slug: "sustainability" },
            { name: "Total Cost Of Occupancy", slug: "total-cost-of-occupancy" },
            { name: "Data Center", slug: "data-center" }
          ],
        },
        {
          title: "Advisory Framework",
          links: [
            { name: "Intelligent Investments", slug: "intelligent-investments" },
            { name: "Future Cities", slug: "future-cities" },
            { name: "Adaptive Spaces", slug: "adaptive-spaces" },
            { name: "Evolving Workforces", slug: "evolving-workforces" },
            { name: "Creating Resillience", slug: "creating-resillience" },
          ],
        },
        
      
        ],
      }
  ];

  return (
   <nav
  className={`sticky top-0 z-50 w-full transition-all duration-300
    ${scrolled
      ? "bg-white/80 backdrop-blur-lg shadow-md border-white/20"
      : "bg-white/50 backdrop-blur-md border-transparent"
    }`}
>
      <div className="max-w-[1280px] mx-auto px-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center h-[72px]">

          {/* LOGO */}
       

          {/* DESKTOP MENU */}
          <div className="flex justify-between items-center w-full">
               <div className="text-[28px] font-semibold tracking-tight text-green-900">
            LANDVISTA
          </div>
           <div className="hidden md:flex items-center gap-8">

            {menu.map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => {
                  clearTimeout(timeout);
                  setActive(i);
                }}
                onMouseLeave={() => {
                  timeout = setTimeout(() => setActive(null), 120);
                }}
              >
                {/* NAV ITEM */}
                <button className="relative text-[14px] font-medium text-gray-800 group flex items-center gap-1">

                  {item.name}

                  {/* ARROW */}
                  {item.sections && (
                    <ChevronDown
                      size={14}
                      className="mt-[2px] transition-transform group-hover:rotate-180"
                    />
                  )}

                  {/* UNDERLINE */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-800 transition-all group-hover:w-full"></span>
                </button>

                {/* MEGA MENU */}
              

              </div>
            ))}

<AnimatePresence>
  {active !== null && menu[active]?.sections && (
    <motion.div
      onMouseEnter={() => clearTimeout(timeout)}
      onMouseLeave={() => setActive(null)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25 }}
      className="absolute left-0 top-[72px] w-full bg-white border-t border-[#E5E7EB] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-[1440px] mx-auto px-8 py-14 grid grid-cols-12 gap-16">

        {/* LEFT PANEL */}
        <div className="col-span-4 pr-10">
          <h2 className="text-[28px] font-semibold text-[#1C1C1C] mb-5">
            {menu[active].name}
          </h2>

          <p className="text-[15px] text-[#4B5563] leading-relaxed mb-8">
            {menu[active].description}
          </p>

        <button
  onClick={() => navigate(`/${menu[active].slug}`)}
  className="bg-landvista-blue text-white px-6 py-[14px] text-[14px] font-medium hover:bg-[#002F27] transition"
>
  {menu[active].cta}
</button>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-8">
          <div className="grid grid-cols-3 gap-16">

            {menu[active].sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280] mb-6">
                  {section.title}
                </h3>

                <ul className="space-y-4">
                  {section.links.map((link, j) => (
  <li key={j}>
    <button
      onClick={() =>
        navigate(`/${menu[active].slug}/${link.slug}`)
      }
      className="w-full flex items-center justify-between text-[15px] text-[#1C1C1C] group hover:text-[#003A2F]"
    >
      {link.name}

      <ChevronRight
        size={14}
        className="opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
      />
    </button>
  </li>
))}
                      
                
                </ul>
              </div>
            ))}

          </div>

          {/* BOTTOM LINK */}
          <div className="mt-12">
            <a className="text-[#003A2F] text-[14px] font-medium border-b border-[#003A2F] pb-[2px] hover:opacity-80">
              {menu[active].viewAll}
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>
            {/* SEARCH */}
            <div className="ml-4 text-gray-500 cursor-pointer">🔍</div>

          </div>

          {/* MOBILE BUTTON */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </div>
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-xl font-semibold">LANDVISTA</div>
              <X onClick={() => setMobileOpen(false)} />
            </div>

            {/* MOBILE MENU */}
            <div className="space-y-6">

              {menu.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() =>
                      setMobileActive(mobileActive === i ? null : i)
                    }
                    className="w-full flex justify-between items-center text-[16px] font-medium"
                  >
                    {item.name}
                    {item.sections && <ChevronDown />}
                  </button>

                  {/* SUBMENU */}
                  <AnimatePresence>
                    {item.sections && mobileActive === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 mt-4 space-y-4"
                      >
                        {item.sections.map((section, idx) => (
                          <div key={idx}>
                            <div className="text-xs uppercase text-gray-400 mb-2">
                              {section.title}
                            </div>

                            {section.links.map((link, j) => (
                              <div
                                key={j}
                                className="text-sm text-gray-700"
                              >
                                {link}
                              </div>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}