import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import HeaderSection from "../../components/dashboard/HeaderSection";
import WalletSection from "../../components/dashboard/WalletSection";
import { Link } from "react-router-dom";
import { invoices, statusColors } from "../../index.js"; // Importing the updated invoices list
import AddInvoiceModal from "../../components/dashboard/Form/AddInvoiceModal.jsx";
import UserInvoicesPage from "../clientDashboard/UserInvoicesPage.jsx";
import { getUserRole } from "../../settings.js";

function calculateTotal(items, taxRate) {
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.quantity * item.rate * ((100 - item.discount) / 100);
    return sum + itemTotal;
  }, 0);
  const tax = (subtotal * taxRate) / 100;
  return subtotal + tax;
}

export default function InvoicesPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editInvoiceModal, setEditInvoiceModal] = useState(null); // 🆕
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const role = getUserRole();
  const handleEditClient = (item) => {
    setEditInvoiceModal(item);
    setShowInvoiceModal(true);
    setMenuIndex(null);
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
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold text-right">{""}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((item, index) => {
                  const amount = calculateTotal(item.items, item.taxRate);
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <input type="checkbox" className="accent-blue-600" />
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {item.invoiceId}
                      </td>
                      <td className="px-5 py-4 text-gray-800">
                        {item.client?.name || "N/A"}
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
                      <td className="px-5 py-4 text-gray-700">{item.date}</td>
                      <td className="px-5 py-4 text-gray-700">
                        {item.dueDate}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {item.currency} ${amount.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right relative">
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
                                  to={`${item.invoiceId}`}
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
                              <li className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed">
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
                              <li className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed">
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
                              <li className="flex items-center px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
                                <FaTrash className="mr-3" /> Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <WalletSection />

          {/* Add/Edit Client Modal */}
          {showInvoiceModal && (
            <AddInvoiceModal
              isEdit={true}
              invoiceData={editInvoiceModal}
              onSubmit={(data) => {
                console.log("Client submitted:", data);
                setShowInvoiceModal(false);
                setEditInvoiceModal(null);
              }}
              onClose={() => {
                setShowInvoiceModal(false);
                setEditInvoiceModal(null);
              }}
            />
          )}
        </>
      )}
      {role === "user" && <UserInvoicesPage />}
    </div>
  );
}
