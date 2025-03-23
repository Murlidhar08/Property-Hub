import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/assets/styles/main.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// store
import { Provider } from "react-redux";
import store from "./redux/store";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>
);
