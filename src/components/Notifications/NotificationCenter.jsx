// src/components/Notifications/NotificationCenter.jsx
import { useNotification } from "../../contexts/NotificationContext";

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="px-6 pt-4 space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-3 rounded border shadow-sm text-sm flex justify-between items-center ${
            n.type === "success"
              ? "bg-green-100 text-green-800 border-green-300"
              : n.type === "error"
              ? "bg-red-100 text-red-800 border-red-300"
              : "bg-blue-100 text-blue-800 border-blue-300"
          }`}
        >
          <span className="font-medium">{n.message}</span>
          <button
            onClick={() => dismissNotification(n.id)}
            className="ml-4 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
