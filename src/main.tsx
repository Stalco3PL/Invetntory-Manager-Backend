import React from "react";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import { createRoot } from "react-dom/client";
import { SelectedCustomerProvider } from "./contexts/SelectedCustomerContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found in the DOM.");
}

const router = (
  <SelectedCustomerProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index path="/" element={<Home />} />
        {/* <Route path="/add" element={<AddVehicle />} />
        <Route path="/view/:id" element={<ViewVehicle />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </SelectedCustomerProvider>

);

const root = createRoot(rootElement);

root.render(router);
