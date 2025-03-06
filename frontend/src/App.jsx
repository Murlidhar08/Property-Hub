import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";

// Styles
import "./styles/App.css";
import "aos/dist/aos.css";

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
    </>
  );
}

export default App;
