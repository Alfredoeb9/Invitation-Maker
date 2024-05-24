import CreateInvitation from "../../components/CreateInvitation";
import { isUserLoggedIn } from "../../redux/features/userSlice";
import { useAppSelector } from "../../redux/hooks";
import React from "react";

export default function MyInvitations() {
  const userEmail = useAppSelector(isUserLoggedIn);
  return (
    <div>
      {userEmail.length <= 0 ? (
        <div className="flex gap-4 text-black">yes</div>
      ) : (
        <div>
          <h1 className="mb-4">Your Invitations</h1>

          <CreateInvitation />
        </div>
      )}
    </div>
  );
}
