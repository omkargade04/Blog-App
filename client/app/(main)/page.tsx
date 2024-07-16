import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Blogs } from "@/lib/actions/blog.action";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = cookies();
  const token: string | undefined = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const blogs = await Blogs();

  return (
    <div>
      <section className="w-full p-10 md:pt-[5rem]">
        <div className="container grid gap-8 px-4 md:px-6  pb-4">
          <div className="space-y-4 flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold tracking-tighter pb-8 sm:text-4xl md:text-5xl text-[#6046f3]">
              View All Blogs Here!
            </h1>
            <Button className="p-6">
              <Link href="/blogs">Publish Blogs</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4rem] pt-8">
          {blogs.length > 0 ? (
            blogs.map((blog: any) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div className="text-[#333333] text-[1rem] font-medium">
              No blogs found
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
