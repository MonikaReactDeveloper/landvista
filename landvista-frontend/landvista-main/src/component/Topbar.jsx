// import React from 'react'
// import { useAuth } from './AuthContext';

// const Topbar = () => {
//   const { user, setUser } = useAuth();

//   return (
//     <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
//       <h2 className="text-content font-semibold">Dashboard</h2>

//       <div className="flex items-center gap-4">
//         <select
//           className="text-sm border p-1"
//           value={user.role}
//           onChange={(e) => setUser({ ...user, role: e.target.value })}
//         >
//           <option value="investor">Investor</option>
//           <option value="analyst">Analyst</option>
//           <option value="legal">Legal</option>
//           <option value="admin">Admin</option>
//         </select>

//         <div className="w-8 h-8 bg-gray-300 rounded-full" />
//       </div>
//     </div>
//   );
// };


// export default Topbar