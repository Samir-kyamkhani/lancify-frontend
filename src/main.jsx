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
import IntegrationsPage from "./pages/dashboard/IntegrationsPage";
import InboxPage from "./pages/dashboard/InboxPage";
import ChatPage from "./pages/dashboard/ChatPage";
import SupportPage from "./pages/dashboard/SupportPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import ClientDetailedPage from "./pages/dashboard/detailedPage/ClientDetailedPage";
import InvoicesDetailedPage from "./pages/dashboard/detailedPage/InvoicesDetailedPage";
import ProposalDetailsPage from "./pages/dashboard/detailedPage/ProposalDetailsPage";

import ProjectDetailedPage from "./pages/clientDashboard/detailedPage/ProjectDetailedPage";
import UserSharedFilesPage from "./pages/clientDashboard/UserSharedFilesPage";

import Layout from "./components/landingComponents/Layout/Layout";
import HomePage from "./pages/landingPages/HomePage";
import BlogsPage from "./pages/landingPages/BlogsPage";
import ContactPage from "./pages/landingPages/ContactPage";
import SignupPage from "./pages/landingPages/SignupPage";
import LoginPage from "./pages/landingPages/LoginPage";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutPage from "./components/LogoutPage";
import NotFoundPage from "./components/NotFoundPage";

// Optional: Not Found Page (you can create this component if needed)
// import NotFoundPage from "./pages/NotFoundPage";

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="signup"
          element={
            <GoogleOAuthProvider clientId={client_id}>
              <SignupPage />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path="login"
          element={
            <GoogleOAuthProvider clientId={client_id}>
              <LoginPage />
            </GoogleOAuthProvider>
          }
        />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="proposals" element={<ProposalsPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="project/:id" element={<ProjectDetailedPage />} />
          <Route path="payments" element={<InvoicePage />} />
          <Route path="teams" element={<TeamPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="client/:id" element={<ClientDetailedPage />} />
          <Route path="payment/:id" element={<InvoicesDetailedPage />} />
          <Route path="files" element={<UserSharedFilesPage />} />
          <Route path="proposal/:id" element={<ProposalDetailsPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>
      </Route>

      {/* Optional Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);