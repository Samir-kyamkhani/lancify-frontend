import { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";
import { motion } from "framer-motion";
import { addClient, editClient } from "../../../slices/clientSlice";
import AutoClearMessage from "../../AutoClearMessage";

export default function AddClientModal({
  onClose,
  isEdit = false,
  clientData = {},
}) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: clientData.name || "",
    email: clientData.email || "",
    phone: clientData.phone || "",
    status: clientData.status || "Lead",
    country: clientData.country || "",
    tags: clientData.tags?.map((tag) => tag.name).join(", ") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    await dispatch(addClient(payload));
    onClose();
  };

  const editHandleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: clientData.id,
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    await dispatch(editClient(payload));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-1">
          {isEdit ? "Edit Client" : "Add New Client"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEdit
            ? "Update the details of the client."
            : "Enter the details for the new client. Fields marked with * are required."}
        </p>
        <AutoClearMessage />

        <form
          onSubmit={isEdit ? editHandleSubmit : handleSubmit}
          className="space-y-5"
        >
          <InputField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Client Company Name"
          />

          <InputField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
          />

          <InputField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="contact@client.com"
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "Lead", label: "Lead" },
              { value: "Completed", label: "Completed" },
              { value: "Active", label: "Active" },
              { value: "OnHold", label: "On Hold" },
            ]}
          />

          <InputField
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="USA, Canada, etc."
          />

          <InputField
            label="Tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Enterprise, Web Dev (comma-separated)"
          />

          <BtnField
            onClose={onClose}
            btnName={isEdit ? "Update Client" : "Add Client"}
          />
        </form>
      </div>
    </div>
  );
}
