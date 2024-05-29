import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginTypes {
  email: string;
  password: string;
}
// Define a service using a bae URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: () => "/auth/login",
      providesTags: ["Login"],
    }),
    login: builder.mutation({
      query: (payload: LoginTypes) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
      }),
      invalidatesTags: ["Login"],
    }),
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Login"],
    }),

    verifyEmail: builder.mutation({
      query: (id) => ({
        url: "/auth/verify-email",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: id,
        },
      }),
    }),
  }),
});

// export hooks for usage in funcitonal components, which are
// auto generated baed on the defined endpoints
export const {
  useGetUserByEmailQuery,
  useLoginMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
} = userApi;
