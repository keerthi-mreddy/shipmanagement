// src/components/Jobs/JobList.jsx
import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const { jobs, updateJob } = useJobs();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const [filters, setFilters] = useState({
    shipId: "",
    status: "",
    priority: ""
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const updateStatus = (jobId, newStatus) => {
    const job = jobs.find((j) => j.id === jobId);
    updateJob(jobId, { ...job, status: newStatus });
  };

  const filteredJobs = jobs.filter((job) => {
    // Only show jobs assigned to current engineer
    if (user.role === "Engineer" && job.assignedEngineerId !== user.id) return false;

    return (
      (!filters.shipId || job.shipId === filters.shipId) &&
      (!filters.status || job.status === filters.status) &&
      (!filters.priority || job.priority === filters.priority)
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Maintenance Jobs</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          name="shipId"
          placeholder="Filter by Ship ID"
          className="border p-2"
          onChange={handleFilterChange}
        />
        <select name="status" className="border p-2" onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" className="border p-2" onChange={handleFilterChange}>
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Job Table */}
      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Job ID</th>
            <th className="p-2 border">Component ID</th>
            <th className="p-2 border">Ship ID</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Engineer ID</th>
            <th className="p-2 border">Scheduled</th>
            {user.role === "Admin" && <th className="p-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td className="p-2 border">{job.id}</td>
              <td className="p-2 border">{job.componentId}</td>
              <td className="p-2 border">{job.shipId}</td>
              <td className="p-2 border">{job.type}</td>
              <td className="p-2 border">{job.priority}</td>
              <td className="p-2 border">{job.status}</td>
              <td className="p-2 border">{job.assignedEngineerId}</td>
              <td className="p-2 border">{job.scheduledDate}</td>
              {user.role === "Admin" && (
                <td className="p-2 border space-y-1">
                  <Link to={`/jobs/edit/${job.id}`} className="text-blue-600 block">Edit</Link>
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                    className="border text-xs"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
