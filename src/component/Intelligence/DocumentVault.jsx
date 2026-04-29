import { useState } from "react";
import DocumentViewer from "./DocumentViewer";

export default function DocumentVault() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const docs = JSON.parse(localStorage.getItem("documents")) || [];

  const filteredDocs = docs.filter((doc) => {
    const matchSearch = doc.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || doc.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6 bg-landvista-bg min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-landvista-blue">
          Document Vault
        </h2>

        <div className="flex gap-2">
          <input
            placeholder="Search documents..."
            className="border p-2 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="Policy">Policy</option>
            <option value="Maps">Maps</option>
            <option value="Reports">Reports</option>
          </select>
        </div>
      </div>

      {/* DOCUMENT GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedDoc(doc)}
          >
            <h3 className="font-semibold text-landvista-charcoal">
              {doc.title}
            </h3>

            <p className="text-sm text-landvista-grey">
              {doc.category}
            </p>

            <p className="text-xs mt-2 text-landvista-muted">
              Updated: {doc.updatedAt}
            </p>

            {/* ACCESS BADGE */}
            <span
              className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                doc.access === "allowed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {doc.access === "allowed"
                ? "Accessible"
                : "Restricted"}
            </span>
          </div>
        ))}
      </div>

      {/* VIEWER */}
      {selectedDoc && (
        <DocumentViewer
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}