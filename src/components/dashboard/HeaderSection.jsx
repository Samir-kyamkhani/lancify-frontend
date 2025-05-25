import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SearchBar } from "../Ui/SearchBar";
import { ImportExportButtons } from "../Ui/ImportExportButtons";
import DynamicButton from "../Ui/DynamicButton";
import AddClientModal from "./Form/AddClientModal";
import AddTeamMemberModal from "./Form/AddTeamMemberModal";
import AddProjectModal from "./Form/AddProjectModal";
import AddProposalModal from "./Form/AddProposalModal";
import AddInvoiceModal from "./Form/AddInvoiceModal";

export default function HeaderSection() {
  const location = useLocation();
  const path = location.pathname;

  const [showClientModal, setShowClientModal] = useState(false);
  const [showTeamMemberModal, setShowTeamMemberModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleDynamicButtonClick = () => {
    switch (path) {
      case "/dashboard/clients":
        setShowClientModal(true);
        break;
      case "/dashboard/teams":
        setShowTeamMemberModal(true);
        break;
      case "/dashboard/projects":
        setShowProjectModal(true);
        break;
      case "/dashboard/proposals":
        setShowProposalModal(true);
        break;
      case "/dashboard/payment":
        setShowInvoiceModal(true);
        break;
      default:
        break;
    }
  };

  const isClientsRoute = path === "/clients";

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className={isClientsRoute ? "w-full lg:w-1/2" : "w-full lg:w-2/3"}>
          <SearchBar />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isClientsRoute && <ImportExportButtons />}
          <DynamicButton onClick={handleDynamicButtonClick} />
        </div>
      </div>

      {/* Modals */}
      {showClientModal && (
        <AddClientModal
          onSubmit={(data) => {
            // console.log("Client added:", data);
            setShowClientModal(false);
          }}
          onClose={() => setShowClientModal(false)}
        />
      )}

      {showTeamMemberModal && (
        <AddTeamMemberModal
          onSubmit={(data) => {
            // console.log("Team member added:", data);
            setShowTeamMemberModal(false);
          }}
          onClose={() => setShowTeamMemberModal(false)}
        />
      )}

      {showProjectModal && (
        <AddProjectModal
          onSubmit={(data) => {
            // console.log("Project added:", data);
            setShowProjectModal(false);
          }}
          onClose={() => setShowProjectModal(false)}
        />
      )}

      {showProposalModal && (
        <AddProposalModal
          onSubmit={(data) => {
            // console.log("Proposal added:", data);
            setShowProposalModal(false);
          }}
          onClose={() => setShowProposalModal(false)}
        />
      )}

      {showInvoiceModal && (
        <AddInvoiceModal
          onSubmit={(data) => {
            setShowInvoiceModal(false);
          }}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}
    </>
  );
}
