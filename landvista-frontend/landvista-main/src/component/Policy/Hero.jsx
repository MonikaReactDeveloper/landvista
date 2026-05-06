import React from 'react'


export default function PolicyHero() {
  return (
    <section className="bg-landvista-bg py-16 md:py-24 px-16 md:px-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE LEFT */}
        <div className="w-full">
          <div className="relative rounded-xl overflow-hidden shadow-sm border">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216" // replace with your image
              alt="Land Intelligence Map"
              className="w-full h-full object-cover"
            />

            {/* Optional overlay for institutional feel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-landvista-blue/20 to-transparent" />
          </div>
        </div>

        {/* CONTENT RIGHT */}
        <div className="space-y-6">

          {/* Headline */}
          <h1 className="text-2xl md:text-3xl font-semibold text-landvista-charcoal leading-tight">
            Policy-Aligned Land Intelligence
          </h1>

          {/* Subtext */}
          <p className="text-xl text-landvista-grey max-w-xl">
            Explore zones, sectors, and regulatory frameworks through structured intelligence and verified data layers.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button className="bg-landvista-blue text-white px-4 py-2 font-medium hover:opacity-90 transition">
              Start Exploration
            </button>

            <p className="text-sm text-landvista-muted">
              Access to detailed intelligence is restricted to qualified users
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}


