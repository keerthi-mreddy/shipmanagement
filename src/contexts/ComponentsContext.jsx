// src/contexts/ComponentsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState(() => {
    const stored = localStorage.getItem("components");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync changes to localStorage
  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  // ✅ Manual ID entry (no auto-generated id)
  const addComponent = (component) => {
    setComponents((prev) => [...prev, component]);
  };

  const updateComponent = (id, updatedComponent) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedComponent } : c))
    );
  };

  const deleteComponent = (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const getComponentById = (id) => {
    return components.find((c) => c.id === id);
  };

  const getComponentsByShipId = (shipId) => {
    return components.filter((c) => c.shipId === shipId);
  };

  return (
    <ComponentsContext.Provider
      value={{
        components,
        addComponent,
        updateComponent,
        deleteComponent,
        getComponentById,
        getComponentsByShipId,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponents = () => useContext(ComponentsContext);
