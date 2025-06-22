import { useState, useEffect, useMemo } from "react";
import InputField from "../../Ui/InputField";
import BtnField from "../../Ui/BtnField";
import TextareaField from "../../Ui/TextareaField";
import { useDispatch, useSelector } from "react-redux";
import { addProject, editProject } from "../../../slices/projectSlice";
import { fetchAllClients } from "../../../slices/clientSlice";
import Select from "react-select";

const DEFAULT_CLIENT_IMG = "/dummyProfileImg.webp";

// Custom option for client dropdown
const ClientOption = ({ data, innerRef, innerProps }) => (
  <div
    ref={innerRef}
    {...innerProps}
    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
  >
    <img
      src={data.image || DEFAULT_CLIENT_IMG}
      alt={data.label}
      className="w-6 h-6 rounded-full object-cover mr-3"
    />
    <span>{data.label}</span>
  </div>
);

// Custom selected client display
const ClientSingleValue = ({ data, ...props }) => (
  <div className="flex items-center" {...props.innerProps}>
    <img
      src={data.image || DEFAULT_CLIENT_IMG}
      alt={data.label}
      className="w-8 h-8 rounded-full object-cover mr-2"
    />
    <span>{data.label}</span>
  </div>
);

export default function AddProjectModal({
  onSubmit,
  onClose,
  isEdit = false,
  projectData = {},
}) {
  const dispatch = useDispatch();
  const { clients = [] } = useSelector((state) => state.clientData || {});

  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);

  const clientOptions = useMemo(() => {
    return clients?.map((client) => ({
      value: client?.id,
      label: client?.name,
      image: client?.image || DEFAULT_CLIENT_IMG,
    }));
  }, [clients]);

  const [form, setForm] = useState({
    title: projectData?.title || "",
    client: null,
    startDate: projectData?.startDate
      ? new Date(projectData?.startDate).toISOString().split("T")[0]
      : "",
    endDate: projectData?.endDate
      ? new Date(projectData?.endDate).toISOString().split("T")[0]
      : "",
    status: projectData?.status || "not_started",
    description: projectData?.description || "",
  });

  const [showClientSelect, setShowClientSelect] = useState(true);

  useEffect(() => {
    if (isEdit && clients.length && projectData && projectData.client) {
      const clientId =
        typeof projectData.client === "object"
          ? projectData.client.id
          : projectData.client;

      const matchedClient = clientOptions.find((opt) => opt.value === clientId);

      setForm((prev) => ({ ...prev, client: matchedClient || null }));

      if (matchedClient) {
        setShowClientSelect(false); // hide if prefilled
      }
    }
  }, [clients, clientOptions, isEdit, projectData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (selectedOption) => {
    setForm((prev) => ({ ...prev, client: selectedOption }));
    if (selectedOption) {
      setShowClientSelect(false); // hide after selection
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.client) {
      alert("Please select a client");
      return;
    }

    const submitData = {
      ...form,
      client: form?.client.value,
    };

    await dispatch(addProject(submitData));
    onSubmit(submitData);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!form.client) {
      alert("Please select a client");
      return;
    }

    const submitData = {
      ...form,
      client: form?.client?.value,
      id: projectData?.id,
    };

    // Dispatch update action
    await dispatch(editProject(submitData));

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs h-screen flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-1">
          {isEdit ? "Edit Project" : "Add New Project"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEdit
            ? "Update the project details."
            : "Enter the details for the new project."}
        </p>

        <form
          onSubmit={isEdit ? handleEditSubmit : handleSubmit}
          className="space-y-6"
        >
          <InputField
            label="Title"
            name="title"
            value={form?.title}
            onChange={handleChange}
            required
            placeholder="e.g., Website Redesign"
          />

          <label className="block text-gray-700 font-semibold mb-1">
            Client
          </label>

          {showClientSelect ? (
            <Select
              options={clientOptions}
              value={form?.client}
              onChange={handleClientChange}
              placeholder="Select a client"
              components={{
                Option: ClientOption,
                SingleValue: ClientSingleValue,
              }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#f3f4f6",
                  borderColor: "#e5e7eb",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#d1d5db",
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                }),
              }}
              isClearable
            />
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
              <img
                src={form?.client?.image || DEFAULT_CLIENT_IMG}
                alt={form?.client?.label}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700 font-medium">
                {form?.client?.label}
              </span>
              <button
                type="button"
                onClick={() => {
                  setForm((prev) => ({ ...prev, client: null }));
                  setShowClientSelect(true);
                }}
                className="text-sm text-blue-500 hover:underline ml-auto"
              >
                Change
              </button>
            </div>
          )}

          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={form?.startDate}
            onChange={handleChange}
            required
          />

          <InputField
            label="End Date"
            name="endDate"
            type="date"
            value={form?.endDate}
            onChange={handleChange}
            required
          />

          <label className="block text-gray-700 font-semibold mb-1">
            Status
          </label>
          <Select
            options={[
              { value: "not_started", label: "Not Started" },
              { value: "in_progress", label: "In Progress" },
              { value: "cancelled", label: "Cancelled" },
              { value: "completed", label: "Completed" },
            ]}
            value={{
              value: form.status,
              label:
                form.status
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase()) || "",
            }}
            onChange={(option) =>
              setForm((prev) => ({ ...prev, status: option.value }))
            }
          />

          <TextareaField
            label="Description"
            name="description"
            value={form?.description}
            onChange={handleChange}
            placeholder="Optional: Brief description of the project..."
          />

          <BtnField
            onClose={onClose}
            btnName={isEdit ? "Update Project" : "Add Project"}
          />
        </form>
      </div>
    </div>
  );
}
