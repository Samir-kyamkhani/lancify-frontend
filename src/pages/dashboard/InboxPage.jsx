import { useState, useEffect } from "react";
import { FiStar } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import NotificationSettings from "../../components/dashboard/NotificationSettings";
import { messages } from "../../index";
import { getUserRole } from "../../settings";

export default function InboxPage() {
  const role = getUserRole();

  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const selectedMsg = messages.find((m) => m.id === selectedId);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl text-black shadow h-fit flex flex-col overflow-hidden">
        <main className="flex-1 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-hidden">
          {/* Message List */}
          <section
            className={`${
              selectedId && isMobile ? "hidden" : "block"
            } md:block md:col-span-2 lg:col-span-2 sm:border-r border-gray-200 pr-4 overflow-y-auto h-full`}
          >
            <div className="space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedId(msg.id)}
                  className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-50 rounded-lg transition-colors duration-200 ease-in-out ${
                    selectedId === msg.id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                      {msg.starred && <FiStar className="text-yellow-400" />}
                      {msg.sender}
                    </h3>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {msg.subject}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {msg.preview}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Message Detail */}
          {selectedId && (
            <section className="md:col-span-2 lg:col-span-2 p-4 bg-gray-50 rounded-lg shadow-sm h-full overflow-y-auto relative">
              {/* Back for mobile */}
              {isMobile && (
                <div className="md:hidden mb-4 sticky top-0 bg-gray-50 z-10">
                  <button
                    className="flex items-center text-blue-600 hover:underline"
                    onClick={() => setSelectedId(null)}
                  >
                    <IoArrowBack className="mr-1" /> Back to Inbox
                  </button>
                </div>
              )}
              {selectedMsg ? (
                <div className="space-y-4 pb-8">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {selectedMsg.subject}
                  </h2>
                  <p className="text-sm text-gray-500">
                    From: <strong>{selectedMsg.sender}</strong> &lt;
                    {selectedMsg.email}&gt;
                  </p>
                  <p className="text-sm text-gray-500">
                    Phone: {selectedMsg.phone}
                  </p>
                  <p className="text-sm text-gray-400">
                    Sent: {selectedMsg.time}
                  </p>
                  <p className="mt-4 text-gray-700">{selectedMsg.preview}</p>
                  <div className="mt-4 flex gap-4">
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                      Reply
                    </button>
                    <button className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Select a message to read.</p>
              )}
            </section>
          )}
        </main>
      </div>

      {role === "admin" && (
        <section className="py-4">
          <NotificationSettings />
        </section>
      )}
    </>
  );
}
