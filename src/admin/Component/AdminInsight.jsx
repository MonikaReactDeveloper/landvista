import { useState, useEffect } from "react";

export default function AdminInsight() {
  const [insights, setInsights] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    detail: "",
    image: "", // ✅ NEW
    brief: [{ title: "", subtitle: "", description: "" }],
    status: "pending",
    approved_by: "",
    approved_at: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("insights")) || [];
    setInsights(stored);
  }, []);

  const persistInsights = (data) => {
    setInsights(data);
    localStorage.setItem("insights", JSON.stringify(data));
  };

  const generateSlug = (title) =>
    title.toLowerCase().replace(/\s+/g, "-");

  // ================= FORM =================

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleBriefChange = (index, e) => {
    const updated = [...formData.brief];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, brief: updated });
  };

  const addBrief = () => {
    setFormData({
      ...formData,
      brief: [...formData.brief, { title: "", subtitle: "", description: "" }],
    });
  };

  const deleteBrief = (index) => {
    const updated = formData.brief.filter((_, i) => i !== index);
    setFormData({ ...formData, brief: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("insights")) || [];

    const newInsight = {
      ...formData,
      slug: generateSlug(formData.title),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    let updated;

    if (editIndex !== null) {
      updated = [...stored];
      updated[editIndex] = newInsight;
    } else {
      updated = [newInsight, ...stored];
    }

    persistInsights(updated);
    setEditIndex(null);
    setShowForm(false);

    setFormData({
      title: "",
      subtitle: "",
      description: "",
      detail: "",
      image: "",
      brief: [{ title: "", subtitle: "", description: "" }],
    });
  };

  // ================= ACTIONS =================

  const handleEdit = (index) => {
    setFormData(insights[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = insights.filter((_, i) => i !== index);
    persistInsights(updated);
  };

  const approveInsight = (index) => {
    const updated = [...insights];

    updated[index] = {
      ...updated[index],
      status: "approved",
      approved_by: "admin",
      approved_at: new Date().toISOString(),
    };

    persistInsights(updated);

    alert("Insight approved successfully ✅"); // ✅ ALERT
  };

  // ================= UI =================

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
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
          className="bg-white p-4 rounded shadow grid gap-3 md:grid-cols-2"
        >
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input" required />
          <input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} className="input" />

          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input col-span-2" />
          <textarea name="detail" placeholder="Detail" value={formData.detail} onChange={handleChange} className="input col-span-2" />

          {/* IMAGE */}
          <input type="file" onChange={handleImage} className="col-span-2" />

          {formData.image && (
            <img src={formData.image} className="h-32 object-cover col-span-2 rounded" />
          )}

          {/* BRIEF */}
          <div className="col-span-2 space-y-2">
            <h3 className="font-semibold">Brief</h3>

            {formData.brief.map((b, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-2">
                <input name="title" placeholder="Title" value={b.title} onChange={(e) => handleBriefChange(i, e)} className="input" />
                <input name="subtitle" placeholder="Subtitle" value={b.subtitle} onChange={(e) => handleBriefChange(i, e)} className="input" />
                <input name="description" placeholder="Desc" value={b.description} onChange={(e) => handleBriefChange(i, e)} className="input" />
              </div>
            ))}

            <button type="button" onClick={addBrief} className="btn-secondary">Add Brief</button>
          </div>

          <div className="col-span-2 flex gap-2">
            <button className="btn-primary">{editIndex ? "Update" : "Submit"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {/* LIST (CARD STYLE LIKE INTELLIGENCE) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white rounded shadow-sm overflow-hidden">

            {/* IMAGE */}
            {insight.image && (
              <img src={insight.image} className="h-40 w-full object-cover" />
            )}

            <div className="p-4 space-y-2">

              <h3 className="font-semibold">{insight.title}</h3>
              <p className="text-sm text-gray-500">{insight.subtitle}</p>

              {/* STATUS */}
              <span className={`text-xs px-2 py-1 rounded ${
                insight.status === "approved"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}>
                {insight.status}
              </span>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                {insight.status !== "approved" && (
                  <button onClick={() => approveInsight(index)} className="btn-primary">
                    Approve
                  </button>
                )}

                <button onClick={() => handleEdit(index)} className="btn-secondary">
                  Edit
                </button>

                <button onClick={() => handleDelete(index)} className="btn-secondary">
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