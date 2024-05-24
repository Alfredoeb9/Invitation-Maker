import React from "react";
import UserButton from "./UserButton";

export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-between">
        <a
          href="/"
          className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
        >
          <span>A1.</span>Invitation Maker
        </a>

        <UserButton />
      </nav>
    </header>
  );
}
