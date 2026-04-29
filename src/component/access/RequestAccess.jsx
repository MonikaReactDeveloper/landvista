import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequestAccess() {
 const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  phone: "",
  organization: "",
  designation: "",
source_channel: "",
  requestedRole: "investor",

  investor_type: "",
  capital_band: "",
  geography: "",
  purpose: "",
});
const navigate = useNavigate();
const handleSubmit = (e) => {
  e.preventDefault();

  const existingUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  // ❗ prevent duplicate users
  const alreadyExists = existingUsers.find(
    (u) => u.email === formData.email
  );

  if (alreadyExists) {
    return alert("User already requested or exists");
  }

  const newUser = {
    // 🔥 CORE USER DATA
    full_name: formData.full_name,
    email: formData.email,
    phone: formData.phone,
    organization: formData.organization,
    designation: formData.designation,
source_channel: formData.source_channel,
    // 🔥 SYSTEM FIELDS
    password: "",
    status: "pending",
    role: "user",
    tier: "preview",

    requestedRole: formData.requestedRole,

    nda_status: "unverified",
    ndaAccess: false,
    fullAccess: false,

    last_login_at: null,
    approved_by: "",
    approved_at: "",

    rejection_reason: "",
    suspension_reason: "",
    internal_notes: "",

    // 🔥 ACCESS REQUEST DATA (IMPORTANT)
    investor_type: formData.investor_type,
    capital_band: formData.capital_band,
    geography: formData.geography,
    purpose: formData.purpose,

    review_status: "pending",
    reviewed_by: "",
    reviewed_at: "",
    decision_reason: "",
  };

  const updatedUsers = [...existingUsers, newUser];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  alert("Request submitted. Await admin approval.");

  navigate("/login"); // optional redirect
};
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Request Access</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
      <input
  placeholder="Full Name"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, full_name: e.target.value })
  }
  required
/>

<input
  type="email"
  placeholder="Email"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
  }
  required
/>

<input
  placeholder="Phone"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, phone: e.target.value })
  }
/>

<input
  placeholder="Organization"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, organization: e.target.value })
  }
/>

<input
  placeholder="Designation"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, designation: e.target.value })
  }
/>

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setFormData({
              ...formData,
              requestedRole: e.target.value,
            })
          }
        >
          <option value="investor">Investor</option>
          <option value="founder">Founder</option>
          <option value="admin">Admin</option>
        </select>
<select
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, investor_type: e.target.value })
  }
>
  <option value="">Investor Type</option>
  <option value="hni">HNI</option>
  <option value="developer">Developer</option>
    <option value="fund">Fund</option>
  <option value="family_office">Family Office</option>
</select>

<select
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, capital_band: e.target.value })
  }
>
  <option value="">Capital Band</option>
  <option value="0-1cr">0–1 Cr</option>
  <option value="1-10cr">1–10 Cr</option>
  <option value="10cr+">10 Cr+</option>
</select>

<input
  placeholder="Geography (e.g. India, Global)"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, geography: e.target.value })
  }
/>

<input
  placeholder="Purpose"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, purpose: e.target.value })
  }
/>
<input
  placeholder="Source channel"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setFormData({ ...formData, source_channel: e.target.value })
  }
/>
        <button className="bg-landvista-blue text-white px-4 py-2 rounded mr-2">
          Submit Request
        </button>
      <button
  type="button"
  onClick={() => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === formData.email
    );

    if (!user) {
      return alert("Submit request first");
    }

    if (user.status !== "approved") {
      return alert("Request not approved yet");
    }

    navigate("/login");
  }}
  className="bg-landvista-blue text-white px-4 py-2 rounded"
>
  Login
</button>
      </form>
    </div>
  );
}