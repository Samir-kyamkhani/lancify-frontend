import { useEffect, useMemo, useState, useCallback, memo } from "react";
import {
  FaEdit,
  FaTrash,
  FaUser,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaBuilding,
} from "react-icons/fa";
import { FiMoreHorizontal, FiMail } from "react-icons/fi";
import { BsCalendar2Event, BsThreeDotsVertical } from "react-icons/bs";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { deleteClient, fetchAllClients } from "../../slices/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { StatsCard } from "../../components/dashboard/StatsCard";
import EmptyState from "./EmptyState";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import AddClientModal from "../../components/dashboard/Form/AddClientModal";

// Status color configuration
const statusColors = {
  Completed: "bg-green-100 text-green-800 border-green-200",
  InProgress: "bg-blue-100 text-blue-800 border-blue-200",
  "On Hold": "bg-yellow-100 text-yellow-800 border-yellow-200",
  OnHold: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Pending: "bg-orange-100 text-orange-800 border-orange-200",
};

// Client Card Component grid
const ClientCard = memo(
  ({
    client,
    index,
    selectedClients,
    onSelect,
    onEdit,
    onDelete,
    menuIndex,
    setMenuIndex,
  }) => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    return (
      <div className="bg-white rounded-2xl -mx-4 sm:mx-0 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 p-6 relative overflow-hidden">
        {/* Selection checkbox */}
        <div className="absolute top-4 left-4 z-10">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors"
            checked={selectedClients.includes(client.email)}
            onChange={() => onSelect(client.email)}
          />
        </div>

        {/* Action menu */}
        <div className="absolute top-4 right-4 z-10 cursor-pointer">
          <button
            onClick={() => setMenuIndex(menuIndex === index ? null : index)}
            className="p-2 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <BsThreeDotsVertical className="w-4 h-4 text-gray-500" />
          </button>

          {menuIndex === index && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-in slide-in-from-top-2">
              <button
                className="w-full flex cursor-pointer items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                onClick={() => onEdit(client)}
              >
                <FaEdit className="mr-3 text-blue-500" size={14} />
                <span className="text-sm text-gray-700">Edit Client</span>
              </button>
              <button className="w-full flex cursor-pointer items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                <BsCalendar2Event className="mr-3 text-green-500" size={14} />
                <span className="text-sm text-gray-700">Schedule Meeting</span>
              </button>

              <hr className="my-2" />
              <button
                onClick={() => onDelete(client.id)}
                className="w-full flex cursor-pointer items-center px-4 py-3 hover:bg-red-50 transition-colors text-left text-red-600"
              >
                <FaTrash className="mr-3" size={14} />
                <span className="text-sm">Delete Client</span>
              </button>
            </div>
          )}
        </div>

        {/* Client Info */}
        <div className="mt-8">
          <div className="flex items-start mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg truncate">
                {client.name}
              </h3>
              {client.company && (
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <FaBuilding className="w-3 h-3 mr-1" />
                  {client.company}
                </p>
              )}
              <span
                className={`inline-block text-xs px-3 py-1 rounded-full font-medium border mt-2 ${
                  statusColors[
                    client.status === "OnHold" ? "On Hold" : client.status
                  ]
                }`}
              >
                {client.status === "OnHold" ? "On Hold" : client.status}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600 ">
              <FaEnvelope className="w-4 h-4 mr-3 text-gray-400 hover:text-blue-500 transition-colors" />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer truncate">
                {client.email}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaPhone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-sm">{client.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaGlobe className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-sm">{client.country}</span>
            </div>
          </div>

          {/* Tags */}
          {client.tags && client.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {client.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 font-medium"
                  >
                    {tag.name}
                  </span>
                ))}
                {client.tags.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                    +{client.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Added {formatDate(client.createdAt)}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

// Table Row Component
const TableRow = memo(
  ({
    client,
    index,
    selectedClients,
    onSelect,
    onEdit,
    onDelete,
    menuIndex,
    setMenuIndex,
  }) => (
    <tr className="hover:bg-gray-50  transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          checked={selectedClients.includes(client.email)}
          onChange={() => onSelect(client.email)}
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm mr-3 shadow">
            {client.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{client.name}</div>
            {client.company && (
              <div className="text-sm text-gray-500 flex items-center">
                <FaBuilding className="w-3 h-3 mr-1" />
                {client.company}
              </div>
            )}
            <div className="text-sm text-gray-500 sm:hidden">
              {client.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <div className="text-sm text-blue-600 mb-1 hover:text-blue-700 cursor-pointer">
          {client.email}
        </div>
        <div className="text-sm text-gray-500">{client.phone}</div>
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
            statusColors[client.status === "OnHold" ? "On Hold" : client.status]
          }`}
        >
          {client.status === "OnHold" ? "On Hold" : client.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 hidden xl:table-cell">
        {client.country}
      </td>
      <td className="px-6 py-4 hidden xl:table-cell">
        <div className="flex flex-wrap gap-1">
          {client.tags?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
            >
              {tag.name}
            </span>
          ))}
          {client.tags?.length > 2 && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              +{client.tags.length - 2}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-right relative">
        <button
          onClick={() => setMenuIndex(menuIndex === index ? null : index)}
          className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors  "
        >
          <FiMoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
        {menuIndex === index && (
          <div className="absolute right-8 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
            <button
              className="w-full flex cursor-pointer items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              onClick={() => onEdit(client)}
            >
              <FaEdit className="mr-3 text-blue-500" size={14} />
              <span className="text-sm text-gray-700">Edit Client</span>
            </button>
            <button className="w-full flex cursor-pointer items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left">
              <BsCalendar2Event className="mr-3 text-green-500" size={14} />
              <span className="text-sm text-gray-700">Schedule Meeting</span>
            </button>

            <hr className="my-2" />
            <button
              onClick={() => onDelete(client.id)}
              className="w-full flex items-center cursor-pointer px-4 py-3 hover:bg-red-50 transition-colors text-left text-red-600"
            >
              <FaTrash className="mr-3" size={14} />
              <span className="text-sm">Delete Client</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  )
);

// Main Component
export default function ClientsPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);
  const [editClientData, setEditClientmodel] = useState(null);
  const [deleteClientId, setDeleteClientId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state?.clientData);

  // Fetch clients on component mount
  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);

  // Memoized filtered and sorted clients
  const allClients = useMemo(() => {
    if (!clients || !Array.isArray(clients)) return [];

    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        (client.company &&
          client.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [clients, searchTerm]);

  // Callbacks for better performance
  const handleClientSelection = useCallback((clientEmail) => {
    setSelectedClients((prev) =>
      prev.includes(clientEmail)
        ? prev.filter((email) => email !== clientEmail)
        : [...prev, clientEmail]
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked) => {
      if (checked) {
        setSelectedClients(allClients.map((client) => client.email));
      } else {
        setSelectedClients([]);
      }
    },
    [allClients]
  );

  const handleSendEmail = useCallback(() => {
    selectedClients.forEach((clientEmail) => {
      const client = clients.find((client) => client.email === clientEmail);
      const personalizedBody = emailBody.replace("{{clientName}}", client.name);
      console.log(
        `Sending email to ${clientEmail} with subject "${emailSubject}" and body "${personalizedBody}"`
      );
    });

    setIsModalOpen(false);
    setEmailSubject("");
    setEmailBody("");
    setSelectedClients([]);
  }, [selectedClients, clients, emailSubject, emailBody]);

  const handleEditClient = useCallback((client) => {
    setEditClientmodel(client);
    setShowClientModal(true);
    setMenuIndex(null);
  }, []);

  const handleDeleteClient = useCallback((id) => {
    setDeleteClientId(id);
    setShowDeleteConfirm(true);
    setMenuIndex(null);
  }, []);

  const confirmDeleteClient = useCallback(async () => {
    if (deleteClientId) {
      dispatch(deleteClient(deleteClientId));
      setShowDeleteConfirm(false);
      setDeleteClientId(null);
    }
  }, [deleteClientId, dispatch]);

  // Stats calculations
  const stats = useMemo(() => {
    const count = (status) =>
      allClients.filter((c) => c.status === status).length;
    return {
      total: allClients.length,
      completed: count("Completed"),
      inProgress: count("InProgress"),
      lead: count("Lead"),
      onhold: count("OnHold"),
      selected: selectedClients.length,
    };
  }, [allClients, selectedClients]);

  return (
    <>
      <div>
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 -mx-4 sm:mx-0 sm:p-8 sm:mb-8">
          <HeaderSection
            title="Client Management"
            subtitle="Manage your clients and grow your business"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
            {[
              {
                title: "Total Clients",
                value: stats.total,
                color: "text-blue-600",
                icon: FaUsers,
              },
              {
                title: "Completed",
                value: stats.completed,
                color: "text-green-600",
                icon: FaUser,
              },
              {
                title: "In Progress",
                value: stats.inProgress,
                color: "text-orange-600",
                icon: BsCalendar2Event,
              },
              {
                title: "Selected",
                value: stats.selected,
                color: "text-purple-600",
                icon: FiMail,
              },
            ].map((stat, i) => (
              <StatsCard
                key={i}
                title={stat.title}
                value={stat.value}
                color={stat.color}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        {allClients.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowClientModal={setShowClientModal}
            noClientsTitle="No clients yet"
            noClientsMessage="Get started by adding your first client to begin managing your business relationships."
            noMatchTitle="No clients found"
            noMatchMessage="No clients match your search criteria. Try adjusting your search."
            addClientButtonText="Add Your First Client"
            clearSearchText="Clear search"
          />
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {allClients.map((client, index) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    index={index}
                    onSelect={handleClientSelection}
                    onEdit={handleEditClient}
                    onDelete={handleDeleteClient}
                    menuIndex={menuIndex}
                    setMenuIndex={setMenuIndex}
                    selectedClients={selectedClients}
                  />
                ))}
              </div>
            ) : (
              // table row
              <div className="bg-white rounded-xl -mx-4 sm:mx-0 shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-5 text-left">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            checked={
                              selectedClients.length === allClients.length &&
                              allClients.length > 0
                            }
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-gray-900">
                          Client
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 hidden sm:table-cell">
                          Contact
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 hidden lg:table-cell">
                          Status
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 hidden xl:table-cell">
                          Location
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 hidden xl:table-cell">
                          Tags
                        </th>
                        <th className="px-6 py-5 text-right text-sm font-bold text-gray-900"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {allClients.map((client, index) => (
                        <TableRow
                          key={client.id}
                          client={client}
                          index={index}
                          selectedClients={selectedClients}
                          onSelect={handleClientSelection}
                          onEdit={handleEditClient}
                          onDelete={handleDeleteClient}
                          menuIndex={menuIndex}
                          setMenuIndex={setMenuIndex}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Floating Action Button */}
        {selectedClients.length > 0 && (
          <div className="fixed bottom-8 right-8 z-40">
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              <FiMail className="w-5 h-5" />
              <span className="font-medium">
                Send Email ({selectedClients.length})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Compose Bulk Email
              </h2>
              <p className="text-gray-600 mt-3 text-lg">
                Send an email to {selectedClients.length} selected client(s).
                Use{" "}
                <code className="bg-blue-50 px-3 py-1 rounded-lg text-sm font-mono text-blue-700">
                  {"{{clientName}}"}
                </code>{" "}
                for personalization.
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter email subject..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Message Body
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
                  rows="8"
                  placeholder="Dear {{clientName}},&#10;&#10;Write your message here..."
                />
              </div>
            </div>

            <div className="p-8 border-t border-gray-200 flex gap-4">
              <button
                onClick={handleSendEmail}
                disabled={!emailSubject.trim() || !emailBody.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                Send Email
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-4 border-2 border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          show={showDeleteConfirm}
          setShow={setShowDeleteConfirm}
          onConfirm={confirmDeleteClient}
        />
      )}
      {showClientModal && (
        <AddClientModal
          isEdit={!!editClientData}
          clientData={editClientData}
          onClose={() => {
            setShowClientModal(false);
            setEditClientmodel(null);
          }}
        />
      )}
    </>
  );
}
