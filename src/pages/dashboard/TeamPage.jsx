import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { roleColors, statusColors, teamMembers } from "../../index";
import AddTeamMemberModal from "../../components/dashboard/Form/AddTeamMemberModal";



export default function TeamPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editTeamMemberModal, setEditTeamMemberModal] = useState(null); // 🆕
  const [showTeamMemberModal, setShowTeamMemberModal] = useState(false);
  

  const handleEditClient = (member) => {
    setEditTeamMemberModal(member);
    setShowTeamMemberModal(true);
    setMenuIndex(null);
  };

  return (
    <div className="">
      <div className="mb-6">
        <p className="text-gray-600">
          Organize members, assign roles, and manage access.
        </p>
      </div>
      <HeaderSection />

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right">{""}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teamMembers.map((member, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4 flex items-center space-x-3">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300" />
                  )}
                  <span className="font-medium text-gray-800">
                    {member.name}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-700">{member.email}</td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${roleColors[member.role]}`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${statusColors[member.status]}`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right relative">
                  <FiMoreHorizontal
                    className="text-xl cursor-pointer text-gray-600 hover:text-blue-600"
                    onClick={() =>
                      setMenuIndex(menuIndex === index ? null : index)
                    }
                  />
                  {menuIndex === index && (
                    <div className="absolute right-10 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 text-sm overflow-hidden">
                      <ul className="divide-y divide-gray-100">
                        <li
                          onClick={() => handleEditClient(member)}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                          <FaEdit className="mr-3 text-gray-600" /> Edit
                        </li>
                        <li
                          onClick={() => {
                            alert(`Remove ${member.name}`);
                            setMenuIndex(null);
                          }}
                          className="flex items-center px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
                        >
                          <FaTrash className="mr-3" /> Remove
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Client Modal */}
      {showTeamMemberModal && (
        <AddTeamMemberModal
          isEdit={true}
          teamMemberData={editTeamMemberModal}
          onSubmit={(data) => {
            console.log("Client submitted:", data);
            setShowTeamMemberModal(false);
            setEditTeamMemberModal(null);
          }}
          onClose={() => {
            setShowTeamMemberModal(false);
            setEditTeamMemberModal(null);
          }}
        />
      )}
    </div>
  );
}
