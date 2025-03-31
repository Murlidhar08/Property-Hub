import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Styles
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

// Authentication
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgetPassword";
import PendingApproval from "./pages/authentication/PendingApproval";

// Main Pages
import AdminPage from "./pages/admin/AdminPage";
import ClientsPage from "./pages/clients/ClientsPage";
import PropertyPage from "./pages/property/PropertyPage";
import Requirements from "./pages/requirements/Requirements";
import AccountPage from "./pages/account/AccountPage";

// Details Page
import PropertyDetails from "./pages/property/PropertyDetails";

// Add/Update Pages
import AddUpdateClient from "./pages/clients/AddUpdateClient";
import AddUpdateProperty from "./pages/property/AddUpdateProperty";
import AddUpdateAgent from "./pages/agents/AddUpdateAgent";
import AddUpdateRequirement from "./pages/requirements/AddUpdateRequirement";

// Error Pages
import Unauthorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";
import ServerError from "./pages/errors/ServerError";
import TokenExpired from './pages/errors/TokenExpired'

// Layouts
import NavLayout from "./layouts/NavLayout";
import PublicLayout from "@/layouts/PublicLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AgentsPage from "./pages/agents/AgentsPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import AuthInitializer from "@/layouts/AuthInitializer";
import ResetPassword from './pages/authentication/ResetPassword';
import PendingVerification from './pages/authentication/PendingVerification';
import UserVerified from './pages/authentication/UserVerified';
import AgentDisplayPage from './pages/agents/AgentDisplayPage';
import ClientDisplayPage from './pages/clients/ClientDisplayPage';
import RequirementDetailsPage from './pages/requirements/RequirementDetailsPage';
import OwnersPage from './pages/owners/OwnersPage';
import AddUpdateOwnerPage from './pages/owners/AddUpdateOwner';
import OwnerDisplayPage from './pages/owners/OwnerDisplayPage';

function App() {
  return (
    <BrowserRouter>
      {/* fetching user details if loged In*/}
      <AuthInitializer />

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* Client */}
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientDisplayPage />} />
            <Route path="/clients/add" element={<AddUpdateClient />} />
            <Route path="/clients/edit/:id" element={<AddUpdateClient />} />

            {/* Properties */}
            <Route path="/properties" element={<PropertyPage />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/properties/add" element={<AddUpdateProperty />} />
            <Route path="/properties/edit/:id" element={<AddUpdateProperty />} />

            {/* Requirements */}
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/requirements/:id" element={<RequirementDetailsPage />} />
            <Route path="/requirements/add" element={<AddUpdateRequirement />} />
            <Route path="/requirements/edit/:id" element={<AddUpdateRequirement />} />

            {/* Agents */}
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agents/:id" element={<AgentDisplayPage />} />
            <Route path="/agents/add" element={<AddUpdateAgent />} />
            <Route path="/agents/edit/:id" element={<AddUpdateAgent />} />

            {/* Owners */}
            <Route path="/owners" element={<OwnersPage />} />
            <Route path="/owners/:id" element={<OwnerDisplayPage />} />
            <Route path="/owners/add" element={<AddUpdateOwnerPage />} />
            <Route path="/owners/edit/:id" element={<AddUpdateOwnerPage />} />
          </Route>
        </Route>

        {/* error routes */}
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/pending-verification" element={<PendingVerification />} />
        <Route path="/verify-email" element={<UserVerified />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/token-expired" element={<TokenExpired />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
