import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminService() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  title: "",
  subtitle: "",
  description: "",
  detail: "",
  capabilities: [
    { title: "", subtitle: "", description: "" }
  ],
});
  const [editIndex, setEditIndex] = useState(null);

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
};const deleteCapability = (index) => {
  const updated = formData.capabilities.filter((_, i) => i !== index);
  setFormData({ ...formData, capabilities: updated });
};
  // Add / Update service
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...services];
      updated[editIndex] = formData;
      setServices(updated);
      setEditIndex(null);
    } else {
      setServices([...services, formData]);
    }

    setFormData({
  title: "",
  subtitle: "",
  description: "",
  detail: "",
  capabilities: [{ title: "", subtitle: "", description: "" }],
});
    setShowForm(false);
  };

  // Edit
  const handleEdit = (index) => {
    setFormData(services[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Delete
  const handleDelete = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
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
    <button className="bg-landvista-blue text-white px-4 py-2 rounded">
      {editIndex !== null ? "Update" : "Submit"}
    </button>

    <button
      type="button"
      onClick={() => {
        setShowForm(false);
        setEditIndex(null);
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
        {services.map((service, index) => (
          <div
            key={index}
            className="border p-4 rounded flex justify-between items-center"
          >
           <div>
  <h3 className="font-semibold">{service.title}</h3>
  <p>{service.subtitle}</p>
  <p>{service.description}</p>

  <div className="mt-2">
    {service.capabilities.map((cap, i) => (
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
                onClick={() => handleEdit(index)}
                className="bg-landvista-blue text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
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