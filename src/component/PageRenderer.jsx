import React from 'react'

export default function PageRenderer({ page }) {
  if (!page) return <div className="p-10">Page not found</div>;

  return (
    <div>
      {/* HERO */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-4xl font-semibold mb-4">
            {page.hero.heading}
          </h1>
          <p className="text-gray-600 text-lg">
            {page.hero.subtext}
          </p>
        </div>
      </section>

      {/* DYNAMIC SECTIONS */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 space-y-16">
        {page.sections.map((section, i) => {
          switch (section.type) {
            case "text":
              return (
                <div key={i}>
                  <h2 className="text-2xl font-semibold mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600">{section.content}</p>
                </div>
              );

            case "grid":
              return (
                <div key={i}>
                  <h2 className="text-2xl font-semibold mb-6">
                    {section.title}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {section.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-6 border rounded-lg"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}