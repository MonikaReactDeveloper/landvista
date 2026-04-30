import { useState, useEffect } from "react";

export default function AdminService() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    detail: "",
    image: "",
    capabilities: [{ title: "", subtitle: "", description: "" }],
  });

  // ================= LOAD =================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("services")) || [];
    setServices(stored);
  }, []);

  // ================= SAVE =================
  const persistServices = (data) => {
    setServices(data);
    localStorage.setItem("services", JSON.stringify(data));
  };

  // ================= SLUG =================
const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove symbols like , & etc
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const newService = {
  ...formData,
  slug: generateSlug(formData.title),
  capabilities: formData.capabilities.map((cap) => ({
    ...cap,
    slug: generateSlug(cap.title), // ✅ IMPORTANT
  })),
  status: "pending",
  created_at: new Date().toISOString(),
};

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= IMAGE =================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  // ================= CAPABILITIES =================
  const handleCapabilityChange = (index, e) => {
    const updated = [...formData.capabilities];
    updated[index][e.target.name] = e.target.value;

    setFormData({ ...formData, capabilities: updated });
  };

  const addCapability = () => {
    setFormData({
      ...formData,
      capabilities: [
        ...formData.capabilities,
        { title: "", subtitle: "", description: "" },
      ],
    });
  };

  const deleteCapability = (index) => {
    const updated = formData.capabilities.filter((_, i) => i !== index);
    setFormData({ ...formData, capabilities: updated });
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
  e.preventDefault();

  const stored = JSON.parse(localStorage.getItem("services")) || [];

  const newService = {
    ...formData,
    slug: generateSlug(formData.title),

    // ✅ FIX: ADD SLUG TO EACH CAPABILITY
    capabilities: formData.capabilities.map((cap) => ({
      ...cap,
      slug: generateSlug(cap.title),
    })),

    status: "pending",
    created_at: new Date().toISOString(),
    approved_by: "",
    approved_at: "",
  };

  let updated;

  if (editIndex !== null) {
    updated = [...stored];
    updated[editIndex] = newService;
    setEditIndex(null);
  } else {
    updated = [newService, ...stored];
  }

  persistServices(updated);

  setShowForm(false);
};

  // ================= EDIT =================
  const handleEdit = (index) => {
    setFormData(services[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = (index) => {
    const updated = services.filter((_, i) => i !== index);
    persistServices(updated);
  };

  // ================= APPROVE =================
  const approveService = (index) => {
    const updated = [...services];

    updated[index].status = "approved";
    updated[index].approved_by = "admin";
    updated[index].approved_at = new Date().toISOString();

    persistServices(updated);

    alert("✅ Service approved successfully");
  };

  // ================= UI =================
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        <h2 className="text-xl font-semibold">Services</h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-landvista-blue text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-6 space-y-4"
        >
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="detail"
            placeholder="Detail Description"
            value={formData.detail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="h-40 object-cover rounded"
            />
          )}

          {/* CAPABILITIES */}
          <div>
            <h3 className="font-semibold mb-2">Capabilities</h3>

            {formData.capabilities.map((cap, index) => (
              <div key={index} className="border p-3 rounded mb-3 space-y-2">
                <input
                  name="title"
                  placeholder="Title"
                  value={cap.title}
                  onChange={(e) => handleCapabilityChange(index, e)}
                  className="w-full border p-2 rounded"
                />

                <input
                  name="subtitle"
                  placeholder="Subtitle"
                  value={cap.subtitle}
                  onChange={(e) => handleCapabilityChange(index, e)}
                  className="w-full border p-2 rounded"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={cap.description}
                  onChange={(e) => handleCapabilityChange(index, e)}
                  className="w-full border p-2 rounded"
                />

                <button
                  type="button"
                  onClick={() => deleteCapability(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addCapability}
              className="bg-landvista-blue text-white px-4 py-2 rounded"
            >
              Add Capability
            </button>
          </div>

          <div className="flex gap-2">
            <button className="bg-landvista-blue text-white px-4 py-2 rounded">
              {editIndex !== null ? "Update" : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditIndex(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* SERVICES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            {service.image && (
              <div className="h-[180px] overflow-hidden">
                <img
                  src={service.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{service.title}</h3>

              <p className="text-sm text-gray-600">
                {service.description}
              </p>

              <p className="text-xs">
                Status:{" "}
                <span
                  className={
                    service.status === "approved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {service.status}
                </span>
              </p>

              <div className="space-y-1">
                {service.capabilities?.map((cap, i) => (
                  <div
                    key={i}
                    className="text-xs bg-gray-100 p-2 rounded"
                  >
                    {cap.title}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {service.status === "pending" && (
                  <button
                    onClick={() => approveService(index)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}