import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Layouts
import PublicLayout from "./layout/PublicLayout";
import AccessLayout from "./layout/AccessLayout";
import PrivateLayout from "./layout/PrivateLayout";
import AdminRoute from "./layout/AdminRoute";
import NdaRoute from "./layout/NdaRoute";
import ScrollToTop from "./utils/ScrollToTop";

// Lazy Loaded Pages
const Home = lazy(() => import("./component/Pages/Home"));
const AdvisoryPage = lazy(() => import("./component/Advisory/page"));
const AdvisoryDetailPage = lazy(() => import("./component/Advisory/AdvisoryDetail"));
const AdvisoryCategoryPage = lazy(() => import("./component/Advisory/AdvisoryCategory"));
const PolicyPage = lazy(() => import("./component/Policy/page"));
const IntelligencePage = lazy(() => import("./component/Intelligence/IntelligencePreviewPage"));
const GovernancePage = lazy(() => import("./component/Governance/page"));
const AboutPage = lazy(() => import("./component/About/page"));
const CareersPage = lazy(() => import("./component/Careers/page"));
const DynamicPage = lazy(() => import("./component/Pages/DynamicPage"));
const ZoneDetail = lazy(() => import("./component/Policy/ZoneDetail"));
const SectorDetail = lazy(() => import("./component/Policy/SectorDetail"));
const IntelligenceDetail = lazy(() => import("./component/Intelligence/IntelligenceDetail"));
const ContactPage = lazy(() => import("./component/Contact/page"));
const HowItWorksPage = lazy(() => import("./component/Intelligence/HowItWorksPage"));

// Access Layer
const Request = lazy(() => import("./component/access/Request"));
const RequestAccess = lazy(() => import("./component/access/RequestAccess"));
const Login = lazy(() => import("./component/Login"));
const Nda = lazy(() => import("./component/Nda"));

// Private Dashboard
const Dashboard = lazy(() => import("./component/Dashboard"));
const IntelligenceHub = lazy(() => import("./component/Intelligence/IntelligenceHub"));
const DocumentVault = lazy(() => import("./component/Intelligence/DocumentVault"));

// Admin Layer
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminUser = lazy(() => import("./admin/Component/AdminUser"));
const AdminPipeline = lazy(() => import("./admin/Component/AdminPipeline"));
const AdminAnalytics = lazy(() => import("./admin/Component/AdminAnalytics"));
const AdminNda = lazy(() => import("./admin/Component/AdminNda"));
const AdminAlerts = lazy(() => import("./admin/Component/AdminAlerts"));
const AdminRbac = lazy(() => import("./admin/Component/AdminRbac"));
const AdminAudit = lazy(() => import("./admin/Component/AdminAudit"));
const AdminSettings = lazy(() => import("./admin/Component/AdminSettings"));
const AdminZones = lazy(() => import("./admin/Component/AdminZones"));
const AdminVault = lazy(() => import("./admin/Component/AdminVault"));
const AdminIntelligence = lazy(() => import("./admin/Component/AdminIntelligence"));
const AdminSignal = lazy(() => import("./admin/Component/AdminSignal"));
const AdminAdvisory = lazy(() => import("./admin/Component/AdminAdvisory"));
const AdminLogin = lazy(() => import("./admin/Component/AdminLogin"));
const AdminSignup = lazy(() => import("./admin/Component/AdminSignup"));

// War Room
const WarRoom = lazy(() => import("./admin/Component/WarRoom"));

const Loader = () => (
  <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-6">
    <div className="w-16 h-16 border-4 border-gray-100 border-t-landvista-blue rounded-full animate-spin" />
    <div className="text-[10px] font-black text-landvista-blue uppercase tracking-[0.5em] animate-pulse">Initialising Architecture</div>
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          
          {/* 🌍 1. PUBLIC LAYER */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/advisory" element={<AdvisoryPage />} />
            <Route path="/policy-zones" element={<PolicyPage />} />
            <Route path="/intelligence-preview" element={<IntelligencePage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/request" element={<Request />} />
            
            {/* Sub-Routes (Advisory) */}
            <Route path="/advisory/:slug" element={<AdvisoryDetailPage />} />
            <Route path="/advisory/:slug/:categorySlug" element={<AdvisoryCategoryPage />} />
            
            {/* Sub-Routes (Policy & Zones) */}
            <Route path="/policy-zones/:zoneSlug" element={<ZoneDetail />} />
            <Route path="/policy-zones/:zoneSlug/:sectorSlug" element={<SectorDetail />} />
            
            {/* Sub-Routes (Intelligence Preview) */}
            <Route path="/intelligence-preview/:slug" element={<IntelligenceDetail />} />
            <Route path="/intelligence-preview/how-it-works" element={<HowItWorksPage />} />
            
            {/* Sub-Routes (Governance) */}
            <Route path="/governance/:slug" element={<DynamicPage />} />
            
            {/* Sub-Routes (About) */}
            <Route path="/about/:slug" element={<DynamicPage />} />

            {/* Legal Layer */}
            <Route path="/privacy-policy" element={<DynamicPage slug="privacy-policy" />} />
            <Route path="/terms-of-use" element={<DynamicPage slug="terms-of-use" />} />
            <Route path="/nda-terms" element={<DynamicPage slug="nda-terms" />} />
            <Route path="/data-policy" element={<DynamicPage slug="data-policy" />} />
            <Route path="/request-access" element={<RequestAccess />} />
            <Route path="/request-access/application" element={<RequestAccess />} />
            <Route path="/request-access/status" element={<RequestAccess />} />
          </Route>

          {/* 🔐 2. ACCESS LAYER */}
          <Route element={<AccessLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/nda" element={<Nda />} />
            <Route path="/verify-otp" element={<Login />} />
          </Route>

          {/* 🧠 3. PRIVATE USER LAYER (NDA Gated) */}
          <Route path="/dashboard" element={<NdaRoute><Dashboard /></NdaRoute>} />
          <Route path="/intelligence-hub" element={<NdaRoute><IntelligenceHub /></NdaRoute>} />
          <Route path="/mandates" element={<NdaRoute><AdminPipeline /></NdaRoute>} />
          <Route path="/documents" element={<NdaRoute><DocumentVault /></NdaRoute>} />

          {/* 🛠 4. CONTROL LAYER (ADMIN) */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUser />} />
            <Route path="pipeline" element={<AdminPipeline />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="nda" element={<AdminNda />} />
            <Route path="alerts" element={<AdminAlerts />} />
            <Route path="advisory" element={<AdminAdvisory />} />
            <Route path="rbac" element={<AdminRbac />} />
            <Route path="audit" element={<AdminAudit />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="zones" element={<AdminZones />} />
            <Route path="vault" element={<AdminVault />} />
            <Route path="signals" element={<AdminSignal />} />
            <Route path="intelligence" element={<AdminIntelligence />} />
          </Route>

          {/* ⚔️ 5. FOUNDER WAR-ROOM (Founder Only) */}
          <Route path="/war-room" element={<AdminRoute><WarRoom /></AdminRoute>}>
             <Route path="pipeline" element={<AdminPipeline />} />
             <Route path="performance" element={<AdminAnalytics />} />
             <Route path="alerts" element={<AdminAlerts />} />
          </Route>

        </Routes>
      </Suspense>
    </Router>
  );
}