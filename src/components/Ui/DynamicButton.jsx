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
    "/dashboard/payments": "Create Invoice",
    "/dashboard/teams": "Add Team",
    "/dashboard/social-media-management": "Schedule Post",
  };

  const label = routeToLabel[path] || "Add Item";

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
    >
      <FaPlus /> {label}
    </button>
  );
}
