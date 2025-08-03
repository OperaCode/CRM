import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useCRM } from "../context/CRMContext";
import { format } from "date-fns";

const Calendar = () => {
  const { tasks } = useCRM();
  const today = new Date();

  const tileContent = ({ date }) => {
    const hasTask = tasks.some(
      (task) => format(new Date(task.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    return hasTask ? <span className="text-green-500">*</span> : null;
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4 font-semibold">Task Calendar</h2>
      <Calendar tileContent={tileContent} value={today} />
    </div>
  );
};

export default Calendar;
