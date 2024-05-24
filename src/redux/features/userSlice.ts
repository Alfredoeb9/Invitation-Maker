import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  email: string;
}

const initialState: UserState = {
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export const isUserLoggedIn = (state: RootState) => state.user.email;

export default userSlice;
