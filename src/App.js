import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Dashboard from './component/Dashboard';
import Navbar from './component/homePage/navbar';
import Home from './component/Pages/Home';
import ServicesPage from './component/services/page';
import ServiceDetail from './component/services/serviceDetail';
import InsightsPage from './component/insights/page';
import InsightDetail from './component/insights/insightDetail';
import PeopleDetail from './component/insights/peopleDetail';
import AdvisoryPage from './component/Advisory/page';
import AboutPage from './component/About/page';
import AdminLayout from './admin/AdminLayout';
import AdminService from './admin/Component/AdminService';
import AdminInsight from './admin/Component/AdminInsight';
import AdminUser from './admin/Component/AdminUser';



function App() {
   return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/insights" element={<InsightsPage/>}/>
        <Route path="/insights/:slug" element={<InsightDetail />} />
        <Route path="/people/:slug" element={<PeopleDetail />} />
         <Route path="/advisory" element={<AdvisoryPage />} />
          <Route path="/about-us" element={<AboutPage />} />
              <Route path="/adminpanel" element={<AdminLayout />} />
                   <Route path="/admin-services" element={<AdminService />} />
                         <Route path="/admin-insights" element={<AdminInsight />} />
                          <Route path="/admin-users" element={<AdminUser />} />


      </Routes>
    </Router>);
}

export default App;
