import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AOS from "aos";

// Styles
import "./styles/App.css";
// import "aos/dist/aos.css";

// Comonents
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgetPassword/forgetPassword";

// Components design
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
