import { FaEdit, FaTrash } from "react-icons/fa";
import AddProjectModal from "./Form/AddProjectModal";
import { useState } from "react";
import { priorityStyles, projectsData } from "../..";

export default function ProjectOverview() {
  const [editProjectModal, setEditProjectModal] = useState(null); // 🆕
  const [showProjectModal, setShowProjectModal] = useState(false);

  const handleEditClient = (project) => {
    setEditProjectModal(project);
    setShowProjectModal(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-white text-black rounded-md shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Project Overview</h2>
      <p className="text-gray-600 mb-4">Summary of all your projects.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">Client: {project.client}</p>

              {/* Status */}
              <span
                className={`inline-block mt-2 mr-2 px-3 py-1 rounded-full text-sm font-medium  ${
                  priorityStyles[project.priority]
                }`}
              >
                {project.status}
              </span>

              <p className="mt-3 text-sm">{project.description}</p>
            </div>

            {project.start && project.end && (
              <p className="mt-3 text-xs text-gray-500">
                Start: {project.start} | End: {project.end}
              </p>
            )}

            <div className="flex justify-end space-x-3 mt-4">
              <button onClick={() => handleEditClient(project)}>
                <FaEdit className="w-4 h-4 text-blue-600 hover:scale-110 transition" />
              </button>
              <button>
                <FaTrash className="w-4 h-4 text-red-500 hover:scale-110 transition" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Client Modal */}
      {showProjectModal && (
        <AddProjectModal
          isEdit={true}
          projectData={editProjectModal}
          onSubmit={(data) => {
            console.log("Client submitted:", data);
            setShowProjectModal(false);
            setEditProjectModal(null);
          }}
          onClose={() => {
            setShowProjectModal(false);
            setEditProjectModal(null);
          }}
        />
      )}
    </div>
  );
}
