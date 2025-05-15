// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ShipsProvider } from "./contexts/ShipsContext";
import { ComponentsProvider } from "./contexts/ComponentsContext";
import { JobsProvider } from "./contexts/JobsContext"; // ✅ import
import { NotificationProvider } from "./contexts/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShipsProvider>
          <ComponentsProvider>
            <NotificationProvider>
              <JobsProvider>
                  <App />
              </JobsProvider>
            </NotificationProvider>
          </ComponentsProvider>
        </ShipsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
