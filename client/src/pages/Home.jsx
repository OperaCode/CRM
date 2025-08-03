import { useEffect, useState } from "react";
import {
  FaUsers,
  FaClipboardList,
  FaClock,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Customers from "../dashboard/Customers";
import Calendar from "react-calendar";
import Dashboard from "../dashboard/Dashboard";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("crm-customers");
    if (saved) {
      setCustomers(JSON.parse(saved));
    }
  }, []);

  const total = customers.length;
  const active = customers.filter((c) => c.status === "active").length;
  const recent = [...customers].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="flex h-screen overflow-hidden font-sans text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-gray-900 text-white p-4 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Minimal CRM</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 text-sm">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`text-left hover:text-blue-400 ${
              activePage === "dashboard" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            🏠 Dashboard
          </button>
          <button
            onClick={() => setActivePage("customers")}
            className={`text-left hover:text-blue-400 ${
              activePage === "customers" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            👥 Customers
          </button>
          <button
            onClick={() => setActivePage("calendar")}
            className={`text-left hover:text-blue-400 ${
              activePage === "calendar" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            📆 Calendar
          </button>
          {/* <button className="text-left hover:text-blue-400"></button> */}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 ml-0 md:ml-64 overflow-auto">
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-semibold capitalize">
            {activePage === "dashboard" ? "Dashboard Overview" : "Customers"}
          </h2>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="text-2xl" />
          </button>
        </header>

        <main className="p-6 space-y-6 overflow-y-auto">
          {activePage === "dashboard" && (
            <>
              {/* Stats */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <p className="text-gray-600 text-sm">
                      {recent.length} recent
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Recent Customers */}
              {/* <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="text-lg font-semibold mb-4">Recent Customers</h4>
                {recent.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No recent customers found.
                  </p>
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
              </div> */}

              <Dashboard recent={recent} active={active} total={total}/>


            </>
          )}

          {activePage === "customers" && <Customers />}
          {activePage === "calendar" && <Calendar />}
        </main>
      </div>
    </div>
  );
};

export default Home;
