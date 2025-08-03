import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("crm-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save to localStorage
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("crm-tasks", JSON.stringify(newTasks));
  };

  // Add new follow-up task
  const handleAddFollowUp = () => {
    const name = prompt("Enter customer/task name:");
    if (!name) return;

    const newTask = {
      id: Date.now(),
      name,
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
          <li key={i}>📌 {task.name}</li>
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

export default CalendarPage;
