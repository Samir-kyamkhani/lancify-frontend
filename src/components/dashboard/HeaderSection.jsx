import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import AddClientModal from "./Form/AddClientModal";
import AddTeamMemberModal from "./Form/AddTeamMemberModal";
import AddProjectModal from "./Form/AddProjectModal";
import AddProposalModal from "./Form/AddProposalModal";
import AddInvoiceModal from "./Form/AddInvoiceModal";
import { ImportExportButtons } from "../Ui/ImportExportButtons";
import DynamicButton from "../Ui/DynamicButton";

export default function HeaderSection({
  title,
  subtitle,
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  filterStatus,
  setFilterStatus,
}) {
  const location = useLocation();
  const path = location.pathname;

  // Modal state
  const [showClientModal, setShowClientModal] = useState(false);
  const [showTeamMemberModal, setShowTeamMemberModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleDynamicButtonClick = () => {
    switch (path) {
      case "/dashboard/clients":
        setShowClientModal(true);
        break;
      case "/dashboard/teams":
        setShowTeamMemberModal(true);
        break;
      case "/dashboard/projects":
        setShowProjectModal(true);
        break;
      case "/dashboard/proposals":
        setShowProposalModal(true);
        break;
      case "/dashboard/payments":
        setShowInvoiceModal(true);
        break;
      default:
        // fallback or do nothing
        break;
    }
  };

  const isClientsRoute = path === "/dashboard/clients";
  const isInvoiceRoute = path === "/dashboard/payments";
  const isTeamMemberRoute = path === "/dashboard/teams";
  const isProposalRoute = path === "/dashboard/proposals";

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"></div>
      <div className="flex flex-col lg:flex-row xl:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 lg:justify-end lg:items-end xl:justify-start xl:items-start">
          {/* View Toggle */}
          {isClientsRoute && (
            <div className="flex bg-gray-100 rounded-2xl p-1 w-full justify-around sm:w-fit xl:w-full">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-6 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FiGrid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-6 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === "table"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FiList className="w-4 h-4" />
                Table
              </button>
            </div>
          )}
          {/* Search */}
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 border border-gray-300 outline-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-80 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          {(isInvoiceRoute || isTeamMemberRoute || isProposalRoute) && (
            <div className="w-full">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 w-full py-3 bg-white/70 shadow-sm cursor-pointer backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
              >
                <option value="All">All Status</option>

                {isInvoiceRoute && (
                  <>
                    <option value="Paid">Paid</option>
                    <option value="Pstarting">Pending</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Draft">Draft</option>
                  </>
                )}

                {isTeamMemberRoute && (
                  <>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </>
                )}
                {isProposalRoute && (
                  <>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="expired">Expired</option>
                  </>
                )}
              </select>
            </div>
          )}

          <DynamicButton onClick={handleDynamicButtonClick} />
        </div>
      </div>
      {/* {isClientsRoute && <ImportExportButtons />} */}
      {/* Modals */}
      {showClientModal && (
        <AddClientModal
          onSubmit={(data) => {
            // console.log("Client added:", data);
            setShowClientModal(false);
          }}
          onClose={() => setShowClientModal(false)}
        />
      )}

      {showTeamMemberModal && (
        <AddTeamMemberModal
          onSubmit={(data) => {
            // console.log("Team member added:", data);
            setShowTeamMemberModal(false);
          }}
          onClose={() => setShowTeamMemberModal(false)}
        />
      )}

      {showProjectModal && (
        <AddProjectModal
          onSubmit={(data) => {
            // console.log("Project added:", data);
            setShowProjectModal(false);
          }}
          onClose={() => setShowProjectModal(false)}
        />
      )}

      {showProposalModal && (
        <AddProposalModal
          onSubmit={(data) => {
            // console.log("Proposal added:", data);
            setShowProposalModal(false);
          }}
          onClose={() => setShowProposalModal(false)}
        />
      )}

      {showInvoiceModal && (
        <AddInvoiceModal
          onSubmit={(data) => {
            setShowInvoiceModal(false);
          }}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}
    </div>
  );
}
