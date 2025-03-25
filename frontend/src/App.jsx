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
import AddRequirementPage from "./pages/requirements/AddRequirementPage";

// Error Pages
import Unauthorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";
import ServerError from "./pages/errors/ServerError";

// Layouts
import NavLayout from "./layouts/NavLayout";
import PublicLayout from "@/layouts/PublicLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AgentsPage from "./pages/agents/AgentsPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import AuthInitializer from "@/layouts/AuthInitializer";

function App() {
  return (
    <BrowserRouter>
      {/* Initialize Auth Check inside Router */}
      <AuthInitializer />

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/properties" element={<PropertyPage />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* Details page */}
            <Route path="/properties/:id" element={<PropertyDetails />} />

            {/* Add/Update Pages */}
            <Route path="/clients/add" element={<AddUpdateClient />} />
            <Route path="/clients/edit/:id" element={<AddUpdateClient />} />
            <Route path="/properties/add" element={<AddUpdateProperty />} />
            <Route path="/properties/edit/:id" element={<AddUpdateProperty />} />
            <Route path="/requirements/add" element={<AddRequirementPage />} />
            <Route path="/requirements/edit/:id" element={<AddRequirementPage />} />
            <Route path="/agents/add" element={<AddUpdateAgent />} />
            <Route path="/agents/edit/:id" element={<AddUpdateAgent />} />
          </Route>
        </Route>

        {/* error routes */}
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
