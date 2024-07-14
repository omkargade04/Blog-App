"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SigninImage from "@/public/images/login.png";
import { useState } from "react";
import { SigninForm } from "@/types";
import Image from "next/image";
import { handleSignin } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

export default function Signin() {
  const [user, setUser] = useState<SigninForm>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { setUserAuthInfo } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signin in...");
    try {
      const result = await handleSignin(user);
      setUserAuthInfo(result);
      const token = result.token;
      setCookie("token", token, { maxAge: 60 * 60 * 24 });
      toast.dismiss(loadingToast);
      toast.success("User logged in successfully");
      console.log("Signup successful:", result);
      router.push("/");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Signup error:", error.message);
      toast.error("Error logging in");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center p-4">
        <Card className="border shadow-md rounded-lg  lg:py-4 flex justify-center items-center p-4 sm:p-10">
          <div className="p-4 sm:p-10">
            <CardHeader className="lg:py-4 ">
              <CardTitle
                className={`mt-1 sm:mt-6 text-center text-3xl font-bold tracking-tight text-[#3D22CF]`}
              >
                Sign in to your account
              </CardTitle>
              <CardDescription className="mt-2 text-center text-sm text-muted-foreground">
                Sign in to view and create your blogs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <form
                  className="flex flex-col justify-center items-center space-y-4 w-full"
                  onSubmit={handleSubmit}
                >
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
                  <div className="sm:mt-4 w-full sm:w-full space-y-1">
                    <div className="sm:flex justify-end items-center gap-2 ">
                      {" "}
                      <h3 className=" sm:text-sm text-xs text-slate-400">
                        Don&apos;t have an account?
                      </h3>
                      <Link
                        href="/signup"
                        className={`sm:text-sm text-xs underline text-[#3D22CF]`}
                      >
                        Signup
                      </Link>
                    </div>
                    <div className="">
                      <Button
                        className=" rounded-lg w-full bg-[#3D22CF] border border-black hover:border-white hover:bg-[#6046f3]"
                        type="submit"
                      >
                        <p className="text-[#fffff]">Sign in</p>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </CardContent>
          </div>
          <div className="w-full lg:w-[40rem] hidden  lg:flex bg-white px-20 justify-center items-center">
            <div className="flex flex-col md:flex-row justify-evenly">
              <div className="hidden sm:block w-auto mx-auto p-5 border-solid mt-10 ">
                <Image
                  src={SigninImage}
                  alt="Login Image"
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
}
