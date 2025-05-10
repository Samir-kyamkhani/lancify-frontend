import React from "react";

function BtnField({ btnName, onClose }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-end gap-4 sm:gap-2 mt-6">
      <button
        type="button"
        onClick={onClose}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {btnName}
      </button>
    </div>
  );
}

export default BtnField;
