"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignupForm } from "@/types";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import SignupImage from "@/public/images/register.png";
import { handleSignup } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

const Signup = () => {
  const [user, setUser] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { setUserAuthInfo } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Registering...");
    try {
      const result = await handleSignup(user);
      console.log(result)
      setUserAuthInfo(result);
      const token = result.token;
      setCookie("token", token, { maxAge: 60 * 60 * 24 });
      toast.dismiss(loadingToast);
      toast.success("User signed up successful");
      console.log("User signed up successful:", result);
      router.push("/");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Signup error:", error.message);
      toast.error("Error signing up");
    }
  };
  return (
    <div className="flex justify-center p-10 items-center h-screen">
      <div className="flex justify-center items-center p-10">
        <Card className="border shadow-md rounded-lg  lg:py-4 flex justify-center items-center p-7">
          <div className="">
            <CardHeader className="lg:py-4 ">
              <CardTitle
                className={`mt-1 sm:mt-6 text-center text-3xl font-bold tracking-tight text-[#3D22CF]`}
              >
                Sign up for our blog
              </CardTitle>
              <CardDescription className="mt-2 text-center text-sm text-muted-foreground">
                Join our community and stay up to date with the latest posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <form
                  className="flex flex-col justify-center items-center space-y-4 w-full"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col w-full">
                    <Label className="text-sm pb-1">Full Name</Label>
                    <Input
                      placeholder="John Doe"
                      type="text"
                      className=" border rounded-xl w-full border-zinc-400 text-[#333333]
                    placeholder:text-zinc-400 "
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <Label className="text-sm pb-1">Email</Label>
                    <Input
                      placeholder="sample@gmail.com"
                      type="text"
                      className=" border rounded-xl w-full border-zinc-400 text-[#333333]
                    placeholder:text-zinc-400 "
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <Label className="text-sm pb-1">Password</Label>
                    <Input
                      placeholder="**********"
                      type="password"
                      className=" border rounded-xl w-full border-zinc-400 text-[#333333]
                    placeholder:text-zinc-400 "
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:mt-4 sm:w-full space-y-1">
                    <div className="sm:flex justify-end items-center gap-2 ">
                      {" "}
                      <h3 className=" sm:text-sm text-xs text-slate-400">
                        Already have an account?
                      </h3>
                      <Link
                        href="/signin"
                        className={`sm:text-sm text-xs underline text-[#3D22CF]`}
                      >
                        Signin
                      </Link>
                    </div>
                    <div className="">
                      <Button
                        className=" rounded-lg w-full bg-[#3D22CF] border border-black hover:border-white hover:bg-[#6046f3]"
                        type="submit"
                      >
                        <p className="text-[#fffff]">Sign up</p>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </CardContent>
          </div>
          <div className="lg:w-[40rem] hidden h-full lg:flex px-10 justify-center items-center">
            <div className="flex flex-col md:flex-row justify-evenly">
              <div className="hidden sm:block w-auto mx-auto p-5 border-solid mt-10 ">
                <Image
                  src={SignupImage}
                  alt="Register Image"
                  quality={100}
                  layout="fixed"
                  height={600}
                  width={600}
                  className="bg-transparent"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
