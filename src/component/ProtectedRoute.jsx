// import React from 'react'
// import { permissions, useAuth } from './AuthContext';

// const ProtectedRoute = ({ children, route }) => {
//   const { user } = useAuth();

//   if (!user) return <div className="p-4">Not Authenticated</div>;

//   if (!user.hasNDA) return <div className="p-4">NDA Required</div>;

//   if (!permissions[user.role].includes(route)) {
//     return <div className="p-4 text-risk">Access Denied</div>;
//   }

//   return children;
// };

// export default ProtectedRoute