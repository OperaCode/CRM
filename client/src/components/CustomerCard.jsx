// src/components/CustomerCard.jsx
export default function CustomerCard({ customer, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow transition">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{customer.name}</h2>
          <p className="text-sm text-gray-600">{customer.email}</p>
          <span
            className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {customer.status}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
