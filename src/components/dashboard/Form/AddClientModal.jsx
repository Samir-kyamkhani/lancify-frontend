import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";
import {
  addClient,
  editClient,
  clearMessages,
} from "../../../slices/clientSlice";

export default function AddClientModal({
  onClose,
  isEdit = false,
  clientData = {},
}) {
  const dispatch = useDispatch();

  // Redux state for error & success
  const { error: clientError, success: clientSuccess } = useSelector(
    (state) => state.clientData
  );

  // Local form state
  const [form, setForm] = useState({
    name: clientData?.name || "",
    company: clientData?.company || "",
    email: clientData?.email || "",
    password: clientData?.password_hash || "",
    phone: clientData?.phone || "",
    status: clientData?.status || "Lead",
    country: clientData?.country || "",
    tags: clientData?.tags?.map((tag) => tag.name).join(", ") || "",
  });

  // Local error state (for display inside form)
  const [localError, setLocalError] = useState(null);

  // Clear messages on unmount or on modal close
  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  // If success happens (client added/edited), close the modal automatically
  useEffect(() => {
    if (clientSuccess) {
      onClose();
    }
  }, [clientSuccess, onClose]);

  // Sync Redux error to local error for display
  useEffect(() => {
    setLocalError(clientError);
  }, [clientError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear local error on input change to give fresh start
    if (localError) setLocalError(null);
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

    // Dispatch addClient; closing will be handled by useEffect on success
    dispatch(addClient(payload));
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

    dispatch(editClient(payload));
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

        {/* Show error from local state */}
        {localError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {localError}
          </div>
        )}

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
            placeholder="Client Name"
          />
          <InputField
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            placeholder="Company Name"
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

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Please Enter password"
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
