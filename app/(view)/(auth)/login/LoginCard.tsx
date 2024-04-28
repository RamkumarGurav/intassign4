"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowBigUpDash, CircleUser, EyeIcon, EyeOffIcon } from "lucide-react";

const FormSchema = z.object({
  username: z.string().min(1, { message: "This field has to be filled." }),
  password: z.string().min(1, { message: "This field has to be filled." }),
});

const doLogin = async (data: any) => {
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return await res.json();
};

export default function LoginCard() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  // useEffect(() => {
  //   const userData = window.localStorage.getItem("userData");
  //   if (userData) {
  //     router.push("/dashboard");
  //   }
  // }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitted(true);
    try {
      const response = await doLogin(data);
      if (response.success) {
        setIsSubmitted(false);
        toast.success("Successfully logged in");
        window.localStorage.setItem("userData", JSON.stringify(response.data));
        router.push("/dashboard");
      } else {
        setIsSubmitted(false);
        toast.error(response.message);
      }
    } catch (error) {
      setIsSubmitted(false);
      toast.error("Error while logging in.");
      console.error("Error while logging in.", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription>
          Please enter your username and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4  flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 "
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl className="relative">
                    <div>
                      <Input
                        className="focus-visible:ring-gray-500"
                        placeholder="Username"
                        {...field}
                      />
                      <div className="absolute right-0 flex items-center pr-3 -translate-y-1/2 top-1/2 gap-x-1">
                        <CircleUser className="cursor-pointer" size={20} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        className="focus-visible:ring-gray-500"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <div className="absolute right-0 flex items-center pr-3 -translate-y-1/2 top-1/2 gap-x-1">
                        {showPassword ? (
                          <EyeOffIcon
                            className="cursor-pointer"
                            onClick={togglePasswordVisibility}
                            size={20}
                          />
                        ) : (
                          <EyeIcon
                            className="cursor-pointer"
                            onClick={togglePasswordVisibility}
                            size={20}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              className="w-full "
              isLoading={isSubmitted}
            >
              Login
            </LoadingButton>
            {/* <Button className={`w-full`}>Login</Button> */}
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter>
          <Button className="w-full hover:bg-blue-500 transition-colors">
            Sign in
          </Button>
        </CardFooter> */}
    </Card>
  );
}
