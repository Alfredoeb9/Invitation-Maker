import React, { useState } from "react";
import CreateInvitation from "../components/CreateInvitation";

export default function Home() {
  // const userEmail = useAppSelector(isUserLoggedIn);
  // const { data, error, isLoading } = useGetUserByEmailQuery("test23@gmail.com");

  // console.log("data", data);

  // const handleCreateInvitation = async() => {
  //   try {
  //     await
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <main className="container">
      <div id="home-hero" className="hero">
        <h1 className="font-bold text-4xl mb-8">My Invitations</h1>

        <CreateInvitation />
      </div>
    </main>
  );
}
