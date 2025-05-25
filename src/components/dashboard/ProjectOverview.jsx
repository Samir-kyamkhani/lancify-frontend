import { FaEdit, FaTrash } from "react-icons/fa";
import AddProjectModal from "./Form/AddProjectModal";
import { useEffect, useState } from "react";
import { projectStatusStyles } from "../../index.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects, deleteProject } from "../../slices/projectSlice";

export default function ProjectOverview() {
  const [editProjectModal, setEditProjectModal] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(
    (state) => state.projectData
  );

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleEditProject = (project) => {
    setEditProjectModal(project);
    setShowProjectModal(true);
  };

  const handleDeleteProject = (projectId) => {
    setProjectToDelete(projectId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProject = async () => {
    try {
      await dispatch(deleteProject(projectToDelete));
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const closeModal = () => {
    setShowProjectModal(false);
    setEditProjectModal(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-white text-black rounded-md shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Project Overview</h2>
      <p className="text-gray-600 mb-4">Summary of all your projects.</p>

      {loading && (
        <p className="text-center text-gray-500">Loading projects...</p>
      )}

      {error && (
        <p className="text-center text-red-500">
          Error loading projects: {error}
        </p>
      )}

      {!loading && projects?.length === 0 && (
        <p className="text-center text-gray-500">No projects found.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">
                Client: {project.client?.name}
              </p>

              {/* Status with priority style */}
              <span
                className={`inline-block mt-2 mr-2 px-3 py-1 rounded-full text-sm font-medium ${
                  projectStatusStyles[project.status] ||
                  "bg-gray-200 text-gray-700"
                }`}
              >
                {(project.status === "in_progress" && "In Progress") ||
                  (project.status === "not_started" && "Not Started") ||
                  (project.status === "cancelled" && "Cancelled") ||
                  (project.status === "completed" && "Completed") ||
                  "Unknown Status"}
              </span>

              <p className="mt-3 text-sm">{project.description}</p>
            </div>

            {project.start && project.end && (
              <p className="mt-3 text-xs text-gray-500">
                Start: {project.start} | End: {project.end}
              </p>
            )}

            <div className="flex justify-end space-x-3 mt-4">
              <button
                aria-label={`Edit project ${project.title}`}
                onClick={() => handleEditProject(project)}
                className="focus:outline-none cursor-pointer"
              >
                <FaEdit className="w-4 h-4 text-blue-600 hover:scale-110 transition" />
              </button>
              <button
                aria-label={`Delete project ${project.title}`}
                onClick={() => handleDeleteProject(project.id)}
                className="focus:outline-none cursor-pointer"
              >
                <FaTrash className="w-4 h-4 text-red-500 hover:scale-110 transition" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {showProjectModal && (
        <AddProjectModal
          isEdit={Boolean(editProjectModal)}
          projectData={editProjectModal}
          onSubmit={(data) => {
            console.log("Project submitted:", data);
            closeModal();
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
