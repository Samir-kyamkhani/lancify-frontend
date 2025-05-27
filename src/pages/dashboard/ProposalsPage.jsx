import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
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

export default function ProposalsPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editProposalModal, setEditProposalModal] = useState(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [proposalToDelete, setProposalToDelete] = useState(null);

  const role = getUserRole();
  const dispatch = useDispatch();
  const { proposals } = useSelector((state) => state.proposalData);

  useEffect(() => {
    dispatch(fetchAllProposals());
  }, [dispatch]);

  const handleEditClient = (item) => {
    setEditProposalModal(item);
    setShowProposalModal(true);
    setMenuIndex(null);
  };

  const handleDeleteClick = (proposal) => {
    setProposalToDelete(proposal);
    setShowDeleteConfirm(true);
    setMenuIndex(null);
  };

  const confirmDeleteProposal = () => {
    dispatch(deleteProposal(proposalToDelete.id));
    setShowDeleteConfirm(false);
    setProposalToDelete(null);
  };

  return (
    <div>
      {role === "admin" && (
        <>
          <HeaderSection />
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
                {proposals.length > 0 ? (
                  proposals.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <input type="checkbox" className="accent-blue-600" />
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {item.projectName}
                      </td>
                      <td className="px-5 py-4 text-gray-800">
                        {item.clientName}
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
                          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10 text-sm">
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
                                onClick={() => handleDeleteClick(item)}
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
                    <td
                      colSpan="7"
                      className="px-5 py-4 text-center text-gray-500"
                    >
                      No records found.
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
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-6">
              <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete this proposal? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteProposal}
                    className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {role === "user" && <UserProposalsPage />}
    </div>
  );
}
