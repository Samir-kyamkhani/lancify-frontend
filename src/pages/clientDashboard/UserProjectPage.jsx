import React from "react";
import { Link } from "react-router-dom";
import { projects, statusColors } from "../..";

const UserProjectPage = () => {
  return (
    <div>
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-black table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {["Project Title", "Status", "Start Date", "End Date", ""].map(
                (title) => (
                  <th key={title} className="px-5 py-3 font-semibold text-left">
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4 font-medium text-gray-800">
                  {project.title}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      statusColors[project.status]
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-700">{project.startDate}</td>
                <td className="px-5 py-4 text-gray-700">{project.endDate}</td>
                <td className="px-5 py-4">
                  <Link
                    to={`/dashboard/project/${project.id}`}
                    className="flex w-fit items-center gap-1 px-3 py-1.5 text-xs text-gray-700 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
                  >
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

export default UserProjectPage;
