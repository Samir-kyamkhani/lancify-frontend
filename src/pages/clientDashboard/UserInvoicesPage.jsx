import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllInvoices } from "../../slices/paymentSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { getCurrentUser, getUserRole } from "../../settings";

const statusConfig = {
  paid: { color: "text-green-600 border-green-600", icon: "✔️" },
  pending: { color: "text-yellow-600 border-yellow-600", icon: "⏳" },
  overdue: { color: "text-red-600 border-red-600", icon: "❌" },
  sent: { color: "text-blue-600 border-blue-600", icon: "📤" },
};

const UserInvoicesPage = () => {
  const dispatch = useDispatch();
  const { invoices = [] } = useSelector((state) => state.paymentData);
  console.log(invoices);
  
  const { id: userId } = getCurrentUser();
  console.log(userId);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    dispatch(fetchAllInvoices());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const normalizedSearch = searchTerm.toLowerCase();

      const filtered = invoices
        .filter((inv) => inv.clientId === userId)
        .filter((inv) => {
          const matchesSearch =
            inv.invid?.toLowerCase().includes(normalizedSearch) ||
            inv.client?.name?.toLowerCase().includes(normalizedSearch);

          const matchesStatus =
            filterStatus === "All" || inv.status === filterStatus;

          return matchesSearch && matchesStatus;
        });

      setFilteredInvoices(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, filterStatus, invoices, userId]);

  const handlePayment = async (invoice) => {
    try {
      const res = await axios.post(`${baseURL}/payment/order`, {
        amount: invoice.total,
        invoiceId: invoice.id,
      });

      handlePaymentVerify({
        ...res.data.data.order,
        invoiceId: invoice.id,
        userId: invoice.userId,
      });
    } catch (error) {
      console.error("Payment request failed:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Your Company Name",
      description: "Invoice Payment",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await axios.post(`${baseURL}/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            invoiceId: data.invoiceId,
            userId: data.userId,
            amount: data.amount,
          });

          alert(res.data?.message || "Payment verification successful.");
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed.");
        }
      },
      theme: { color: "#5f63b8" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen p-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Invoice ID or Client"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-1/2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="All">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
          <option value="sent">Sent</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="overflow-x-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow border border-white/20 mb-10">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr className="text-left text-slate-700 font-semibold">
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Client</th>
              <th className="p-4">Status</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => {
                const canPay = invoice.status === "sent";
                const clientName = invoice.client?.name || "N/A";
                const statusStyle = statusConfig[invoice.status] || {
                  color: "text-gray-600 border-gray-300",
                  icon: "📄",
                };

                return (
                  <tr key={invoice.id} className="hover:bg-slate-50">
                    <td className="p-4 font-semibold">{invoice.invid}</td>
                    <td className="p-4">{clientName}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border font-medium ${statusStyle.color}`}
                      >
                        {statusStyle.icon} {invoice.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold">₹ {invoice.total}</td>
                    <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                      <div className="flex flex-wrap gap-2 justify-end">
                        {canPay && (
                          <button
                            onClick={() => handlePayment(invoice)}
                            className="bg-blue-400 hover:bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md flex items-center gap-1"
                          >
                            Pay Now
                          </button>
                        )}
                        <Link
                          to={`/dashboard/payment/${invoice.id}`}
                          className="bg-white hover:bg-gray-100 border border-gray-300 text-sm px-4 py-1.5 rounded-md flex items-center gap-1"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInvoicesPage;
