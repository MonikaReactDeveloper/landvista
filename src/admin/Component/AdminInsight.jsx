import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminInsight() {
  const [insights, setInsights] = useState([]);
  const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  title: "",
  subtitle: "",
  description: "",
  detail: "",
  brief: [
    { title: "", subtitle: "", description: "" }
  ],
});
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleBriefChange = (index, e) => {
  const updated = [...formData.brief];
  updated[index][e.target.name] = e.target.value;

  setFormData({ ...formData, brief: updated });
};
const addBrief = () => {
  setFormData({
    ...formData,
    brief: [
      ...formData.brief,
      { title: "", subtitle: "", description: "" }
    ],
  });
};const deleteBrief = (index) => {
  const updated = formData.brief.filter((_, i) => i !== index);
  setFormData({ ...formData, brief: updated });
};
  // Add / Update service
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...insights];
      updated[editIndex] = formData;
      setInsights(updated);
      setEditIndex(null);
    } else {
      setInsights([...insights, formData]);
    }

    setFormData({
  title: "",
  subtitle: "",
  description: "",
  detail: "",
  brief: [{ title: "", subtitle: "", description: "" }],
});
    setShowForm(false);
  };

  // Edit
  const handleEdit = (index) => {
    setFormData(insights[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Delete
  const handleDelete = (index) => {
    const updated = insights.filter((_, i) => i !== index);
    setInsights(updated);
  };

  return (
    <> 
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Insights</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-landvista-blue text-white px-4 py-2 rounded"
        >
          Add Insight
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

  {/* BRIEF SECTION */}
  <div>
    <h3 className="font-semibold mb-2">Brief</h3>

    {formData.brief.map((item, index) => (
      <div key={index} className="border p-3 rounded mb-3 space-y-2">
        <input
          name="title"
          placeholder="Brief Title"
          value={item.title}
          onChange={(e) => handleBriefChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <input
          name="subtitle"
          placeholder="Brief Subtitle"
          value={item.subtitle}
          onChange={(e) => handleBriefChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Brief Description"
          value={item.description}
          onChange={(e) => handleBriefChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <button
          type="button"
          onClick={() => deleteBrief(index)}
          className="bg-landvista-blue text-white px-3 py-1 rounded"
        >
          Delete Brief
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={addBrief}
      className="bg-landvista-blue text-white px-4 py-2 rounded"
    >
      Add Brief
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

      {/* INSIGHT LIST */}
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="border p-4 rounded flex justify-between items-center"
          >
           <div>
  <h3 className="font-semibold">{insight.title}</h3>
  <p>{insight.subtitle}</p>
  <p>{insight.description}</p>

  <div className="mt-2">
    {insight.brief.map((item, i) => (
      <div key={i} className="bg-gray-100 p-2 rounded mb-1">
        <p className="font-medium">{item.title}</p>
        <p className="text-sm">{item.subtitle}</p>
        <p className="text-xs text-gray-500">{item.description}</p>
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