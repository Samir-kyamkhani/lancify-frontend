import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsCalendar2Event } from "react-icons/bs";
import HeaderSection from "../../components/dashboard/HeaderSection.jsx";
import { statusColors } from "../../index.js";
import AddClientModal from "../../components/dashboard/Form/AddClientModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, fetchAllClients } from "../../slices/clientSlice.js";

export default function ClientsPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);
  const [editClientData, setEditClientData] = useState(null);
  const [deleteClientId, setDeleteClientId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const dispatch = useDispatch();

  const { clients } = useSelector((state) => state?.clientData);
  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch, clients]);

  const allClients = useMemo(() => {
    return [...clients]?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [clients]);

  const handleClientSelection = (clientEmail) => {
    setSelectedClients((prev) =>
      prev.includes(clientEmail)
        ? prev.filter((email) => email !== clientEmail)
        : [...prev, clientEmail]
    );
  };

  const handleSendEmail = () => {
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
  };

  const handleEditClient = (client) => {
    setEditClientData(client);
    setShowClientModal(true);
    setMenuIndex(null);
  };

  const handleDeleteClient = (id) => {
    setDeleteClientId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteClient = async () => {
    if (deleteClientId) {
      await dispatch(deleteClient(deleteClientId));
      setShowDeleteConfirm(false);
      setDeleteClientId(null);
    }
  };

  return (
    <div>
      <HeaderSection />

      {allClients.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 relative">
          <svg
            className="w-16 h-16 mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 110-8 4 4 0 010 8zM3 17v-2a4 4 0 018 0v2m-4-4a4 4 0 110-8 4 4 0 010 8z"
            />
          </svg>
          <p className="text-lg font-medium">No client records found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your filters or adding a new client.
          </p>
        </div>
      ) : (
        <div
          className={`overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm`}
        >
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-5 py-3">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedClients(
                          clients.map((client) => client.email)
                        );
                      } else {
                        setSelectedClients([]);
                      }
                    }}
                  />
                </th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Number</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Country</th>
                <th className="px-5 py-3 font-semibold">Tags</th>
                <th className="px-5 py-3 font-semibold text-right">{""}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allClients.map((client, index) => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={selectedClients.includes(client.email)}
                      onChange={() => handleClientSelection(client.email)}
                    />
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {client.name}
                  </td>
                  <td className="px-5 py-4 text-blue-600">{client.email}</td>
                  <td className="px-5 py-4">{client.phone}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                        statusColors[
                          client.status == "OnHold" ? "On Hold" : client.status
                        ]
                      }`}
                    >
                      {client.status == "OnHold" ? "On Hold" : client.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-700">{client.country}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {client.tags.flat().map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <FiMoreHorizontal
                      className="text-xl cursor-pointer text-gray-600 hover:text-blue-600"
                      onClick={() =>
                        setMenuIndex(menuIndex === index ? null : index)
                      }
                    />
                    {menuIndex === index && (
                      <div className="absolute z-50 right-14 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 text-sm">
                        <ul className="divide-y divide-gray-100">
                          <li
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleEditClient(client)}
                          >
                            <FaEdit className="mr-3 text-gray-600" /> Edit
                            Client
                          </li>
                          <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <BsCalendar2Event className="mr-3 text-gray-600" />{" "}
                            Schedule Meeting
                          </li>
                          <li
                            onClick={() => handleDeleteClient(client.id)}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                          >
                            <FaTrash className="mr-3" /> Delete Client
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
      )}

      {selectedClients.length > 0 && (
        <button
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Send Bulk Email
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Compose Bulk Email</h2>
            <p className="mb-4 text-gray-600">
              Compose an email to send to the {selectedClients.length} selected
              client(s). You can use{" "}
              <code className="font-semibold">{"{{clientName}}"}</code> as a
              placeholder.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Email Subject Line"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Body
              </label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                rows="5"
                placeholder="Write your email message here... Use {{clientName}}"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handleSendEmail}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Send Email
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showClientModal && (
        <AddClientModal
          isEdit={true}
          clientData={editClientData}
          onSubmit={(data) => {
            console.log("Client submitted:", data);
            setShowClientModal(false);
            setEditClientData(null);
          }}
          onClose={() => {
            setShowClientModal(false);
            setEditClientData(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-6">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this client? This action cannot be
              undo.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteClient}
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
