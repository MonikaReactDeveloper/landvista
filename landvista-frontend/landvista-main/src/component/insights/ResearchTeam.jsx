import React from "react";
import { team } from "../../data/team";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResearchTeam() {
  return (
    <section className="bg-landvista-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* HEADER */}
        <div className="mb-12">
          <h2 className="text-[28px] md:text-[36px] font-heading text-landvista-charcoal mb-4">
            Research Team
          </h2>
          <p className="text-landvista-grey text-[15px]">
            Meet the experts behind our market insights.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {team.map((person, i) => (
            <div key={i} className="group">

              {/* NAME + ROLE */}
              <div className="mb-6">
                <h3 className="text-[20px] font-heading text-landvista-green">
                  {person.name}
                </h3>
                <p className="text-[14px] text-landvista-grey mt-1">
                  {person.role}
                </p>
              </div>

              {/* IMAGE CARD */}
              <div className="relative overflow-hidden">

                {/* IMAGE */}
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-[320px] md:h-[380px] object-cover"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between p-6">

                  {/* EMAIL */}
                  <div className="flex items-center gap-2 text-[14px] text-white">
                    <Mail size={16} />
                    <span>{person.email}</span>
                  </div>

                  {/* VIEW PROFILE */}
                  <Link
                    to={`/people/${person.slug}`}
                    className="flex items-center gap-2 text-white text-[14px] font-medium group/link"
                  >
                    <span className="border-b border-landvista-green text-white pb-[2px]">
                      View Profile
                    </span>

                    <ArrowRight
                      size={16}
                      className="transform transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>

                </div>

                {/* LEFT BORDER ACCENT */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-landvista-green opacity-0 group-hover:opacity-100 transition"></div>

              </div>

              {/* DIVIDER */}
              <div className="border-t border-gray-200 mt-8"></div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}