import { useState, useEffect } from "react";
import { Star, ArrowLeft, Reply, Trash2 } from "lucide-react";

// Mock data for demonstration
const messages = [
  {
    id: 1,
    sender: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    subject: "Important Project Update",
    preview:
      "I wanted to update you on the latest developments in our project. We've made significant progress...",
    time: "2h ago",
    starred: true,
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    email: "sarah@company.com",
    phone: "+1 555 123 4567",
    subject: "Meeting Schedule Confirmation",
    preview:
      "Please confirm your availability for the meeting scheduled next week. We need to discuss...",
    time: "4h ago",
    starred: false,
  },
  {
    id: 3,
    sender: "Mike Wilson",
    email: "mike@business.com",
    phone: "+1 777 888 9999",
    subject: "Budget Review Results",
    preview:
      "The quarterly budget review has been completed and I'm pleased to share the results with you...",
    time: "1d ago",
    starred: true,
  },
  {
    id: 4,
    sender: "Emma Davis",
    email: "emma@startup.io",
    phone: "+1 333 444 5555",
    subject: "New Feature Proposal",
    preview:
      "I have an exciting new feature proposal that could significantly improve our user experience...",
    time: "2d ago",
    starred: false,
  },
];

// Mock notification settings component
function NotificationSettings() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
      <div className="space-y-3">
        <label className="flex items-center">
          <input type="checkbox" className="mr-3" defaultChecked />
          <span className="text-sm">Email notifications</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-3" defaultChecked />
          <span className="text-sm">Push notifications</span>
        </label>
      </div>
    </div>
  );
}

export default function InboxPage() {
  const role = "admin"; // Mock role

  const [selectedId, setSelectedId] = useState(null);
  const [screenSize, setScreenSize] = useState("desktop");

  const selectedMsg = messages.find((m) => m.id === selectedId);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";

  return (
    <>
      <div className="bg-white border border-gray-200 overflow-hidden">
        {/* Header - Only show on mobile when no message is selected */}
        {isMobile && !selectedId && (
          <div className="border-b border-gray-200 p-4">
            <h1 className="text-xl font-semibold text-gray-800">Inbox</h1>
          </div>
        )}

        <main className="flex h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)]">
          {/* Message List */}
          <section
            className={`
                ${selectedId && isMobile ? "hidden" : "flex"}
                ${isMobile ? "w-full" : isTablet ? "w-2/5" : "w-1/3"}
                flex-col border-r border-gray-200 bg-gray-50
              `}
          >
            {/* Search bar - hidden on mobile when message selected */}
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedId(msg.id)}
                    className={`
                        p-3 sm:p-4 cursor-pointer hover:bg-white transition-colors duration-200
                        ${
                          selectedId === msg.id
                            ? "bg-blue-50 border-r-2 border-blue-500"
                            : "hover:bg-gray-100"
                        }
                      `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {msg.starred && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                        )}
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                          {msg.sender}
                        </h3>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {msg.time}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-1 line-clamp-1">
                      {msg.subject}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {msg.preview}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Message Detail */}
          <section
            className={`
                ${!selectedId && isMobile ? "hidden" : "flex"}
                ${isMobile ? "w-full" : isTablet ? "w-3/5" : "w-2/3"}
                flex-col bg-white
              `}
          >
            {selectedId ? (
              <>
                {/* Mobile back button */}
                {isMobile && (
                  <div className="border-b border-gray-200 p-4">
                    <button
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => setSelectedId(null)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span className="font-medium">Back to Inbox</span>
                    </button>
                  </div>
                )}

                {/* Message content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 sm:p-6 lg:p-8">
                    {/* Message header */}
                    <div className="border-b border-gray-200 pb-4 mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 pr-4">
                          {selectedMsg.subject}
                        </h1>
                        {selectedMsg.starred && (
                          <Star className="w-5 h-5 text-yellow-400 fill-current flex-shrink-0 mt-1" />
                        )}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                          <span>
                            <strong className="text-gray-800">From:</strong>{" "}
                            {selectedMsg.sender}
                          </span>
                          <span className="break-all">
                            &lt;{selectedMsg.email}&gt;
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                          <span>
                            <strong className="text-gray-800">Phone:</strong>{" "}
                            {selectedMsg.phone}
                          </span>
                          <span>
                            <strong className="text-gray-800">Sent:</strong>{" "}
                            {selectedMsg.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Message body */}
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {selectedMsg.preview}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="border-t border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Reply className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Select a message
                  </h3>
                  <p className="text-gray-600 max-w-sm">
                    Choose a message from your inbox to read its content and
                    reply.
                  </p>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Admin notification settings */}
      {role === "admin" && (
        <div className="mt-6">
          <NotificationSettings />
        </div>
      )}
    </>
  );
}
