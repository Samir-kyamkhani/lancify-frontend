import React, { useState } from "react";
import {
  FiPhone,
  FiVideo,
  FiSend,
  FiStar,
  FiPaperclip,
  FiArrowLeft,
  FiCalendar,
} from "react-icons/fi";
import { contacts } from "../../index";

export default function ChatPage() {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  

  const getAvatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;

  const handleProfileClick = (contact) => {
    setSelectedContact(contact);
    setShowProfile(true);
  };

  const handleOpenChat = (contact) => {
    setSelectedContact(contact);
  };

  const handleClosePopup = () => {
    setShowProfile(false);
    setSelectedContact(null);
  };

  const handleBackToContacts = () => {
    setSelectedContact(null);
  };

  const handleDeleteChat = () => {
    console.log("Deleting chat with", selectedContact.name);
    handleClosePopup();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]);
  };

  return (
    <div className="bg-white -m-4 min-h-screen text-black">
      <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-screen">
        {!selectedContact && (
          <section className="col-span-1 border-r border-gray-200 p-4 md:block">
            <div className="font-semibold text-lg border-b border-gray-200 pb-2 mb-4">
              Contacts
            </div>
            {contacts.map((contact, index) => (
              <div
                key={index}
                onClick={() => handleOpenChat(contact)}
                className={`flex mb-2 items-center p-4 cursor-pointer border-b bg-gray-50 border-gray-200 hover:bg-gray-100 rounded-lg transition ${
                  contact.active ? "bg-gray-100" : ""
                }`}
              >
                <img
                  src={getAvatarUrl(contact.name)}
                  alt="avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{contact.name}</div>
                    {contact.starred && <FiStar className="text-yellow-400" />}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {contact.message}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {selectedContact && (
          <section className="col-span-1 md:col-span-2 lg:col-span-4 bg-gray-50 flex flex-col h-screen">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center">
                <button
                  onClick={handleBackToContacts}
                  className="mr-4 text-xl text-gray-600"
                >
                  <FiArrowLeft />
                </button>
                <img
                  src={getAvatarUrl(selectedContact.name)}
                  alt="avatar"
                  className="w-10 h-10 cursor-pointer rounded-full mr-3"
                  onClick={handleProfileClick}
                />
                <div onClick={handleProfileClick} className="cursor-pointer">
                  <div className="font-semibold text-base">
                    {selectedContact.name}
                  </div>
                  <div className="text-xs text-gray-500">Offline</div>
                </div>
              </div>
              <div className="space-x-2 hidden md:flex">
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-100">
                  <FiPhone />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-100">
                  <FiVideo />
                </button>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-100"
                  title="Schedule Meeting"
                >
                  <FiCalendar />
                </button>
              </div>
            </div>

            <div className="flex-1 px-4 py-2 overflow-y-auto">
              <div className="mb-4 max-w-fit p-3 bg-gray-200 rounded shadow-sm text-sm">
                Can we reschedule?
                <div className="text-right text-xs text-gray-500">04:51 PM</div>
              </div>
              <div className="mb-4 ml-auto max-w-fit bg-blue-500 text-white p-3 rounded shadow-sm text-sm">
                hyy
                <div className="text-right text-xs mt-2 text-white">04:53 PM</div>
              </div>
            </div>

            <div className="p-2 md:p-4 flex items-center bg-white gap-2 sticky bottom-0 border-t z-10">
              <label className="cursor-pointer relative">
                <FiPaperclip className="text-xl text-gray-500 hover:text-gray-700" />
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={handleFileChange}
                />
              </label>
              <input
                className="flex-grow px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring"
                placeholder="Type your message..."
              />
              <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                <FiSend />
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Schedule a Meeting</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Meeting Title"
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <input
                type="datetime-local"
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Additional Notes"
                rows={3}
                className="w-full border rounded px-3 py-2 text-sm"
              ></textarea>
              <button
                onClick={() => {
                  alert("Meeting scheduled!");
                  setShowScheduleModal(false);
                }}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Confirm Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Panel */}
      {showProfile && selectedContact && (
        <div className="fixed inset-0 z-50 flex justify-end md:justify-center">
          <div
            onClick={handleClosePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          ></div>
          <div className="relative w-full md:max-w-md h-full bg-white shadow-lg overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
              <button
                onClick={handleClosePopup}
                className="mr-4 text-gray-600 hover:text-black text-xl"
              >
                ←
              </button>
              <h2 className="text-lg font-semibold">Contact Info</h2>
            </div>

            <div className="flex flex-col items-center text-center px-6 py-6">
              <img
                src={getAvatarUrl(selectedContact.name)}
                alt="avatar"
                className="w-28 h-28 rounded-full mb-4 shadow-md border"
              />
              <h3 className="text-xl font-semibold">{selectedContact.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedContact.details}
              </p>
            </div>

            <div className="px-6 py-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-1">About</h4>
              <p className="text-sm text-gray-600">
                {selectedContact.about || "Hey there! I am using ChatApp 😄"}
              </p>
            </div>

            <div className="px-6 py-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Contact</h4>
              <p className="text-sm text-gray-600">
                {selectedContact.email || "Not Provided"}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {selectedContact.phone || "Not Provided"}
              </p>
            </div>

            <div className="px-6 py-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Status</h4>
              <p className="text-sm text-gray-600">Offline</p>
            </div>

            <div className="sticky bottom-0 px-6 py-4 border-t bg-white">
              <button
                onClick={handleDeleteChat}
                className="w-full bg-red-100 text-red-600 hover:bg-red-200 font-medium py-2 rounded-lg"
              >
                Delete Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
