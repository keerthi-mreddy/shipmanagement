import { useComponents } from "../../contexts/ComponentsContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const ComponentList = () => {
  const { components, deleteComponent } = useComponents();
  const { user } = useAuth();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      deleteComponent(id);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Ship Components</h2>

      {components.length === 0 ? (
        <p className="text-gray-600">No components found.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Component ID</th>
              <th className="p-2 border">Ship ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Serial Number</th>
              <th className="p-2 border">Install Date</th>
              <th className="p-2 border">Last Maintenance Date</th>
              {user?.role === "Admin" && <th className="p-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {components.map((comp) => (
              <tr key={comp.id}>
                <td className="p-2 border">{comp.id}</td>
                <td className="p-2 border">{comp.shipId}</td>
                <td className="p-2 border">{comp.name}</td>
                <td className="p-2 border">{comp.serialNumber}</td>
                <td className="p-2 border">{comp.installDate}</td>
                <td className="p-2 border">{comp.lastMaintenanceDate}</td>
                {user?.role === "Admin" && (
                  <td className="p-2 border space-x-2">
                    <Link to={`/components/edit/${comp.id}`} className="text-green-600">Edit</Link>
                    <button
                      onClick={() => handleDelete(comp.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComponentList;
