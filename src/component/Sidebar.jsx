// import React from 'react'
// import { permissions, useAuth } from './AuthContext';

// const Sidebar = () => {
//   const { user } = useAuth();
//   const allowedRoutes = permissions[user.role];

//   const menu = [
//     { name: "Dashboard", key: "dashboard" },
//     { name: "Intelligence", key: "intelligence" },
//     { name: "Mandates", key: "mandates" },
//     { name: "Documents", key: "documents" },
//     { name: "Analytics", key: "analytics" },
//   ];

//   return (
//     <div className="bg-authority text-white h-full w-64 hidden md:flex flex-col p-4">
//       <h1 className="text-xl font-bold mb-6">LandVista</h1>
//       <nav className="space-y-3 text-sm">
//         {menu
//           .filter((item) => allowedRoutes.includes(item.key))
//           .map((item) => (
//             <a key={item.key} className="block hover:bg-white/10 p-2 rounded">
//               {item.name}
//             </a>
//           ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar