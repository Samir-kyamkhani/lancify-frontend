import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { Link } from "react-router-dom";
import { proposals, statusColors } from "../../index.js";
import AddProposalModal from "../../components/dashboard/Form/AddProposalModal.jsx";
import UserProposalsPage from "../clientDashboard/UserProposalsPage.jsx";
import { getUserRole } from "../../settings.js";

export default function ProposalsPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editProposalModal, setEditProposalModal] = useState(null);
  const [showProposalModal, setShowProposalModal] = useState(false);

  const role = getUserRole();

  const handleEditClient = (item) => {
    setEditProposalModal(item);
    setShowProposalModal(true);
    setMenuIndex(null);
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
                {proposals.map((item, index) => (
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
                    <td className="px-5 py-4 text-gray-700">{item.date}</td>
                    <td className="px-5 py-4 text-gray-700">${item.amount}</td>
                    <td className="px-5 py-4 text-right relative">
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
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer">
                              <FaTrash className="mr-3" /> Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add/Edit Proposal Modal */}
          {showProposalModal && (
            <AddProposalModal
              isEdit={true}
              proposalData={editProposalModal}
              onSubmit={(data) => {
                console.log("Proposal submitted:", data);
                setShowProposalModal(false);
                setEditProposalModal(null);
              }}
              onClose={() => {
                setShowProposalModal(false);
                setEditProposalModal(null);
              }}
            />
          )}
        </>
      )}

      {role === "user" && <UserProposalsPage />}
    </div>
  );
}
