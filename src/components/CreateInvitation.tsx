import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { userApi, useSignUpMutation } from "../redux/api/userAPI";
import { useAddInvitationMutation } from "../redux/api/invitationAPI";
import { Textarea } from "./ui/textarea";
import { useAppSelector } from "../redux/hooks";
import { isUserLoggedIn } from "../redux/features/userSlice";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function CreateInvitation() {
  const [email, setEmail] = useState("");
  // const [signUp, { isLoading, isSuccess, isError }] = useSignUpMutation();
  const [createInvitation, { data, error, isError, isLoading }] =
    useAddInvitationMutation();
  const user = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const newValues = { ...values, id: user.id, email: user.email };

      await createInvitation(newValues);
    } catch (error: any) {
      console.log("error", error);
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

  console.log("error", error);

  return (
    <Dialog>
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
