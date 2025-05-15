import React from "react";
import {
  FiFolder,
  FiPackage,
  FiMessageCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa"; // Importing calendar and warning icons

const UserDashboardPage = () => {
  return (
    <div className="min-h-screen text-black -m-4 px-4  font-sans">
      <div className="grid gap-6 md:grid-cols-4 mb-8 bg-white">
        <div className="p-5 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Projects In Progress</p>
          <h2 className="text-4xl font-bold mt-1 text-black">1</h2>
          <p className="text-sm text-gray-400">0 completed</p>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Pending Invoices</p>
          <h2 className="text-4xl font-bold mt-1 text-black">1</h2>
          <p className="text-sm text-gray-400">1 paid</p>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Shared Files</p>
          <h2 className="text-4xl font-bold mt-1 text-black">2</h2>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Unread Messages (Demo)</p>
          <h2 className="text-4xl font-bold mt-1 text-black">3</h2>
          <p className="text-sm italic text-gray-400">
            (Messaging coming soon)
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8 bg-white">
        <div className="border border-gray-200 p-5 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            Active Projects
          </h3>
          <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-black">Website Redesign</h4>
            <p className="text-base text-gray-600">
              Complete overhaul of the main corporate website.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Start: Jul 1, 2024 &nbsp; End: Sep 30, 2024
            </p>
            <span className="inline-block mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
              In Progress
            </span>
          </div>
        </div>

        <div className="border border-gray-200 p-5 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-2xl" />
            Schedule Meeting
          </h3>
          <ul className="space-y-3">
            {/* Project Kickoff Meeting */}
            <li>
              <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
                <FaCalendarAlt className="text-2xl text-blue-500" />
                <div>
                  <p className="font-medium text-black">
                    Project Kickoff: Website Redesign
                  </p>
                  <p className="text-sm text-gray-600">
                    Sunday, May 11, 2025 at 10:00 AM
                  </p>
                </div>
              </div>
            </li>

            {/* Phase 1 Deliverables */}
            <li>
              <div className="p-3 bg-red-50 rounded-lg flex items-start gap-3">
                <FaExclamationTriangle className="text-2xl text-red-500" />
                <div>
                  <p className="font-medium text-black">
                    Phase 1 Deliverables: Website Redesign
                  </p>
                  <p className="text-sm text-gray-600">Friday, May 16, 2025</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          Recent Activity
        </h3>
        <p className="text-base text-gray-500 mb-5">
          Latest updates related to your account.
        </p>
        <ul className="divide-y divide-gray-100 text-base">
          <li className="flex items-start gap-3 py-4">
            <FiFolder className="text-blue-600 text-2xl mt-0.5" />
            <div>
              <p className="text-gray-800">
                New design mockups uploaded for{" "}
                <span className="font-medium">"Website Redesign"</span>.{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  (Website Redesign)
                </a>
              </p>
              <p className="text-gray-500 mt-0.5 text-xs">2 hours ago</p>
            </div>
          </li>
          <li className="flex items-start gap-3 py-4">
            <FiPackage className="text-purple-600 text-2xl mt-0.5" />
            <div>
              <p className="text-gray-800">
                <span className="font-medium">"Mobile App Development"</span>{" "}
                status changed to In Progress.{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  (Mobile App Development)
                </a>
              </p>
              <p className="text-gray-500 mt-0.5 text-xs">5 hours ago</p>
            </div>
          </li>
          <li className="flex items-start gap-3 py-4">
            <FiMessageCircle className="text-yellow-500 text-2xl mt-0.5" />
            <div>
              <p className="text-gray-800">
                New comment on task{" "}
                <span className="font-medium">
                  "Develop Authentication Flow"
                </span>
                .{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  (Website Redesign)
                </a>
              </p>
              <p className="text-gray-500 mt-0.5 text-xs">8 hours ago</p>
            </div>
          </li>
          <li className="flex items-start gap-3 py-4">
            <FiCheckCircle className="text-green-600 text-2xl mt-0.5" />
            <div>
              <p className="text-gray-800">Invoice INV-001 marked as Paid.</p>
              <p className="text-gray-500 mt-0.5 text-xs">1 day ago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboardPage;
