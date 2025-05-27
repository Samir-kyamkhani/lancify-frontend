import { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { roleColors, statusColors } from "../../index";
import AddTeamMemberModal from "../../components/dashboard/Form/AddTeamMemberModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeamMemders, fetchAllTeamMemders } from "../../slices/authSlice";
import { CgProfile } from "react-icons/cg";

export default function TeamPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [editTeamMemberModal, setEditTeamMemberModal] = useState(null);
  const [showTeamMemberModal, setShowTeamMemberModal] = useState(false);

  // New states for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);

  const dispatch = useDispatch();
  const { allTeamMembers } = useSelector((state) => state.auth);

  const sortedAllTeamMembers = [...allTeamMembers].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    dispatch(fetchAllTeamMemders());
  }, [dispatch]);

  const handleEditClient = (member) => {
    setEditTeamMemberModal(member);
    setShowTeamMemberModal(true);
    setMenuIndex(null);
  };

  const handleRemoveClick = (member) => {
    setDeleteMember(member);
    setShowDeleteConfirm(true);
    setMenuIndex(null);
  };

  // Confirm delete action
  const confirmDeleteMember = async () => {
    if (!deleteMember) return;
    try {
      await dispatch(deleteTeamMemders(deleteMember));
      setShowDeleteConfirm(false);
      setDeleteMember(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Organize members, assign roles, and manage access.
        </p>
      </div>
      <HeaderSection />

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm ">
        <table className="w-full text-sm text-left ">
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
            {sortedAllTeamMembers.length > 0 ? (
              sortedAllTeamMembers.map((member, index) => (
                <tr
                  key={member.id || index}
                  className="hover:bg-gray-50 transition "
                >
                  <td className="px-5 py-4 flex items-center space-x-3">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <CgProfile className="w-6 h-6 text-gray-600" />
                    )}
                    <span className="font-medium text-gray-800">
                      {member.name}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-700">{member.email}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                        roleColors[member.role]
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                        statusColors[member.status]
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
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
                            onClick={() => handleRemoveClick(member.id)}
                            className="flex items-center px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
                          >
                            <FaTrash className="mr-3" /> Remove
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  Record not found.
                </td>
              </tr>
            )}
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
            dispatch(fetchAllTeamMemders()); // refresh after edit
          }}
          onClose={() => {
            setShowTeamMemberModal(false);
            setEditTeamMemberModal(null);
          }}
        />
      )}

      {/* Confirm Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-6">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <strong>{deleteMember?.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteMember}
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
