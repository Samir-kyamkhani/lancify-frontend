// DynamicButton.jsx
import { FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function DynamicButton({ onClick }) {
  const location = useLocation();

  const path = location.pathname;

  const routeToLabel = {
    "/dashboard/clients": "Add Client",
    "/dashboard/proposals": "Add Proposal",
    "/dashboard/projects": "Add Project",
    "/dashboard/payments": "Add Invoice",
    "/dashboard/teams": "Add Team",
    "/dashboard/social-media-management": "Schedule Post",
  };

  const label = routeToLabel[path] || "Add Item";

  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 cursor-pointer rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 py-3"
    >
      <FaPlus /> {label}
    </button>
  );
}
