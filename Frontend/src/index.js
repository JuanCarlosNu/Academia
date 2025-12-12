import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/App";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <React.StrictMode>
      <div className="flex flex-col min-h-screen">
        <App />
      </div>
    </React.StrictMode>
  </AuthProvider>
);
