// src/components/Ships/ShipForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";

const ShipForm = () => {
  const { id } = useParams();
  const { addShip, updateShip, getShipById } = useShips();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    name: "",
    imo: "",
    flag: "",
    status: ""
  });

  useEffect(() => {
    if (id) {
      const ship = getShipById(id);
      if (ship) setForm(ship);
    }
  }, [id, getShipById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateShip(id, form);
    } else {
      addShip(form);
    }
    navigate("/ships");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Ship</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        {/* ID Field - manually entered, disabled in edit mode */}
        <input
          type="text"
          placeholder="SHIP ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          className="w-full border p-2"
          required
          disabled={!!id}
        />

        {/* Other fields */}
        {["name", "imo", "flag", "status"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full border p-2"
            required
          />
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Update" : "Add"} Ship
        </button>
      </form>
    </div>
  );
};

export default ShipForm;
