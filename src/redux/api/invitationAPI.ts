import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invitationsApi = createApi({
  reducerPath: "invitationApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  tagTypes: ["invitations"],
  endpoints: (builder) => ({
    addInvitation: builder.mutation({
      query: ({ id, ...otherDetails }: any) => ({
        url: "/inv/create",
        method: "POST",
        body: JSON.stringify({ ...otherDetails }),
        headers: {
          "Content-type": "application/json",
          Authorization: id,
        },
      }),
      invalidatesTags: ["invitations"],
    }),
  }),
});

export const { useAddInvitationMutation } = invitationsApi;
