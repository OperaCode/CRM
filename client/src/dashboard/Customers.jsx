import React, { useState, useEffect } from "react";
import CustomerForm from "../components/CustomerForm";

const TagOptions = ["VIP", "Prospect", "Follow-up", "Unsubscribed"];
const initialCustomers = [];
const Customers = () => {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("crm-customers");
    return saved ? JSON.parse(saved) : initialCustomers;
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
    tags: [],
  });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("All");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("crm-customers", JSON.stringify(customers));
  }, [customers]);

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", status: "active", tags: [] });
    setEditing(null);
  };

  useEffect(() => {
    localStorage.setItem("crm-customers", JSON.stringify(customers));
  }, [customers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setCustomers((prev) =>
        prev.map((c, i) => (i === editing ? { ...form, id: c.id } : c))
      );
    } else {
      setCustomers((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    resetForm();
    setModal(false);
  };

  const handleEdit = (index) => {
    setEditing(index);
    setForm(customers[index]);
    setModal(true);
  };

  const handleDelete = (index) => {
    setCustomers((prev) => prev.filter((_, i) => i !== index));
  };

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase());

    const matchesSegment = segment === "All" || c.tags?.includes(segment);

    return matchesSearch && matchesSegment;
  });

  const handleAddTag = (id) => {
    const tag = prompt("Enter a new tag/segment:");
    if (tag && tag.trim()) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                tags: c.tags
                  ? [...new Set([...c.tags, tag.trim()])]
                  : [tag.trim()],
              }
            : c
        )
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          className="border px-3 py-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            resetForm();
            setModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </div>

      {/* Filter by tag */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium">Filter by tag:</label>
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="All">All</option>
          {TagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Tags</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c, index) => (
            <tr key={c.id} className="border-t">
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.email}</td>
              <td className="px-4 py-2">{c.phone}</td>
              <td className="px-4 py-2">{c.status}</td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap gap-1">
                  {c.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <CustomerForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            editing={editing}
            setModal={setModal}
            resetForm={resetForm}
            TagOptions={TagOptions}
          />
        </div>
      )}
    </div>
  );
};

export default Customers;
