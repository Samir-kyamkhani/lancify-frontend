import React, { useEffect, useState } from "react";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";
import TextareaField from "../../Ui/TextareaField";
import { addProposal, editProposal } from "../../../slices/proposalSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAllClients } from "../../../slices/clientSlice";

const DEFAULT_CLIENT_IMG = "/dummyProfileImg.webp";

const ClientOption = ({ data, innerRef, innerProps }) => (
  <div
    ref={innerRef}
    {...innerProps}
    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
  >
    <img
      src={data.image || DEFAULT_CLIENT_IMG}
      alt={data.label}
      className="w-6 h-6 rounded-full mr-2"
    />
    <span>{data.label}</span>
  </div>
);

const ClientSingleValue = ({ data }) => (
  <div className="flex items-center">
    <img
      src={data.image || DEFAULT_CLIENT_IMG}
      alt={data.label}
      className="w-5 h-5 rounded-full mr-2"
    />
    <span>{data.label}</span>
  </div>
);

export default function AddProposalModal({
  onSubmit,
  onClose,
  isEdit = false,
  proposalData = {},
}) {
  const dispatch = useDispatch();
  const { clients = [] } = useSelector((state) => state.clientData || {});

  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);

  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.name,
    image: client.image,
  }));

  const initialClient =
    clientOptions.find(
      (c) => c.value.toString() === (proposalData.clientId || "").toString()
    ) || null;

  const [form, setForm] = useState({
    clientId: proposalData.clientId || "",
    client: initialClient,
    projectName: proposalData.projectName || "",
    amount: proposalData.amount || "",
    date: proposalData.date ? proposalData.date.slice(0, 10) : "",
    status: proposalData.status || "accepted",
    clientNeeds: proposalData.clientNeeds || "",
    proposedServices: proposalData.proposedServices || "",
    agency: proposalData.agency || "",
    expertise: Array.isArray(proposalData.expertise)
      ? proposalData.expertise.join(", ")
      : proposalData.tags?.map((tag) => tag.name).join(", ") || "",
    tone: proposalData.tone || "formal",
    generatedProposal: proposalData.generatedProposal || "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showClientSelect, setShowClientSelect] = useState(!initialClient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleClientChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      client: selectedOption || null,
      clientId: selectedOption?.value || "",
    }));
    setShowClientSelect(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.client || !form.clientId) {
      return setError("Please select a client.");
    }
    if (!form.projectName) {
      return setError("Please enter project name.");
    }
    if (!form.amount) {
      return setError("Please enter amount.");
    }
    if (!form.date) {
      return setError("Please select a date.");
    }

    const expertiseArray = (form.expertise || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      expertise: expertiseArray,
    };
    delete payload.client;

    if (isEdit) {
      dispatch(editProposal({ id: proposalData.id, ...payload }));
    } else {
      dispatch(addProposal(payload));
    }

    if (onSubmit) onSubmit(payload);
    onClose();
  };

  const generateProposalContent = async () => {
    if (
      !form.client?.label ||
      !form.projectName ||
      !form.clientNeeds ||
      !form.tone ||
      !form.expertise
    ) {
      return setError("Please fill in all required fields.");
    }

    const prompt = `Write a clear and professional service proposal based on the details below.
Client Name: ${form.client.label}
Project Name: ${form.projectName}
Client Needs: ${form.clientNeeds}
Tone: ${form.tone}
Expertise: ${form.expertise}

Conclude the proposal exactly with:

[Your Name]
[Your Position]
[Your Email Address]
[Your Phone Number]`;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const aiText = data.choices?.[0]?.message?.content;

      if (aiText) {
        setForm((prev) => ({
          ...prev,
          proposedServices: aiText,
          generatedProposal: aiText,
        }));
      } else {
        setError("AI did not return a valid response.");
      }
    } catch {
      setError("Error generating content with AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {isEdit ? "Edit Proposal" : "Create New Proposal"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 border border-gray-200 w-full text-center rounded py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            name="projectName"
            label="Project Name *"
            placeholder="e.g. Website Redesign"
            value={form.projectName}
            onChange={handleChange}
            required
          />

          <InputField
            name="amount"
            label="Amount ($) *"
            type="number"
            placeholder="e.g. 2000"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <InputField
            name="date"
            label="Date *"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <InputField
            name="agency"
            label="Your Name/Agency"
            placeholder="e.g. Creative Labs"
            value={form.agency}
            onChange={handleChange}
          />

          <InputField
            name="expertise"
            label="Your Expertise"
            placeholder="e.g. UI/UX, Branding"
            value={form.expertise}
            onChange={handleChange}
          />

          {showClientSelect ? (
            <div>
              <label
                htmlFor="client-select"
                className="block text-md font-medium mb-1"
              >
                Client *
              </label>
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
                  control: (base) => ({
                    ...base,
                    borderColor: "#e5e7eb",
                    boxShadow: "none",
                  }),
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                }}
                isClearable
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-md mt-4">
              <img
                src={form.client?.image || DEFAULT_CLIENT_IMG}
                alt={form.client?.label}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700 font-medium">
                {form.client?.label}
              </span>
              <button
                type="button"
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    client: null,
                    clientId: "",
                  }));
                  setShowClientSelect(true);
                }}
                className="text-sm text-blue-500 hover:underline ml-auto"
              >
                Change
              </button>
            </div>
          )}

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "draft", label: "Draft" },
              { value: "sent", label: "Sent" },
              { value: "accepted", label: "Accepted" },
              { value: "rejected", label: "Rejected" },
              { value: "expired", label: "Expired" },
            ]}
          />

          <TextareaField
            label="Client Needs"
            name="clientNeeds"
            value={form.clientNeeds}
            onChange={handleChange}
            rows={4}
            placeholder="Describe what the client is looking for"
          />

          <TextareaField
            label="Proposed Services"
            name="proposedServices"
            value={form.proposedServices}
            onChange={handleChange}
            rows={6}
            placeholder="Click generate to auto-fill or write manually"
          />

          <SelectField
            label="Tone"
            name="tone"
            value={form.tone}
            onChange={handleChange}
            options={[
              { value: "formal", label: "Formal" },
              { value: "casual", label: "Casual" },
              { value: "friendly", label: "Friendly" },
              { value: "informal", label: "Informal" },
              { value: "professional", label: "Professional" },
            ]}
          />

          <div className="flex flex-col justify-center items-center space-y-4 mt-8 w-full">
            <div className="flex justify-end items-center w-full">
              <button
                type="button"
                onClick={generateProposalContent}
                disabled={loading}
                className={`bg-blue-500 text-white sm:px-6 px-3 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-fit ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading ? "Generating..." : "Generate Content with AI"}
              </button>
            </div>

            {form.generatedProposal && (
              <div className="mt-8 w-full border border-blue-200 rounded-xl p-5 bg-blue-50 space-y-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  Generated Proposal Content
                </h3>
                <div className="whitespace-pre-line text-gray-800 text-sm leading-relaxed">
                  {form.generatedProposal}
                </div>
              </div>
            )}

            <div className="w-full">
              <BtnField
                onClose={onClose}
                btnName={isEdit ? "Update Proposal" : "Save Proposal"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
