import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AdminService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    detail: "",
    capabilities: [
      { title: "", subtitle: "", description: "" }
    ],
  });

  const [editingId, setEditingId] = useState(null);

  // LOAD
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        { title: "", subtitle: "", description: "" }
      ],
    });
  };

  const deleteCapability = (index) => {
    const updated = formData.capabilities.filter((_, i) => i !== index);
    setFormData({ ...formData, capabilities: updated });
  };

  // Add / Update service
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, formData);
      } else {
        await api.post("/services", formData);
      }
      fetchServices();
      setFormData({
        title: "",
        slug: "",
        subtitle: "",
        description: "",
        detail: "",
        capabilities: [{ title: "", subtitle: "", description: "" }],
      });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      alert("Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      slug: service.slug || "",
      subtitle: service.subtitle || "",
      description: service.description,
      detail: service.detail || "",
      capabilities: service.capabilities || [{ title: "", subtitle: "", description: "" }],
    });
    setEditingId(service._id);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };


  return (
    <> 
    <div className="p-6">
      <div className="flex justify-between mb-4">
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
  {/* MAIN FIELDS */}
  <input
    name="title"
    placeholder="Title"
    value={formData.title}
    onChange={handleChange}
    className="w-full border p-2 rounded"
    required
  />

  <input
    name="slug"
    placeholder="Slug (e.g. advisory-services)"
    value={formData.slug}
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

  {/* CAPABILITIES SECTION */}
  <div>
    <h3 className="font-semibold mb-2">Capabilities</h3>

    {formData.capabilities.map((cap, index) => (
      <div key={index} className="border p-3 rounded mb-3 space-y-2">
        <input
          name="title"
          placeholder="Capability Title"
          value={cap.title}
          onChange={(e) => handleCapabilityChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <input
          name="subtitle"
          placeholder="Capability Subtitle"
          value={cap.subtitle}
          onChange={(e) => handleCapabilityChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Capability Description"
          value={cap.description}
          onChange={(e) => handleCapabilityChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <button
          type="button"
          onClick={() => deleteCapability(index)}
          className="bg-landvista-blue text-white px-3 py-1 rounded"
        >
          Delete Capability
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

  {/* ACTION BUTTONS */}
  <div className="flex gap-2">
    <button 
      disabled={loading}
      className="bg-landvista-blue text-white px-4 py-2 rounded disabled:bg-gray-400"
    >
      {loading ? "Saving..." : (editingId ? "Update" : "Submit")}
    </button>

    <button
      type="button"
      onClick={() => {
        setShowForm(false);
        setEditingId(null);
      }}
      className="bg-landvista-blue text-white px-4 py-2 rounded"
    >
      Cancel
    </button>
  </div>
</form>
      )}

      {/* SERVICE LIST */}
      <div className="space-y-3">
        {loading && !showForm && <p>Loading services...</p>}
        {!loading && services.length === 0 && <p>No services found.</p>}
        {services.map((service, index) => (
          <div
            key={service._id}
            className="border p-4 rounded flex justify-between items-center"
          >
           <div>
  <h3 className="font-semibold">{service.title}</h3>
  <p>{service.subtitle}</p>
  <p>{service.description}</p>

  <div className="mt-2">
    {service.capabilities?.map((cap, i) => (
      <div key={i} className="bg-gray-100 p-2 rounded mb-1">
        <p className="font-medium">{cap.title}</p>
        <p className="text-sm">{cap.subtitle}</p>
        <p className="text-xs text-gray-500">{cap.description}</p>
      </div>
    ))}
  </div>
</div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-landvista-blue text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(service._id)}
                className="bg-landvista-blue text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    
    </div>
    </>
  );
}