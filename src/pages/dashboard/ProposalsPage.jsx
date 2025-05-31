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
      setDeleteMember(null);
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
        <div className="overflow-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
            <HeaderSection
              title="Proposal Management"
              subtitle="Streamline your team's proposal workflow"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              // viewMode={viewMode}
              // setViewMode={setViewMode}
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

          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3">
                    <input type="checkbox" className="accent-blue-600" />
                  </th>
                  <th className="px-5 py-3 font-semibold">Project Name</th>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold text-right">{""}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <input type="checkbox" className="accent-blue-600" />
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {item.projectName}
                      </td>
                      <td className="px-5 py-4 text-gray-800">
                        {item.client.name}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        ${item.amount}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <FiMoreHorizontal
                          className="text-xl cursor-pointer text-gray-600 hover:text-blue-600"
                          onClick={() =>
                            setMenuIndex(menuIndex === index ? null : index)
                          }
                        />
                        {menuIndex === index && (
                          <div className="absolute right-8 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10 text-sm">
                            <ul className="divide-y divide-gray-100">
                              <li className="hover:bg-gray-100 cursor-pointer">
                                <Link
                                  to={`/dashboard/proposal/${item.id}`}
                                  className="flex items-center px-4 py-2 text-gray-700"
                                >
                                  <FaEye className="mr-3" /> View Details
                                </Link>
                              </li>
                              <li
                                onClick={() => handleEditClient(item)}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                <FaEdit className="mr-3 text-gray-600" /> Edit
                              </li>
                              <li
                                onClick={() => handleDeleteProposal(item.id)}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                              >
                                <FaTrash className="mr-3" /> Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
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
              isEdit={true}
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
