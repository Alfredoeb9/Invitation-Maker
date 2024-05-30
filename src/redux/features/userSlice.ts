import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  email: string;
  id: string;
  userName: string;
  credits: number;
  firstName: string;
  isVerified: boolean;
  lastName: string;
  token: string;
}

const initialState: UserState = {
  credits: 0,
  email: "",
  id: "",
  userName: "",
  firstName: "",
  isVerified: false,
  lastName: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.credits = action.payload.credits;
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.isVerified = action.payload.isVerified;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },

    userLogout: (state) => {
      state.email = "";
      state.credits = 0;
      state.id = "";
      state.userName = "";
      state.firstName = "";
      state.isVerified = false;
      state.lastName = "";
      state.token = "";
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export const isUserLoggedIn = (state: RootState) => state.user.email;

export default userSlice;
