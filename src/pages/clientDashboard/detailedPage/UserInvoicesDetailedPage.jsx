import React from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { invoices } from "../../../index";



export default function UserInvoiceDetailsPage() {
  const { id } = useParams();
  const invoice = invoices.find((inv) => inv.invoiceId.toString() === id.toString());

  if (!invoice) return <div className="p-6">Invoice not found.</div>;

  const subtotal = invoice.items.reduce(
    (acc, item) => acc + item.quantity * item.rate * (1 - item.discount / 100),
    0
  );
  const tax = (subtotal * invoice.taxRate) / 100;
  const total = subtotal + tax;

  const statusColors = {
    Unpaid: "bg-red-200 text-red-600",
    Paid: "bg-green-200 text-green-600",
    Overdue: "bg-yellow-200 text-yellow-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Draft: "bg-gray-100 text-gray-600",
    Cancelled: "bg-gray-300 text-gray-700",
  };

  return (
    <div className="p-6 rounded-lg bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Invoice #{invoice.invoiceId}</h1>
          <p className="text-sm text-gray-500">Issued on {invoice.date}</p>
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
          <p className="font-semibold">{invoice.freelancer.name}</p>
          <p className="text-sm">{invoice.freelancer.company}</p>
          <p className="text-sm text-gray-500">{invoice.freelancer.address}</p>
          <p className="text-sm text-gray-500">{invoice.freelancer.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">To</h3>
          <p className="font-semibold">{invoice.client.name}</p>
          <p className="text-sm">{invoice.client.company}</p>
          <p className="text-sm text-gray-500">{invoice.client.address}</p>
          <p className="text-sm text-gray-500">{invoice.client.email}</p>
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b">#</th>
              <th className="text-left p-3 border-b">Project Name</th>
              <th className="text-right p-3 border-b">Discount</th>
              <th className="text-right p-3 border-b">Rate</th>
              <th className="text-right p-3 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={idx}>
                <td className="p-3 border-b">{idx + 1}</td>
                <td className="p-3 border-b">{item.name}</td>
                <td className="p-3 border-b text-right">{item.discount}%</td>
                <td className="p-3 border-b text-right">
                  {invoice.currency} {item.rate.toFixed(2)}
                </td>
                <td className="p-3 border-b text-right">
                  {invoice.currency}{" "}
                  {(
                    item.quantity *
                    item.rate *
                    (1 - item.discount / 100)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-full max-w-sm space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {invoice.currency} {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({invoice.taxRate}%)</span>
              <span>
                {invoice.currency} {tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>
                {invoice.currency} {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">Due Date:</span>{" "}
          <span className="font-medium">{invoice.dueDate}</span>
        </div>
        <div>
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
