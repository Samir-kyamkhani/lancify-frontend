import React, { useEffect, useState } from "react";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";
import { useDispatch } from "react-redux";
import { addTeamMember, editTeamMember } from "../../../slices/authSlice"; // assuming you have update action
import axios from "axios";
import { baseURL } from "../../../baseURL";

export default function AddTeamMemberModal({
  onSubmit,
  onClose,
  isEdit = false,
  teamMemberData = {},
}) {
  const [form, setForm] = useState({
    name: teamMemberData?.name || "",
    email: teamMemberData?.email || "",
    role: teamMemberData?.role || "Member",
    status: teamMemberData?.status || "Active",
    password: "",
    permissions: Array.isArray(teamMemberData?.permissions)
      ? teamMemberData?.permissions.map(String)
      : [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axios.get(`${baseURL}/auth`);
        const permissionsFromAPI = res.data?.data || [];
        const cleanPermissions = permissionsFromAPI
          .map((perm) =>
            typeof perm === "object" && perm?.name ? perm?.name : String(perm)
          )
          .filter(Boolean);
        setPermissionOptions(cleanPermissions);
      } catch (err) {
        console.error("Error fetching permissions:", err);
        setPermissionOptions([]);
      }
    };
    fetchPermissions();
  }, []);

  const [permissionOptions, setPermissionOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await dispatch(editTeamMember({ id: teamMemberData.id, ...form }));
      } else {
        await dispatch(addTeamMember(form));
      }
      onClose();
    } catch (err) {
      console.error("Failed to submit team member:", err);
    }
  };

  const togglePermission = (perm, checked) => {
    setForm((prev) => {
      if (perm === "All Access") {
        return {
          ...prev,
          permissions: checked ? [...permissionOptions] : [],
        };
      } else {
        let updated = checked
          ? [...prev.permissions, perm]
          : prev.permissions.filter((p) => p !== perm);

        // If all individual permissions are selected, include All Access
        const allSelected =
          updated.length === permissionOptions.length &&
          permissionOptions.includes("All Access")
            ? true
            : updated.length === permissionOptions.length - 1;

        return {
          ...prev,
          permissions: allSelected
            ? [...permissionOptions]
            : updated.filter((p) => p !== "All Access"),
        };
      }
    });
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
            placeholder="Team Member/Client Name"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            readOnly={isEdit}
            required
            placeholder="your@example.com"
          />

          {!isEdit && (
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          )}

          <SelectField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={[
              { value: "admin", label: "Admin" },
              { value: "member", label: "Member" },
              { value: "user", label: "Client" },
            ]}
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />

          {form.role === "member" && (
            <>
              <p className="text-2xl font-bold mb-4">Permissions</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {permissionOptions.map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={perm}
                        checked={form.permissions.includes(perm)}
                        onChange={(e) =>
                          togglePermission(perm, e.target.checked)
                        }
                        className="accent-blue-500 w-4 h-4"
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <BtnField
            onClose={onClose}
            btnName={isEdit ? "Update Team Member" : "Add Team Member"}
          />
        </form>
      </div>
    </div>
  );
}
