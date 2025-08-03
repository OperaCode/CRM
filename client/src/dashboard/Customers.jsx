import React, { useState, useEffect } from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";

const TagOptions = [ "Platinum","VIP", "Regular", "Follow-up"];
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

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          className="border border-slate-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring focus:border-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            resetForm();
            setModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Client
        </button>
      </div>

      {/* Tag Filter */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-700 font-medium">Filter by Tag:</label>
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          className="border border-slate-300 px-3 py-2 rounded text-sm bg-white"
        >
          <option value="All">All</option>
          {TagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">    
        <CustomerTable handleEdit={handleEdit} handleDelete={handleDelete} filtered={filtered}/>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
