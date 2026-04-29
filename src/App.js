// import logo from './logo.svg';
// import './App.css';

// import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
// import Dashboard from './component/Dashboard';
// import Navbar from './component/homePage/navbar';
// import Home from './component/Pages/Home';
// import ServicesPage from './component/services/page';
// import ServiceDetail from './component/services/serviceDetail';
// import InsightsPage from './component/insights/page';
// import InsightDetail from './component/insights/insightDetail';
// import PeopleDetail from './component/insights/peopleDetail';
// import AdvisoryPage from './component/Advisory/page';
// import AboutPage from './component/About/page';
// import AdminLayout from './admin/AdminLayout';
// import AdminService from './admin/Component/AdminService';
// import AdminInsight from './admin/Component/AdminInsight';
// import AdminUser from './admin/Component/AdminUser';



// function App() {
//    return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<Dashboard />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/services/:slug" element={<ServiceDetail />} />
//         <Route path="/insights" element={<InsightsPage/>}/>
//         <Route path="/insights/:slug" element={<InsightDetail />} />
//         <Route path="/people/:slug" element={<PeopleDetail />} />
//          <Route path="/advisory" element={<AdvisoryPage />} />
//           <Route path="/about-us" element={<AboutPage />} />
//               <Route path="/adminpanel" element={<AdminLayout />} />
//                    <Route path="/admin-services" element={<AdminService />} />
//                          <Route path="/admin-insights" element={<AdminInsight />} />
//                           <Route path="/admin-users" element={<AdminUser />} />


//       </Routes>
//     </Router>);
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PUBLIC

import Home from "./component/Pages/Home";
import AdvisoryPage from "./component/Advisory/page";
import AboutPage from "./component/About/page";
 import AdminLayout from './admin/AdminLayout';
import ServicesPage from './component/services/page';
 import ServiceDetail from './component/services/serviceDetail';
 import InsightsPage from './component/insights/page';
import InsightDetail from './component/insights/insightDetail';
import PeopleDetail from './component/insights/peopleDetail';


// PRIVATE

// import InvestorDashboard from "./component/private/Dashboard";
// import IntelligenceHub from "./component/private/Intelligence";

// ADMIN / CONTROL
import AdminUser from "./admin/Component/AdminUser";
import AccessLayout from "./layout/AccessLayout";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import RequestAccess from "./component/access/RequestAccess";
import Login from "./component/Login";
import AdminDashboard from "./admin/AdminDashboard";
import IntelligenceHub from "./component/Intelligence/IntelligenceHub";
import Nda from "./component/Nda";
import NdaRoute from "./layout/NdaRoute";
import Navbar from "./component/homePage/navbar";
import Footer from "./component/homePage/footer";
import DocumentVault from "./component/Intelligence/DocumentVault";
import { Goal } from "lucide-react";
import GovernancePage from "./component/Governance/page";
import PolicyPage from "./component/Policy/page";
import AdminRoute from "./layout/AdminRoute";
import AdminLogin from "./admin/Component/AdminLogin";
import AdminSignup from "./admin/Component/AdminSignup";
import AdminRbac from "./admin/Component/AdminRbac";
import AdminNda from "./admin/Component/AdminNda";
import AdminVault from "./admin/Component/AdminVault";
import AdminService from "./admin/Component/AdminService";
import AdminInsight from "./admin/Component/AdminInsight";
import AdminAdvisory from "./admin/Component/AdminAdvisory";
import AdminPipelines from "./admin/Component/AdminPipelines";
import Analytics from "./admin/Component/Analytics";
import AdminIntelligence from "./admin/Component/AdminIntelligence";
import AdminZones from "./admin/Component/AdminZones";
import Alerts from "./admin/Component/Alerts";
import Settings from "./admin/Component/Settings";
import Audit from "./admin/Component/Audit";
import DynamicPage from "./component/Pages/DynamicPage";
import AdminSignal from "./admin/Component/AdminSignal";
// import Signup from "./component/Pages/Signup";
// import LoginPage from "./component/Pages/LoginPage";


function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 PUBLIC LAYER */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
         
            <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/insights" element={<InsightsPage/>}/>
        <Route path="/insights/:slug" element={<InsightDetail />} />
         <Route path="/people/:slug" element={<PeopleDetail />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
           <Route path="/about-us" element={<AboutPage />} />
           <Route path="/governance" element={<GovernancePage />} />
            <Route path="/policy-zones" element={<PolicyPage/>} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
           <Route path="/governance/:slug" element={<DynamicPage />} />
<Route path="/policy-zones/:slug" element={<DynamicPage />} />
<Route path="/advisory/:slug" element={<DynamicPage />} />
{/* <Route path="/signup" element={<Signup />} /> */}
<Route path="/about-us/:slug" element={<DynamicPage />} />
{/* <Route path="/loginpage" element={<LoginPage />} /> */}
          
        </Route>

        {/* 🔐 ACCESS LAYER */}
        <Route element={<AccessLayout />}>
          <Route path="/request-access" element={<RequestAccess />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/nda" element={<Nda />} />


        </Route>

        {/* 🧠 PRIVATE LAYER */}
        <Route element={<PrivateLayout />}>
        <Route
  path="/dashboard"
  element={
    <NdaRoute>
      <IntelligenceHub />
    </NdaRoute>
  }
/>
<Route
  path="/vault"
  element={
    <NdaRoute>
      <DocumentVault />
    </NdaRoute>
  }
/>
         {/* <Route path="/dashboard" element={<IntelligenceHub />} />  */}
         </Route>
          {/* <Route path="/dashboard" element={<InvestorDashboard />} />
         

        {/* 🛠 CONTROL LAYER (ADMIN) */}
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  <Route path="users" element={<AdminUser />} />
 <Route path="intelligence" element={<AdminIntelligence />} />
 <Route path="zones" element={<AdminZones />} />
 <Route path="alerts" element={<Alerts />} />
 <Route path="settings" element={<Settings />} />
  <Route path="dashboard" element={<AdminDashboard />} />
 <Route path="rbac" element={<AdminRbac />} />
 <Route path="nda" element={<AdminNda />} />
 <Route path="vault" element={<AdminVault />} />
 <Route path="pipeline" element={<AdminPipelines />} />
 <Route path="analytics" element={<Analytics />} />
 <Route path="audit" element={<Audit />} />
 <Route path="services" element={<AdminService/>} />
 <Route path="insights" element={<AdminInsight />} />
 <Route path="advisory" element={<AdminAdvisory />} />
  <Route path="signals" element={<AdminSignal />} />
</Route>

      </Routes>
    </Router>
  );
}
export default App;