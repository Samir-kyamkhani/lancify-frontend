import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaInbox,
  FaUsers,
  FaHandshake,
  FaProjectDiagram,
  FaFileInvoiceDollar,
  FaUserFriends,
  FaChartBar,
  FaTasks,
  FaCube,
  FaMapSigns,
  FaMoon,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserCog,
  FaChevronDown,
} from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineIntegrationInstructions, MdSupport } from "react-icons/md";
import { FiBarChart2, FiUser, FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const location = useLocation();
  const avatarRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy message count – you can fetch this from backend later
  const [messageCount] = useState(3);
  const [notifications] = useState([
    { id: 1, title: "New project proposal", time: "2 min ago", unread: true },
    {
      id: 2,
      title: "Client message received",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Invoice payment confirmed",
      time: "3 hours ago",
      unread: false,
    },
  ]);

  const currentPath = location.pathname;
  const { user } = useSelector((state) => state?.auth);

  const pageTitle =
    currentPath === "/dashboard/profile"
      ? "Dashboard"
      : currentPath === "/"
      ? "Dashboard"
      : currentPath
          .split("/")
          .filter(Boolean)
          .pop()
          .replace(/^\w/, (c) => c.toUpperCase());

  const iconMap = {
    Inbox: <FaInbox className="text-xl text-indigo-600 mr-3" />,
    Chat: <IoChatboxEllipses className="text-xl text-indigo-600 mr-3" />,
    Clients: <FaUsers className="text-xl text-indigo-600 mr-3" />,
    Proposals: <FaHandshake className="text-xl text-indigo-600 mr-3" />,
    Projects: <FaProjectDiagram className="text-xl text-indigo-600 mr-3" />,
    Invoices: <FaFileInvoiceDollar className="text-xl text-indigo-600 mr-3" />,
    Teams: <FaUserFriends className="text-xl text-indigo-600 mr-3" />,
    Reports: <FiBarChart2 className="text-xl text-indigo-600 mr-3" />,
    Analytics: <FaChartBar className="text-xl text-indigo-600 mr-3" />,
    Profile: <FiUser className="text-xl text-indigo-600 mr-3" />,
    Support: <MdSupport className="text-xl text-indigo-600 mr-3" />,
    "Social Media Managment": (
      <FaTasks className="text-xl text-indigo-600 mr-3" />
    ),
    Integrations: (
      <MdOutlineIntegrationInstructions className="text-xl text-indigo-600 mr-3" />
    ),
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/60">
      <div className="px-4 sm:px-6 lg:px-6 py-2">
        <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
          {/* Page Title Section */}
          <div className="inline-flex items-center ml-14 mt-2 sm:ml-0 sm:mt-0 flex-shrink-0">
            <Link
              to={
                currentPath === "/dashboard/profile"
                  ? "/dashboard"
                  : currentPath
              }
              className="group inline-flex items-center transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="inline-flex ml-0 sm:ml-0 items-center bg-gradient-to-r from-indigo-50 to-blue-50  p-2 sm:px-3 lg:px-4 lg:py-2 group-hover:shadow-md transition-all duration-200  rounded-lg ">
                {iconMap[pageTitle] || (
                  <FaCube className="lg:text-xl text-sm text-indigo-600 mr-3" />
                )}
                <h1 className="text-sm inline-block sm:text-md md:text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent truncate  ">
                  {pageTitle}
                </h1>
              </div>
            </Link>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0 flex-shrink-0">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
                aria-label="Notifications"
              >
                <FaBell
                  size={18}
                  className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-200"
                />
                {messageCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                    {messageCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div
                  className={`
        absolute z-50 right-0 mt-2
        w-[68vw] sm:w-80 md:w-96
        bg-white rounded-xl shadow-xl border border-gray-200
        overflow-hidden
        sm:right-0
      `}
                >
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <FaBell className="mr-2 text-indigo-600" />
                      Notifications
                    </h3>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors duration-150 ${
                          notification.unread ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm truncate ${
                                notification.unread
                                  ? "font-medium text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-indigo-500 rounded-full ml-2 mt-1 flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 text-center">
                    <Link
                      to="/inbox"
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                aria-label="User menu"
              >
                <div className="relative flex-shrink-0">
                  {user?.avatarUrl ? (
                    <img
                      ref={avatarRef}
                      src={user.avatarUrl}
                      alt={user.name || "User Avatar"}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all duration-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <CgProfile className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Show name only on md+ screens */}
                <div className="hidden md:flex items-center gap-1 min-w-0">
                  <div className="text-left truncate">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 truncate">
                      {user?.name || "User"}
                    </p>
                  </div>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 max-w-[90vw] overflow-hidden bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
                    <div className="flex items-center gap-3 w-fit">
                      {user?.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name || "User Avatar"}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <CgProfile className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition duration-150"
                    >
                      <FiUser className="w-4 h-4" />
                      View Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition duration-150"
                    >
                      <FiSettings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link
                      to="/support"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition duration-150"
                    >
                      <FaQuestionCircle className="w-4 h-4" />
                      Help & Support
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={() => {
                        // TODO: Handle logout here
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition duration-150 w-full text-left"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside handler */}
      {(showProfileMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
}
