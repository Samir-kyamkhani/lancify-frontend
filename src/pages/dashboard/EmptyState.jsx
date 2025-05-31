import { FaUsers } from "react-icons/fa";

export default function EmptyState({
  searchTerm,
  setSearchTerm,
  setShowClientModal,
  noClientsTitle,
  noClientsMessage,
  noMatchTitle,
  noMatchMessage,
  addClientButtonText,
  clearSearchText,
}) {

  console.log();
  
  return (
    <div className="p-16">
      <div className="text-center">
        <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-8">
          <FaUsers className="w-16 h-16 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {searchTerm ? noMatchTitle : noClientsTitle}
        </h3>
        <p className="text-gray-500 mb-8 text-lg">
          {searchTerm ? noMatchMessage : noClientsMessage}
        </p>
        {searchTerm ? (
          <button
            onClick={() => setSearchTerm("")}
            className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium text-lg"
          >
            {clearSearchText}
          </button>
        ) : (
          <button
            onClick={() => setShowClientModal(true)}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {addClientButtonText}
          </button>
        )}
      </div>
    </div>
  );
}
