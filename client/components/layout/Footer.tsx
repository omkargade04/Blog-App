import { Button } from "@/components/ui/button";
import React from "react";
import { IoLogoBuffer } from "react-icons/io";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-50">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="flex ">
          <IoLogoBuffer className="h-6 w-6" />{" "}
          <p className="text-lg font-bold">Blogify</p>
        </div>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
