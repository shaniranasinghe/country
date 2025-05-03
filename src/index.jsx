import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CountryProvider } from "./context/CountryContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <CountryProvider>
          <App />
        </CountryProvider>
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
