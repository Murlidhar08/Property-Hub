import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import "./styles/App.css";

// Authentication
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgetPassword";

// Main Pages
import AdminPage from "./pages/admin/AdminPage";
import ClientsPage from "./pages/clients/ClientsPage";
import PropertyPage from "./pages/property/PropertyPage";
import Requirements from "./pages/requirements/Requirements";

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

// Layout
import NavLayout from "./layouts/NavLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AgentsPage from "./pages/agents/AgentsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Error Pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/server-error" element={<ServerError />} />

        {/* Protected Routes (With Navbar) */}
        <Route element={<NavLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/agents" element={<AgentsPage />} />

          {/* Details page */}
          <Route path="/properties/:id" element={<PropertyDetails />} />

          {/* Add/Update Pages */}
          <Route path="/clients/add" element={<AddUpdateClient />} />
          <Route path="/clients/edit/:id" element={<AddUpdateClient />} />
          <Route path="/properties/add" element={<AddUpdateProperty />} />
          <Route path="/properties/edit/:id" element={<AddUpdateProperty />} />
          <Route path="/requirements/add" element={<AddRequirementPage />} />
          <Route
            path="/requirements/edit/:id"
            element={<AddRequirementPage />}
          />
          <Route path="/agents/add" element={<AddUpdateAgent />} />
          <Route path="/agents/edit/:id" element={<AddUpdateAgent />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
