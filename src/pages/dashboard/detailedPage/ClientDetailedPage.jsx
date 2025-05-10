import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaUpload,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { clients } from "../../../index.js";
import ScheduleMeetingModal from "../../../components/dashboard/Form/ScheduleMeetingModal.jsx";

export default function ClientDetailedPage() {
  const { id } = useParams();
  const client = clients.find((client) => client.id === Number(id));

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    "Initial contact made. Interested in website redesign. Follow-up scheduled.",
  ]);

  const [files, setFiles] = useState([
    { name: "Initial Brief.pdf", date: "7/10/2024" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!client) {
    return (
      <div className="p-6 text-center text-gray-500">Client not found.</div>
    );
  }

  const handleAddNote = () => {
    if (note.trim()) {
      setNotes([...notes, note.trim()]);
      setNote("");
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      const today = new Date().toLocaleDateString("en-US");
      setFiles([...files, { name: uploaded.name, date: today }]);
    }
  };

  const handleDeleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white -m-4 text-black min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-xl">
          <FaUser /> <span>{client.name}</span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 text-blue-600">
            <FaEdit />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-red-600">
            <FaTrash />
          </button>
        </div>
      </div>
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Details */}
        <section className="bg-gray-50 p-5 rounded-xl shadow border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Client Details</h2>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <div className="text-sm space-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <FaUser /> {client.name}
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope /> {client.email}
            </div>
            <div className="flex items-center gap-2">
              <FaPhone /> {client.phone}
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> {client.country}
            </div>
            <div className="flex gap-2 pt-3 flex-wrap">
              {client.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Notes & Log */}
        <section className="bg-gray-50 p-5 rounded-xl overflow-hidden shadow border border-gray-200 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            Notes & Conversation Log
          </h2>
          <ul className="space-y-2 mb-4 text-sm text-gray-700">
            {notes.map((n, i) => (
              <li key={i} className="flex justify-between items-start gap-2">
                <span className="break-words w-4/5 my-1">{n}</span>
                <button
                  onClick={() => handleDeleteNote(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={14} />
                </button>
              </li>
            ))}
          </ul>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add new note..."
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleAddNote}
            className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
          >
            Add Note
          </button>
        </section>

        {/* Files */}
        <section className="bg-gray-50 p-5 rounded-xl shadow border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Files</h2>
          <div className="space-y-2 text-sm text-gray-700 mb-4">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-1 gap-2"
              >
                <div className="flex flex-col w-4/5">
                  <span className="break-words">{file.name}</span>
                  <span className="text-gray-500 text-xs">{file.date}</span>
                </div>
                <button
                  onClick={() => handleDeleteFile(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
          <label className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 text-sm cursor-pointer">
            <FaUpload /> Upload File
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
        </section>

        {/* Meeting History */}
        <section className="bg-gray-50 p-5 rounded-xl shadow border border-gray-200 md:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Meeting History</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <FaPlus /> Add Meeting
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <strong>July 9, 2024:</strong> Discovery call – discussed scope,
            budget approx $10k.
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-gray-50 p-5 rounded-xl shadow border border-gray-200 md:col-span-3">
          <h2 className="text-lg font-semibold mb-1">Timeline</h2>
          <p className="text-sm text-gray-600">
            All interactions with this client (emails, meetings, calls, etc.)
          </p>
          <p className="text-xs italic text-gray-400 pt-2">
            Timeline view coming soon.
          </p>
        </section>
      </div>
      {isModalOpen && (
        <ScheduleMeetingModal
          onClick={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
