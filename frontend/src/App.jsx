import { useEffect } from "react";
import AOS from "aos";

// Styles
import "@/assets/styles/App.css";
import "aos/dist/aos.css";

// Components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import LoginPage from '@/pages/login/Login';
import { Register } from '@/pages/register/Register';
import { Admin } from '@/pages/admin/Admin';

// Components design
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Admin />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
