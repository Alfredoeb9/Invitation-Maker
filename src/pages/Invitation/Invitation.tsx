import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleInvitationQuery } from "../../redux/api/invitationAPI";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "../../redux/hooks";
import InvitationBuilder from "../../components/InvitationBuilder";

export default function Invitation() {
  const user = useAppSelector((state) => state.user);

  const { id } = useParams();

  const payload = { token: user.token, id: id };

  const { data, isError, error, isSuccess } = useGetSingleInvitationQuery(
    payload ?? skipToken
  );

  return (
    <div className="flex w-full flex-grow mx-auto">
      {/* <h1>Invitation</h1> */}

      <InvitationBuilder invitationData={data} />
    </div>
  );
}
