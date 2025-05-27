import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import HeaderSection from "../../components/dashboard/HeaderSection";
import WalletSection from "../../components/dashboard/WalletSection";
import { Link } from "react-router-dom";
import { statusColors } from "../../index.js";
import AddInvoiceModal from "../../components/dashboard/Form/AddInvoiceModal.jsx";
import UserInvoicesPage from "../clientDashboard/UserInvoicesPage.jsx";
import { getUserRole } from "../../settings.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvoice,
  deleteInvoice,
  fetchAllInvoices,
} from "../../slices/paymentSlice.js";

export default function InvoicesPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editInvoiceModal, setEditInvoiceModal] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const role = getUserRole();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllInvoices());
  }, [dispatch]);

  const { invoices } = useSelector((state) => state.paymentData);

  const handleEditClient = (item) => {
    setEditInvoiceModal(item);
    setShowInvoiceModal(true);
    setMenuIndex(null);
  };

  const confirmDeleteProposal = (id) => {
    try {
      dispatch(deleteInvoice(selectedInvoiceId)); 
      setShowDeleteConfirm(false);
      setSelectedInvoiceId(null);
      dispatch(fetchAllInvoices());
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      {role === "admin" && (
        <>
          <HeaderSection />
          <div className="overflow-x-auto bg-white rounded-xl border mb-5 border-gray-200 shadow-sm">
            <table className="w-full text-sm h-fit text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3">
                    <input type="checkbox" className="accent-blue-600" />
                  </th>
                  <th className="px-5 py-3 font-semibold">Invoice ID</th>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Issue Date</th>
                  <th className="px-5 py-3 font-semibold">Due Date</th>
                  <th className="px-5 py-3 font-semibold">Total Amount</th>
                  <th className="px-5 py-3 font-semibold text-right">{""}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.length > 0 ? (
                  invoices.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <input type="checkbox" className="accent-blue-600" />
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {item.invid}
                      </td>
                      <td className="px-5 py-4 text-gray-800">
                        {item.client || "N/A"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                            statusColors[item.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {new Date(item.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {new Date(item.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-gray-700">${item.total}</td>
                      <td className="px-5 py-4 text-right ">
                        <FiMoreHorizontal
                          className="text-xl cursor-pointer text-gray-600 hover:text-blue-600"
                          onClick={() =>
                            setMenuIndex(menuIndex === index ? null : index)
                          }
                        />
                        {menuIndex === index && (
                          <div className="absolute right-12 mt-1 w-46 bg-white rounded-md shadow-lg z-10 border border-gray-200 text-sm overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                              <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <Link
                                  to={`/dashboard/payment/${item.id}`}
                                  className="flex items-center"
                                >
                                  <FaEye className="mr-3 text-gray-600" /> View
                                  Details
                                </Link>
                              </li>
                              <li
                                onClick={() => handleEditClient(item)}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                              >
                                <FaEdit className="mr-3 text-gray-600" /> Edit
                              </li>
                              <li
                                className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed"
                                title="Coming soon"
                              >
                                <svg
                                  className="w-4 h-4 mr-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 19V6M5 12h14" />
                                </svg>
                                Download PDF
                              </li>
                              <li
                                className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed"
                                title="Coming soon"
                              >
                                <svg
                                  className="w-4 h-4 mr-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M16 12H8m8 0l-4 4m4-4l-4-4" />
                                </svg>
                                Send Invoice
                              </li>
                              <li className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed">
                                <svg
                                  className="w-4 h-4 mr-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                                Mark as Paid
                              </li>
                              <li className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed">
                                <svg
                                  className="w-4 h-4 mr-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Mark as Cancelled
                              </li>
                              <li
                                onClick={() => {
                                  setSelectedInvoiceId(item.id);
                                  setShowDeleteConfirm(true);
                                  setMenuIndex(null);
                                }}
                                className="flex items-center px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
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
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <WalletSection />

          {showInvoiceModal && (
            <AddInvoiceModal
              isEdit={true}
              invoiceData={editInvoiceModal}
              onSubmit={(data) => {
                setShowInvoiceModal(false);
                setEditInvoiceModal(null);
              }}
              onClose={() => {
                setShowInvoiceModal(false);
                setEditInvoiceModal(null);
              }}
            />
          )}

          {showDeleteConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-6">
              <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete this invoice? This action
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
      {role === "user" && <UserInvoicesPage />}
    </div>
  );
}
