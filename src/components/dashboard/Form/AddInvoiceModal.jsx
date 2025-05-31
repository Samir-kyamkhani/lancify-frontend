import React, { useState, useEffect } from "react";
import InputField from "../../Ui/InputField";
import BtnField from "../../Ui/BtnField";
import Select from "react-select";
import { fetchAllClients } from "../../../slices/clientSlice";
import { fetchAllProjects } from "../../../slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../../Ui/SelectField";
import { addInvoice, editInvoice } from "../../../slices/paymentSlice";

const DEFAULT_CLIENT_IMG = "/dummyProfileImg.webp";

export default function AddInvoiceModal({
  onSubmit,
  onClose,
  isEdit = false,
  invoiceData = {},
}) {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clientData);
  const { projects } = useSelector((state) => state.projectData);

  const [showClientSelect, setShowClientSelect] = useState(true);
  const [showProjectSelect, setShowProjectSelect] = useState(true);

  // Debug load
  useEffect(() => {
    dispatch(fetchAllClients());
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.name,
    image: client.image || DEFAULT_CLIENT_IMG,
    address: client.address || "",
  }));

  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: `${project.title} / ${project.client?.name || ""}`,
  }));

  const [form, setForm] = useState({
    invid:
      invoiceData?.invid || `INV-${Math.floor(10000 + Math.random() * 90000)}`,
    client: null,
    project: null,
    clientAddress: "",
    amount: parseFloat(invoiceData?.amount) || "",
    discount: parseFloat(invoiceData?.discount) || "",
    issueDate:
      invoiceData?.issueDate?.slice(0, 10) ||
      new Date().toISOString().slice(0, 10),
    dueDate: invoiceData?.dueDate?.slice(0, 10) || "",
    notes: invoiceData?.notes || "",
    paymentGateway: invoiceData?.paymentGateway || "",
  });

  // Sync default client/project from invoiceData after data loads
  useEffect(() => {
    if (clients.length && invoiceData?.clientId) {
      const defaultClient = clientOptions.find(
        (c) => String(c.value) === String(invoiceData?.clientId)
      );
      if (defaultClient) {
        setForm((prev) => ({
          ...prev,
          client: defaultClient,
          clientAddress: defaultClient?.address,
        }));
        setShowClientSelect(false);
      }
    }

    if (projects.length && invoiceData?.projectId) {
      const defaultProject = projectOptions.find(
        (p) => String(p.value) === String(invoiceData?.projectId)
      );
      if (defaultProject) {
        setForm((prev) => ({
          ...prev,
          project: defaultProject,
        }));
        setShowProjectSelect(false);
      }
    }
  }, [clients, projects, invoiceData]);

  const handleClientChange = (selectedOption) => {
    if (selectedOption) {
      setForm((prev) => ({
        ...prev,
        client: selectedOption,
        clientAddress: selectedOption.address || "",
      }));
      setShowClientSelect(false);
    } else {
      setForm((prev) => ({ ...prev, client: null }));
      setShowClientSelect(true);
    }
  };

  const handleProjectChange = (selectedOption) => {
    if (selectedOption) {
      setForm((prev) => ({
        ...prev,
        project: selectedOption,
      }));
      setShowProjectSelect(false);
    } else {
      setForm((prev) => ({ ...prev, project: null }));
      setShowProjectSelect(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["amount", "discount"];
    const parsedValue = numericFields.includes(name)
      ? parseFloat(value) || 0
      : value;
    setForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clients.length || !projects.length) {
      alert("Client and Project data not yet loaded.");
      return;
    }

    const selectedClient =
      form.client &&
      clients.find((c) => String(c.id) === String(form.client.value));
    const selectedProject =
      form.project &&
      projects.find((p) => String(p.id) === String(form.project.value));

    const payload = {
      ...form,
      clientId: form.client?.value || invoiceData.clientId,
      projectId: form.project?.value || invoiceData.projectId,
      client: selectedClient || null,
      project: selectedProject || null,
    };

    if (isEdit) {
      dispatch(editInvoice({ id: invoiceData.id, ...payload }));
    } else {
      dispatch(addInvoice(payload));
    }

    onClose();
  };

  const ClientOption = ({ data, innerRef, innerProps }) => (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
    >
      <img
        src={data.image}
        alt={data.label}
        className="w-8 h-8 rounded-full mr-2 object-cover"
      />
      <span>{data.label}</span>
    </div>
  );

  const ClientSingleValue = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center">
      <img
        src={data.image}
        alt={data.label}
        className="w-6 h-6 rounded-full mr-2 object-cover"
      />
      <span>{data.label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-1">
          {isEdit ? "Edit Invoice" : "Create New Invoice"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEdit
            ? "Update the invoice details."
            : "Enter the details for the new invoice."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Invoice ID"
            name="invid"
            value={form.invid}
            disabled
            readOnly
          />

          {/* Client Select */}
          <label className="block mb-1 font-medium">Client</label>
          {showClientSelect ? (
            <Select
              options={clientOptions}
              value={form.client}
              onChange={handleClientChange}
              placeholder="Select a client"
              components={{
                Option: ClientOption,
                SingleValue: ClientSingleValue,
              }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: "#e5e7eb",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#d1d5db" },
                }),
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              isClearable
            />
          ) : (
            <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-md">
              <img
                src={form.client?.image || DEFAULT_CLIENT_IMG}
                alt={form.client?.label || ""}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700 font-medium">
                {form.client?.label || ""}
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

          {/* Project Select */}
          <label className="block mb-1 font-medium">Project</label>
          {showProjectSelect ? (
            <Select
              options={projectOptions}
              value={form.project}
              onChange={handleProjectChange}
              placeholder="Select a project"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: "#e5e7eb",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#d1d5db" },
                }),
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              isClearable
            />
          ) : (
            <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-md">
              <span className="text-gray-700 font-medium">
                {form.project?.label || ""}
              </span>
              <button
                type="button"
                onClick={() => {
                  setForm((prev) => ({ ...prev, project: null }));
                  setShowProjectSelect(true);
                }}
                className="text-sm text-blue-500 hover:underline ml-auto"
              >
                Change
              </button>
            </div>
          )}

          <InputField
            label="Client Address"
            name="clientAddress"
            value={form.clientAddress}
            onChange={handleChange}
            placeholder="e.g., 123 Main Street, NY"
          />

          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-6 sm:space-y-0">
            <InputField
              label="Amount ($)"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full sm:w-1/2"
            />
            <InputField
              label="Discount (%)"
              name="discount"
              type="number"
              value={form.discount}
              onChange={handleChange}
              className="w-full sm:w-1/2"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-6 sm:space-y-0">
            <InputField
              label="Issue Date"
              name="issueDate"
              type="date"
              value={form.issueDate}
              onChange={handleChange}
              required
              className="w-full sm:w-1/2"
            />
            <InputField
              label="Due Date"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              required
              className="w-full sm:w-1/2"
            />
          </div>

          <SelectField
            label="Payment Gateway"
            name="paymentGateway"
            value={form.paymentGateway}
            onChange={handleChange}
            options={[
              { value: "razorpay", label: "Razorpay" },
              { value: "paypal", label: "PayPal" },
            ]}
          />

          <label className="block mb-1 font-medium mt-4">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add any internal notes or payment terms for the client..."
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <BtnField
            onClose={onClose}
            btnName={isEdit ? "Update Invoice" : "Create Invoice"}
          />
        </form>
      </div>
    </div>
  );
}
