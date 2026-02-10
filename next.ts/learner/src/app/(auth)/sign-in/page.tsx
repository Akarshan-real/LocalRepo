'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts';
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/apiResponse";
import { Form, FormField, FormControl, FormMessage, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signIn.schema";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Using zod
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    });

    if (result?.error) {
      const resultError = result.error;
      const isCredentialsError = resultError === 'CredentialsSignin';

      toast.error(isCredentialsError ? "Login failed" : "Error",{
        description : isCredentialsError ? "Incorrect email or password" : resultError,
        position: "bottom-right"
      });
    };

    if (result?.url) {
      router.replace('/dashboard');
    };
    setIsSubmitting(false);
  }

  return (
    <div className="flex justify-center items-center flex-col gap-5 min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md p-8">
        {/* First div */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystery Message</h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>

        {/* Second div */}
        <div className="flex flex-col gap-2.5 justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
              {/* Email input form */}
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="input-field-email">Email / Username</FormLabel>
                    <FormControl>
                      <Input id="input-field-email" type="email" placeholder="Email / Username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              >
              </FormField>

              {/* Password input form */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="input-field-password">Password</FormLabel>
                    <FormControl>
                      <Input id="input-field-password" autoComplete="off" type="password" placeholder="Password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              >
              </FormField>

              {/* Submit button */}
              <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
                {isSubmitting ?
                  (<>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>)
                  :
                  "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Not a user yet? */}
          <div>
            <p className="flex gap-1.5">
              <span>
                Not a user yet?
              </span>
              <Link href={"/sign-up"} className="text-blue-600 hover:text-blue-800 underline hover:no-underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
