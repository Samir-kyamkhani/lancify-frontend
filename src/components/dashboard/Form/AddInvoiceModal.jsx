import React, { useState } from "react";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";

export default function AddInvoiceModal({ onSubmit, onClose, isEdit = false, invoiceData = {} }) {
  console.log(invoiceData);

  const clientData = invoiceData.client || {};
  const itemData = Array.isArray(invoiceData.items) && invoiceData.items.length > 0 ? invoiceData.items[0] : {};

  const [form, setForm] = useState({
    invoiceId: invoiceData.invoiceId || "INV-34817", // Can be auto-generated or passed if editing
    client: clientData.name || "",
    clientAddress: clientData.address || "",
    projectName: itemData.name || "",
    amount: invoiceData.amount || "1000.00",
    discount: itemData.discount || "0",
    issueDate: invoiceData.issueDate || new Date().toISOString().slice(0, 10),
    dueDate: invoiceData.dueDate || "",
    status: invoiceData.status || "Draft",
    notes: invoiceData.notes || "",
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
          {isEdit ? "Edit Invoice" : "Create New Invoice"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEdit ? "Update the invoice details." : "Enter the details for the new invoice."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Invoice ID" name="invoiceId" value={form.invoiceId} disabled />

          <SelectField
            label="Client"
            name="client"
            value={form.client}
            onChange={handleChange}
            options={[{ value: form.client, label: form.client }]}
            required
          />

          <InputField
            label="Client Address"
            name="clientAddress"
            value={form.clientAddress}
            onChange={handleChange}
            placeholder="e.g., 123 Main Street, NY"
          />

          <InputField
            label="Project Name"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="e.g., Website Redesign"
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
              placeholder="e.g., 10"
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
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "Draft", label: "Draft" },
              { value: "Sent", label: "Sent" },
              { value: "Paid", label: "Paid" },
              { value: "Overdue", label: "Overdue" },
            ]}
          />

          <label className="block mb-1 font-medium mt-4">Notes (Optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add any internal notes or payment terms for the client..."
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <BtnField onClose={onClose} btnName={isEdit ? "Update Invoice" : "Create Invoice"} />
        </form>
      </div>
    </div>
  );
}
