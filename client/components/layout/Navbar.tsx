"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/Auth";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoLogoBuffer } from "react-icons/io";
import { LuLogOut, LuUser2 } from "react-icons/lu";
import { Popover, PopoverTrigger } from "../ui/popover";
import {
  FaAngleDown,
  FaAngleUp,
  FaCaretDown,
  FaCaretUp,
  FaSearch,
} from "react-icons/fa";
import { PopoverContent } from "@radix-ui/react-popover";
import { IoLogOutOutline } from "react-icons/io5";
import { deleteCookie } from "cookies-next";
import { toast } from "sonner";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

export const Navbar = () => {
  const { authState: user } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    try {
      deleteCookie("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {}
  };

  const handleSearchClick = () => {
    if (!search) {
      toast.error("Enter author id to search");
      return;
    }
    router.push(`/search-blogs?author=${search}`);
    setSearch("");
  };

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-lg  bg-white flex items-center">
      <div className="hidden sm:flex lg:flex md:max-w-screen-2xl mx-auto items-center w-full justify-between">
        <div className="flex space-x-4">
          <IoLogoBuffer className="h-8 w-8 pt-1" />{" "}
          <p
            className="text-lg font-bold hover:cursor-pointer pt-1"
            onClick={() => router.push("/")}
          >
            Blogify
          </p>
          <div className="relative hidden lg:flex">
            <input
              type="text"
              placeholder="Search by author id"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 placeholder:text-sm rounded-full border 
            focus:outline-none focus:border-[#3D22CF]"
            />
            <FaSearch
              onClick={handleSearchClick}
              className="hover:cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3D22CF]"
            />
          </div>
        </div>
        <div className="flex md:pr-36 pr-28 space-x-20">
          <div className={pathName === "/" ? "font-semibold" : ""}>
            <Link href="/">Home</Link>
          </div>
          <div className={pathName === "/dashboard" ? "font-semibold" : ""}>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className={pathName === "/blogs" ? "font-semibold" : ""}>
            <Link href="/blogs">Post Blog</Link>
          </div>
        </div>
        {user.token ? (
          <>
            <div
              className="flex items-center space-x-2 cursor-pointer bg-[#3D22CF] rounded-md p-2"
              onClick={() => setShowProfile(!showProfile)}
            >
              <CiUser className="h-6 w-6 text-white" />
              {!showProfile ? (
                <FaCaretDown className="h-4 w-4 text-white" />
              ) : (
                <FaCaretUp className="h-4 w-4 text-white" />
              )}
            </div>
            {showProfile && (
              <div
                className="absolute right-[0.5rem] md:right-[-2rem] p-2 py-1.5 z-10 bg-white mt-20 mr-28 border rounded-lg 
                w-[10rem] h-[7rem] shadow-md flex flex-col justify-center items-center space-y-2 "
              >
                <div
                  className="flex items-center w-full
                hover:bg-zinc-100 rounded-md p-1 hover:cursor-pointer gap-x-4 px-2 text-sm"
                >
                  <LuUser2 className={`h-4 w-4 text-primary`} />
                  <Link href={"/dasboard"} className="text-[#333333]">
                    {user.user.name}
                  </Link>
                </div>
                <div
                  className="flex items-center w-full
                hover:bg-zinc-100 rounded-md p-1 hover:cursor-pointer gap-x-4 px-2 text-sm"
                >
                  <FiLogOut className="h-4 w-4 items-start text-red-500 " />
                  <span onClick={handleLogout}>Logout</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            <Button size="sm" variant="outline" asChild>
              <Link href="/signin">Login</Link>
            </Button>
            <Button
              className="bg-[#3D22CF] hover:bg-[#6046f3]"
              size="sm"
              asChild
            >
              <Link href="/signup">Signup to blogify</Link>
            </Button>
          </div>
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden md:hidden sm:hidden"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex space-x-1 border-b-2 pb-4 ">
            <IoLogoBuffer className="h-10 w-10 p-2" />
            <p className="font-semibold pt-2">Blogify</p>
          </div>
          <nav className="grid gap-2 py-6 space-y-6 text-xl ">
            <div
              className={
                pathName === "/"
                  ? "font-semibold"
                  : "font-medium hover:text-[#6046f3]"
              }
            >
              <Link href="/">Home</Link>
            </div>
            <div
              className={
                pathName === "/dashboard"
                  ? "font-semibold"
                  : "font-medium hover:text-[#6046f3]"
              }
            >
              <Link href="/dashboard">Dashboard</Link>
            </div>
            <div
              className={
                pathName === "/blogs"
                  ? "font-semibold"
                  : "font-medium hover:text-[#6046f3]"
              }
            >
              <Link href="/blogs">Post Blog</Link>
            </div>
          </nav>
          <SheetFooter className="pt-60  bottom-0">
            <div className="h-[5rem] w-full rounded-lg border border-slate-400 flex flex-col justify-center items-center">
              <div className="text-xl font-semibold text-[#3D22CF] ">
                {user.user.name}
              </div>
              <div className="flex text-xl text-red-500 space-x-2 hover:cursor-pointer">
                Logout
                <LuLogOut className="text-red-500 pt-1 h-6 w-6" />
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
