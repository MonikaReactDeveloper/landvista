import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email);

  if (!user) return alert("User not found");

  // ❌ REJECTED
  if (user.status === "rejected") {
    return alert("Your request was rejected");
  }

  // 🚫 SUSPENDED
  if (user.status === "suspended") {
    return alert("Your account is suspended");
  }

  // ⏳ NOT APPROVED
  if (user.status !== "approved") {
    return alert("Your request is still under review");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  // 🔥 NDA CHECK
  if (user.nda_status !== "verified") {
    navigate("/nda");
  } else {
    navigate("/dashboard");
  }
};
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Login</h2>

      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

   <button
  disabled={!email}
  onClick={handleLogin}
  className={`px-4 py-2 rounded text-white ${
    email ? "bg-landvista-blue" : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Login
</button>
    </div>
  );
}