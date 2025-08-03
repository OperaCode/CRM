import React from "react";
import {
  FaUsers,
  FaClipboardList,
  FaClock,
} from "react-icons/fa";

const Dashboard = ({total,recent,active}) => {
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold">Total Customers</h3>
            <p className="text-gray-600 text-sm">{total} customers</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <FaClipboardList className="text-3xl text-green-600" />
          <div>
            <h3 className="text-lg font-semibold">Active Customers</h3>
            <p className="text-gray-600 text-sm">{active} active</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <FaClock className="text-3xl text-yellow-600" />
          <div>
            <h3 className="text-lg font-semibold">Recent Added</h3>
            <p className="text-gray-600 text-sm">{recent.length} recent</p>
          </div>
        </div>
      </div>

      {/* Recent Customers */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-4">Recent Customers</h4>
        {recent.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent customers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td
                      className={`px-4 py-2 ${
                        c.status === "active"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {c.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
