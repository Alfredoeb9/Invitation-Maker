import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { useDeleteInvitationMutation } from "../../redux/api/invitationAPI";

interface DeleteInvitationTypes {
  token: string;
  invitationId: string;
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteInvitationModal({
  token,
  invitationId,
  setDeleteModal,
  deleteModal,
}: DeleteInvitationTypes) {
  const [deleteInvId, setDeleteInvId] = useState<string>("");
  const [deleteInvitation, result] = useDeleteInvitationMutation();

  async function handleDeleteInvitation(values: any) {
    try {
      const newValues = { values, id: token };
      await deleteInvitation(newValues).then(() => {
        setDeleteModal(false);
      });
    } catch (error) {
      toast(`Sorry something went wrong, please try again`, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        type: "error",
      });
    }
  }

  return (
    <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Invitation</DialogTitle>
          <DialogDescription className="text-red-400">
            Please note this action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="font-semibold">
              Input Invitation Id down below to delete:{" "}
              <span className="text-red-500">{invitationId}</span>
            </p>
            {/* <Label htmlFor="name" className="text-right mb-2">
              Invitation Id
            </Label> */}
            <Input
              id="name"
              defaultValue=""
              className="col-span-3"
              value={deleteInvId}
              onChange={(e) => setDeleteInvId(e.currentTarget.value)}
            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div> */}
        </div>
        <DialogFooter className="flex-row justify-end gap-2">
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600"
            disabled={!deleteInvId}
            onClick={() => handleDeleteInvitation(invitationId)}
          >
            Delete
          </Button>
          <Button type="button" onClick={() => setDeleteModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
