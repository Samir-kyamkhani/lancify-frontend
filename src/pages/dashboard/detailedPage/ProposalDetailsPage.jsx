import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProposal } from "../../../slices/proposalSlice";
import { useDispatch, useSelector } from "react-redux";

const ProposalDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { proposal, loading, error } = useSelector(
    (state) => state.proposalData
  );

  useEffect(() => {
    if (id) dispatch(fetchSingleProposal(id));
  }, [id, dispatch]);

  if (!proposal) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center px-4">
        <h2 className="text-2xl font-bold text-red-600">Proposal Not Found</h2>
        <p className="mt-4 text-gray-500">
          Please check the link or try another proposal.
        </p>
      </div>
    );
  }

  return (
    <div className=" bg-white shadow-lg rounded-2xl p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 ">
        Proposal Details
      </h1>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {[
          { label: "Client Name", value: proposal.client.name },
          { label: "Project Name", value: proposal.projectName },
          { label: "Amount ($)", value: `$${proposal.amount}` },
          {
            label: "Date",
            value: new Date(proposal.date).toLocaleDateString(),
          },
          { label: "Status", value: proposal.status },
        ].map((item, i) => (
          <div key={i}>
            <label className="block text-sm font-semibold text-gray-600">
              {item.label}
            </label>
            <p className="mt-1 text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Rich Text Sections */}
      <Section title="Client Needs" content={proposal.clientNeeds} />
      <Section title="Proposed Services" content={proposal.proposedServices} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Detail label="Your Name/Agency" value={proposal.agency} />
        <Detail
          label="Your Expertise"
          value={proposal.tags.map((tag) => tag.name).join(", ")}
        />
        <Detail label="Tone" value={proposal.tone} />
      </div>

      {/* Read-only Text Area */}
      <div>
        <div className="h-fit overflow-auto border rounded-md p-4 bg-gray-50 text-gray-800 whitespace-pre-wrap">
          {proposal.generatedProposal || proposal.proposedServices}
        </div>
      </div>
    </div>
  );
};

// Reusable section component
const Section = ({ title, content }) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-600 mb-1">
      {title}
    </label>
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 whitespace-pre-wrap">
      {content}
    </div>
  </div>
);

const Detail = ({ label, value }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600">{label}</label>
    <p className="mt-1 text-gray-900">{value}</p>
  </div>
);

export default ProposalDetailsPage;
