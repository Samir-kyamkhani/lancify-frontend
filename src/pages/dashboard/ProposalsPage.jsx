import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiClock, FiMoreHorizontal, FiSend } from "react-icons/fi";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { Link } from "react-router-dom";
import { statusColors } from "../../index.js";
import AddProposalModal from "../../components/dashboard/Form/AddProposalModal.jsx";
import UserProposalsPage from "../clientDashboard/UserProposalsPage.jsx";
import { getUserRole } from "../../settings.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProposal,
  fetchAllProposals,
} from "../../slices/proposalSlice.js";
import EmptyState from "./EmptyState.jsx";
import DeleteConfirmModal from "../../components/DeleteConfirmModal.jsx";
import { StatsCard } from "../../components/dashboard/StatsCard.jsx";

export default function ProposalsPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editProposalModal, setEditProposalModal] = useState(null);
  const [proposalDelete, setProposalDelete] = useState(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const role = getUserRole();
  const dispatch = useDispatch();
  const { proposals } = useSelector((state) => state.proposalData);

  useEffect(() => {
    dispatch(fetchAllProposals());
  }, [dispatch]);

  const [filteredProposals, setFilteredProposals] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const normalizedSearch = searchTerm?.toLowerCase() || "";

      const filtered = proposals.filter((proposal) => {
        const matchesSearch =
          proposal.projectName?.toLowerCase().includes(normalizedSearch) ||
          proposal.client.name?.toLowerCase().includes(normalizedSearch);

        const matchesStatus =
          filterStatus === "All" ? true : proposal.status === filterStatus;

        return matchesSearch && matchesStatus;
      });

      setFilteredProposals(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, filterStatus, proposals]);

  const handleEditClient = (item) => {
    setEditProposalModal(item);
    setShowProposalModal(true);
    setMenuIndex(null);
  };

  const handleDeleteProposal = (proposalId) => {
    setProposalDelete(proposalId);
    setShowDeleteConfirm(true);
    setMenuIndex(null);
  };

  const confirmDelete = () => {
    if (proposalDelete) {
      dispatch(deleteProposal(proposalDelete));
      setShowDeleteConfirm(false);
      setProposalDelete(null);
    }
  };

  const statsData = [
    {
      title: "Total Proposals",
      value: proposals.length,
      icon: () => <FiSend className="text-indigo-600" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Sent",
      value: proposals.filter((p) => p.status === "sent").length,
      icon: () => <span className="text-blue-600">📤</span>,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Accepted",
      value: proposals.filter((p) => p.status === "accepted").length,
      icon: () => <span className="text-emerald-600">✅</span>,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Rejected",
      value: proposals.filter((p) => p.status === "rejected").length,
      icon: () => <span className="text-red-600">❌</span>,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Drafts",
      value: proposals.filter((p) => p.status === "draft").length,
      icon: () => <span className="text-yellow-600">📝</span>,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Expired",
      value: proposals.filter((p) => p.status === "expired").length,
      icon: () => <FiClock className="text-orange-600" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      {role === "admin" && (
        <div className="overflow-auto -mx-4 sm:mx-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100  p-4 mb-4 sm:p-8 sm:mb-8">
            <HeaderSection
              title="Proposal Management"
              subtitle="Streamline your team's proposal workflow"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-10">
              {statsData?.map(
                ({ title, value, icon: Icon, color, bgColor }, i) => (
                  <StatsCard
                    key={i}
                    title={title}
                    value={value}
                    icon={Icon}
                    color={color}
                    bgColor={bgColor}
                  />
                )
              )}
            </div>
          </div>

          {/* Responsive table container */}
          <div className="overflow-x-auto  bg-white rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-4">
                    <input type="checkbox" className="accent-blue-600" />
                  </th>
                  <th className="p-4 font-semibold">Project Name</th>
                  <th className="p-4 font-semibold hidden sm:table-cell">Client</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold hidden lg:table-cell">Date</th>
                  <th className="p-4 font-semibold hidden lg:table-cell">Amount</th>
                  <th className="p-4 text-right font-semibold rounded-tr-xl">{" "}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition cursor-default">
                      <td className="p-4">
                        <input type="checkbox" className="accent-blue-600" />
                      </td>
                      <td className="p-4 font-medium text-gray-800 whitespace-nowrap">{item.projectName}</td>
                      <td className="p-4 hidden sm:table-cell">{item.client.name}</td>
                      <td className="p-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 hidden lg:table-cell whitespace-nowrap">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 hidden lg:table-cell whitespace-nowrap">${item.amount}</td>
                      <td className="p-4 text-right relative">
                        <button
                          onClick={() =>
                            setMenuIndex(menuIndex === index ? null : index)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          aria-label="Actions menu"
                        >
                          <FiMoreHorizontal className="text-gray-600 hover:text-blue-600 text-xl" />
                        </button>
                        {menuIndex === index && (
                          <div className="absolute right-4 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-20 text-sm">
                            <ul className="divide-y divide-gray-100">
                              <li>
                                <Link
                                  to={`/dashboard/proposal/${item.id}`}
                                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl"
                                >
                                  <FaEye /> View Details
                                </Link>
                              </li>
                              <li
                                onClick={() => handleEditClient(item)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                <FaEdit className="text-gray-600" /> Edit
                              </li>
                              <li
                                onClick={() => handleDeleteProposal(item.id)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer rounded-b-xl"
                              >
                                <FaTrash /> Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setShowClientModal={setShowProposalModal}
                        noClientsTitle="No proposals yet"
                        noClientsMessage="Get started by adding your first proposals."
                        noMatchTitle="No proposal found"
                        noMatchMessage="No proposals match your search criteria. Try adjusting your search."
                        addClientButtonText="Add Your First Proposal"
                        clearSearchText="Clear search"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add/Edit Proposal Modal */}
          {showProposalModal && (
            <AddProposalModal
              isEdit={!!editProposalModal}
              proposalData={editProposalModal}
              onClose={() => {
                setShowProposalModal(false);
                setEditProposalModal(null);
              }}
            />
          )}

          {/* Global Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <DeleteConfirmModal
              show={showDeleteConfirm}
              setShow={setShowDeleteConfirm}
              onConfirm={confirmDelete}
            />
          )}
        </div>
      )}

      {role === "user" && <UserProposalsPage />}
    </>
  );
}
