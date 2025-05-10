import React, { useState } from "react";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";
import TextareaField from "../../Ui/TextareaField";

export default function AddTaskModal({
  onSubmit,
  onClose,
  isEdit = false,
  taskData = {},
  defaultStatus = "Todo",
}) {
  const [form, setForm] = useState({
    title: taskData.title || "",
    description: taskData.description || "",
    status: taskData.status || defaultStatus,
    priority: taskData.priority || "Medium",
    assignee: taskData.assignee || "",
    project: taskData.project || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
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
            <SelectField
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { value: "Todo", label: "Todo" },
                { value: "InProgress", label: "In Progress" },
                { value: "Done", label: "Done" },
              ]}
              className="w-full sm:w-1/2"
            />
            <SelectField
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
              className="w-full sm:w-1/2"
            />
          </div>

          <SelectField
            label="Assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            options={[
              { value: "", label: "Unassigned" },
              { value: "https://i.pravatar.cc/40?u=user1", label: "John Doe" },
              { value: "https://i.pravatar.cc/40?u=user2", label: "Jane Smith" },
            ]}
          />

          <SelectField
            label="Project"
            name="project"
            value={form.project}
            onChange={handleChange}
            options={[
              { value: "", label: "Select a project" },
              { value: "project1", label: "Website Redesign" },
              { value: "project2", label: "Marketing Campaign" },
            ]}
          />

          <BtnField onClose={onClose} btnName={isEdit ? "Update Task" : "Add Task"} />
        </form>
      </div>
    </div>
  );
}
