
import { BlogForm } from "@/types";
import { cookies } from "next/headers";

export const handleBlogPost = async(blogData: BlogForm) => {

    const token = cookies().get('token')?.value;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(blogData),
        });
    
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to post blog.');
        }
        const data = await response.json();
        return data;
      } catch (error: any) {
        console.error('Error posting blog:', error.message);
        throw new Error('Failed to post blog.');
      }
};

export const userBlogs = async() => {

    const token = cookies().get('token')?.value;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });
    
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to post blog.');
        }
        const data = await response.json();
        const postData = data.posts;
        return postData;
      } catch (error: any) {
        console.error('Error posting blog:', error.message);
        throw new Error('Failed to post blog.');
      }
}

export const Blogs = async() => {

    const token = cookies().get('token')?.value;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });
    
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to post blog.');
        }
        const data = await response.json();
        const postData = data.data;
        return postData;
      } catch (error: any) {
        console.error('Error posting blog:', error.message);
        throw new Error('Failed to post blog.');
      }
};

export const authorBlogs = async(authorId: string) => {
    const token = cookies().get('token')?.value;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/author?author=${authorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });

    
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to post blog.');
        }
        const data = await response.json();
        const postData = data.posts;
        return postData;
      } catch (error: any) {
        console.error('Error posting blog:', error.message);
        throw new Error('Failed to post blog.');
      }
}