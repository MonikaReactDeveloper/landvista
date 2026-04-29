// import Sidebar from "../component/private/Sidebar";
// import Topbar from "../component/private/Topbar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="flex h-screen bg-landvista-bg">
  
      <div className="flex-1 flex flex-col">
   
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}