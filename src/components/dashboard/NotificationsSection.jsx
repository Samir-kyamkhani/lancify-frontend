import { motion } from "framer-motion";
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import { iconMap, notifications } from "../..";

export default function NotificationsSection() {
  return (
    <main className="flex-1 w-full bg-white shadow-lg rounded-2xl  ">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" rounded-2xl p-6 "
      >
        <h2 className="text-2xl font-bold mb-4">Recent Notifications</h2>
        <div className="flex h-[250px] sm:h-[190px] overflow-auto flex-col gap-4">
          {notifications.map(({ id, type, message, time }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 bg-gray-200 rounded-lg"
            >
              <span className={`w-3 h-3 rounded-full ${iconMap[type]}`}></span>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">{message}</p>
                <p className="text-xs text-gray-600">{time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
