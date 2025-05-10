import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";
import HeaderSection from "../../components/dashboard/HeaderSection.jsx";
import { clients, statusColors } from "../../index.js";
import { Link } from "react-router-dom";
import AddClientModal from "../../components/dashboard/Form/AddClientModal.jsx";


export default function ClientsPage() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);
  const [editClientData, setEditClientData] = useState(null); // 🆕

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

  return (
    <div>
      <HeaderSection />
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-5 py-3">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedClients(clients.map((client) => client.email));
                    } else {
                      setSelectedClients([]);
                    }
                  }}
                />
              </th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Country</th>
              <th className="px-5 py-3 font-semibold">Tags</th>
              <th className="px-5 py-3 font-semibold text-right">{""}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client, index) => (
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
                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                      statusColors[client.status]
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-700">{client.country}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-right relative">
                  <FiMoreHorizontal
                    className="text-xl cursor-pointer text-gray-600 hover:text-blue-600"
                    onClick={() =>
                      setMenuIndex(menuIndex === index ? null : index)
                    }
                  />
                  {menuIndex === index && (
                    <div className="absolute z-50 right-0 mt-2 w-56 bg-white rounded-md shadow-lg border text-sm">
                      <ul className="divide-y divide-gray-100">
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <Link
                            to={`/dashboard/client/${client.id}`}
                            className="flex items-center"
                          >
                            <FaEye className="mr-3 text-gray-600" /> View
                            Details
                          </Link>
                        </li>
                        <li
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleEditClient(client)}
                        >
                          <FaEdit className="mr-3 text-gray-600" /> Edit Client
                        </li>
                        <li className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed">
                          <BiMessageDetail className="mr-3" /> Log Interaction
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <BsCalendar2Event className="mr-3 text-gray-600" />{" "}
                          Schedule Meeting
                        </li>
                        <li className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed">
                          <RiPriceTag3Line className="mr-3" /> Assign Tag
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer">
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

      {selectedClients.length > 0 && (
        <button
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Send Bulk Email
        </button>
      )}

      {/* Bulk Email Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs bg-opacity-50 z-50 ">
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

      {/* Add/Edit Client Modal */}
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
    </div>
  );
}
