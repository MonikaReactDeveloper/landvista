import { useEffect, useState } from "react";

export default function AdminUser() {

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  const [sessions, setSessions] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

  // LOAD
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setSessions(JSON.parse(localStorage.getItem("sessions")) || []);
    setLoginHistory(JSON.parse(localStorage.getItem("loginHistory")) || []);
  }, []);

  // SAVE
  const persistUsers = (data) => {
    setUsers(data);
    localStorage.setItem("users", JSON.stringify(data));
  };

  // ================= BULK ACTIONS =================

  const bulkUpdate = (status) => {
    const updated = users.map((u, i) =>
      selected.includes(i) ? { ...u, status } : u
    );

    persistUsers(updated);
    setSelected([]);
  };

  // ================= STATUS =================

  const updateUser = (index, updates) => {
    const updated = [...users];
    updated[index] = { ...updated[index], ...updates };
    persistUsers(updated);
  };

const handleApprove = (i) => {
  const user = users[i];

  const selectedRole = prompt(
    `Requested: ${user.requestedRole}\nAssign role (admin/user/investor/founder):`,
    user.requestedRole || "user"
  );

  updateUser(i, {
    status: "approved",
    role: selectedRole || user.requestedRole || "user",
    approved_by: "admin",
    approved_at: new Date().toISOString(),
  });
};

  const handleReject = (i) => {
    const reason = prompt("Rejection reason");
    updateUser(i, {
      status: "rejected",
      rejection_reason: reason || "",
    });
  };

  const handleSuspend = (i) => {
    const reason = prompt("Suspension reason");
    updateUser(i, {
      status: "suspended",
      suspension_reason: reason || "",
    });
  };

  const handleReactivate = (i) => {
    updateUser(i, {
      status: "approved",
      suspension_reason: "",
    });
  };

  // ================= SESSION CONTROL =================

  const forceLogout = (userId) => {
    const updatedSessions = sessions.filter(s => s.user_id !== userId);
    setSessions(updatedSessions);
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  // ================= FILTER =================

  const filtered = users.filter(u => {
    return (
      (filters.role === "all" || u.role === filters.role) &&
      (filters.status === "all" || u.status === filters.status) &&
      (
        u.full_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        u.email?.toLowerCase().includes(filters.search.toLowerCase())
      )
    );
  });

  // ================= UI =================

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      <h2 className="text-xl font-semibold">User Control</h2>

      {/* FILTERS */}
      <div className="grid md:grid-cols-4 gap-3 bg-white p-4 rounded-xl">
        <input
          placeholder="Search..."
          className="input"
          onChange={(e)=>setFilters({...filters, search:e.target.value})}
        />

        <select className="input"
          onChange={(e)=>setFilters({...filters, role:e.target.value})}>
          <option value="all">All Roles</option>
          <option>admin</option>
          <option>user</option>
          <option>investor</option>
        </select>

        <select className="input"
          onChange={(e)=>setFilters({...filters, status:e.target.value})}>
          <option value="all">All Status</option>
          <option>pending</option>
          <option>approved</option>
          <option>rejected</option>
          <option>suspended</option>
        </select>

        <button onClick={()=>setFilters({search:"",role:"all",status:"all"})}
          className="btn-secondary">
          Reset
        </button>
      </div>

      {/* BULK ACTIONS */}
      {selected.length > 0 && (
        <div className="bg-white p-3 rounded flex gap-3 text-sm">
          <span>{selected.length} selected</span>
          <button onClick={()=>bulkUpdate("approved")}>Approve</button>
          <button onClick={()=>bulkUpdate("rejected")}>Reject</button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Tier</th>
              <th>Requested Role</th>
              <th>Sessions</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u, i) => {

              const activeSessions = sessions.filter(s => s.user_id === u.email);

              return (
                <tr key={i} className="border-t">

                  {/* SELECT */}
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(i)}
                      onChange={(e)=>{
                        setSelected(prev =>
                          e.target.checked
                            ? [...prev, i]
                            : prev.filter(id => id !== i)
                        )
                      }}
                    />
                  </td>

                  <td>{u.full_name}</td>
                  <td>{u.email}</td>

                  {/* STATUS */}
                  <td>{u.status}</td>

                  {/* ROLE */}
                  <td>
                    <select
                      value={u.role}
                      onChange={(e)=>updateUser(i,{role:e.target.value})}
                      className="input text-xs"
                    >
                      <option>user</option>
                      <option>admin</option>
                      <option>investor</option>
                      <option>founder</option>
                    </select>
                  </td>

                  {/* TIER */}
                  <td>
                    <select
                      value={u.tier}
                      onChange={(e)=>updateUser(i,{tier:e.target.value})}
                      className="input text-xs"
                    >
                      <option>preview</option>
                      <option>intelligence</option>
                      <option>mandate</option>
                    </select>
                  </td>
<td>
  {u.requestedRole ? (
    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 text-xs rounded">
      {u.requestedRole}
    </span>
  ) : "-"}
</td>
                  {/* SESSIONS */}
                  <td>
                    {activeSessions.length}
                    {activeSessions.length > 0 && (
                      <button
                        onClick={()=>forceLogout(u.email)}
                        className="text-xs text-red-500 ml-2"
                      >
                        Logout
                      </button>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-2 text-xs">

                    {u.status === "pending" && (
                      <>
                        <button onClick={()=>handleApprove(i)}>Approve</button>
                        <button onClick={()=>handleReject(i)}>Reject</button>
                      </>
                    )}

                    {u.status === "approved" && (
                      <button onClick={()=>handleSuspend(i)}>Suspend</button>
                    )}

                    {u.status === "suspended" && (
                      <button onClick={()=>handleReactivate(i)}>Reactivate</button>
                    )}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* LOGIN HISTORY */}
      <div className="bg-white p-4 rounded-xl">
        <h3 className="font-medium mb-3">Login History</h3>

        {loginHistory.map((l, i)=>(
          <div key={i} className="text-xs border-b py-2 flex justify-between">
            <span>{l.user}</span>
            <span>{l.ip}</span>
            <span>{l.device}</span>
            <span>{l.time}</span>
          </div>
        ))}
      </div>

    </div>
  );
}