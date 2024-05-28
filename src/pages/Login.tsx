import React from "react";
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
import { useLoginMutation } from "../redux/api/userAPI";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Invalid password address" }),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function Login() {
  const [login, { data, error, isSuccess, status }] = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const { email, password } = values;

      if (!email) throw Error("Please provide a email");
      if (!password) throw Error("Please provide a password");

      await login(
        { email: email, password: password },
        /// @ts-expect-error email and password passed must be a string, but we don't call it when it is not passed down
        { skip: !email || !password }
      );
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

  console.log("data", data);
  console.log("error", error);
  console.log("status", status);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md m-auto py-5"
      >
        <h1 className="font-bold text-4xl mb-4 text-center mt-10">Log In</h1>

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
                    // onError={field.value}
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

        <button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-200 text-white rounded-lg w-full"
        >
          Log In
        </button>
      </form>
      <ToastContainer />
    </Form>
  );
}
