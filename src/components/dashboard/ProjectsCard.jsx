import React from "react";
import { motion } from "framer-motion";

function ProjectsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white p-6 rounded-2xl shadow-lg overflow-x-auto"
    >
      {/* Header */}
      <div className="mb-6 flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Recents Projects</h2>
        <span className="text-sm ml-1">View all</span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Members</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Status</th>
              {/* <th className="px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {/* Example Row 1 */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 text-gray-600">
                <span>John Doe</span>
              </td>
              <td className="px-4 py-3 text-gray-600">
                <div className="flex w-fit">
                  {/* Member images */}
                  <div className="relative top-2 group w-7 h-12 cursor-pointer hover:scale-105 duration-300">
                    <img
                      className="rounded-full"
                      src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-1.0fd36e0ee93dcfacdef8.jpg"
                      alt=""
                    />
                    <span className="absolute top-8 hidden group-hover:inline-block bg-black text-white text-xs px-1 py-0.5 rounded shadow-md">
                      Neha
                    </span>
                  </div>
                  <div className="relative top-2 right-3 group w-7 h-12 cursor-pointer hover:scale-105 duration-300">
                    <img
                      className="rounded-full"
                      src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-2.13ae2ce3e12f4cfed420.jpg"
                      alt=""
                    />
                    <span className="absolute top-8 hidden group-hover:inline-block bg-black text-white text-xs px-1 py-0.5 rounded shadow-md">
                      Rahul
                    </span>
                  </div>
                  {/* Add more members here */}
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-green-600">
                ₹1,00,000
              </td>
              <td className="px-4 py-3">
                <div className="inline-block bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
                  Active
                </div>
              </td>
              {/* <td className="px-4 py-3 flex space-x-3 text-lg text-gray-600">
                <MdRemoveRedEye className="hover:text-blue-600 cursor-pointer" />
                <BiSolidMessageSquareEdit className="hover:text-yellow-500 cursor-pointer" />
                <MdDelete className="hover:text-red-600 cursor-pointer" />
              </td> */}
            </tr>

            {/* Example Row 2 */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 text-gray-600">
                <span>John Doe</span>
              </td>
              <td className="px-4 py-3 text-gray-600">
                <div className="flex w-fit">
                  {/* Member images */}
                  <div className="relative top-2 group w-7 h-12 cursor-pointer hover:scale-105 duration-300">
                    <img
                      className="rounded-full"
                      src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-1.0fd36e0ee93dcfacdef8.jpg"
                      alt=""
                    />
                    <span className="absolute top-8 hidden group-hover:inline-block bg-black text-white text-xs px-1 py-0.5 rounded shadow-md">
                      Neha
                    </span>
                  </div>
                  <div className="relative top-2 right-3 group w-7 h-12 cursor-pointer hover:scale-105 duration-300">
                    <img
                      className="rounded-full"
                      src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-2.13ae2ce3e12f4cfed420.jpg"
                      alt=""
                    />
                    <span className="absolute top-8 hidden group-hover:inline-block bg-black text-white text-xs px-1 py-0.5 rounded shadow-md">
                      Rahul
                    </span>
                  </div>
                  {/* Add more members here */}
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-green-600">
                ₹1,00,000
              </td>
              <td className="px-4 py-3">
                <div className="inline-block bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
                  Active
                </div>
              </td>
              {/* <td className="px-4 py-3 flex space-x-3 text-lg text-gray-600">
                <MdRemoveRedEye className="hover:text-blue-600 cursor-pointer" />
                <BiSolidMessageSquareEdit className="hover:text-yellow-500 cursor-pointer" />
                <MdDelete className="hover:text-red-600 cursor-pointer" />
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ProjectsCard;
