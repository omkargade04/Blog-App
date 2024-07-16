"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { BlogData } from "@/types";
import { FaRegUserCircle } from "react-icons/fa";

type BlogDataProps = {
  blog: BlogData;
};

const BlogCard = ({ blog }: BlogDataProps) => {
  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="">
      <Card className="bg-white rounded-xl shadow-md overflow-hidden border">
        <CardContent className="p-4 md:p-6">
          <CardTitle className="text-3xl text-[#3D22CF] font-semibold mb-4">
            {blog.title.length > 30
              ? blog.title.slice(0, 30) + "..."
              : blog.title}
          </CardTitle>
          <CardDescription className="flex flex-col space-x-2 space-y-2 items-start text-sm text-gray-500 dark:text-gray-400  mb-4">
            <div className="flex justify-center items-center">
              <FaRegUserCircle className="w-4 h-4 mr-1" />
              <div className="space-x-2">
                <span className="font-semibold">{blog.author.name}</span>
                <span>{convertDate(blog.createdAt)}</span>
              </div>
            </div>
            <div className="text-gray-500">Author Id: {blog.authorId}</div>
          </CardDescription>
          <CardContent className="text-[#333333] pl-0">
            {blog.content.length > 200
              ? blog.content.slice(0, 149) + "..."
              : blog.content}
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
