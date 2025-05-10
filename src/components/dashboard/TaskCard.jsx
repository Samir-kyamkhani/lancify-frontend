import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddTaskModal from "./Form/AddTaskModal";
import { priorityStyles } from "../..";

export default function TaskCard({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleEditClient = () => {
    setEditTaskModal(data);
    setShowTaskModal(true);
    setMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition relative">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{data.title}</h4>
          <p className="text-xs text-gray-500 mt-1">{data.description}</p>
        </div>
        <BsThreeDotsVertical
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-400 cursor-pointer"
        />
      </div>

      {menuOpen && (
        <div className="absolute right-4 top-10 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 text-sm overflow-hidden">
          <ul className="divide-y divide-gray-100">
            <li
              onClick={handleEditClient}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              <FaEdit className="mr-3 text-gray-600" /> Edit
            </li>
            <li
              onClick={() => {
                alert(`Remove: ${data.title}`);
                setMenuOpen(false);
              }}
              className="flex items-center px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
            >
              <FaTrash className="mr-3" /> Remove
            </li>
          </ul>
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            priorityStyles[data.priority] || ""
          }`}
        >
          {data.priority}
        </span>
      </div>

      {showTaskModal && (
        <AddTaskModal
          isEdit={true}
          taskData={editTaskModal}
          onSubmit={(formData) => {
            console.log("Client submitted:", formData);
            setShowTaskModal(false);
            setEditTaskModal(null);
          }}
          onClose={() => {
            setShowTaskModal(false);
            setEditTaskModal(null);
          }}
        />
      )}
    </div>
  );
}
