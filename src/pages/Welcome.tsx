import React from "react";
import { useLinkClickHandler } from "react-router-dom";

export default function Welcome() {
  const handleSignUpClick = useLinkClickHandler("/sign-up");
  return (
    <main className="container max-w-6xl ">
      <section id="hero" className="h-[90dvh] content-center">
        <h1 className="text-6xl pb-2">Welcome to A1 Invitation</h1>
        <p className="text-4xl pb-6">Create your new invitation</p>

        <button
          type="button"
          //@ts-ignore
          onClick={handleSignUpClick}
          className="bg-cyan-600 px-4 py-2 rounded-md"
        >
          Sign Up
        </button>
      </section>
    </main>
  );
}
