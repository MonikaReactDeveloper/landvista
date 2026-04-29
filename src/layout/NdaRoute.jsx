import { Navigate } from "react-router-dom";

export default function NdaRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) return <Navigate to="/login" />;

  if (!user.ndaAccess) return <Navigate to="/nda" />;

  return children;
}