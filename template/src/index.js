import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

window.MYBACK_API_KEY ??= "DEVELOPMENT_API_KEY";
window.MYBACK_API_ENDPOINT ??= "http://localhost:8080/api";

const root = ReactDOM.createRoot(document.getElementById("module-mount-point"));
root.render(<App />);
