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
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import MyInvitations from "./pages/MyInvitations/MyInvitations";
import Welcome from "./pages/Welcome";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Home />} />
        <Route path="/my-invitation" element={<MyInvitations />} />
      </Route>

      <Route path="/welcome" element={<Welcome />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email/:id" element={<VerifyEmail />} />
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
