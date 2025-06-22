import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { tasks } from "../../..";
import { formatDate } from "../../../settings";
import { fetchAllTasks } from "../../../slices/taskSlice";

export default function ProjectDetailedPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projectData);
  const project = projects.find((pr) => pr.id === id);

  const { tasks = [] } = useSelector((state) => state.taskData);

  const dispatch = useDispatch();

  // Fetch all tasks on mount
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const [progress, setProgress] = useState(20);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Project not found.
      </div>
    );
  }

  return (
    <div className="-m-4 min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="  space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-blue-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Back to Projects
        </button>

        {/* Project Details */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-gray-600 mt-2">{project.description}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>{formatDate(project.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>{formatDate(project.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>
                <strong>Progress:</strong> {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-1">Project Tasks</h2>
          <p className="text-sm text-gray-600 mb-4">
            A breakdown of tasks and their current status.
          </p>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex justify-between items-center p-4 rounded-xl transition ${
                  task.completed
                    ? "bg-green-50 text-gray-400 line-through"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                <span className="text-sm">{task.title}</span>
                <span
                  className={`px-3 py-1 text-xs capitalize rounded-full font-semibold ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : task.priority === "low"
                      ? "bg-blue-100 text-blue-600"
                      : task.priority === "critical"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
