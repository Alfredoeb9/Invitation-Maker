import React from "react";
import UserButton from "./UserButton";
import { Link, useLinkClickHandler } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { isUserLoggedIn } from "../redux/features/userSlice";

export default function Navbar() {
  const handleSignUpClick = useLinkClickHandler("/sign-up");
  const handleLoginClick = useLinkClickHandler("/login");
  const userEmail = useAppSelector(isUserLoggedIn);

  return (
    <header className="bg-white container">
      <nav className="flex justify-between">
        <div>
          <a
            href="/welcome"
            className="font-bold text-xl sm:text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
          >
            <span>A1.</span>Invitation
          </a>
          <Link to={"/"}>Home</Link>
        </div>

        {!userEmail ? (
          <div className="flex gap-4 text-black justify-center">
            <button
              //@ts-ignore
              onClick={handleLoginClick}
              className="hover:bg-cyan-300 px-2 transition-all"
            >
              Login
            </button>
            <button
              //@ts-ignore
              onClick={handleSignUpClick}
              className="hover:bg-cyan-300 px-2 transition-all"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <UserButton />
        )}
      </nav>
    </header>
  );
}
