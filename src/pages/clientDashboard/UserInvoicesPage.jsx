import React from "react";
import { Link } from "react-router-dom";
import { statusStyles, Userinvoices } from "../..";



const UserInvoicesPage = () => {
  return (
    <div>
      {/* <h2 className="text-2xl font-bold text-black mb-1">My Invoices</h2>
      <p className="text-gray-600 mb-4">View and manage your invoices.</p> */}

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {[
                "Invoice ID",
                "Status",
                "Issue Date",
                "Due Date",
                "Amount",
                "",
              ].map((title) => (
                <th
                  key={title}
                  className="sm:py-3 sm:px-4 py-1.5 px-2 border-b border-gray-200 text-left"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Userinvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200">
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  {invoice.id}
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      statusStyles[invoice.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  {invoice.issueDate}
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  {invoice.dueDate}
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  <div className="flex flex-wrap gap-2">
                    {invoice.canPay && (
                      <button className="bg-blue-400 cursor-pointer hover:bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md flex items-center gap-1">
                        Pay Now
                      </button>
                    )}
                    <Link
                      to={`/dashboard/payment/${invoice.id}`}
                      className="bg-white cursor-pointer hover:bg-gray-100 border border-gray-300 text-sm px-4 py-1.5 rounded-md flex items-center gap-1"
                    >
                      View Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInvoicesPage;
