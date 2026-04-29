"use client";

import React, { useState } from "react";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";

export default function AdvisoryPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    investorType: "",
    capitalBand: "",
    geography: "",
    purpose: "",
    phone: "",
    role: "",
  });

  const [status, setStatus] = useState("idle"); // idle | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Full name is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.company) newErrors.company = "Organization is required";
    if (!form.investorType) newErrors.investorType = "Select investor type";
    if (!form.capitalBand) newErrors.capitalBand = "Select capital band";
    if (!form.geography) newErrors.geography = "Geography required";
    if (!form.purpose) newErrors.purpose = "Purpose is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("success");

    console.log("Submitted Data:", form);
  };

  return (
    <div className="bg-landvista-bg min-h-screen">
<Navbar/>
      {/* ================= HERO ================= */}
      <section className="bg-landvista-bg text-landvista-charcoal py-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto text-center">
          <h1 className="text-[36px] md:text-[48px] font-semibold mb-4 text-landvista-charcoal">
            Request Access
          </h1>
          <p className=" text-[16px] md:text-[18px] mb-3">
            Access to TerraSignal is limited to qualified participants and is subject to structured review and approval
          </p>
          <p className="text-landvista-muted text-sm">
            This is a controlled intelligence platform with restricted access
          </p>
        </div>
      </section>

      {/* ================= ACCESS EXPLANATION ================= */}
      <section className="py-16 px-6 md:px-10 bg-landvista-bg">
  <div className="max-w-[1200px] mx-auto text-center mb-10">
    <p className="text-[20px] md:text-[22px] font-medium text-landvista-charcoal">
      Access to TerraSignal requires
    </p>
    <p className="text-sm text-landvista-muted mt-2">
      Structured onboarding ensures controlled intelligence access
    </p>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">

    {/* CARD 1 */}
    <div className="relative group h-[220px] rounded-lg overflow-hidden shadow">
      <img
        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
        alt="Qualification"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

      <div className="relative z-10 h-full flex flex-col justify-end p-4 text-left">
        <h3 className="text-white text-lg font-semibold">
          Qualification Review
        </h3>
        <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition">
          Each request undergoes structured eligibility evaluation
        </p>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="relative group h-[220px] rounded-lg overflow-hidden shadow">
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
        alt="NDA"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

      <div className="relative z-10 h-full flex flex-col justify-end p-4 text-left">
        <h3 className="text-white text-lg font-semibold">
          NDA Acceptance
        </h3>
        <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition">
          Confidentiality agreement required before full access
        </p>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="relative group h-[220px] rounded-lg overflow-hidden shadow">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="Approval"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

      <div className="relative z-10 h-full flex flex-col justify-end p-4 text-left">
        <h3 className="text-white text-lg font-semibold">
          Controlled Approval
        </h3>
        <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition">
          Access granted based on governance and platform rules
        </p>
      </div>
    </div>

  </div>

  {/* FOOTER NOTE */}
  <div className="max-w-[800px] mx-auto text-center mt-10">
    <p className="text-sm text-landvista-muted">
      The platform is not publicly accessible and is designed for institutional participants only
    </p>
  </div>
</section>

      {/* ================= FORM ================= */}
      <section className="pb-20 px-6 md:px-10">
        <div className="max-w-[900px] mx-auto bg-white p-8 md:p-12 shadow-sm border border-gray-200">

          <h2 className="text-[24px] font-semibold mb-8 text-landvista-charcoal">
            Qualification Form
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            {/* INPUT COMPONENT */}
            {[
              { label: "Full Name", name: "name" },
              { label: "Email Address", name: "email" },
              { label: "Organization / Firm", name: "company" },
              { label: "Geography", name: "geography" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type="text"
                  placeholder={field.label}
                  value={form[field.name]}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-landvista-green"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {/* DROPDOWNS */}
            <select
              className="border p-3 text-sm"
              onChange={(e) =>
                setForm({ ...form, investorType: e.target.value })
              }
            >
              <option value="">Investor Type</option>
              <option>Institutional</option>
              <option>Private Equity</option>
              <option>Family Office</option>
            </select>

            <select
              className="border p-3 text-sm"
              onChange={(e) =>
                setForm({ ...form, capitalBand: e.target.value })
              }
            >
              <option value="">Capital Band</option>
              <option>$1M - $10M</option>
              <option>$10M - $100M</option>
              <option>$100M+</option>
            </select>

            {/* TEXTAREA */}
            <div className="md:col-span-2">
              <textarea
                placeholder="Purpose / Intent"
                rows="4"
                className="w-full border p-3 text-sm"
                onChange={(e) =>
                  setForm({ ...form, purpose: e.target.value })
                }
              />
              {errors.purpose && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.purpose}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <div className="md:col-span-2 mt-4">
              <button className="w-full bg-landvista-blue text-white py-4 font-medium hover:opacity-90">
                Submit Request
              </button>
            </div>

            {/* STATUS */}
            {status === "success" && (
              <p className="text-green-600 text-sm mt-4">
                Your request has been submitted and is under review.
              </p>
            )}

            {status === "error" && (
              <p className="text-red-500 text-sm mt-4">
                Please fix the errors above.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="bg-white py-16 px-6 md:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-landvista-grey text-sm">
            • Non-brokerage platform • No public listings • Verified multi-source data • Governance-led framework
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-16 text-center">
        <p className="text-landvista-charcoal font-medium">
          For institutional inquiries:
        </p>
        <p className="text-landvista-green mt-2">
          investors@terrasignal.com
        </p>
      </section>

   <Footer/>

    </div>
  );
}