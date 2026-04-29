import { useNavigate } from "react-router-dom";

export default function DocumentViewer({ doc, onClose }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  // 🔥 ACCESS CONTROL
  if (!user?.ndaAccess) {
    navigate("/nda");
    return null;
  }

  if (doc.access !== "allowed") {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Access Restricted
          </h2>
          <p className="text-sm text-gray-600">
            You don’t have permission to view this document.
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-landvista-blue text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center"
      onContextMenu={(e) => e.preventDefault()} // 🔒 disable right click
    >
      <div className="bg-white w-[90%] h-[90%] rounded relative overflow-hidden">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
        >
          Close
        </button>

        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 text-4xl rotate-[-30deg]">
          CONFIDENTIAL
        </div>

        {/* VIEWER */}
        {doc.type === "pdf" ? (
          <iframe
            src={doc.url}
            className="w-full h-full"
            title="document"
          />
        ) : (
          <img
            src={doc.url}
            alt={doc.title}
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}