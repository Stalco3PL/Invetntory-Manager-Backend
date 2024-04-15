import React from "react";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import { createRoot } from "react-dom/client";
import { SelectedCustomerProvider } from "./contexts/SelectedCustomerContext";
import CustomerDashboard from "./screens/CustomerDashboard";
import { LoadingProvider } from "./contexts/LoadingContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found in the DOM.");
}

const router = (
  <SelectedCustomerProvider>
    <LoadingProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index path="/" element={<Home />} />
        <Route path="/Dashboard/:customerName" element={<CustomerDashboard />} /> 
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </LoadingProvider>

  </SelectedCustomerProvider>

);

const root = createRoot(rootElement);

root.render(router);
