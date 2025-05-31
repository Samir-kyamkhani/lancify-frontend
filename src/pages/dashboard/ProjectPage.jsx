import { useEffect, useState } from "react";
import HeaderSection from "../../components/dashboard/HeaderSection";
import ProjectOverview from "../../components/dashboard/ProjectOverview";
import AddTaskModal from "../../components/dashboard/Form/AddTaskModal";
import TaskColumn from "../../components/dashboard/TaskColumn";
import { BsPlus } from "react-icons/bs";
import { getUserRole } from "../../settings";
import UserProjectPage from "../clientDashboard/UserProjectPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../../slices/taskSlice";
import EmptyState from "./EmptyState";

function formatTitle(status) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ProjectPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState("todo");

  const role = getUserRole();
  const dispatch = useDispatch();

  const { tasks = [] } = useSelector((state) => state.taskData);
  const [columns, setColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch all tasks on mount
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const normalizedSearch = String(searchTerm || "").toLowerCase();

      const filtered = columns.filter((project) => {
        const matchesSearch =
          project.title?.toLowerCase().includes(normalizedSearch) ||
          project.tasks?.some(
            (task) =>
              task.status?.toLowerCase().includes(normalizedSearch) ||
              task.user?.name?.toLowerCase().includes(normalizedSearch) ||
              task.project?.title?.toLowerCase().includes(normalizedSearch)
          );

        return matchesSearch;
      });

      setFilteredTasks(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, columns]);

  useEffect(() => {
    const uniqueStatuses = [
      ...new Set(tasks.map((task) => task.status.toLowerCase())),
    ];

    const updatedColumns = uniqueStatuses.map((status) => ({
      title: formatTitle(status),
      statusKey: status,
      tasks: tasks.filter((task) => task.status.toLowerCase() === status),
    }));

    setColumns(updatedColumns);
  }, [tasks]);

  const handleAddClick = (statusKey = "todo") => {
    setCurrentColumn(statusKey);
    setShowModal(true);
  };

  const handleAddTask = (taskData) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.statusKey === taskData.status.toLowerCase()
          ? { ...col, tasks: [...col.tasks, taskData] }
          : col
      )
    );
    setShowModal(false);
  };

  return (
    <>
      {role === "admin" && (
        <>
          <ProjectOverview />
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
            <HeaderSection
              title="Task Board"
              subtitle="Assign the task your teams"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              // filterStatus={filterStatus}
              // setFilterStatus={setFilterStatus}
              // viewMode={viewMode}
              // setViewMode={setViewMode}
            />
            {filteredTasks.length == 0 ? (
              <EmptyState
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setShowClientModal={setShowModal}
                noClientsTitle="No tasks yet"
                noClientsMessage="Get started by adding your first tasks."
                noMatchTitle="No project found"
                noMatchMessage="No tasks match your search criteria. Try adjusting your search."
                addClientButtonText="Add Your First Task"
                clearSearchText="Clear search"
              />
            ) : (
              <div className="flex gap-6 min-w-full sm:gap-10 flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-start overflow-auto">
                {filteredTasks.map((col, idx) => (
                  <TaskColumn
                    key={idx}
                    title={col.title}
                    tasks={col.tasks}
                    onAddTask={() => handleAddClick(col.statusKey)}
                  />
                ))}
              </div>
            )}
          </div>
          {showModal && (
            <AddTaskModal
              defaultStatus={currentColumn}
              onSubmit={handleAddTask}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
      {role === "user" && <UserProjectPage />}
    </>
  );
}
