import React, { Key, useState } from "react";
import CreateInvitation from "../components/CreateInvitation";
import { useGetAllUserInvitationQuery } from "../redux/api/invitationAPI";
import { useAppSelector } from "../redux/hooks";
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

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const { data, isError, error, isSuccess } = useGetAllUserInvitationQuery(
    user.token ?? skipToken,
    { refetchOnMountOrArgChange: true }
  );

  return (
    <main className="container">
      <div id="home-hero" className="hero">
        <h1 className="font-bold text-4xl mb-8">My Invitations</h1>

        <CreateInvitation />

        {isSuccess && (
          <div className="flex flex-row gap-2 mt-6 flex-wrap">
            {data.allInvitations.map((inv: any, i: Key) => (
              <Card key={inv.id} className="w-full max-w-60">
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
                    className="bg-slate-300 px-2 rounded-lg font-semibold hover:bg-slate-400 transition-all"
                  >
                    Edit
                  </Link>
                  <button className="bg-red-300 px-2 rounded-lg font-semibold hover:bg-red-400 transition-all">
                    Delete
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
