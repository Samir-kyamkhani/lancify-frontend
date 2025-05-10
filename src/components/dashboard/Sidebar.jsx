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
import { Link } from "react-router-dom";
import { IoChatboxEllipses } from "react-icons/io5";

const navItems = [
  // Primary Navigation
  { icon: <RxDashboard />, label: "Dashboard", href: "/dashboard" },
  { icon: <FaInbox />, label: "Inbox", href: "/dashboard/inbox" },
  { icon: <IoChatboxEllipses />, label: "Chat", href: "/dashboard/chat" },

  // Client & Team Management
  { icon: <FaUsers />, label: "Clients", href: "/dashboard/clients" },
  { icon: <FaUserFriends />, label: "Teams", href: "/dashboard/teams" },

  // Project Lifecycle
  { icon: <FaHandshake />, label: "Proposals", href: "/dashboard/proposals" },
  { icon: <FaFileContract  />, label: "Projects", href: "/dashboard/projects" },
  // { icon: <FaProjectDiagram />, label: "Social Manager", href: "/dashboard/social-manager" },
  { icon: <FaFileInvoiceDollar />, label: "Payment", href: "/dashboard/payment" },

  // Insights & Settings
  // { icon: <FaFileAlt />, label: "Reports", href: "/dashboard/reports" },
  {
    icon: <MdOutlineIntegrationInstructions />,
    label: "Integrations",
    href: "/dashboard/integrations",
  },

  // Support & Exit
  { icon: <MdSupport />, label: "Support", href: "/dashboard/support" },
  { icon: <BiLogOut />, label: "Logout", href: "/dashboard/logout" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [active, setActive] = useState("Dashboard");

  // Close sidebar on mobile when clicking a nav item
  const handleNavClick = (label) => {
    setActive(label);
    if (window.innerWidth < 768) toggleSidebar();
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

      {/* Mobile + Desktop Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-r border-gray-200  text-black w-64  md:static h-screen fixed md:h-auto top-0 left-0 z-50 flex flex-col justify-between p-4 overflow-auto md:block"
          >
            <div>
              {/* Logo + Close Btn on Mobile */}
              <div className="flex items-center justify-between  mb-10 px-2 md:hidden">
                <Link
                  to={"/dashboard"}
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

              {/* Logo on Desktop */}
              <Link
                to={"/dashboard"}
                className="cursor-pointer hidden md:flex items-center space-x-3 mb-10 px-2"
              >
                <div className="text-2xl font-bold tracking-wide">⌘</div>
                <span className="text-xl font-semibold">Monochrome</span>
              </Link>

              {/* Nav Links */}
              <nav className="space-y-3">
                {navItems.map((item, idx) => {
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
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>
            </div>
            {/* <div className="text-xs text-gray-400 px-2 mt-6 hidden md:block">
              © 2025
            </div> */}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
