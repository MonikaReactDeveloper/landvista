import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

export default function AdminRoute({ children }) {
  const auth = getAuth();

  if (!auth || auth.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}