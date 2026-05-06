import { Navigate } from "react-router-dom";
import { getAdminAuth } from "../utils/auth";

export default function AdminRoute({ children }) {
  const auth = getAdminAuth();

  if (!auth || auth.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }


  return children;
}