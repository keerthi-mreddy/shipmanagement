// src/components/Jobs/JobCalendar.jsx
import { useJobs } from "../../contexts/JobsContext";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

const JobCalendar = () => {
  const { jobs } = useJobs();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ Fix for timezone-safe comparison
  const formatDate = (date) => date.toLocaleDateString("en-CA"); // gives YYYY-MM-DD format reliably

  const jobsForSelectedDate = jobs.filter(
    (job) => job.scheduledDate === formatDate(selectedDate)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Maintenance Calendar</h2>

      {/* Calendar View */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      {/* Job List for Selected Date */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg">
          Jobs on {selectedDate.toDateString()}:
        </h3>

        {jobsForSelectedDate.length === 0 ? (
          <p className="text-gray-500 mt-2">No jobs scheduled.</p>
        ) : (
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {jobsForSelectedDate.map((job) => (
              <li key={job.id}>
                <strong>{job.type}</strong> – {job.priority}, {job.status}, Ship: {job.shipId}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobCalendar;
