import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Nda() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const updateUser = (updates) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = { ...user, ...updates };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // ✅ ACCEPT NDA
  const handleAccept = () => {
    if (!accepted) return alert("You must accept NDA");

    updateUser({
      nda_status: "verified",
      ndaAccess: true,
    });

    navigate("/dashboard");
  };

  // ⚠️ SKIP NDA
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-landvista-bg p-6">
      <div className="bg-white max-w-2xl w-full p-6 rounded shadow">

        <h2 className="text-xl font-semibold mb-4">
          Non-Disclosure Agreement
        </h2>

        <div className="text-sm text-gray-600 h-40 overflow-y-auto border p-3 mb-4">
          <p>
            This platform provides confidential intelligence. By accessing this
            platform, you agree not to distribute or misuse information.
          </p>
        </div>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          I accept the NDA terms
        </label>

        <div className="flex gap-3">
          {/* ✅ ACCEPT */}
          <button
            onClick={handleAccept}
            className="bg-landvista-blue text-white px-4 py-2 rounded w-full"
          >
            Continue (Accept NDA)
          </button>

      
        </div>
      </div>
    </div>
  );
}