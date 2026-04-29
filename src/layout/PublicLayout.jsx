import { Outlet } from "react-router-dom";
import Navbar from "../component/homePage/navbar";

export default function PublicLayout() {
  return (
    <div className="bg-landvista-bg min-h-screen">
  
      <main className="text-landvista-charcoal">
        <Outlet />
      </main>
    </div>
  );
}