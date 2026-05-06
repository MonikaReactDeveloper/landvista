import { Outlet, useNavigate } from "react-router-dom";

export default function AccessLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-landvista-bg p-4">
      <div 
        onClick={() => navigate("/")}
        className="mb-12 cursor-pointer transition-transform hover:scale-105 active:scale-95"
      >
        <img 
          src="/landvista-lockup-light.svg" 
          alt="LandVista" 
          className="h-12 w-auto"
        />
      </div>
      
      <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-landvista-grey/10 shadow-2xl shadow-landvista-blue/5 w-full max-w-lg">
        <Outlet />
      </div>
      
      <div className="mt-12 text-[10px] font-black text-landvista-grey uppercase tracking-[0.4em] opacity-40">
        Secured by LandVista Intelligence Layer
      </div>
    </div>
  );
}