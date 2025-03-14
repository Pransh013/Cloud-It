"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

type AuthFormType = "sign-in" | "sign-up";

const authFormSchema = (type: AuthFormType) => {
  return z.object({
    fullName:
      type === "sign-up"
        ? z
            .string()
            .min(2, {
              message: "Full Name must be at least 2 characters.",
            })
            .max(25, { message: "Full Name must be less than 25 characters." })
        : z.string().optional(),
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
  });
};

const AuthForm = ({ type }: { type: AuthFormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });
      setAccountId(user!.accountId);
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">
                {type === "sign-in" ? "Welcome back" : "Welcome"}
              </h1>
              <p className="text-balance text-muted-foreground">
                {type === "sign-in"
                  ? "Signin to your Cloud It account"
                  : "Signup to your Cloud It account"}
              </p>
            </div>
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel className="">Username</FormLabel>
                      <FormControl>
                        <Input
                          className=""
                          placeholder="Enter your full name"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel className="">Email</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {type === "sign-in" ? "Sign In" : "Sign Up"}
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin ml-2"
                />
              )}
            </Button>
            {errorMessage && (
              <p className="text-red-600 text-center">*{errorMessage}</p>
            )}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
            <div className="text-center text-sm font-medium">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="ml-1 underline underline-offset-4"
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              >
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
        </form>
      </Form>

      {accountId && (
        <OTPModal accountId={accountId} email={form.getValues("email")} />
      )}
    </>
  );
};

export default AuthForm;
