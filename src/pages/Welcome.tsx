import React from "react";
import { Link, useLinkClickHandler } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { isUserLoggedIn } from "../redux/features/userSlice";

export default function Welcome() {
  const user = useAppSelector(isUserLoggedIn);
  const handleSignUpClick = useLinkClickHandler("/sign-up");

  return (
    <main className="container max-w-6xl ">
      <section id="hero" className="h-[90dvh] content-center">
        <h1 className="text-6xl pb-2">Welcome to A1 Invitation</h1>
        <p className="text-4xl pb-6">Create your new invitation</p>

        {user ? (
          <Link to={"/"} className="bg-cyan-600 px-4 py-2 rounded-md">
            Create Invitation
          </Link>
        ) : (
          <button
            type="button"
            //@ts-ignore
            onClick={handleSignUpClick}
            className="bg-cyan-600 px-4 py-2 rounded-md"
          >
            Sign Up
          </button>
        )}
      </section>
    </main>
  );
}
