// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// Ship Components
import ShipList from "./components/Ships/ShipList";
import ShipForm from "./components/Ships/ShipForm";
import ShipDetail from "./components/Ships/ShipDetail";

// Component Management
import ComponentList from "./components/Components/ComponentList";
import ComponentForm from "./components/Components/ComponentForm";

// Job Management
import JobList from "./components/Jobs/JobList";
import JobForm from "./components/Jobs/JobForm";
import JobCalendar from "./components/Jobs/JobCalendar";

import NotificationCenter from "./components/Notifications/NotificationCenter";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Ship Management Routes */}
        <Route path="/ships" element={<ShipList />} />
        <Route path="/ships/new" element={<ShipForm />} />
        <Route path="/ships/edit/:id" element={<ShipForm />} />
        <Route path="/ships/:id" element={<ShipDetail />} />

        {/* Component Management Routes */}
        <Route path="/components" element={<ComponentList />} />
        <Route path="/components/new" element={<ComponentForm />} />
        <Route path="/components/edit/:id" element={<ComponentForm />} />

        {/* Job Management Routes */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/new" element={<JobForm />} />
        <Route path="/jobs/edit/:id" element={<JobForm />} />
        <Route path="/jobs/calendar" element={<JobCalendar />} />

        <Route path="/notifications" element={<NotificationCenter />} />

        {/* Catch-All Route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
