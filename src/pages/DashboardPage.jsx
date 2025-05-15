// src/pages/DashboardPage.jsx
import { useShips } from "../contexts/ShipsContext";
import { useComponents } from "../contexts/ComponentsContext";
import { useJobs } from "../contexts/JobsContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const DashboardPage = () => {
  const { ships } = useShips();
  const { components } = useComponents();
  const { jobs } = useJobs();

  const today = new Date().toISOString().split("T")[0];

  const overdueComponents = components.filter(
    (c) => c.lastMaintenanceDate && c.lastMaintenanceDate < today
  );

  const jobsInProgress = jobs.filter((j) => j.status === "In Progress");
  const jobsCompleted = jobs.filter((j) => j.status === "Completed");

  const jobStatusData = [
    { name: "Open", value: jobs.filter((j) => j.status === "Open").length },
    { name: "In Progress", value: jobsInProgress.length },
    { name: "Completed", value: jobsCompleted.length }
  ];

  const COLORS = ["#8884d8", "#ffc658", "#82ca9d"];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">KPI Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Total Ships</p>
          <p className="text-2xl font-bold text-blue-800">{ships.length}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Overdue Components</p>
          <p className="text-2xl font-bold text-yellow-800">{overdueComponents.length}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Jobs In Progress</p>
          <p className="text-2xl font-bold text-purple-800">{jobsInProgress.length}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Jobs Completed</p>
          <p className="text-2xl font-bold text-green-800">{jobsCompleted.length}</p>
        </div>
      </div>

      {/* Job Status Pie Chart */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-2">Job Status Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={jobStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {jobStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
