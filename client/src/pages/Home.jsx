import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import Customers from "../dashboard/Customers";
import CalendarView from "../dashboard/Calendar";
import Dashboard from "../dashboard/HomeDash";

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
    <div className="flex h-screen overflow-hidden font-sans text-gray-800 bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-blue-700 text-white p-6 flex flex-col shadow-xl`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-200">ClientCore</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`text-left rounded px-2 py-1 transition-all ${
              activePage === "dashboard"
                ? "bg-white text-gray-900"
                : "hover:text-blue-400"
            }`}
          >
            🏠 Dashboard
          </button>
          <button
            onClick={() => setActivePage("customers")}
            className={`text-left rounded px-2 py-1 transition-all ${
              activePage === "customers"
                ? "bg-white text-gray-900"
                : "hover:text-blue-400"
            }`}
          >
            👥 Customers
          </button>
          <button
            onClick={() => setActivePage("calendar")}
            className={`text-left rounded px-2 py-1 transition-all ${
              activePage === "calendar"
                ? "bg-white text-gray-900"
                : "hover:text-blue-400"
            }`}
          >
            📆 Calendar
          </button>
          <a
            href="/"
            className="text-left hover:text-red-300 px-2 py-1 transition-all"
          >
            ⨲ Exit
          </a>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 overflow-auto">
        {/* DashPage Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b">
          <h2 className="text-xl font-semibold capitalize text-gray-800">
            {activePage === "dashboard"
              ? "Dashboard Overview"
              : activePage === "customers"
              ? "Customers"
              : activePage === "calendar"
              ? "Calendar"
              : ""}
          </h2>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="text-2xl" />
          </button>
        </header>

        {/* DashPage Content */}
        <main className="p-6 space-y-8">
          {activePage === "dashboard" && (
            <Dashboard recent={recent} active={active} total={total} />
          )}
          {activePage === "customers" && <Customers />}
          {activePage === "calendar" && <CalendarView />}
        </main>
      </div>
    </div>
  );
};

export default Home;
