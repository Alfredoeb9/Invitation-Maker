import React, { useState } from "react";
import CreateInvitation from "../components/CreateInvitation";
import { useGetUserByEmailQuery, userApi } from "../redux/api/userAPI";

export default function Home() {
  // const { data, error, isLoading } = useGetUserByEmailQuery("test23@gmail.com");

  // console.log("data", data);
  return (
    <main>
      <div id="home-hero" className="hero">
        <div>
          <h1 className="mb-4">Your Invitations</h1>

          <CreateInvitation />
        </div>
      </div>
    </main>
  );
}
