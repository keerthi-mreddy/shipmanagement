// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";


const USERS = [
  { id: "1", email: "admin@entnt.in", password: "admin123", role: "Admin" },
  { id: "2", email: "inspector@entnt.in", password: "inspect123", role: "Inspector" },
  { id: "3", email: "engineer@entnt.in", password: "engine123", role: "Engineer" },
];

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (email, password) => {
    const foundUser = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
   
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
