import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

export default function NdaRoute({ children }) {
  const auth = getAuth();
  const user = auth?.user;

  if (!auth || !auth.token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Institutional Rule: Only allow approved users with signed NDA into the dashboard
  // Admins can bypass the NDA check
  if (user.role !== 'admin' && user.ndaStatus !== "signed") {
    return <Navigate to="/nda" replace />;
  }

  return children;
}