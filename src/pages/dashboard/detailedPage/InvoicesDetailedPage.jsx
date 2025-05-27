import React, { useEffect } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleInvoice } from "../../../slices/paymentSlice";

export default function InvoiceDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { invoice, loading, error } = useSelector((state) => state.paymentData);

  useEffect(() => {
    if (id) dispatch(fetchSingleInvoice(id));
  }, [id, dispatch]);

  console.log(invoice);

  const statusColors = {
    paid: "bg-green-200 text-green-600",
    overdue: "bg-yellow-200 text-yellow-600",
    pending: "bg-yellow-100 text-yellow-600",
    cancelled: "bg-gray-300 text-gray-700",
    sent: "bg-blue-100 text-blue-600 border border-blue-200",
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading invoice...</div>;
  }

  if (error || !invoice) {
    return (
      <div className="p-6 text-red-500">
        Error: {error || "Invoice not found"}
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Invoice #{invoice.invid}</h1>
          <p className="text-sm text-gray-500">
            Issued on : {new Date(invoice.issueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
            <FiDownload className="text-base" />
            Download
          </button>
          <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
            <FiPrinter className="text-base" />
            Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">From</h3>
          <p className="font-semibold">{invoice.user.name}</p>
          <p className="text-sm">
            {invoice.user.companyName || invoice.user.name}
          </p>
          <p className="text-sm text-gray-500">
            {invoice.user.address + " address"}
          </p>
          <p className="text-sm text-gray-500">{invoice.user.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">To</h3>
          <p className="font-semibold">{invoice.client?.name}</p>
          <p className="text-sm">
            {invoice.client?.company || invoice.client?.name}
          </p>
          <p className="text-sm text-gray-500">{invoice.clientAddress}</p>
          <p className="text-sm text-gray-500">{invoice.client?.email}</p>
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="text-left p-3 border-b">#</th> */}
              <th className="text-left p-3 border-b">Project Title</th>
              <th className="text-right p-3 border-b">Discount</th>
              <th className="text-right p-3 border-b">Rate</th>
              <th className="text-right p-3 border-b">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.length !== 0 ? (
              <tr>
                {/* <td className="p-3 border-b">{1}</td> */}
                <td className="p-3 border-b">{invoice.project.title}</td>
                <td className="p-3 border-b text-right">{invoice.discount}%</td>
                <td className="p-3 border-b text-right">{invoice.tax}</td>
                <td className="p-3 border-b text-right">${invoice.total}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No invoice items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-full max-w-sm space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${invoice.amount}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax + GST</span>
              <span>{invoice.tax}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>${invoice.total}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col space-y-1.5">
        <div>
          <span className="text-sm text-gray-500">Due Date:</span>{" "}
          <span className="font-medium">
            {new Date(invoice.dueDate).toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status : </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[invoice.status] || "bg-gray-200 text-gray-600"
            }`}
          >
            {invoice.status}
          </span>
        </div>
      </div>
    </div>
  );
}
