import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";

// Styles
import "./styles/App.css";
import "aos/dist/aos.css";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Registration";
import ForgotPassword from "./pages/forgetPassword/forgetPassword";

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
      <Login />
    </>
  );
}

export default App;
