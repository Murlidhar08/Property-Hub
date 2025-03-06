import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";

// Styles
import "./styles/App.css";
import "aos/dist/aos.css";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
      <h1 className="text-8xl text-skin-secondary">Hello world!</h1>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </>
  );
}

export default App;
