export const NAV_CONFIG = {
  public: [
    { name: "Home", path: "/" },
    {
      name: "Advisory",
      path: "/advisory",
      subItems: [
        { name: "Institutional Advisory", path: "/advisory/institutional-advisory" },
        { name: "Land Acquisition Strategy", path: "/advisory/land-acquisition-strategy" },
        { name: "Development Positioning", path: "/advisory/development-positioning" },
        { name: "Mandate Structuring", path: "/advisory/mandate-structuring" },
        { name: "Due Diligence & Risk Control", path: "/advisory/due-diligence-risk-control" }
      ]
    },
    {
      name: "Policy & Zones",
      path: "/policy-zones",
      subItems: [
        { name: "Zone Overview", path: "/policy-zones/zone-overview" },
        { name: "Sector Intelligence", path: "/policy-zones/sector-intelligence" },
        { name: "Policy Frameworks", path: "/policy-zones/policy-frameworks" },
        { name: "Infrastructure Signals", path: "/policy-zones/infrastructure-signals" },
        { name: "Zone Comparison", path: "/policy-zones/zone-comparison" }
      ]
    },
    {
      name: "Intelligence",
      path: "/dashboard",
      subItems: [
        { name: "Signal Preview", path: "/intelligence-preview" },
        { name: "Zone Snapshot", path: "/documents" },
        { name: "Intelligence Framework", path: "/dashboard" },
        { name: "How It Works", path: "/intelligence-preview/how-it-works" }
      ]
    },
    {
      name: "Governance",
      path: "/governance",
      subItems: [
        { name: "Governance Framework", path: "/governance/framework" },
        { name: "Access Control (RBAC)", path: "/governance/access-control-rbac" },
        { name: "NDA & Data Security", path: "/governance/nda-data-security" },
        { name: "Audit & Validation", path: "/governance/audit-validation" }
      ]
    },
    {
      name: "About",
      path: "/about",
      subItems: [
        { name: "Company", path: "/about/company" },
        { name: "Our Approach", path: "/about/approach" },
        { name: "Platform Architecture", path: "/about/platform-architecture" },
        { name: "Founder Note", path: "/about/founder-note" }
      ]
    },
    {
      name: "Contact",
      path: "/contact",
      subItems: [
        { name: "Company", path: "/about/company" }

      ]
    },
  ],
  auth: [
    { name: "Login", path: "/login" },
    { name: "Request Access", path: "/request" }
  ],
  private: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Intelligence Hub", path: "/intelligence-hub" },
    { name: "Mandates", path: "/mandates" },
    { name: "Document Vault", path: "/documents" }
  ],
  admin: [
    { name: "User Management", path: "/admin/users" },
    { name: "Pipeline", path: "/admin/pipeline" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "NDA Control", path: "/admin/nda" },
    { name: "Communication", path: "/admin/alerts" }
  ],
  warRoom: [
    { name: "Live Pipeline", path: "/war-room/pipeline" },
    { name: "Performance", path: "/war-room/performance" },
    { name: "High Intent Users", path: "/war-room/high-intent-users" }
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Use", path: "/terms-of-use" },
    { name: "NDA Terms", path: "/nda-terms" },
    { name: "Data Policy", path: "/data-policy" }
  ]
};
