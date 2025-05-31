import { FolderKanban, CheckCircle2, Loader2, PauseCircle } from "lucide-react";

import { FaEdit, FaTrash } from "react-icons/fa";
import AddProjectModal from "./Form/AddProjectModal";
import { useEffect, useMemo, useState } from "react";
import { projectStatusStyles } from "../../index.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects, deleteProject } from "../../slices/projectSlice";
import { StatsCard } from "./StatsCard.jsx";
import HeaderSection from "./HeaderSection.jsx";
import EmptyState from "../../pages/dashboard/EmptyState.jsx";
import DeleteConfirmModal from "../DeleteConfirmModal.jsx";

export default function ProjectOverview() {
  const [editProjectModal, setEditProjectModal] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectDelete, setProjectDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

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

  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const normalizedSearch = String(searchTerm || "").toLowerCase();

      const filtered = projects.filter((project) => {
        const matchesSearch =
          project.title?.toLowerCase().includes(normalizedSearch) ||
          project.status?.toLowerCase().includes(normalizedSearch);

        return matchesSearch;
      });

      setFilteredProjects(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, projects]);

  const handleDeleteTeam = (projectId) => {
    setProjectDelete(projectId);
    setShowDeleteConfirm(true);
    setMenuIndex(null);
  };

  const confirmDelete = () => {
    if (projectDelete) {
      dispatch(deleteProject(projectDelete));
      setShowDeleteConfirm(false);
      setProjectDelete(null);
    }
  };

  const closeModal = () => {
    setShowProjectModal(false);
    setEditProjectModal(null);
  };

  const statsData = useMemo(() => {
    const count = (status) =>
      projects.filter((c) => c.status === status).length;
    return {
      total: projects.length,
      completed: count("completed"),
      inProgress: count("in_progress"),
      not_started: count("not_started"),
    };
  }, [projects]);

  const stats = [
    {
      title: "Total Projects",
      value: statsData.total,
      color: "text-blue-600",
      icon: FolderKanban,
    },
    {
      title: "Completed",
      value: statsData.completed,
      color: "text-green-600",
      icon: CheckCircle2,
    },
    {
      title: "In Progress",
      value: statsData.inProgress,
      color: "text-orange-600",
      icon: Loader2,
    },
    {
      title: "Not Started",
      value: statsData.not_started,
      color: "text-purple-600",
      icon: PauseCircle,
    },
  ];

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
        <HeaderSection
          title="Project Overview"
          subtitle="Summary of all your projects"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          // filterStatus={filterStatus}
          // setFilterStatus={setFilterStatus}
          // viewMode={viewMode}
          // setViewMode={setViewMode}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
          {stats.map((stat, i) => (
            <StatsCard
              key={i}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>
        {filteredProjects?.length == 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowClientModal={setShowProjectModal}
            noClientsTitle="No project yet"
            noClientsMessage="Get started by adding your first project."
            noMatchTitle="No project found"
            noMatchMessage="No project match your search criteria. Try adjusting your search."
            addClientButtonText="Add Your First Project"
            clearSearchText="Clear search"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {filteredProjects?.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50/5 backdrop-blur-lg rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-y-3.5 lg:gap-y-0 justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Client: {project.client?.name}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`lg:ml-auto px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      projectStatusStyles[project.status] ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {(project.status === "in_progress" && "In Progress") ||
                      (project.status === "not_started" && "Not Started") ||
                      (project.status === "cancelled" && "Cancelled") ||
                      (project.status === "completed" && "Completed") ||
                      "Unknown"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600">{project.description}</p>

                {/* Dates */}
                {project.startDate && project.endDate && (
                  <p className="text-xs text-gray-400">
                    <span className="font-medium text-gray-500">Start:</span>{" "}
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    &nbsp;|&nbsp;
                    <span className="font-medium text-gray-500">End:</span>{" "}
                    {new Date(project.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 cursor-pointer rounded-full hover:bg-blue-100 transition"
                    aria-label={`Edit project ${project.title}`}
                  >
                    <FaEdit className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(project.id)}
                    className="p-2 cursor-pointer rounded-full hover:bg-red-100 transition"
                    aria-label={`Delete project ${project.title}`}
                  >
                    <FaTrash className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          show={showDeleteConfirm}
          setShow={setShowDeleteConfirm}
          onConfirm={confirmDelete}
        />
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
    </>
  );
}
