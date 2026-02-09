'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts';
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUp.schema";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/apiResponse";
import { Form, FormField, FormControl, FormMessage, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const signUp = () => {
  const [username, setUsername] = useState('');
  const [userNameMessage, setUserNameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 400);

  const router = useRouter();

  // Using zod
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    const checkUniqueUsername = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUserNameMessage('');
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`);
          let msg = response.data.message;
          setUserNameMessage(msg);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUserNameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          )
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUniqueUsername()
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      console.log(response);

      toast.success("Success", {
        description: response.data.message,
        position: "bottom-right"
      });

      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error in sign-up of user ", error);

      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;

      toast.error("Sign Up failed", {
        description: errorMessage,
        position: "bottom-right"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col gap-5 min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md p-8">
        {/* First div */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystery Message</h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>

        {/* Second div */}
        <div className="flex flex-col gap-2.5 justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
              {/* User name input form */}
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="input-field-username">Username</FormLabel>
                    <FormControl>
                      <Input id="input-field-username" autoComplete="off" type="text" placeholder="User Name"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    <p className={`text-sm ${userNameMessage === "Username is unique" ? "text-green-500" : "text-red-600"}`}>
                      {userNameMessage}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              >

              </FormField>

              {/* Email input form */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="input-field-email">Email</FormLabel>
                    <FormControl>
                      <Input id="input-field-email" type="email" placeholder="Email" {...field} />
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
              <Button className="cursor-pointer"
                type="submit" disabled={
                  isSubmitting ||
                  isCheckingUsername ||
                  !form.formState.isValid ||
                  !(userNameMessage === "Username is unique")
                  }>
                {isSubmitting ?
                  (<>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>)
                  :
                  "Sign Up"}
              </Button>
            </form>
          </Form>

          {/* Already a user */}
          <div>
            <p className="flex gap-1.5">
              <span>
                Already a member?
              </span>
              <Link href={"/sign-in"} className="text-blue-600 hover:text-blue-800 underline hover:no-underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signUp