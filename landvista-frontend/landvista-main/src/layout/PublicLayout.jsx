import { Outlet } from "react-router-dom";
import Navbar from "../component/homePage/navbar";
import Breadcrumbs from "../component/homePage/Breadcrumbs";

export default function PublicLayout() {
  return (
    <div className="bg-landvista-bg min-h-screen">
      <Navbar />
      <main className="text-landvista-charcoal pt-20">
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}