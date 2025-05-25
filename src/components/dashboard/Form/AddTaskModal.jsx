import { useEffect, useState } from "react";
import InputField from "../../Ui/InputField";
import BtnField from "../../Ui/BtnField";
import TextareaField from "../../Ui/TextareaField";
import { addTask, editTask } from "../../../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTeamMemders } from "../../../slices/authSlice";
import Select from "react-select";

export default function AddTaskModal({
  onSubmit,
  onClose,
  isEdit = false,
  taskData = {},
  defaultStatus = "todo",
}) {
  const dispatch = useDispatch();
  const { allTeamMembers } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projectData);

  // Prepare options for Select components
  const assigneeOptions =
    allTeamMembers?.map((member) => ({
      value: member.id,
      label: member.name,
      image: member.avatar || `/dummyProfileImg.webp`,
    })) || [];

  const projectOptions =
    projects?.map((project) => ({
      value: project.id,
      label: project.title,
    })) || [];

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: defaultStatus,
    priority: "medium",
    assignee: "",
    project: "",
  });

  useEffect(() => {
    setForm({
      title: taskData.title || "",
      description: taskData.description || "",
      status: taskData.status || defaultStatus,
      priority: taskData.priority || "medium",
      assignee: taskData.userId || "",
      project: taskData.projectId || "",
    });
  }, [taskData, defaultStatus]);

  useEffect(() => {
    dispatch(fetchAllTeamMemders());
  }, [dispatch]);

  // Find selected options objects for React-Select based on form.assignee and form.project
  const selectedAssignee =
    assigneeOptions.find((opt) => opt.value === form.assignee) || null;

  const selectedProject =
    projectOptions.find((opt) => opt.value === form.project) || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssigneeChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      assignee: selectedOption?.value || "",
    }));
  };

  const handleProjectChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      project: selectedOption?.value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(editTask({ id: taskData.id, ...form }));
    } else {
      await dispatch(addTask(form));
    }
    onSubmit && onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-1">
          {isEdit ? "Edit Task" : "Add New Task"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEdit ? "Update the task details." : "Add a new task to the board."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Design login screen"
            required
          />

          <TextareaField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional: Add more details about the task..."
          />

          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 border-gray-200"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1 font-medium">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 border-gray-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Assignee</label>
            <Select
              name="assignee"
              value={selectedAssignee}
              onChange={handleAssigneeChange}
              options={assigneeOptions}
              placeholder="Select team member"
              isClearable
              formatOptionLabel={(option) => (
                <div className="flex items-center space-x-2">
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              )}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Project</label>
            <Select
              name="project"
              value={selectedProject}
              onChange={handleProjectChange}
              options={projectOptions}
              placeholder="Select project"
              isClearable
            />
          </div>

          <BtnField
            onClose={onClose}
            btnName={isEdit ? "Update Task" : "Add Task"}
          />
        </form>
      </div>
    </div>
  );
}
