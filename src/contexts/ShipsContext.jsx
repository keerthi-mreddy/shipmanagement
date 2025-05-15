// src/contexts/ShipsProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState(() => {
    const stored = localStorage.getItem("ships");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(ships));
  }, [ships]);

  const addShip = (ship) => {
    setShips((prev) => [...prev, ship]); // ✅ Use manually entered ID from UI
  };

  const updateShip = (id, updatedShip) => {
    setShips((prev) =>
      prev.map((ship) => (ship.id === id ? { ...ship, ...updatedShip } : ship))
    );
  };

  const deleteShip = (id) => {
    setShips((prev) => prev.filter((ship) => ship.id !== id));
  };

  const getShipById = (id) => {
    return ships.find((ship) => ship.id === id);
  };

  return (
    <ShipsContext.Provider
      value={{ ships, addShip, updateShip, deleteShip, getShipById }}
    >
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
