import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invitationsApi = createApi({
  reducerPath: "invitationApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
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
      invalidatesTags: () => ["invitations"],
    }),
    getAllUserInvitation: builder.query({
      query: (id) => ({
        url: "/inv",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: id,
        },
      }),
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [
      //         ...result.map(({ id }: any) => ({
      //           type: "invitations" as const,
      //           id,
      //         })),
      //         "invitations",
      //       ]
      //     : ["invitations"],
      providesTags: () => ["invitations"],
    }),
  }),
});

export const { useAddInvitationMutation, useGetAllUserInvitationQuery } =
  invitationsApi;
