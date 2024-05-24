import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="app bg-slate-800 text-white">
      <Navbar />
      <>
        <Outlet />
      </>
    </div>
  );
}
