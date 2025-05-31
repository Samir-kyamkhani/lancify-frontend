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
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto">
        <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 sm:mb-8">
          <FaUsers className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-500" />
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          {searchTerm ? noMatchTitle : noClientsTitle}
        </h3>
        <p className="text-gray-500 mb-6 sm:mb-8 text-base sm:text-lg">
          {searchTerm ? noMatchMessage : noClientsMessage}
        </p>
        {searchTerm ? (
          <button
            onClick={() => setSearchTerm("")}
            className="text-blue-600 hover:text-blue-700 font-medium text-base sm:text-lg"
          >
            {clearSearchText}
          </button>
        ) : (
          <button
            onClick={() => setShowClientModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-base sm:text-lg transition-all duration-200 shadow-md hover:shadow-xl"
          >
            {addClientButtonText}
          </button>
        )}
      </div>
    </div>
  );
}
