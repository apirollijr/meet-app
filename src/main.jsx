import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as atatus from 'atatus-spa';
atatus.config('237a6dda91364ee1853736ad4efd8fcf').install();

// test
atatus.notify(new Error('Test Atatus Setup'));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
