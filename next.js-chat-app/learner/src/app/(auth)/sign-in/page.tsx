'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CircleFadingArrowUpIcon } from "lucide-react";
import { signInSchema } from "@/schemas/signIn.schema";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel
} from "@/components/ui/form";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router])

  // Using zod
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmitting(true);
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      });

      if (result?.error) {
        const resultError = result.error;
        const isCredentialsError = resultError === 'CredentialsSignin';

        toast.error(isCredentialsError ? "Login failed" : "Error", {
          description: <span className="text-black"> {isCredentialsError ? "Incorrect email or password" : resultError} </span>,
          position: "bottom-right"
        });
      };

      if (result?.url) {
        router.replace('/dashboard');
      };
    }
    catch (error) {
      toast.error("Something went wrong");
    }
    finally {
      setIsSubmitting(false);
    }
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
              {/* Email / Username input form */}
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="input-field-email">Email / Username</FormLabel>
                    <FormControl>
                      <Input id="input-field-email" type="text" placeholder="Email / Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>

              {/* Password input form */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel htmlFor="input-field-password">Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input id="input-field-password" autoComplete="current-password" type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                      </FormControl>
                      <Button className="cursor-pointer absolute right-0 hover:bg-slate-200 transition-colors duration-250 ease-in-out" type="button" onClick={() => { setShowPassword(prev => !prev) }} variant="outline" size="icon">
                        <CircleFadingArrowUpIcon />
                      </Button>
                    </div>
                    <FormMessage />

                  </FormItem>
                )}
              >
              </FormField>

              {/* Submit button */}
              <Button className="cursor-pointer" type="submit" disabled={isSubmitting || !form.formState.isValid || !form.formState.isDirty}>
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
