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

  // Load tasks and users
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

    const userOptions = users
      .map((user, idx) => `${idx + 1}. ${user.name}`)
      .join("\n");
    const selection = prompt(`Select a client:\n${userOptions}`);

    const index = parseInt(selection) - 1;
    if (isNaN(index) || !users[index]) {
      alert("Invalid client selected.");
      return;
    }

    const taskName = prompt("Enter task/follow-up:");
    if (!taskName) return;

    const newTask = {
      id: Date.now(),
      userId: users[index].id,
      userName: users[index].name,
      name: taskName,
      date: selectedDate.toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    toast.success("Follow-up added successfully!");
  };

  const tileContent = ({ date }) => {
    const dayTasks = tasks.filter(
      (task) =>
        format(new Date(task.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
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
    (task) =>
      format(new Date(task.date), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
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

      <div className="grid md:grid-cols-2 gap-8">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={tileContent}
          className="rounded border shadow"
        />

        <div className="border-l pl-6">
          <h4 className="text-lg font-medium mb-2">
            Tasks on {format(selectedDate, "MMMM d, yyyy")}
          </h4>

          {selectedDateTasks.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No follow-ups for this day.
            </p>
          ) : (
            <ul className="space-y-2">
              {selectedDateTasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-blue-50 border border-blue-200 p-3 rounded-md shadow-sm"
                >
                  <div className="font-medium text-blue-700">{task.name}</div>
                  <div className="text-xs text-gray-500">
                    For: {task.userName}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
