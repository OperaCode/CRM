
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [followUps, setFollowUps] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("followUps");
    if (saved) {
      setFollowUps(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("followUps", JSON.stringify(followUps));
  }, [followUps]);

  const addFollowUp = () => {
    const name = prompt("Customer name:");
    if (name) {
      setFollowUps([
        ...followUps,
        {
          date: selectedDate.toDateString(),
          name,
        },
      ]);
    }
  };

  const tileContent = ({ date }) => {
    const matches = followUps.filter(f => f.date === date.toDateString());
    return matches.length > 0 ? (
      <ul className="text-[10px] p-1 text-green-600">
        {matches.map((f, i) => (
          <li key={i}>📌 {f.name}</li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold">📅 Customer Follow-ups</h2>
        <button
          onClick={addFollowUp}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add Follow-Up
        </button>
      </div>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />
    </div>
  );
};

export default CalendarView;
