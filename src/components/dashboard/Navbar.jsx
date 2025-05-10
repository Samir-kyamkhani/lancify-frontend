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
} from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineIntegrationInstructions, MdSupport } from "react-icons/md";
import { FiBarChart2, FiUser } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();
  const avatarRef = useRef(null);

  // Dummy message count – you can fetch this from backend later
  const [messageCount] = useState(3);

  const currentPath = location.pathname;

  const pageTitle =
    currentPath === "/dashboard/profile"
      ? "Dashboard"
      : currentPath
          .split("/")
          .filter(Boolean)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Dashboard";

  const iconMap = {
    Inbox: <FaInbox className="text-xl text-blue-500 mr-2" />,
    Chat: <IoChatboxEllipses className="text-xl text-blue-500 mr-2" />,
    Clients: <FaUsers className="text-xl text-blue-500 mr-2" />,
    Proposals: <FaHandshake className="text-xl text-blue-500 mr-2" />,
    Projects: <FaProjectDiagram className="text-xl text-blue-500 mr-2" />,
    Invoices: <FaFileInvoiceDollar className="text-xl text-blue-500 mr-2" />,
    Teams: <FaUserFriends className="text-xl text-blue-500 mr-2" />,
    Reports: <FiBarChart2 className="text-xl text-blue-500 mr-2" />,
    Analytics: <FaChartBar className="text-xl text-blue-500 mr-2" />,
    Profile: <FiUser className="text-xl text-blue-500 mr-2" />,
    Support: <MdSupport className="text-xl text-blue-500 mr-2" />,
    "Social Media Managment": (
      <FaTasks className="text-xl text-blue-600 mr-2" />
    ),
    Integrations: (
      <MdOutlineIntegrationInstructions className="text-xl text-blue-600 mr-2" />
    ),
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <Link
        to={currentPath === "/dashboard/profile" && "/dashboard"}
        className="text-md md:text-2xl font-bold text-gray-800 flex items-center ml-10 md:ml-0 mt-1"
      >
        {iconMap[pageTitle] || ""}
        {pageTitle}
      </Link>

      <div className="relative flex items-center gap-4">
        <Link to="/inbox" className="relative">
          <FaBell size={20} className="text-gray-600 hover:text-black" />
          {messageCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {messageCount}
            </span>
          )}
        </Link>

        <div className="relative">
          <Link to="/dashboard/profile">
            <img
              ref={avatarRef}
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
