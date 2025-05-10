import React, { useState } from "react";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";
import TextareaField from "../../Ui/TextareaField";

export default function AddProjectModal({ onSubmit, onClose, isEdit = false, projectData = {} }) {
  const [form, setForm] = useState({
    title: projectData.title || "",
    client: projectData.client || "",
    startDate: projectData.startDate || "",
    endDate: projectData.endDate || "",
    status: projectData.status || "Not Started",
    description: projectData.description || "",
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs h-screen flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-1">
          {isEdit ? "Edit Project" : "Add New Project"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEdit ? "Update the project details." : "Enter the details for the new project."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g., Website Redesign"
          />

          <SelectField
            label="Client"
            name="client"
            value={form.client}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Select a client" },
              { value: "client1", label: "Client 1" },
              { value: "client2", label: "Client 2" },
            ]}
          />

          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            placeholder="dd-mm-yyyy"
          />

          <InputField
            label="End Date"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            placeholder="dd-mm-yyyy"
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "Not Started", label: "Not Started" },
              { value: "In Progress", label: "In Progress" },
              { value: "Completed", label: "Completed" },
            ]}
          />

          <TextareaField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional: Brief description of the project..."
          />

          <BtnField onClose={onClose} btnName={isEdit ? "Update Project" : "Add Project"} />
        </form>
      </div>
    </div>
  );
}
