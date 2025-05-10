import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import DashboardLayout from "./DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ClientsPage from "./pages/dashboard/ClientsPage";
import ProposalsPage from "./pages/dashboard/ProposalsPage";
import ProjectPage from "./pages/dashboard/ProjectPage";
import InvoicePage from "./pages/dashboard/InvoicePage";
import TeamPage from "./pages/dashboard/TeamPage";
// import ReportsPage from "./pages/dashboard/ReportsPage";
import IntegrationsPage from "./pages/dashboard/IntegrationsPage";
import InboxPage from "./pages/dashboard/InboxPage";
// import SocialMediaManagementPage from "./pages/dashboard/SocialMediaManagementPage";
import ChatPage from "./pages/dashboard/ChatPage";
import SupportPage from "./pages/dashboard/SupportPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import ClientDetailedPage from "./pages/dashboard/detailedPage/ClientDetailedPage";
import InvoicesDetailedPage from "./pages/dashboard/detailedPage/InvoicesDetailedPage";
import ProposalDetailsPage from "./pages/dashboard/detailedPage/ProposalDetailsPage";
import UserProjectPage from "./pages/clientDashboard/UserProjectPage";
import UserDashboardPage from "./pages/clientDashboard/UserDashboardPage";
import ProjectDetailedPage from "./pages/clientDashboard/detailedPage/ProjectDetailedPage";
import UserProposalsPage from "./pages/clientDashboard/UserProposalsPage";
import UserProposalDetailsPage from "./pages/clientDashboard/detailedPage/UserProposalDetailsPage";
import UserInvoicesPage from "./pages/clientDashboard/UserInvoicesPage";
import UserInvoiceDetailsPage from "./pages/clientDashboard/detailedPage/UserInvoicesDetailedPage";
import UserSharedFilesPage from "./pages/clientDashboard/UserSharedFilesPage";

import Layout from "./components/landingComponents/Layout/Layout"
import HomePage from "./pages/landingPages/HomePage";
import BlogsPage from "./pages/landingPages/BlogsPage";
import ContactPage from "./pages/landingPages/ContactPage";
import SignupPage from "./pages/landingPages/SignupPage";
import LoginPage from "./pages/landingPages/LoginPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="proposals" element={<ProposalsPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="payment" element={<InvoicePage />} />
        <Route path="teams" element={<TeamPage />} />
        {/* <Route path="reports" element={<ReportsPage />} /> */}
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="inbox" element={<InboxPage />} />
        {/* <Route path="social-manager" element={<SocialMediaManagementPage />} /> */}
        <Route path="chat" element={<ChatPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* Detailed pages */}
        <Route path="/dashboard/client/:id" element={<ClientDetailedPage />} />
        <Route
          path="/dashboard/payment/:id"
          element={<InvoicesDetailedPage />}
        />
        <Route
          path="/dashboard/proposal/:id"
          element={<ProposalDetailsPage />}
        />
      </Route>
      
      <Route path="/user" element={<DashboardLayout />}>
        <Route index element={<UserDashboardPage />} />
        <Route path="/user/projects" element={<UserProjectPage />} />
        <Route path="/user/project/:id" element={<ProjectDetailedPage />} />
        <Route path="/user/proposals" element={<UserProposalsPage />} />
        <Route
          path="/user/proposal/:id"
          element={<UserProposalDetailsPage />}
        />
        <Route path="/user/payments" element={<UserInvoicesPage />} />
        <Route path="/user/payment/:id" element={<UserInvoiceDetailsPage />} />
        <Route path="/user/files" element={<UserSharedFilesPage />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route index={true} element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      ,
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
