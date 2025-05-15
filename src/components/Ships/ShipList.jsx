// src/components/Ships/ShipList.jsx
import { Link } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";
import { useAuth } from "../../contexts/AuthContext";

const ShipList = () => {
  const { user } = useAuth();
  const { ships, deleteShip } = useShips(); // ✅ include deleteShip

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ship?")) {
      deleteShip(id);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Ships</h2>
      {user?.role === "Admin" && (
        <Link to="/ships/new" className="mb-4 inline-block text-blue-600 underline">
          + Add Ship
        </Link>
      )}
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">IMO</th>
            <th className="p-2 border">Flag</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship) => (
            <tr key={ship.id}>
              <td className="p-2 border">{ship.name}</td>
              <td className="p-2 border">{ship.imo}</td>
              <td className="p-2 border">{ship.flag}</td>
              <td className="p-2 border">{ship.status}</td>
              <td className="p-2 border space-x-2">
                <Link to={`/ships/${ship.id}`} className="text-blue-600">View</Link>
                {user?.role === "Admin" && (
                  <>
                    <Link to={`/ships/edit/${ship.id}`} className="text-green-600">Edit</Link>
                    <button
                      onClick={() => handleDelete(ship.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;
