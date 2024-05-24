import React from "react";
import UserButton from "./UserButton";
import { useLinkClickHandler } from "react-router-dom";

export default function Navbar() {
  const handleSignUpClick = useLinkClickHandler("/sign-up");
  const handleLoginClick = useLinkClickHandler("/login");
  return (
    <header>
      <nav className="flex justify-between">
        <a
          href="/"
          className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
        >
          <span>A1.</span>Invitation Maker
        </a>

        <div>
          {/* @ts-ignore */}
          <button onClick={handleLoginClick}>Login</button>
          {/* @ts-ignore */}
          <button onClick={handleSignUpClick}>Sign Up</button>
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
