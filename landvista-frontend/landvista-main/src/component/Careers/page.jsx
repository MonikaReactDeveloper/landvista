import React, { useState, useEffect } from "react";
import Navbar from "../homePage/navbar";
import Footer from "../homePage/footer";
import api from "../../utils/api";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/careers");
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="bg-landvista-blue text-white py-20 px-6 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Build the Future of Land Intelligence
          </h1>
          <p className="text-xl text-gray-200">
            Join a team of analysts, researchers, and engineers redefining how data drives industrial growth.
          </p>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-semibold text-landvista-charcoal">
            Current Openings ({jobs.length})
          </h2>
          <div className="flex gap-4 text-sm text-landvista-grey">
            <span>Filter by:</span>
            <select className="bg-transparent border-b outline-none">
              <option>All Departments</option>
              <option>Research</option>
              <option>Technology</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Searching for opportunities...</div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group border rounded-xl p-8 hover:border-landvista-blue transition cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-landvista-blue uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                      {job.department}
                    </span>
                    <h3 className="text-xl font-semibold text-landvista-charcoal mt-3 group-hover:text-landvista-blue transition">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-landvista-grey mt-2">
                      <span>📍 {job.location}</span>
                      <span>⏱️ {job.type}</span>
                      <span>💼 {job.experience}</span>
                    </div>
                  </div>
                  <button className="bg-landvista-charcoal text-white px-6 py-2 rounded-lg font-medium hover:bg-landvista-blue transition">
                    View Details & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {jobs.length === 0 && !loading && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-landvista-grey">No active openings at the moment. Check back soon!</p>
          </div>
        )}
      </section>

      {/* CULTURE SECTION */}
      <section className="bg-gray-50 py-20 px-6 md:px-10 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Join LandVista?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <CultureCard 
            title="Institutional Impact" 
            desc="Work on projects that shape national infrastructure and industrial corridors."
          />
          <CultureCard 
            title="Data-First Culture" 
            desc="Access advanced intelligence tools and contribute to proprietary research models."
          />
          <CultureCard 
            title="Growth Mindset" 
            desc="A fast-paced environment where innovation and analytical rigor are rewarded."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CultureCard({ title, desc }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-landvista-blue mb-4">{title}</h3>
      <p className="text-sm text-landvista-grey leading-relaxed">{desc}</p>
    </div>
  );
}
