import React, { useState } from "react";
import HeaderSection from "../../components/dashboard/HeaderSection";
import ProjectOverview from "../../components/dashboard/ProjectOverview";
import AddTaskModal from "../../components/dashboard/Form/AddTaskModal";
import { initialColumns } from "../../index";
import TaskColumn from "../../components/dashboard/TaskColumn";
import { BsPlus } from "react-icons/bs";

export default function ProjectPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [showModal, setShowModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState("Todo");

  const handleAddClick = (columnTitle = "Todo") => {
    setCurrentColumn(columnTitle);
    setShowModal(true);
  };

  const handleAddTask = (taskData) => {
    const updatedColumns = columns.map((col) =>
      col.title === taskData.status
        ? { ...col, tasks: [...col.tasks, taskData] }
        : col
    );
    setColumns(updatedColumns);
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <HeaderSection />
      <ProjectOverview />

      <div className="bg-white py-6 px-4 rounded-lg shadow overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Task Board</h2>
          <button
            onClick={() => handleAddClick("Todo")}
            className="flex items-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <BsPlus /> Add Task
          </button>
        </div>

        <div className="flex gap-6 min-w-full sm:gap-10">
          {columns.map((col, idx) => (
            <TaskColumn key={idx} {...col} onAddTask={() => handleAddClick(col.title)} />
          ))}
        </div>
      </div>

      {showModal && (
        <AddTaskModal
          defaultStatus={currentColumn}
          onSubmit={handleAddTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
