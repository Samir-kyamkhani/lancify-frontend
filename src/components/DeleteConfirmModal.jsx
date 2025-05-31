import { FaTrash } from "react-icons/fa";

export default function DeleteConfirmModal({
  show,
  setShow,
  onConfirm,
  title = "Delete Client",
  message = "Are you sure you want to delete this client? This action cannot be undone and all associated data will be permanently removed.",
  cancelText = "Cancel",
  confirmText = "Delete",
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTrash className="w-10 h-10 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 mb-8 text-lg">{message}</p>

          <div className="flex gap-4">
            <button
              onClick={() => setShow(false)}
              className="flex-1 cursor-pointer px-6 py-4 border-2 border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-4 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-colors shadow-lg hover:shadow-xl"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
