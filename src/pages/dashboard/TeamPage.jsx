import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { StatsCard } from "../../components/dashboard/StatsCard";
import AddTeamMemberModal from "../../components/dashboard/Form/AddTeamMemberModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { deleteTeamMemders, fetchAllTeamMemders } from "../../slices/authSlice";
import EmptyState from "./EmptyState";

export default function TeamPage() {
  const dispatch = useDispatch();
  const { allTeamMembers } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [menuIndex, setMenuIndex] = useState(null);
  const [editTeamData, setEditTeamData] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTeamMemders());
  }, [dispatch]);

  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const normalizedSearch = searchTerm?.toLowerCase() || "";

      const filtered = allTeamMembers.filter((member) => {
        const matchesSearch =
          member.name?.toLowerCase().includes(normalizedSearch) ||
          member.email?.toLowerCase().includes(normalizedSearch);

        const matchesStatus =
          filterStatus === "All" ? true : member.status === filterStatus;

        return matchesSearch && matchesStatus;
      });

      setFilteredMembers(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, filterStatus, allTeamMembers]);

  const statsData = [
    {
      title: "Total Members",
      value: allTeamMembers.length,
      icon: () => <FaUserPlus className="text-indigo-600" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Active",
      value: allTeamMembers.filter((m) => m.status === "Active").length,
      icon: () => <span className="text-emerald-600">✅</span>,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Inactive",
      value: allTeamMembers.filter((m) => m.status === "Inactive").length,
      icon: () => <span className="text-amber-600">⏳</span>,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ];

  const handleEditTeam = useCallback((editData) => {
    setEditTeamData(editData);
    setShowTeamModal(true);
    setMenuIndex(null);
  }, []);

  const handleDeleteTeam = (memberId) => {
    setDeleteMember(memberId);
    setShowDeleteConfirm(true);
    setMenuIndex(null);
  };

  const confirmDelete = () => {
    if (deleteMember) {
      dispatch(deleteTeamMemders(deleteMember));
      setShowDeleteConfirm(false);
      setDeleteMember(null);
    }
  };

  return (
    <>
      <div className="bg-white -mx-4 sm:mx-0 rounded-xl shadow-sm border border-gray-100 p-4 mb-4 sm:p-8 sm:mb-8">
        <HeaderSection
          title="Team Management"
          subtitle="Organize members, assign roles, and manage access."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-10">
          {statsData.map(({ title, value, icon: Icon, color, bgColor }, i) => (
            <StatsCard
              key={i}
              title={title}
              value={value}
              icon={Icon}
              color={color}
              bgColor={bgColor}
            />
          ))}
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 bg-white/80 backdrop-blur-lg rounded-2xl shadow border border-white/20">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left text-slate-700 font-semibold">
                Name
              </th>
              <th className="p-4 text-left text-slate-700 font-semibold hidden sm:table-cell">
                Email
              </th>
              <th className="p-4 text-left text-slate-700 font-semibold">
                Status
              </th>
              <th className="p-4 text-left text-slate-700 font-semibold hidden lg:table-cell">
                Role
              </th>
              <th className="p-4 text-right text-slate-700 font-semibold rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setShowClientModal={setShowTeamModal}
                    noClientsTitle="No team members yet"
                    noClientsMessage="Get started by adding your first team member to begin building your team."
                    noMatchTitle="No team members found"
                    noMatchMessage="No team members match your search criteria. Try adjusting your search."
                    addClientButtonText="Add Your First Team Member"
                    clearSearchText="Clear search"
                  />
                </td>
              </tr>
            ) : (
              filteredMembers.map((member, index) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50 transition cursor-default"
                >
                  <td className="p-4 flex items-center gap-3 whitespace-nowrap">
                    <span className="font-medium">{member.name}</span>
                  </td>
                  <td className="p-4 hidden sm:table-cell">{member.email}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        member.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">{member.role}</td>
                  <td className="p-4 text-right relative">
                    <button
                      onClick={() =>
                        setMenuIndex(menuIndex === index ? null : index)
                      }
                      className="p-2 hover:bg-slate-100 rounded-lg"
                      aria-label="Actions menu"
                    >
                      <FiMoreHorizontal className="text-gray-600 hover:text-gray-900" />
                    </button>

                    {menuIndex === index && (
                      <div className="absolute right-4 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 z-20">
                        <button
                          onClick={() => handleEditTeam(member)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 transition rounded-t-xl"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(member.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center gap-2 transition rounded-b-xl"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showTeamModal && (
        <AddTeamMemberModal
          isEdit={!!editTeamData}
          teamMemberData={editTeamData}
          onClose={() => {
            setShowTeamModal(false);
            setEditTeamData(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          show={showDeleteConfirm}
          setShow={setShowDeleteConfirm}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
