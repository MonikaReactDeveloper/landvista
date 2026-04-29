"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { team } from "../../data/team";
import Navbar from "../homePage/navbar";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import Breadcrumbs from "../homePage/Breadcrumbs";

export default function PeopleDetail() {
  const { slug } = useParams();

  const person = team.find((p) => p.slug === slug);

  if (!person) {
    return <div className="p-10">Profile not found</div>;
  }

  return (
    <>
      <Navbar />
<Breadcrumbs/>
      <section className="bg-landvista-bg min-h-screen">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">

          {/* TOP SECTION */}
          <div className="grid md:grid-cols-12 gap-12 items-start">

            {/* IMAGE */}
            <div className="md:col-span-4">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-[420px] object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="md:col-span-8">

              {/* NAME */}
              <h1 className="text-[32px] md:text-[44px] font-heading text-landvista-charcoal mb-4">
                {person.name}
              </h1>

              {/* ROLE */}
              <p className="text-[16px] text-landvista-grey mb-6">
                {person.role}
              </p>

              {/* CONTACT */}
              <div className="flex flex-wrap gap-6 mb-8 text-[14px] text-landvista-charcoal">

                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {person.email}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {person.location}
                </div>

              </div>

              {/* CTA */}
              <button className="group flex items-center gap-2 text-landvista-green text-[14px] font-medium">
                Contact
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-200 my-16"></div>

          {/* BIOGRAPHY */}
          <div className="max-w-[900px]">
            <h2 className="text-[22px] font-heading mb-6 text-landvista-charcoal">
              Biography
            </h2>

            <p className="text-[15px] leading-relaxed text-landvista-grey">
              {person.bio}
            </p>
          </div>

          {/* RELATED INSIGHTS (OPTIONAL) */}
          <div className="mt-20">
            <h2 className="text-[22px] font-heading mb-8 text-landvista-charcoal">
              Latest Insights
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white p-6 border border-gray-200 hover:shadow-md transition"
                >
                  <h3 className="text-[16px] font-medium text-landvista-charcoal mb-3">
                    Market Trends 2026
                  </h3>
                  <p className="text-[14px] text-landvista-grey">
                    Insights into evolving real estate strategies.
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>
    </>
  );
}