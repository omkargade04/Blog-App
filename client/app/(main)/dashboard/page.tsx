"use client";

import { toast } from "sonner";
// import { BlogData } from "@/type";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogData, BlogForm } from "@/types";
import { handleBlogPost, userBlogs } from "@/lib/actions/blog.action";
import { cookies } from "next/headers";
import BlogCard from "@/components/BlogCard";
import { useAuth } from "@/context/Auth";
import { SkeletonCard } from "@/components/SkeletonCard";

const Dashboard = () => {
  const { authState: token } = useAuth();

  const auth = token;

  if (!auth) {
    redirect("/signin");
  }

  const [blog, setBlog] = useState<BlogForm>({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const [userPosts, setUserPosts] = useState<BlogData[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Posting blog...");
    if (blog.title === "" || blog.content === "") {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const result: any = await handleBlogPost(blog);
      if (result) {
        toast.dismiss(loadingToast);
      }
      toast.success("Blog posted successfully!");
      setBlog({ title: "", content: "" });
      window.location.reload();
    } catch (error: any) {
      console.error("Posting error:", error.message);
      toast.error("Error posting blog");
    }
  };

  const fetchUserBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await userBlogs();
      setUserPosts(blogs);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Fetching error:", error.message);
      toast.error("Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  return (
    <main className="md:p-[5rem]">
      <div className="flex flex-col md:flex-row gap-10 justify-between w-full">
        <div className="w-full lg:max-w-[60%]">
          <div className="text-[#333333] text-sm md:text-[2rem] font-bold pb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem]">
            {!userPosts ? (
              <div className="text-[#333333] text-[1rem] font-medium">
                No personal blogs found
              </div>
            ) : (
              <div className="text-[#3D22CF] text-4xl pl-12 sm:pl-0 font-bold pb-10">
                Access your personal blogs
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Card className=" rounded-xl shadow-xl md:w-full max-w-3xl flex-col justify-center items-center">
            <CardHeader className="text-1xl font-semibold">
              Publish your own Blogs
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#3D22CF] hover:bg-[#6046f3] text-white pr-12 sm:pl-6 sm:pr-12 flex justify-center items-center gap-2">
                    <Plus />
                    Create Blog
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-[#3D22CF]">
                      Create a New Blog Post
                    </DialogTitle>
                  </DialogHeader>
                  <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        value={blog.title}
                        placeholder="Enter the blog post title"
                        onChange={(e) =>
                          setBlog({ ...blog, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={blog.content}
                        placeholder="Enter the blog post content"
                        className="h-[10rem]"
                        onChange={(e) =>
                          setBlog({ ...blog, content: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" size="sm">
                        Publish
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="pt-10 w-full">
        {loading ? (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0  justify-center items-center pl-10 sm:pl-[12rem]">
            <div className="w-full text-center">
              <SkeletonCard />
            </div>
            <div className="w-full text-center">
              <SkeletonCard />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            {userPosts.length > 0 ? (
              userPosts.map((blog) => (
                <BlogCard key={blog.postId} blog={blog} />
              ))
            ) : (
              <div className="text-[#333333] w-full text-center text-[1rem] font-medium">
                No personal blogs found
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
