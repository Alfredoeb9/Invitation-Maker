import React, { Key, useEffect, useState } from "react";
import CreateInvitation from "../components/CreateInvitation";
import { useGetAllUserInvitationQuery } from "../redux/api/invitationAPI";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import DeleteInvitationModal from "../components/modals/DeleteInvitationModal";
import { populateInvitation } from "../redux/features/invitationSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [invId, setInvId] = useState<string>("");
  const user = useAppSelector((state) => state.user);
  // const invitations = useAppSelector((state) => state.invitation.invitations);
  const { data, isError, error, isSuccess } = useGetAllUserInvitationQuery(
    user.token ?? skipToken,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(populateInvitation(data.allInvitations));
    }
  }, [isSuccess]);

  return (
    <main className="container">
      <div id="home-hero" className="hero">
        <h1 className="font-bold text-4xl mb-8">My Invitations</h1>

        <CreateInvitation />

        {isSuccess && (
          <div className="flex flex-row gap-2 mt-6 flex-wrap justify-center md:justify-normal">
            {data.allInvitations.map((inv: any, i: Key) => (
              <Card
                key={inv.id}
                className="w-full max-w-60 flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle>{inv.name}</CardTitle>
                  <CardDescription>{inv.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Link
                    to={`/invitation/${inv.id}`}
                    className="bg-slate-300 px-3 py-1 rounded-lg font-semibold hover:bg-slate-400 hover:scale-[1.02] transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-300 px-3 py-1 rounded-lg font-semibold hover:bg-red-400 hover:scale-[1.02] transition-all"
                    onClick={() => {
                      setInvId(inv.id);
                      setDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </CardFooter>
              </Card>
            ))}

            {deleteModal && (
              <DeleteInvitationModal
                token={user.token}
                invitationId={invId}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
