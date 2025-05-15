import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "./NotificationContext"; 

const JobsContext = createContext();


export const JobsProvider = ({ children }) => {
    const { addNotification } = useNotification();
    const [jobs, setJobs] = useState(() => {
    const stored = localStorage.getItem("jobs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs((prev) => [...prev, job]);
    addNotification(`${job.id} Created`, "success");
  };
  
  const updateJob = (id, updatedJob) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...updatedJob } : j))
    );
  
    const message =
      updatedJob.status === "Completed"
      ? `${id} Completed`
      : `${id} Updated`;
  
    addNotification(message, "info");
  };
  

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const getJobById = (id) => {
    return jobs.find((job) => job.id === id);
  };

  const filterJobs = ({ shipId, status, priority }) => {
    return jobs.filter((job) => {
      return (
        (!shipId || job.shipId === shipId) &&
        (!status || job.status === status) &&
        (!priority || job.priority === priority)
      );
    });
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        getJobById,
        filterJobs,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
