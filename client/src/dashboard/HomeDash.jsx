import React from "react";
import { FaUsers, FaClipboardList, FaClock } from "react-icons/fa";
import TagChart from "../components/TagChart";

const Dashboard = ({ total, recent, active }) => {
  const recentFive = recent.slice(0, 5);

  return (
    <div className="space-y-10 px-4 md:px-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-5">
          <FaUsers className="text-4xl text-indigo-600" />
          <div>
            <h3 className="text-sm text-slate-600">Total Clients</h3>
            <p className="text-3xl font-bold text-indigo-800">{total}</p>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-5">
          <FaClipboardList className="text-4xl text-emerald-600" />
          <div>
            <h3 className="text-sm text-slate-600">Active Clients</h3>
            <p className="text-3xl font-bold text-emerald-800">{active}</p>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-yellow-50 to-yellow-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-5">
          <FaClock className="text-4xl text-yellow-500" />
          <div>
            <h3 className="text-sm text-slate-600">Recently Added</h3>
            <p className="text-3xl font-bold text-yellow-800">
              {recentFive.length}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Clients Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Recent Clients
        </h2>
        {recentFive.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent clients available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentFive.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-2 font-medium text-slate-800">
                      {c.name}
                    </td>
                    <td className="px-4 py-2 text-slate-600">{c.email}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          c.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tag Distribution Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Client Tags Overview
        </h2>
        <TagChart />
      </div>
    </div>
  );
};

export default Dashboard;
