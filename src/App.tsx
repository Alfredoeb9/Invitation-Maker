import React from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";

import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import NotFound from "./NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const helmetContext = {};

  return (
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
