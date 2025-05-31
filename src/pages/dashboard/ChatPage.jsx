import React, { useState, useRef } from "react";
import {
  Phone,
  Video,
  Send,
  Star,
  Paperclip,
  ArrowLeft,
  Calendar,
  MoreHorizontal,
  Search,
  Smile,
  Image,
  Mic,
  X,
  Check,
  CheckCheck,
} from "lucide-react";

// Mock contacts data
const contacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "Thanks for the update! Let me know if you need anything else.",
    time: "2m ago",
    avatar: "SJ",
    online: true,
    starred: true,
    unread: 2,
    email: "sarah@company.com",
    phone: "+1 555 123 4567",
    about: "Product Manager at TechCorp. Love hiking and coffee ☕",
  },
  {
    id: 2,
    name: "Mike Chen",
    message: "Can we reschedule our meeting for tomorrow?",
    time: "15m ago",
    avatar: "MC",
    online: false,
    starred: false,
    unread: 0,
    email: "mike@startup.io",
    phone: "+1 555 987 6543",
    about: "Designer & Developer. Always learning something new 🚀",
  },
  {
    id: 3,
    name: "Emma Williams",
    message: "The project looks great! Amazing work on the design.",
    time: "1h ago",
    avatar: "EW",
    online: true,
    starred: true,
    unread: 1,
    email: "emma@design.co",
    phone: "+1 555 456 7890",
    about: "UX Designer passionate about creating beautiful experiences ✨",
  },
  {
    id: 4,
    name: "David Brown",
    message: "Let's discuss the budget in our next call",
    time: "3h ago",
    avatar: "DB",
    online: false,
    starred: false,
    unread: 0,
    email: "david@finance.com",
    phone: "+1 555 321 0987",
    about: "Finance lead with 10+ years experience 📊",
  },
];

// Mock messages
const mockMessages = [
  {
    id: 1,
    text: "Hey! How's the project coming along?",
    sender: "other",
    time: "10:30 AM",
    status: "read",
  },
  {
    id: 2,
    text: "It's going really well! Just finished the main features.",
    sender: "me",
    time: "10:32 AM",
    status: "read",
  },
  {
    id: 3,
    text: "That's awesome! Can we schedule a quick review call?",
    sender: "other",
    time: "10:35 AM",
    status: "read",
  },
  {
    id: 4,
    text: "Sure! How about tomorrow at 2 PM?",
    sender: "me",
    time: "10:36 AM",
    status: "delivered",
  },
  {
    id: 5,
    text: "Perfect! I'll send you the meeting link.",
    sender: "other",
    time: "10:38 AM",
    status: "read",
  },
];

export default function ChatPage() {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [screenSize, setScreenSize] = useState("desktop");
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
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

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-teal-500",
    ];
    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Mobile header when no contact selected */}
      {isMobile && !selectedContact && (
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Contacts Sidebar */}
        <div
          className={`
          ${selectedContact && isMobile ? "hidden" : "flex"}
          ${isMobile ? "w-full" : isTablet ? "w-80" : "w-96"}
          flex-col bg-white border-r border-gray-200
        `}
        >
          {/* Search Header */}
          <div className="p-4 border-b border-gray-100">
            {!isMobile && (
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Messages
              </h2>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`
                  p-4 cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition-colors relative
                  ${
                    selectedContact?.id === contact.id
                      ? "bg-blue-50 border-r-2 border-blue-500"
                      : ""
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm
                      ${getAvatarColor(contact.name)}
                    `}
                    >
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800 text-sm truncate">
                          {contact.name}
                        </h3>
                        {contact.starred && (
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {contact.time}
                        </span>
                        {contact.unread > 0 && (
                          <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {contact.unread}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {contact.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`
          ${!selectedContact && isMobile ? "hidden" : "flex"}
          flex-1 flex-col bg-white
        `}
        >
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isMobile && (
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                  )}

                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setShowProfile(true)}
                  >
                    <div className="relative">
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm
                        ${getAvatarColor(selectedContact.name)}
                      `}
                      >
                        {selectedContact.avatar}
                      </div>
                      {selectedContact.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {selectedContact.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {selectedContact.online
                          ? "Online"
                          : "Last seen recently"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                      max-w-xs sm:max-w-sm lg:max-w-md px-4 py-2.5 rounded-2xl relative
                      ${
                        msg.sender === "me"
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                      }
                    `}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div
                        className={`flex items-center justify-end space-x-1 mt-1 ${
                          msg.sender === "me"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="text-xs">{msg.time}</span>
                        {msg.sender === "me" && (
                          <div className="text-xs">
                            {msg.status === "delivered" ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <CheckCheck className="w-3 h-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <div className="flex items-center space-x-2 mb-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <Image className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <Smile className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="relative">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        style={{ minHeight: "44px", maxHeight: "120px" }}
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`
                      p-3 rounded-full transition-all transform hover:scale-105 active:scale-95
                      ${
                        message.trim()
                          ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }
                    `}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    console.log("File selected:", e.target.files[0])
                  }
                />
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center p-8 absolute">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Welcome to Messages
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Select a conversation from the sidebar to start chatting, or
                  search for someone new to connect with.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Schedule Meeting
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Title
                </label>
                <input
                  type="text"
                  placeholder="Enter meeting title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Add meeting notes or agenda"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Meeting scheduled successfully!");
                    setShowScheduleModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Profile Modal */}
      {showProfile && selectedContact && (
        <div className="fixed px-6 sm:px-0 inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`
            bg-white sm:rounded-2xl
            ${isMobile ? "rounded-3xl" : "rounded-2xl"}
            max-h-[100vh]
          `}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 rounded-t-2xl to-blue-600 p-6 text-white relative">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div
                  className={`
                  w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 ring-4 ring-white/30
                  ${getAvatarColor(selectedContact.name)}
                `}
                >
                  {selectedContact.avatar}
                </div>
                <h2 className="text-2xl font-semibold">
                  {selectedContact.name}
                </h2>
                <p className="text-blue-100 mt-1">
                  {selectedContact.online ? "Online" : "Last seen recently"}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  About
                </h3>
                <p className="text-gray-600">{selectedContact.about}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">@</span>
                    </div>
                    <span className="text-gray-600">
                      {selectedContact.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-600">
                      {selectedContact.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    console.log("Deleting chat with", selectedContact.name);
                    setShowProfile(false);
                  }}
                  className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-medium py-3 rounded-xl transition-colors"
                >
                  Delete Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
