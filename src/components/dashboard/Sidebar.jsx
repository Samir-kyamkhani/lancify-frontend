import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserFriends,
  FaFileAlt,
  FaTimes,
  FaBars,
  FaUsers,
  FaHandshake,
  FaProjectDiagram,
  FaFileInvoiceDollar,
  FaInbox,
  FaFileContract,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineIntegrationInstructions, MdSupport } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getUserRole } from "../../settings";

const navItems = [
  {
    icon: <RxDashboard />,
    label: "Dashboard",
    href: "/dashboard",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <FaInbox />,
    label: "Inbox",
    href: "/dashboard/inbox",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <IoChatboxEllipses />,
    label: "Chat",
    href: "/dashboard/chat",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <FaUsers />,
    label: "Clients",
    href: "/dashboard/clients",
    visible: ["admin", "member"],
  },
  {
    icon: <FaUserFriends />,
    label: "Teams",
    href: "/dashboard/teams",
    visible: ["admin", "member"],
  },
  {
    icon: <FaHandshake />,
    label: "Proposals",
    href: "/dashboard/proposals",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <FaFileContract />,
    label: "Projects",
    href: "/dashboard/projects",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <FaFileInvoiceDollar />,
    label: "Payments",
    href: "/dashboard/payments",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <MdOutlineIntegrationInstructions />,
    label: "Integrations",
    href: "/dashboard/integrations",
    visible: ["admin", "member"],
  },
  {
    icon: <MdSupport />,
    label: "Support",
    href: "/dashboard/support",
    visible: ["admin", "member"],
  },
  {
    icon: <FaFileContract />,
    label: "Files",
    href: "/dashboard/files",
    visible: ["user"],
  },

  {
    icon: <BiLogOut />,
    label: "Logout",
    href: "/dashboard/logout",
    visible: ["admin", "user", "member"],
  },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [active, setActive] = useState("Dashboard");
  const role = getUserRole();

  const filteredNavItems = navItems.filter((item) =>
    item.visible.includes(role)
  );

  const handleNavClick = (label) => {
    setActive(label);
    if (window.innerWidth < 768) toggleSidebar(); // Close sidebar on mobile
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed text-xl top-3.5 left-4 z-50 bg-white text-black p-2 rounded-full hover:bg-gray-800"
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-r border-gray-200 text-black w-64 md:static h-screen fixed md:h-auto top-0 left-0 z-50 flex flex-col justify-between p-4 overflow-auto md:block"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-10 px-2 md:hidden">
              <Link
                to="/dashboard"
                className="cursor-pointer flex items-center space-x-3"
              >
                <div className="text-2xl font-bold tracking-wide">⌘</div>
                <span className="text-xl font-semibold">Monochrome</span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="text-black hover:text-gray-400 text-lg"
              >
                <FaTimes />
              </button>
            </div>

            {/* Sidebar Menu */}
            <nav className="space-y-3">
              {filteredNavItems.map((item, idx) => {
                const isActive = item.label === active;
                return (
                  <Link to={item.href} key={idx} className="block">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleNavClick(item.label)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? "bg-white text-blue-600"
                          : "hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
