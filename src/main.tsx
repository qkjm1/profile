import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// src/main.tsx
import "./styles/global.css";
import "./components/stack/stack-cards.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
