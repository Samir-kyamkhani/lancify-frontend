import React from "react";
import { Link } from "react-router-dom";
import { statusColors, Userproposals } from "../..";


const UserProposalsPage = () => {
  return (
    <div className="p-6  -m-4 ">
      <h2 className="text-2xl font-bold text-black mb-1">My Proposals</h2>
      <p className="text-gray-600 mb-4">Review proposals submitted to you.</p>
      <hr className="mb-10 text-gray-200" />

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-50">
            <tr>
              {["Project Name", "Status", "Date Submitted", "Amount", ""].map(
                (title) => (
                  <th
                    key={title}
                    className="sm:py-3 sm:px-4 py-1.5 px-2 border-b border-gray-200 text-left"
                  >
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Userproposals.map((proposal, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  {proposal.projectName}
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      statusColors[proposal.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {proposal.status}
                  </span>
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  {proposal.dateSubmitted}
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  ${proposal.amount.toFixed(2)}
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  <Link
                    to={`/user/proposal/${proposal.id}`}
                    className="border w-fit border-gray-300 hover:bg-gray-100 text-xs px-3 py-1.5 rounded-md flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProposalsPage;
