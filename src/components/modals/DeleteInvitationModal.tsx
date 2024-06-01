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
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { useDeleteInvitationMutation } from "../../redux/api/invitationAPI";
import { useAppDispatch } from "../../redux/hooks";
import { removeInvitation } from "../../redux/features/invitationSlice";

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
  const dispatch = useAppDispatch();
  const [deleteInvId, setDeleteInvId] = useState<string>("");
  const [deleteInvitation, { isLoading }] = useDeleteInvitationMutation();

  async function handleDeleteInvitation(values: string) {
    try {
      const newValues = { values, id: token };
      await deleteInvitation(newValues).then(() => {
        setDeleteModal(false);
        dispatch(removeInvitation(values));
        toast(`Invitation has been deleted`, {
          position: "bottom-right",
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          type: "success",
        });
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Invitation</DialogTitle>
          <DialogDescription className="text-red-400">
            Please note this action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="font-semibold text-slate-400 text-md mb-2">
              Input Invitation Id down below to delete:{" "}
              <span className="text-red-500">{invitationId}</span>
            </p>
            <Input
              id="name"
              className="col-span-3"
              value={deleteInvId}
              onChange={(e) => setDeleteInvId(e.currentTarget.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex-row justify-end gap-2">
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600 transition-all"
            disabled={!deleteInvId || isLoading}
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
