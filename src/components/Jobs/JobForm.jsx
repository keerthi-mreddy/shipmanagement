// src/components/Jobs/JobForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addJob, updateJob, deleteJob, getJobById } = useJobs();

  const [form, setForm] = useState({
    id: "",
    shipId: "",
    componentId: "",
    type: "",
    priority: "",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: ""
  });

  useEffect(() => {
    if (id) {
      const existingJob = getJobById(id);
      if (existingJob) setForm(existingJob);
    }
  }, [id, getJobById]);

  // Only Admins allowed
  if (user?.role !== "Admin") {
    return <p className="text-red-600 p-4">Access denied. Admins only.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateJob(id, form);
    } else {
      addJob(form);
    }
    navigate("/jobs");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
      navigate("/jobs");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Create"} Maintenance Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {/* Job ID */}
        <input
          type="text"
          placeholder="JOB ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          className="w-full border p-2"
          required
          disabled={!!id}
        />

        {/* Other fields */}
        {[
          "shipId",
          "componentId",
          "type",
          "priority",
          "assignedEngineerId",
          "scheduledDate"
        ].map((field) => (
          <input
            key={field}
            type={field.includes("Date") ? "date" : "text"}
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full border p-2"
            required
          />
        ))}

        {/* Status dropdown */}
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-2"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {id ? "Update" : "Create"} Job
          </button>

          {id && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Job
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobForm;
