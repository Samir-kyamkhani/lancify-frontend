import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaCheck,
  FaExclamationTriangle,
  FaInfo,
  FaTimes,
} from "react-icons/fa";

const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "Payment Received",
    message: "We have received your payment for March invoice.",
    client: "Acme Corp",
    project: "Website Redesign",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Pending Feedback",
    message: "Awaiting your feedback on the latest UI draft.",
    client: "Bright Labs",
    project: "Mobile App UX",
    time: "30 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "New Milestone Achieved",
    message: "Phase 1 has been completed for your campaign.",
    client: "Nova Marketing",
    project: "Email Automation",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "error",
    title: "Sync Failed",
    message: "We couldn't sync project files to the server.",
    client: "Orbit Soft",
    project: "DevOps Migration",
    time: "Yesterday",
    read: true,
  },
];

const typeConfig = {
  success: {
    icon: FaCheck,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    iconColor: "text-emerald-600",
  },
  warning: {
    icon: FaExclamationTriangle,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconColor: "text-amber-600",
  },
  info: {
    icon: FaInfo,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
  },
  error: {
    icon: FaTimes,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
  },
};

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    const notif = notifications.find((n) => n.id === id);
    setSelectedNotification(notif);
  };

  const closePopup = () => setSelectedNotification(null);

  return (
    <main className="flex-1 w-full relative">
      {/* Popup */}
      {selectedNotification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-2xl">
                {(() => {
                  const Icon = typeConfig[selectedNotification.type].icon;
                  return (
                    <Icon
                      className={`text-2xl ${
                        typeConfig[selectedNotification.type].iconColor
                      }`}
                    />
                  );
                })()}
              </div>
              <div>
                <h2 className="text-sm lg:text-xl font-bold text-gray-800">
                  {selectedNotification.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedNotification.time}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Client:</strong> {selectedNotification.client}
              </p>
              <p>
                <strong>Project:</strong> {selectedNotification.project}
              </p>
              <p></p>
              <p className="pt-2 whitespace-pre-line">
                {selectedNotification.message}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Notifications Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-200/50 rounded-3xl p-8 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-y-1.5">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaBell className="text-white text-lg" />
              </div>
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                  {unreadCount}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Notifications
              </h2>
              <p className="text-gray-500 text-sm">{unreadCount} unread</p>
            </div>
          </div>

          <button
            onClick={() =>
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true }))
              )
            }
            className="text-blue-600 text-sm font-medium hover:underline ml-4 sm:ml-0"
          >
            Mark all as read
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const IconComponent = config.icon;

            return (
              <motion.div
                key={notification.id}
                whileHover={{ scale: 0.97 }}
                onClick={() => openNotification(notification.id)}
                className={`
                  p-5 border rounded-2xl cursor-pointer transition-shadow
                  ${config.bgColor} ${config.borderColor}
                  ${!notification.read ? "ring-2 ring-blue-300/30" : ""}
                `}
              >
                <div className="flex gap-4 items-center sm:items-start overflow-hidden">
                  <div className="lg:w-12 lg:h-12   p-2 rounded bg-white lg:rounded-2xl flex items-center justify-center shadow ">
                    <IconComponent
                      className={`text-sm lg:text-xl ${config.iconColor}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">
                      {notification.message.length > 4
                        ? notification.message.slice(0, 20) + "..."
                        : notification.message}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
}
