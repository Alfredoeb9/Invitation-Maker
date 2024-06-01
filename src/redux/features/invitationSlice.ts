import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface InvitationStateTypes {
  content: any[];
  createdBy: string;
  createdById: string;
  description: string;
  id: string;
  name: string;
  published: boolean;
  sharedURL: any;
}

interface InvitationObjectStoreTypes {
  invitations: InvitationStateTypes[];
}

const initialState: InvitationObjectStoreTypes = {
  invitations: [],
};

export const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    populateInvitation: (state, action: PayloadAction<any>) => {
      //   console.log("action", action.payload.length);

      action.payload.forEach((element: InvitationStateTypes) => {
        state.invitations = [
          ...state.invitations,
          {
            content: element.content,
            createdBy: element.createdBy,
            createdById: element.createdById,
            description: element.description,
            id: element.id,
            name: element.name,
            published: element.published,
            sharedURL: element.sharedURL,
          },
        ];
      });
      //   for (let i = 0; i < action.payload; i++) {
      //     console.log("action", action.payload[i]);
      //   state.invitations = [
      //     ...state.invitations,
      //     {
      //       content: action.payload[i].content,
      //       createdBy: action.payload[i].createdBy,
      //       createdById: action.payload[i].createdById,
      //       description: action.payload[i].description,
      //       id: action.payload[i].id,
      //       name: action.payload[i].name,
      //       published: action.payload[i].published,
      //       sharedURL: action.payload[i].sharedURL,
      //     },
      //   ];
      //   }

      //   state.invitations = [
      //     ...state.invitations,
      //     {
      //       content: action.payload.content,
      //       createdBy: "erwser",
      //       createdById: action.payload[1].createdById,
      //       description: action.payload.description,
      //       id: action.payload.id,
      //       name: action.payload.name,
      //       published: action.payload.published,
      //       sharedURL: action.payload.sharedURL,
      //     },
      //   ];
    },
    addInvitations: (state, action: PayloadAction<any>) => {
      state.invitations = [
        ...state.invitations,
        {
          content: action.payload.data[0].content,
          createdBy: action.payload.data[0].createdBy,
          createdById: action.payload.data[0].createdById,
          description: action.payload.data[0].description,
          id: action.payload.data[0].id,
          name: action.payload.data[0].name,
          published: action.payload.data[0].published,
          sharedURL: action.payload.data[0].sharedURL,
        },
      ];
    },
    removeInvitation: (state, action: PayloadAction<any>) => {
      console.log("action", action.payload);
      state.invitations = state.invitations.filter(
        (inv) => inv.id !== action.payload
      );
    },
  },
});

export const { populateInvitation, addInvitations, removeInvitation } =
  invitationSlice.actions;

export const getAllInvitations = (state: RootState) =>
  state?.invitation.invitations;

export default invitationSlice;
