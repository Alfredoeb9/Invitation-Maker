import React from "react";
import { useAppSelector } from "../redux/hooks";
import { isUserLoggedIn } from "../redux/features/userSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
  const location = useLocation();
  const user = useAppSelector(isUserLoggedIn);

  return user.length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
