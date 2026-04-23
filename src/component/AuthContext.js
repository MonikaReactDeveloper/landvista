// import React, { createContext, useContext, useState } from "react";

// // -------------------- AUTH CONTEXT --------------------
// const AuthContext = createContext();

// export const roles = {
//   INVESTOR: "investor",
//   ANALYST: "analyst",
//   LEGAL: "legal",
//   ADMIN: "admin",
// };

// export const permissions = {
//   investor: ["dashboard", "intelligence", "mandates"],
//   analyst: ["dashboard", "intelligence", "analytics"],
//   legal: ["dashboard", "documents"],
//   admin: ["dashboard", "intelligence", "mandates", "documents", "analytics"],
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState({
//     role: roles.INVESTOR,
//     hasNDA: true,
//   });

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ FIX: EXPORT THIS
// export const useAuth = () => useContext(AuthContext);