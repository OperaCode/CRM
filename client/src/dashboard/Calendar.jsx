import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // Load tasks and users from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("crm-tasks");
    const storedUsers = localStorage.getItem("crm-customers");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("crm-tasks", JSON.stringify(newTasks));
  };

  // Add new follow-up task
  const handleAddFollowUp = () => {
    if (users.length === 0) {
      toast.error("No registered client found.");
      return;
    }

    const userOptions = users
      .map((user, idx) => `${idx + 1}. ${user.name}`)
      .join("\n");
    const selection = prompt(`Select a user:\n${userOptions}`);

    const index = parseInt(selection) - 1;
    if (isNaN(index) || !users[index]) {
      alert("Invalid user selected.");
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
  };

  // Highlight tiles with tasks
  const tileContent = ({ date }) => {
    const hasTasks = tasks.filter(
      (task) =>
        format(new Date(task.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    return hasTasks.length > 0 ? (
      <ul className="text-[10px] text-green-600 px-1">
        {hasTasks.map((task, i) => (
          <li key={i}>📌 {task.name} ({task.userName})</li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📅 Task Calendar</h2>
        <button
          onClick={handleAddFollowUp}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Follow-Up
        </button>
      </div>

      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={tileContent}
      />
    </div>
  );
};

export default CalendarView;
