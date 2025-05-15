// src/components/Ships/ShipDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useShips } from "../../contexts/ShipsContext";

const ShipDetail = () => {
  const { id } = useParams();
  const { getShipById } = useShips();
  const [ship, setShip] = useState(null);

  useEffect(() => {
    setShip(getShipById(id));
  }, [id, getShipById]);

  if (!ship) return <div className="p-4">Ship not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{ship.name} - Details</h2>
      <ul className="list-disc pl-5">
        <li><strong>IMO:</strong> {ship.imo}</li>
        <li><strong>Flag:</strong> {ship.flag}</li>
        <li><strong>Status:</strong> {ship.status}</li>
      </ul>
    </div>
  );
};

export default ShipDetail;
