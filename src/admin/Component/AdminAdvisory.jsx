import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminAdvisory() {
  const [advisories, setAdvisories] = useState([]);
  const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  title: "",
  subtitle: "",
  description: "",
  detail: "",
  categories: [
    { title: "", subtitle: "", description: "" }
  ],
});
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleCategoryChange = (index, e) => {
  const updated = [...formData.categories];
  updated[index][e.target.name] = e.target.value;

  setFormData({ ...formData, categories: updated });
};
const addCategory = () => {
  setFormData({
    ...formData,
    categories: [
      ...formData.categories,
      { title: "", subtitle: "", description: "" }
    ],
  });
};const deleteCategory = (index) => {
  const updated = formData.categories.filter((_, i) => i !== index);
  setFormData({ ...formData, categories: updated });
};
  // Add / Update advisory
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...advisories];
      updated[editIndex] = formData;
      setAdvisories(updated);
      setEditIndex(null);
    } else {
      setAdvisories([...advisories, formData]);
    }

    setFormData({
  title: "",
  subtitle: "",
  description: "",
  detail: "",
  categories : [{ title: "", subtitle: "", description: "" }],
});
    setShowForm(false);
  };

  // Edit
  const handleEdit = (index) => {
    setFormData(advisories[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Delete
  const handleDelete = (index) => {
    const updated = advisories.filter((_, i) => i !== index);
    setAdvisories(updated);
  };

  return (
    <> 
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Advisories</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Advisory
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
    <h3 className="font-semibold mb-2">Categories</h3>

    {formData.categories.map((cat, index) => (
      <div key={index} className="border p-3 rounded mb-3 space-y-2">
        <input
          name="title"
          placeholder="Category Title"
          value={cat.title}
          onChange={(e) => handleCategoryChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <input
          name="subtitle"
          placeholder="Category Subtitle"
          value={cat.subtitle}
          onChange={(e) => handleCategoryChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Category Description"
          value={cat.description}
          onChange={(e) => handleCategoryChange(index, e)}
          className="w-full border p-2 rounded"
        />

        <button
          type="button"
          onClick={() => deleteCategory(index)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete Category
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={addCategory}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add Category
    </button>
  </div>

  {/* ACTION BUTTONS */}
  <div className="flex gap-2">
    <button className="bg-green-600 text-white px-4 py-2 rounded">
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

      {/* ADVISORY LIST */}
      <div className="space-y-3">
        {advisories.map((advisory, index) => (
          <div
            key={index}
            className="border p-4 rounded flex justify-between items-center"
          >
           <div>
  <h3 className="font-semibold">{advisory.title}</h3>
  <p>{advisory.subtitle}</p>
  <p>{advisory.description}</p>

  <div className="mt-2">
    {advisory.categories.map((cat, i) => (
      <div key={i} className="bg-gray-100 p-2 rounded mb-1">
        <p className="font-medium">{cat.title}</p>
        <p className="text-sm">{cat.subtitle}</p>
        <p className="text-xs text-gray-500">{cat.description}</p>
      </div>
    ))}
  </div>
</div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-red-600 text-white px-3 py-1 rounded"
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