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
        break;
    }
  };

  const isClientsRoute = path === "/dashboard/clients";
  const isInvoiceRoute = path === "/dashboard/payments";
  const isTeamMemberRoute = path === "/dashboard/teams";
  const isProposalRoute = path === "/dashboard/proposals";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-6 sm:p-6 lg:p-8 mb-6 sm:mb-8">
      {/* Header Content */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-col xl:flex-row gap-4 xl:items-center w-full lg:w-auto">
          {/* View toggle for clients */}
          {isClientsRoute && (
            <div className="flex bg-gray-100 rounded-xl p-1 w-full justify-around sm:w-fit">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-5 py-2 sm:px-6 sm:py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
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
                className={`px-5 py-2 sm:px-6 sm:py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
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

          {/* Search Input */}
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full bg-gray-50 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          {(isInvoiceRoute || isTeamMemberRoute || isProposalRoute) && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 sm:py-3 text-sm bg-white/70 backdrop-blur-sm shadow-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full"
            >
              <option value="All">All Status</option>
              {isInvoiceRoute && (
                <>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
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
          )}

          {/* Dynamic Add Button */}
          <DynamicButton onClick={handleDynamicButtonClick} />
        </div>
      </div>

      {/* Uncomment if needed */}
      {/* {isClientsRoute && <ImportExportButtons />} */}

      {/* Modals */}
      {showClientModal && (
        <AddClientModal
          onSubmit={() => setShowClientModal(false)}
          onClose={() => setShowClientModal(false)}
        />
      )}
      {showTeamMemberModal && (
        <AddTeamMemberModal
          onSubmit={() => setShowTeamMemberModal(false)}
          onClose={() => setShowTeamMemberModal(false)}
        />
      )}
      {showProjectModal && (
        <AddProjectModal
          onSubmit={() => setShowProjectModal(false)}
          onClose={() => setShowProjectModal(false)}
        />
      )}
      {showProposalModal && (
        <AddProposalModal
          onSubmit={() => setShowProposalModal(false)}
          onClose={() => setShowProposalModal(false)}
        />
      )}
      {showInvoiceModal && (
        <AddInvoiceModal
          onSubmit={() => setShowInvoiceModal(false)}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}
    </div>
  );
}
