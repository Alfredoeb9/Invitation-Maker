import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { useSignUpMutation } from "../redux/api/userAPI";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../redux/features/userSlice";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userName: z.string().min(5),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const user = useAppSelector(isUserLoggedIn);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  async function onSubmit(values: formSchemaType) {
    try {
      const response = await signUp(values);

      return response;
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md m-auto py-5"
      >
        <h1 className="font-bold text-4xl mb-4">Sign up</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="text"
                    placeholder="example@gmail.com"
                    className="text-black"
                    {...field}
                  />

                  {form.formState.errors.email && (
                    <p className="text-red-500">
                      Error: {form.formState.errors.email?.message}
                    </p>
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="password"
                    placeholder="password"
                    autoComplete="true"
                    className="text-black"
                    {...field}
                  />
                  {form.formState.errors.password && (
                    <p className="text-red-500">
                      Error: {form.formState.errors.password?.message}
                    </p>
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="text"
                    placeholder="userName"
                    autoComplete="true"
                    className="text-black"
                    {...field}
                  />

                  {form.formState.errors.userName && (
                    <p className="text-red-500">
                      Error: {form.formState.errors.userName?.message}
                    </p>
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="text"
                    placeholder="John"
                    autoComplete="true"
                    className="text-black"
                    {...field}
                  />

                  {form.formState.errors.firstName && (
                    <p className="text-red-500">
                      Error: {form.formState.errors.firstName?.message}
                    </p>
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="text"
                    placeholder="Doe"
                    autoComplete="true"
                    className="text-black"
                    {...field}
                  />

                  {form.formState.errors.lastName && (
                    <p className="text-red-500">
                      Error: {form.formState.errors.lastName?.message}
                    </p>
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-200 text-white rounded-lg w-full"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </Form>
  );
}
