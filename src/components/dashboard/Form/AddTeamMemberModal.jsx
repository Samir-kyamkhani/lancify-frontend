import React, { useState } from "react";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";

export default function AddTeamMemberModal({ onSubmit, onClose, isEdit = false, teamMemberData = {} }) {
  
  const [form, setForm] = useState({
    name: teamMemberData.name || "",
    email: teamMemberData.email || "",
    role: teamMemberData.role || "Member",
    status: teamMemberData.status || "Active",
    password: teamMemberData.password || "",
    permissions: teamMemberData.permissions || {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Pass form data to parent
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-1">
          {isEdit ? "Edit Team Member" : "Add New Team Member"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEdit
            ? "Update the details of the team member."
            : "Enter the details for the new team member."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john.doe@example.com"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />

          <SelectField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={[
              { value: "Admin", label: "Admin" },
              { value: "Member", label: "Member" },
              { value: "Client", label: "Client" },
            ]}
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
          />

          <p className="text-2xl font-bold mb-4">Permissions</p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "All Access",
                "Client Dashbord",
                "Dashboard",
                "Clients",
                "Inbox",
                "Chat",
                "Teams",
                "Projects",
                "Proposals",
                "Payment",
                "Reports",
              ].map((perm) => (
                <label
                  key={perm}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={perm}
                    checked={form.permissions?.[perm] || false}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        permissions: {
                          ...prev.permissions,
                          [perm]: e.target.checked,
                        },
                      }));
                    }}
                    className="accent-blue-500 w-4 h-4"
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <BtnField onClose={onClose} btnName={isEdit ? "Update Team Member" : "Add Team Member"} />
        </form>
      </div>
    </div>
  );
}
