import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AOS from "aos";

// Styles
import "./styles/App.css";
// import "aos/dist/aos.css";

// Authentication
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgetPassword/forgetPassword";

// Main Pages
import AdminPage from "./pages/admin/AdminPage";
import ClientsPage from "./pages/clients/ClientsPage";
import PropertyPage from "./pages/property/PropertyPage";

// Add/Update Pages
import AddUpdateClient from "./pages/clients/AddUpdateClient";
import AddUpdateProperty from "./pages/property/AddUpdateProperty";

// Extra Pages
import Unauthorized from "./pages/unauthorized";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

// Components design
function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main Pages */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/properties" element={<PropertyPage />} />

        {/* Add/Update Pages */}
        <Route path="/clients/add" element={<AddUpdateClient />} />
        <Route path="/clients/edit/:id" element={<AddUpdateClient />} />
        <Route path="/properties/add" element={<AddUpdateProperty />} />
        <Route path="/properties/edit/:id" element={<AddUpdateProperty />} />

        {/* Unauthorized Access */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/page-not-found" element={<NotFound />} />
        <Route path="/server-error" element={<ServerError />} />

        <Route path="*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
// import "./styles/App.css";

// Pages
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import ForgotPassword from "./pages/forgetPassword/ForgetPassword";
// import Admin from "./pages/admin/AdminPage";
// import ClientPage from "./pages/client/ClientPage";
// import PropertyPage from "./pages/property/PropertyPage";
// import AddUpdateClient from "./pages/client/AddUpdateClient";
// import AddUpdateProperty from "./pages/property/AddUpdateProperty";
// import Unauthorized from "./pages/Unauthorized";
// import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="p-6 h-screen overflow-hidden">
//         <Routes>
//           {/* Authentication */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Main Pages */}
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/clients" element={<ClientPage />} />
//           <Route path="/properties" element={<PropertyPage />} />

//           {/* Add/Update Pages */}
//           <Route path="/clients/add" element={<AddUpdateClient />} />
//           <Route path="/clients/edit/:id" element={<AddUpdateClient />} />
//           <Route path="/properties/add" element={<AddUpdateProperty />} />
//           <Route path="/properties/edit/:id" element={<AddUpdateProperty />} />

//           {/* Unauthorized Access */}
//           <Route path="/unauthorized" element={<Unauthorized />} />

//           {/* Catch-All: Redirect to Dashboard */}
//           <Route path="*" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
