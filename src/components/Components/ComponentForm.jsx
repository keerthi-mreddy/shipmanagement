// src/components/Components/ComponentForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useComponents } from "../../contexts/ComponentsContext";
import { useAuth } from "../../contexts/AuthContext";

const ComponentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    addComponent,
    updateComponent,
    deleteComponent,
    getComponentById
  } = useComponents();

  const [form, setForm] = useState({
    id: "",
    shipId: "",
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: ""
  });

  useEffect(() => {
    if (id) {
      const component = getComponentById(id);
      if (component) setForm(component);
    }
  }, [id, getComponentById]);

  // Admin-only access
  if (user?.role !== "Admin") {
    return <p className="text-red-600 p-4">Access denied. Admins only.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateComponent(id, form);
    } else {
      addComponent(form);
    }
    navigate("/components");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      deleteComponent(id);
      navigate("/components");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Component</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {["id", "shipId", "name", "serialNumber", "installDate", "lastMaintenanceDate"].map((field) => (
          <input
            key={field}
            type={field.includes("Date") ? "date" : "text"}
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full border p-2"
            required
            disabled={field === "id" && !!id}
          />
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Update" : "Add"} Component
        </button>

        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Delete Component
          </button>
        )}
      </form>
    </div>
  );
};

export default ComponentForm;
