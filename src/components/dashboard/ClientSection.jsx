import React from "react";
import { motion } from "framer-motion";

function ClientSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white p-6 rounded-2xl shadow-lg overflow-x-auto"
    >
      {/* Header */}
      <div className="mb-6 flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Recents Clients</h2>
        <span className="text-sm ml-1">View all</span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-2">Client Name</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Project</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Status</th>
              {/* <th className="px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {/* Example Row 1 */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-1 text-gray-600 flex items-center">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-1.0fd36e0ee93dcfacdef8.jpg"
                  alt="John Doe"
                />
                <span>John Doe</span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">9876543210</td>
              <td className="px-4 py-3 text-gray-700">Portfolio Website</td>
              <td className="px-4 py-3 font-semibold text-green-600">₹1,00,000</td>
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
              <td className="px-4 py-3 text-gray-600 flex items-center">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-2.13ae2ce3e12f4cfed420.jpg"
                  alt="Jane Smith"
                />
                <span>Jane Smith</span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">9123456789</td>
              <td className="px-4 py-3 text-gray-700">E-commerce Store</td>
              <td className="px-4 py-3 font-semibold text-green-600">₹75,000</td>
              <td className="px-4 py-3">
                <div className="inline-block bg-red-200 text-red-800 text-xs px-3 py-1 rounded-full">
                  Inactive
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

export default ClientSection;
