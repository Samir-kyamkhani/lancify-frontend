import React, { useState } from "react";
import {
  Eye,
  Edit3,
  Trash2,
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

function ClientSection() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const clients = [
    {
      id: 1,
      name: "John Doe",
      avatar:
        "https://demos.creative-tim.com/material-dashboard-react/static/media/team-1.0fd36e0ee93dcfacdef8.jpg",
      contact: "9876543210",
      project: "Portfolio Website",
      budget: "₹1,00,000",
      status: "active",
      joinDate: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar:
        "https://demos.creative-tim.com/material-dashboard-react/static/media/team-2.13ae2ce3e12f4cfed420.jpg",
      contact: "9123456789",
      project: "E-commerce Store",
      budget: "₹75,000",
      status: "completed",
      joinDate: "Dec 22, 2023",
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar:
        "https://demos.creative-tim.com/material-dashboard-react/static/media/team-3.b4a94251c0cd4997e6ea.jpg",
      contact: "9555666777",
      project: "Mobile App",
      budget: "₹2,50,000",
      status: "in-progress",
      joinDate: "Feb 8, 2024",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      avatar:
        "https://demos.creative-tim.com/material-dashboard-react/static/media/team-4.8b2c17d3c54fae281066.jpg",
      contact: "9888999000",
      project: "Brand Identity",
      budget: "₹45,000",
      status: "pending",
      joinDate: "Mar 1, 2024",
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        bg: "bg-gradient-to-r from-emerald-100 to-green-100",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
        label: "Active",
      },
      completed: {
        bg: "bg-gradient-to-r from-blue-100 to-indigo-100",
        text: "text-blue-700",
        dot: "bg-blue-500",
        label: "Completed",
      },
      "in-progress": {
        bg: "bg-gradient-to-r from-amber-100 to-yellow-100",
        text: "text-amber-700",
        dot: "bg-amber-500",
        label: "In Progress",
      },
      pending: {
        bg: "bg-gradient-to-r from-slate-100 to-gray-100",
        text: "text-slate-700",
        dot: "bg-slate-500",
        label: "Pending",
      },
    };
    return configs[status] || configs.pending;
  };

  const filteredClients =
    selectedStatus === "all"
      ? clients
      : clients.filter((client) => client.status === selectedStatus);

  return (
    <div className="w-full">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl shadow-black/5 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-white p-8 border-b border-slate-100/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Recent Clients
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Manage your client relationships
                  </p>
                </div>
              </div>
              {/* <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-600">24 Active Projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-600">Last updated today</span>
                </div>
              </div> */}
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {/* <div className="relative w-full ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 w-full"
                />
              </div>
              <div className="relative ">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div> */}
              <button className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-2 w-full justify-center">
                View All
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50/50 to-transparent">
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => {
                const statusConfig = getStatusConfig(client.status);
                return (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50/50 transition-all duration-300"
                  >
                    <td className="lg:py-5 py-2 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={client.avatar}
                            alt={client.name}
                            className="lg:w-12 lg:h-12 w-6 h-6 rounded-full object-cover ring-2 ring-white shadow-lg"
                          />
                          {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div> */}
                        </div>
                        <div>
                          <p className="font-semibold text-xs lg:text-sm text-slate-800 transition-colors duration-200">
                            {client.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-500">
                            Joined {client.joinDate}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="lg:py-5 px-6">
                      <div className="font-mono text-[10px] lg:text-sm bg-slate-100 px-3 py-1.5 rounded-lg inline-block">
                        {client.contact}
                      </div>
                    </td>
                    <td className="lg:py-5 px-6">
                      <p className="font-medium text-slate-700 text-[10px] lg:text-sm">
                        {client.project}
                      </p>
                    </td>
                    <td className="lg:py-5 px-6">
                      <p className="font-bold text-[10px] lg:text-sm bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        {client.budget}
                      </p>
                    </td>
                    <td className="lg:py-5 px-6">
                      <div
                        className={`inline-flex items-center text-[10px] lg:text-sm gap-2 px-3 py-2 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}
                      >
                        <div
                          className={`w-2 h-2 text-[10px] lg:text-sm rounded-full ${statusConfig.dot} animate-pulse`}
                        ></div>
                        {statusConfig.label}
                      </div>
                    </td>
                    <td className="lg:py-5 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg hover:scale-110 transition-all duration-200">
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg hover:scale-110 transition-all duration-200">
                          <Edit3 className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg hover:scale-110 transition-all duration-200">
                          <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-white px-8 py-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold">{filteredClients.length}</span> of{" "}
              <span className="font-semibold">{clients.length}</span> clients
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                Previous
              </button>
              <div className="flex gap-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 text-sm font-medium rounded-lg transition-all duration-200 ${
                      page === 1
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSection;
