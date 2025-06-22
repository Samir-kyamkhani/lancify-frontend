import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllProjects } from "../../slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { format, formatDate } from "date-fns";
import { projectStatusStyles } from "../..";

const UserProjectPage = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projectData);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-white shadow min-h-screen rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-black table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {[
                "Project Title",
                "Status",
                "Start Date",
                "End Date",
                "Description",
                "",
              ].map((title) => (
                <th
                  key={title}
                  className="px-5 py-3 font-semibold text-left whitespace-nowrap"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects?.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                  {project.title}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={`lg:ml-auto px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      projectStatusStyles[project.status] ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {(project.status === "in_progress" && "In Progress") ||
                      (project.status === "not_started" && "Not Started") ||
                      (project.status === "cancelled" && "Cancelled") ||
                      (project.status === "completed" && "Completed") ||
                      "Unknown"}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                  {formatDate(project.startDate)}
                </td>
                <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                  {formatDate(project.endDate)}
                </td>
                <td className="px-5 py-4 text-gray-700">
                  {project.description}
                </td>
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
            {!projects.length && (
              <tr>
                <td colSpan={6} className="px-5 py-6 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProjectPage;
