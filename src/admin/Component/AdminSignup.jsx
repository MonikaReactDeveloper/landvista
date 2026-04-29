import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../utils/auth";

export default function AdminSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });

 const handleSignup = (e) => {
  e.preventDefault();

  if (form.secret !== "ADMIN123") {
    alert("Invalid admin access key");
    return;
  }

  const adminData = {
    name: form.name,
    email: form.email,
    password: form.password,
    role: "admin",
  };

  // ✅ Save admin user
  localStorage.setItem("adminUser", JSON.stringify(adminData));

  alert("Admin created successfully!");
  navigate("/admin-login");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-landvista-bg px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-landvista-blue">
          Admin Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* 🔐 Secret Key */}
        <input
          type="password"
          placeholder="Admin Access Key"
          className="w-full border p-2 rounded"
          required
          onChange={(e) =>
            setForm({ ...form, secret: e.target.value })
          }
        />

        <button className="w-full bg-landvista-blue text-white py-2 rounded">
          Create Admin Account
        </button>

        <p className="text-sm text-landvista-grey text-center">
          Already have access?{" "}
          <span
            className="text-landvista-blue cursor-pointer"
            onClick={() => navigate("/admin-login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}