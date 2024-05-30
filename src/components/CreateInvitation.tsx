import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { ToastContainer, toast } from "react-toastify";
import {
  invitationsApi,
  useAddInvitationMutation,
  useGetAllUserInvitationQuery,
} from "../redux/api/invitationAPI";
import { Textarea } from "./ui/textarea";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userApi } from "../redux/api/userAPI";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function CreateInvitation() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [stateError, setStateError] = useState("");
  const [open, setOpen] = useState(false);
  const [createInvitation, { data, error, isError, isLoading, status }] =
    useAddInvitationMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: formSchemaType) {
    try {
      setStateError("");
      const newValues = {
        ...values,
        id: user.token,
        email: user.email,
        userId: user.id,
      };
      // @ts-expect-error newValues is present at this level
      await createInvitation(newValues, { skipToken: !newValues })
        .unwrap()
        .then(() => {
          toast("Invitation created, cheers! 🥳", {
            position: "bottom-right",
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            type: "success",
          });
          // dispatch(invitationsApi.util.resetApiState());
          setOpen(false);
        })
        .catch((error) => {
          if (error.data.error.includes("Name is taken in your repository")) {
            setStateError(error.data.error);
          }
        });
    } catch (error: any) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="bg-white rounded-lg text-black px-2 py-3">
          Create New Invitation
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Invitation</DialogTitle>
          {/* <DialogDescription>Create a new invitation.</DialogDescription> */}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Creative name"
                      {...field}
                      // onChange={(e) => setEmail(e.currentTarget.value)}
                      // value={email}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {stateError && (
              <p className="text-red-500 font-semibold">Error: {stateError}</p>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Describe your invitation"
                      className="resize-y rounded-md max-h-56"
                      {...field}
                      // onChange={(e) => setEmail(e.currentTarget.value)}
                      // value={email}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <button
            onClick={() => {
              setOpen(false);
            }}
            disabled={form.formState.isSubmitting || isLoading}
            className="mt-4 text-white font-semibold bg-cyan-500 px-2 py-1 rounded-md hover:bg-cyan-600 transition-all"
            type="submit"
          >
            Close
          </button>
          <button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting || isLoading}
            className="mt-4 bg-white text-black font-semibold"
            type="submit"
          >
            Create
          </button>
        </DialogFooter>
      </DialogContent>

      <ToastContainer />
    </Dialog>
  );
}
