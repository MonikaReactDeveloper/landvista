import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState("all");
const [verifiedFilter, setVerifiedFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verified: false,
    role: "user",
      requestedRole: "",
    
    founderStatus: "pending",
    investorStatus: "pending",
    ndaAccess: false,
    fullAccess: false,
  });
const filteredUsers = users.filter((user) => {
  const matchSearch =
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase());

  const matchRole =
    roleFilter === "all" || user.role === roleFilter;

  const matchVerified =
    verifiedFilter === "all" ||
    (verifiedFilter === "verified" && user.verified) ||
    (verifiedFilter === "not-verified" && !user.verified);

  return matchSearch && matchRole && matchVerified;
});
  // handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
const handleApproveRequest = (index) => {
  const updated = [...users];
  const user = updated[index];

  // assign role
  user.role = user.requestedRole;

  // update status
  if (user.requestedRole === "founder") {
    user.founderStatus = "approved";
  }
  if (user.requestedRole === "investor") {
    user.investorStatus = "approved";
  }

  user.requestedRole = ""; // clear request

  setUsers(updated);
};

const handleRejectRequest = (index) => {
  const updated = [...users];
  const user = updated[index];

  if (user.requestedRole === "founder") {
    user.founderStatus = "rejected";
  }
  if (user.requestedRole === "investor") {
    user.investorStatus = "rejected";
  }

  user.requestedRole = ""; // clear request

  setUsers(updated);
};
  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = formData;
      setUsers(updated);
      setEditIndex(null);
    } else {
      setUsers([...users, formData]);
    }

    resetForm();
  };

  // edit
  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // delete
  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  // reset
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      verified: false,
      role: "user",
      founderStatus: "pending",
      investorStatus: "pending",
      ndaAccess: false,
      fullAccess: false,
    });
    setShowForm(false);
  };

  return (<>
      <div className="flex h-screen bg-gray-100">
                  
                  <Sidebar />
            
                  <div className="flex-1 flex flex-col">
                    <Topbar />
    <div className="p-4 md:p-6">
    
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold">Users</h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add User
        </button>
      </div>
<div className="flex flex-col md:flex-row gap-3 mb-4">
  <input
    placeholder="Search name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-2 rounded w-full md:w-1/3"
  />

  <select
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="all">All Roles</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
    <option value="founder">Founder</option>
    <option value="investor">Investor</option>
  </select>

  <select
    value={verifiedFilter}
    onChange={(e) => setVerifiedFilter(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="all">All</option>
    <option value="verified">Verified</option>
    <option value="not-verified">Not Verified</option>
  </select>
</div>
      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-6 grid gap-3 md:grid-cols-2"
        >
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="founder">Founder</option>
            <option value="investor">Investor</option>
          </select>
<select
  name="requestedRole"
  value={formData.requestedRole}
  onChange={handleChange}
  className="border p-2 rounded"
>
  <option value="">No Request</option>
  <option value="founder">Request Founder</option>
  <option value="investor">Request Investor</option>
  <option value="admin">Request Admin</option>
</select>
          {/* STATUS CONTROLS */}
          <select
            name="founderStatus"
            value={formData.founderStatus}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="pending">Founder Pending</option>
            <option value="approved">Founder Approved</option>
            <option value="rejected">Founder Rejected</option>
          </select>

          <select
            name="investorStatus"
            value={formData.investorStatus}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="pending">Investor Pending</option>
            <option value="approved">Investor Approved</option>
            <option value="rejected">Investor Rejected</option>
          </select>

          {/* CHECKBOXES */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="verified"
              checked={formData.verified}
              onChange={handleChange}
            />
            Verified
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ndaAccess"
              checked={formData.ndaAccess}
              onChange={handleChange}
            />
            NDA Access
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="fullAccess"
              checked={formData.fullAccess}
              onChange={handleChange}
            />
            Full Access
          </label>

          {/* ACTIONS */}
          <div className="col-span-2 flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              {editIndex !== null ? "Update" : "Submit"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* USER LIST */}
   <div className="overflow-x-auto">
  <table className="min-w-full bg-white rounded shadow">
    <thead className="bg-gray-200 text-sm">
      <tr>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3">Role</th>
        <th className="p-3">Verified</th>
        <th className="p-3">Access</th>
        <th className="p-3">Request</th>
        <th className="p-3">Actions</th>
        
      </tr>
    </thead>

    <tbody>
      {filteredUsers.map((user, index) => (
        <tr key={index} className="border-t text-sm">
          <td className="p-3">{user.name}</td>
          <td className="p-3">{user.email}</td>
          <td className="p-3 text-center">{user.role}</td>

          <td className="p-3 text-center">
            {user.verified ? "✅" : "❌"}
          </td>

          <td className="p-3 text-center">
            NDA: {user.ndaAccess ? "✔" : "✖"} <br />
            Full: {user.fullAccess ? "✔" : "✖"}
          </td>
<td className="p-3 text-center">
  {user.requestedRole ? (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-blue-600 font-medium">
        {user.requestedRole} requested
      </span>

      <div className="flex gap-1">
        <button
          onClick={() => handleApproveRequest(index)}
          className="bg-green-600 text-white px-2 py-1 rounded text-xs"
        >
          Approve
        </button>

        <button
          onClick={() => handleRejectRequest(index)}
          className="bg-red-600 text-white px-2 py-1 rounded text-xs"
        >
          Reject
        </button>
      </div>
    </div>
  ) : (
    <span className="text-gray-400 text-xs">No Request</span>
  )}
</td>
          <td className="p-3 flex gap-2 justify-center">
            <button
              onClick={() => handleEdit(index)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(index)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

      </div>
    </div>
    </div>
    </div>
 </> );
}