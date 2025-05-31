import { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaArrowRight,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

function ProjectsCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hoveredRow, setHoveredRow] = useState(null);

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      client: "TechCorp Solutions",
      members: [
        {
          name: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b25e2b75?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Mike Chen",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Emily Davis",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Alex Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        },
      ],
      budget: 125000,
      spent: 87500,
      status: "active",
      progress: 70,
      deadline: "2024-06-15",
      priority: "high",
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "FinanceFirst Bank",
      members: [
        {
          name: "David Kim",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Lisa Wang",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "John Smith",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
        },
      ],
      budget: 200000,
      spent: 150000,
      status: "active",
      progress: 85,
      deadline: "2024-07-20",
      priority: "medium",
    },
    {
      id: 3,
      name: "Brand Identity Package",
      client: "StartupXYZ",
      members: [
        {
          name: "Maria Garcia",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Tom Wilson",
          avatar:
            "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face",
        },
      ],
      budget: 75000,
      spent: 75000,
      status: "completed",
      progress: 100,
      deadline: "2024-05-10",
      priority: "low",
    },
    {
      id: 4,
      name: "AI Dashboard Development",
      client: "DataTech Inc",
      members: [
        {
          name: "Kevin Park",
          avatar:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Anna Lee",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "James Brown",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Sophie Turner",
          avatar:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "Robert Taylor",
          avatar:
            "https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face",
        },
      ],
      budget: 300000,
      spent: 45000,
      status: "planning",
      progress: 15,
      deadline: "2024-09-30",
      priority: "high",
    },
    {
      id: 5,
      name: "Website Maintenance",
      client: "Local Restaurant",
      members: [
        {
          name: "Chris Evans",
          avatar:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=40&h=40&fit=crop&crop=face",
        },
      ],
      budget: 25000,
      spent: 12000,
      status: "on-hold",
      progress: 40,
      deadline: "2024-08-15",
      priority: "low",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "planning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "on-hold":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 p-6 border-b border-gray-100">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex  items-center gap-3">
            <div className="p-2 hidden sm:block bg-indigo-100 rounded-xl">
              <FaUsers className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Recent Projects
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track your project progress
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Search Bar */}
            {/* <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search projects or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div> */}

            {/* Buttons */}
            {/* <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 text-sm font-medium">
              <FaPlus className="text-xs" />
              New Project
            </button> */}
            <button className="px-4 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 text-sm font-medium">
              View All
              <FaArrowRight className="text-xs" />
            </button>

            {/* Status Filter */}
            {/* <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
              <option value="on-hold">On Hold</option>
            </select> */}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Project Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProjects.map((project, index) => (
              <tr
                key={project.id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  hoveredRow === index ? "bg-gray-50" : ""
                }`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1 h-12 rounded-full ${getPriorityColor(
                        project.priority
                      )}`}
                    ></div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {project.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {project.client}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 4).map((member, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          {member.name}
                        </div>
                      </div>
                    ))}
                    {project.members.length > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                        +{project.members.length - 4}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <FaDollarSign className="inline-block text-green-500 mr-1 text-xs" />
                  {formatCurrency(project.budget)}
                  <span className="text-gray-400">
                    {" "}
                    / {formatCurrency(project.spent)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1).replace("-", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-gray-400 text-xs" />
                    <span className="text-gray-600">
                      {formatDate(project.deadline)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                      <FaEye className="text-sm" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200">
                      <FaEdit className="text-sm" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-600">
                Active ({projects.filter((p) => p.status === "active").length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">
                Completed (
                {projects.filter((p) => p.status === "completed").length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-gray-600">
                Planning (
                {projects.filter((p) => p.status === "planning").length})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsCard;
