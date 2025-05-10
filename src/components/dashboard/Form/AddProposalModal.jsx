import React, { useState } from "react";
import InputField from "../../Ui/InputField";
import SelectField from "../../Ui/SelectField";
import BtnField from "../../Ui/BtnField";
import TextareaField from "../../Ui/TextareaField";

export default function AddProposalModal({
  onSubmit,
  onClose,
  isEdit = false,
  proposalData = {},
}) {

  const [form, setForm] = useState(() => ({
    clientName: proposalData.clientName || "",
    projectName: proposalData.projectName || "",
    amount: proposalData.amount || "",
    date: proposalData.date || "",
    status: proposalData.status || "Accepted",
    clientNeeds: proposalData.clientNeeds || "",
    proposedServices: proposalData.proposedServices || "",
    agency: proposalData.yourName || "",
    expertise: proposalData.yourExpertise || "",
    tone: proposalData.tone || "Formal",
    generatedProposal: proposalData.generatedProposal,
  }));

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { clientName, projectName, amount, date } = form;

    if (!clientName || !projectName || !amount || !date) {
      setError("Please fill in all required fields.");
      return;
    }

    console.log("Form Data Submitted:", form);
    onSubmit(form);
  };

  const generateProposalContent = async () => {
    const prompt = `Generate proposed services for the following client:

Client Name: ${form.clientName}
Project Name: ${form.projectName}
Client Needs: ${form.clientNeeds}
Tone: ${form.tone}
Expertise: ${form.expertise}

Please provide a clear and professional service proposal.`;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
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
        setForm((prev) => ({ ...prev, proposedServices: aiText }));
      } else {
        setError("AI did not return a valid response.");
      }
    } catch (err) {
      console.error("OpenRouter error:", err);
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
          {/* Text inputs */}
          {[
            {
              name: "clientName",
              label: "Client Name *",
              placeholder: "e.g. Client Name",
            },
            {
              name: "projectName",
              label: "Project Name *",
              placeholder: "e.g. Project Name",
            },
            {
              name: "amount",
              label: "Amount ($) *",
              type: "number",
              placeholder: "e.g. Amount",
            },
            {
              name: "date",
              label: "Date *",
              type: "date",
              placeholder: "e.g. Select a date",
            },
            {
              name: "agency",
              label: "Your Name/Agency",
              placeholder: "e.g. Creative Labs",
            },
            {
              name: "expertise",
              label: "Your Expertise",
              placeholder: "e.g. Web Development, UI/UX",
            },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <InputField
                label={label}
                type={type || "text"}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2"
                required={label.includes("*")}
                placeholder={placeholder}
              />
            </div>
          ))}

          {/* Select fields */}
          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "Accepted", label: "Accepted" },
              { value: "Pending", label: "Pending" },
              { value: "Rejected", label: "Rejected" },
            ]}
            required={false}
          />

          {/* Textareas */}
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
            rows={4}
            placeholder="Describe what the Services is looking for"
          />

          <SelectField
            label="Tone"
            name="tone"
            value={form.tone}
            onChange={handleChange}
            options={[
              { value: "Formal", label: "Formal" },
              { value: "Casual", label: "Casual" },
              { value: "Friendly", label: "Friendly" },
            ]}
          />

          {/* Action buttons */}
          <div className="flex flex-col justify-center items-center space-y-4 mt-8 w-full">
            <div className="flex justify-end items-center w-full">
              <button
                type="button"
                onClick={generateProposalContent}
                disabled={loading}
                className={`bg-blue-500 text-white sm:px-6 px-3 py-2 rounded-lg hover:bg-blue-600  ${
                  loading
                    ? "opacity-50 cursor-not-allowed w-full"
                    : "cursor-pointer"
                }`}
              >
                {loading ? "Generating..." : "Generate Content with AI"}
              </button>
            </div>

            {form.proposedServices && (
              <div className="mt-8 w-full border border-gray-200 rounded-xl p-6 bg-gray-50 space-y-4">
                <h3 className="text-2xl font-semibold mb-4">
                  Generated Proposal Content
                </h3>

                <div>
                  <label className="block mb-1 font-medium">
                    Proposed Services
                  </label>
                  <textarea
                    rows={10}
                    name="proposedServices"
                    value={form.generatedProposal}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2"
                  />
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
