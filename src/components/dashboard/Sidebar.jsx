import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserRole } from "../../settings";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTeamMemders, getAllUsers } from "../../slices/authSlice";

// Modern icon components
const DashboardIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const InboxIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M2 7l10 5 10-5" />
  </svg>
);

const ChatIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const ClientsIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TeamsIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M9 12l2 2 4-4" />
    <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1h-1V6c0-2.761-2.239-5-5-5H9C6.239 1 4 3.239 4 6v1H3c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h1v1c0 2.761 2.239 5 5 5h6c2.761 0 5-2.239 5-5v-1h1z" />
  </svg>
);

const ProposalsIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const ProjectsIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const PaymentsIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const IntegrationsIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SupportIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const FilesIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navItems = [
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    href: "/dashboard",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <InboxIcon />,
    label: "Inbox",
    href: "/dashboard/inbox",
    visible: ["admin", "user", "member"],
    badge: "3",
  },
  {
    icon: <ChatIcon />,
    label: "Chat",
    href: "/dashboard/chat",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <ClientsIcon />,
    label: "Clients",
    href: "/dashboard/clients",
    visible: ["admin", "member"],
  },
  {
    icon: <TeamsIcon />,
    label: "Teams",
    href: "/dashboard/teams",
    visible: ["admin", "member"],
  },
  {
    icon: <ProposalsIcon />,
    label: "Proposals",
    href: "/dashboard/proposals",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <ProjectsIcon />,
    label: "Projects",
    href: "/dashboard/projects",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <PaymentsIcon />,
    label: "Payments",
    href: "/dashboard/payments",
    visible: ["admin", "user", "member"],
  },
  {
    icon: <IntegrationsIcon />,
    label: "Integrations",
    href: "/dashboard/integrations",
    visible: ["admin", "member"],
  },
  {
    icon: <SupportIcon />,
    label: "Support",
    href: "/dashboard/support",
    visible: ["admin", "member"],
  },
  {
    icon: <FilesIcon />,
    label: "Files",
    href: "/dashboard/files",
    visible: ["user"],
  },
];

const logoutItem = {
  icon: <LogoutIcon />,
  label: "Logout",
  href: "/dashboard/logout",
  visible: ["admin", "user", "member"],
};

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [active, setActive] = useState("Dashboard");
  const role = getUserRole();

  const filteredNavItems = navItems.filter((item) =>
    item.visible.includes(role)
  );

  const handleNavClick = (label) => {
    setActive(label);
    if (window.innerWidth < 768) toggleSidebar();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTeamMemders());
  }, [dispatch]);

  const { allTeamMembers } = useSelector((state) => state.auth);
  useEffect(() => {}, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-5 left-4 z-50 bg-white border border-gray-200 text-gray-700 p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200"
        >
          <MenuIcon />
        </button>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 
          w-66 h-screen bg-white border-r border-gray-100 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:transform-none
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-200">
                ⌘
              </div>
              <span className="text-xl font-bold text-gray-900">Lancify</span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item, idx) => {
              const isActive = item.label === active;
              return (
                <Link to={item.href} key={idx} className="block">
                  <div
                    onClick={() => handleNavClick(item.label)}
                    className={`
                      group flex items-center justify-between px-2 py-3 rounded-xl cursor-pointer
                      transition-all duration-200 hover:scale-[1.02] hover:shadow-sm
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`
                        p-2 rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600"
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                        }
                      `}
                      >
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer with Logout */}
          <div className="px-1 py-3 border-t border-gray-100 bg-white">
            <Link to={logoutItem.href} className="block">
              <div
                onClick={() => handleNavClick(logoutItem.label)}
                className="group flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer text-gray-600 hover:bg-red-50 hover:text-red-600 transition-transform duration-200 hover:scale-105"
              >
                <div className="p-2 rounded-lg bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-500 transition-colors duration-200">
                  {logoutItem.icon}
                </div>
                <span className="font-medium text-sm">{logoutItem.label}</span>
              </div>
            </Link>

            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <Link
                to="/dashboard/profile"
                className="flex items-center space-x-3"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  U
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">User</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {role} Account
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
