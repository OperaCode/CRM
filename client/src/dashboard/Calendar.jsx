import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { FaPlusCircle, FaTasks } from "react-icons/fa";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ userId: "", name: "" });

  useEffect(() => {
    const storedTasks = localStorage.getItem("crm-tasks");
    const storedUsers = localStorage.getItem("crm-customers");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("crm-tasks", JSON.stringify(newTasks));
  };

  const handleAddFollowUp = () => {
    if (users.length === 0) {
      toast.error("No registered clients available.");
      return;
    }
    setNewTask({ userId: users[0].id, name: "" });
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (!newTask.name.trim()) {
      toast.error("Task name is required.");
      return;
    }

    const selectedUser = users.find((u) => u.id === newTask.userId);
    const newFollowUp = {
      id: Date.now(),
      userId: newTask.userId,
      userName: selectedUser?.name,
      name: newTask.name.trim(),
      date: selectedDate.toISOString(),
    };

    const updatedTasks = [...tasks, newFollowUp];
    saveTasks(updatedTasks);
    toast.success("Follow-up added!");
    setShowModal(false);
  };

  const tileContent = ({ date }) => {
    const dayTasks = tasks.filter(
      (task) => format(new Date(task.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    return dayTasks.length > 0 ? (
      <ul className="text-[10px] text-green-600 px-1 space-y-1">
        {dayTasks.slice(0, 2).map((task, i) => (
          <li key={i}>📌 {task.name}</li>
        ))}
        {dayTasks.length > 2 && <li>+{dayTasks.length - 2} more</li>}
      </ul>
    ) : null;
  };

  const selectedDateTasks = tasks.filter(
    (task) => format(new Date(task.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-700">
          <FaTasks /> Task Calendar
        </h2>
        <button
          onClick={handleAddFollowUp}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-all"
        >
          <FaPlusCircle /> Add Follow-Up
        </button>
      </div>

      <div className="md:flex justify-between gap-8">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={tileContent}
          className="rounded border shadow flex-1"
        />

        <div className="border-l pl-6">
          <h4 className="text-lg font-medium mb-2">
            Tasks on {format(selectedDate, "MMMM d, yyyy")}
          </h4>

          {selectedDateTasks.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No follow-ups for this day.</p>
          ) : (
            <ul className="space-y-2">
              {selectedDateTasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-blue-50 border border-blue-200 p-3 rounded-md shadow-sm"
                >
                  <div className="font-medium text-blue-700">{task.name}</div>
                  <div className="text-xs text-gray-500">For: {task.userName}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for adding follow-up */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Add Follow-Up</h3>

            <label className="block mb-2 text-sm font-medium">Select Client:</label>
            <select
              value={newTask.userId}
              onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-4"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <label className="block mb-2 text-sm font-medium">Task Name:</label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              placeholder="e.g. Call client for feedback"
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
