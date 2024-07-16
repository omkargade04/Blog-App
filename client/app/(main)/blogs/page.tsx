"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleBlogPost } from "@/lib/actions/blog.action";
import { useState } from "react";
import { BlogForm } from "@/types";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth";

const Blogs = () => {
  const {authState: token} = useAuth();

  const auth = token;

  if (!auth) {
    redirect("/signin");
  }

  const loadingToast = toast.loading("Posting blog...");

  const router = useRouter();
  const [blog, setBlog] = useState<BlogForm>({
    title: "",
    content: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (blog.title === "" || blog.content === "") {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const result: any = await handleBlogPost(blog);
      toast.success("Blog posted successfully!");
      toast.dismiss(loadingToast);
      router.push("/dashboard");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Posting error:", error.message);
      toast.error("Error posting blog");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-8 md:px-6 md:py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 flex flex-col justify-center items-center pt-10 sm:pt-0">
          <div className="space-y-4 p-2">
            <h1 className="text-3xl font-bold tracking-tighter md:pt-4 pt-4 sm:text-4xl md:text-5xl text-[#3D22CF]">
              Create a New Blog Post
            </h1>
          </div>
          <form className="grid gap-6 w-full" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={blog.title}
                placeholder="Enter the blog post title"
                className="min-h-[10px] bg-slate-50"
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={blog.content}
                placeholder="Enter the blog post content"
                className="min-h-[150px] sm:min-h-[250px] rounded-md bg-slate-50"
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              />
            </div>
            <div className="flex justify-end ">
              <Button type="submit" size="sm">
                Publish
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
