import { authorBlogs } from "@/lib/actions/blog.action";
import React from "react";
import BlogCard from "./BlogCard";

const SearchCard = async ({ authorId }: { authorId: string }) => {
  const blogs = await authorBlogs(authorId);

  return (
    <main className="w-full py-12  md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6  pb-4">
        <div className="space-y-4 flex justify-center items-center flex-col">
          <h1 className="text-3xl font-bold tracking-tighter pb-8 sm:text-4xl md:text-5xl text-[#6046f3]">
            View All Author Blogs with id {authorId} Here!
          </h1>
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
    </main>
  );
};

export default SearchCard;
