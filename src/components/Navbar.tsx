import React from "react";
import UserButton from "./UserButton";
import { useLinkClickHandler } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { isUserLoggedIn } from "../redux/features/userSlice";

export default function Navbar() {
  const handleSignUpClick = useLinkClickHandler("/sign-up");
  const handleLoginClick = useLinkClickHandler("/login");
  const userEmail = useAppSelector(isUserLoggedIn);
  return (
    <header className="bg-white container">
      <nav className="flex justify-between">
        <a
          href="/"
          className="font-bold text-xl sm:text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
        >
          <span>A1.</span>Invitation
        </a>

        <div>
          {userEmail.length <= 0 ? (
            <div className="flex gap-4 text-black">
              {/* @ts-ignore */}
              <button onClick={handleLoginClick}>Login</button>
              {/* @ts-ignore */}
              <button onClick={handleSignUpClick}>Sign Up</button>
            </div>
          ) : (
            <UserButton />
          )}
        </div>
      </nav>
    </header>
  );
}
