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

  // Fetch all tasks on mount
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

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
    <div className="max-w-7xl mx-auto space-y-6">
      {role === "admin" && (
        <>
          <HeaderSection />
          <ProjectOverview />

          <div className="bg-white py-6 px-4 rounded-lg shadow overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Task Board
              </h2>
              <button
                onClick={() => handleAddClick("todo")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <BsPlus /> Add Task
              </button>
            </div>

            <div className="flex gap-6 min-w-full sm:gap-10 flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-start">
              {columns.map((col, idx) => (
                <TaskColumn
                  key={idx}
                  title={col.title}
                  tasks={col.tasks}
                  onAddTask={() => handleAddClick(col.statusKey)}
                />
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
        </>
      )}
      {role === "user" && <UserProjectPage />}
    </div>
  );
}
