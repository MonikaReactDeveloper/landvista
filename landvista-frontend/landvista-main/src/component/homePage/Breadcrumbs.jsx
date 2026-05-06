import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

// Human-readable label overrides for specific path segments
const LABEL_MAP = {
  "policy-zones":        "Policy & Zones",
  "intelligence-preview": "Intelligence Preview",
  "advisory":            "Advisory",
  "governance":          "Governance",
  "about":               "About",
  "careers":             "Careers",
  "contact":             "Contact",
  "request-access":      "Request Access",
  "zone-overview":       "Zone Overview",
  "sector-intelligence": "Sector Intelligence",
  "policy-frameworks":   "Policy Frameworks",
  "infrastructure-signals": "Infrastructure Signals",
  "zone-comparison":     "Zone Comparison",
  "how-it-works":        "How It Works",
  "framework":           "Framework",
  "access-control-rbac": "Access Control (RBAC)",
  "nda-data-security":   "NDA & Data Security",
  "audit-validation":    "Audit & Validation",
  "signal-preview":      "Signal Preview",
  "zone-snapshot":       "Zone Snapshot",
  "institutional-advisory": "Institutional Advisory",
  "land-acquisition-strategy": "Land Acquisition Strategy",
  "development-positioning": "Development Positioning",
  "mandate-structuring": "Mandate Structuring",
  "due-diligence-risk-control": "Due Diligence & Risk Control",
  "privacy-policy":      "Privacy Policy",
  "terms-of-use":        "Terms of Use",
  "nda-terms":           "NDA Terms",
  "data-policy":         "Data Policy",
  "company":             "Company",
  "approach":            "Our Approach",
  "platform-architecture": "Platform Architecture",
  "founder-note":        "Founder Note",
};

const format = (str) =>
  LABEL_MAP[str] ||
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Pages that should NOT show a breadcrumb bar
const SKIP_PATHS = new Set(["/"]);

export default function Breadcrumbs() {
  const location = useLocation();

  // Don't render on Home
  if (SKIP_PATHS.has(location.pathname)) return null;

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-white border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 flex items-center gap-1.5 flex-wrap text-[12px] text-landvista-muted">

        {/* Home */}
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-landvista-charcoal transition-colors"
        >
          <Home size={12} />
          <span>Home</span>
        </Link>

        {pathnames.map((segment, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const label = format(segment);

          return (
            <span key={to} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-gray-300 shrink-0" />
              {isLast ? (
                <span className="text-landvista-charcoal font-medium truncate max-w-[220px]">
                  {label}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-landvista-charcoal transition-colors truncate max-w-[180px]"
                >
                  {label}
                </Link>
              )}
            </span>
          );
        })}

      </div>
    </nav>
  );
}