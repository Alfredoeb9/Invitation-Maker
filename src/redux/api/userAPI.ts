import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a bae URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: () => "/login",
      providesTags: ["Login"],
    }),
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/sign-up",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});

// export hooks for usage in funcitonal components, which are
// auto generated baed on the defined endpoints
export const { useGetUserByEmailQuery, useSignUpMutation } = userApi;
