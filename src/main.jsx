import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="115149963738-tpap249dma00g0spvq68ahguc14d47ti.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <Toaster />
    </Provider>
  </BrowserRouter>
);
