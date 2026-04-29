import { Outlet } from "react-router-dom";

export default function AccessLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-landvista-blue">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}