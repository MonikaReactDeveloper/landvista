import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../utils/auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

 const handleLogin = (e) => {
  e.preventDefault();

  const storedAdmin = JSON.parse(localStorage.getItem("adminUser"));

  if (!storedAdmin) {
    alert("No admin account found. Please signup.");
    return;
  }

  if (
    form.email === storedAdmin.email &&
    form.password === storedAdmin.password
  ) {
    // ✅ Set auth session
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token: "admin-token",
        role: "admin",
        user: storedAdmin.name,
      })
    );

    navigate("/admin/dashboard");
  } else {
    alert("Invalid credentials");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-landvista-bg">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-landvista-blue">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-landvista-blue text-white py-2">
          Login
        </button>
        <p className="text-sm text-landvista-grey text-center">
          Register for Admin?{" "}
          <span
            className="text-landvista-blue cursor-pointer"
            onClick={() => navigate("/admin-signup")}
          >
            Sign up
          </span>
        </p>
      </form>
   
    </div>
  );
}